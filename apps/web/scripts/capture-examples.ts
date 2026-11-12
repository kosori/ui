import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, type Locator, type Page } from 'playwright';
import {
  CAPTURE_DIR,
  CAPTURE_SCHEMES,
  captureManifest,
  captureSelector,
} from './capture/manifest';

const OVERLAY_EXAMPLES = {
  'alert-dialog': {
    focusPopup: true,
    mobileViewport: true,
    openAction: 'click',
    popupSlot: 'alert-dialog-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'alert-dialog-trigger',
  },
  combobox: {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'fill',
    popupSlot: 'combobox-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'combobox-input',
  },
  command: {
    focusPopup: true,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'command-dialog-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'command-dialog-trigger',
  },
  'context-menu': {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'right-click',
    popupSlot: 'context-menu-popup',
    restoreFocus: false,
    transitionProperty: 'opacity',
    triggerSlot: 'context-menu-trigger',
  },
  dialog: {
    focusPopup: true,
    mobileViewport: true,
    openAction: 'click',
    popupSlot: 'dialog-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'dialog-trigger',
  },
  drawer: {
    focusPopup: true,
    mobileViewport: true,
    openAction: 'click',
    popupSlot: 'drawer-popup',
    restoreFocus: true,
    transitionProperty: 'transform',
    triggerSlot: 'drawer-trigger',
  },
  'dropdown-menu': {
    focusPopup: true,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'menu-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'menu-trigger',
  },
  'hover-card': {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'hover',
    popupSlot: 'preview-card-content',
    positionerSlot: 'preview-card-positioner',
    restoreFocus: false,
    transitionProperty: 'opacity',
    triggerSlot: 'preview-card-trigger',
  },
  menubar: {
    focusPopup: true,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'menubar-content',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'menubar-trigger',
  },
  'navigation-menu': {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'navigation-menu-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'navigation-menu-trigger',
  },
  popover: {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'popover-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'popover-trigger',
  },
  select: {
    focusPopup: true,
    mobileViewport: false,
    openAction: 'click',
    popupSlot: 'select-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'select-trigger',
  },
  sheet: {
    focusPopup: true,
    mobileViewport: true,
    openAction: 'click',
    popupSlot: 'sheet-popup',
    restoreFocus: true,
    transitionProperty: 'opacity',
    triggerSlot: 'sheet-trigger',
  },
  tooltip: {
    focusPopup: false,
    mobileViewport: false,
    openAction: 'hover',
    popupSlot: 'tooltip-popup',
    positionerSlot: 'tooltip-positioner',
    restoreFocus: false,
    transitionProperty: 'opacity',
    triggerSlot: 'tooltip-trigger',
  },
} as const;

type OverlayExample = keyof typeof OVERLAY_EXAMPLES;
type OverlayOpenAction = 'click' | 'fill' | 'hover' | 'right-click';

/** The point inside a Context Menu trigger a right click lands on. */
const CONTEXT_MENU_POINT = { x: 20, y: 16 };

type OverlayExampleConfig = {
  focusPopup: boolean;
  mobileViewport: boolean;
  openAction: OverlayOpenAction;
  popupSlot: string;
  positionerSlot?: string;
  restoreFocus: boolean;
  transitionProperty: string;
  triggerSlot: string;
};

const isOverlayExample = (example: string): example is OverlayExample =>
  Object.hasOwn(OVERLAY_EXAMPLES, example);

/**
 * Overlays that animate their popup through Motion instead of a CSS
 * transition, so the seam asserts an exit that outlives the open state.
 */
const MOTION_OVERLAYS = new Set<OverlayExample>([
  'alert-dialog',
  'command',
  'context-menu',
  'dialog',
  'dropdown-menu',
  'hover-card',
  'popover',
  'select',
  'sheet',
  'tooltip',
]);

type PopupExitProof = { ending: boolean; faded: boolean };

/**
 * Record a popup's closing state before it leaves the DOM, so an exit that
 * finishes between two protocol calls cannot hide from the seam.
 */
const watchPopupExit = async (page: Page, selector: string) => {
  await page.evaluate((popupSelector: string) => {
    const proof = { ending: false, faded: false };
    (window as unknown as { popupExitProof: PopupExitProof }).popupExitProof =
      proof;

    const inspect = (element: Element | null) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      if (
        element.hasAttribute('data-ending-style') ||
        element.hasAttribute('data-closed')
      ) {
        proof.ending = true;
      }

      const opacity = Number.parseFloat(element.style.opacity);
      if (Number.isFinite(opacity) && opacity < 0.99) {
        proof.faded = true;
      }
    };

    const observer = new MutationObserver((records) => {
      inspect(document.querySelector(popupSelector));
      for (const record of records) {
        if (
          record.target instanceof Element &&
          record.target.matches(popupSelector)
        ) {
          inspect(record.target);
        }
      }
    });
    observer.observe(document.body, {
      attributeFilter: ['data-closed', 'data-ending-style', 'style'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    (
      window as unknown as { popupExitObserver: MutationObserver }
    ).popupExitObserver = observer;
  }, selector);
};

/** Read the exit a popup went through and stop watching it. */
const readPopupExit = async (page: Page) =>
  page.evaluate(() => {
    (
      window as unknown as { popupExitObserver?: MutationObserver }
    ).popupExitObserver?.disconnect();
    return (window as unknown as { popupExitProof: PopupExitProof })
      .popupExitProof;
  });

/** Motion overlays that keep their popup mounted while it is hidden. */
const isCheapOverlay = (example: OverlayExample) =>
  example === 'hover-card' || example === 'tooltip';

/**
 * Poll an element's computed opacity while an action runs, then for a short
 * settle window. Polling from the harness keeps sampling off the page's own
 * frame scheduler, which a busy capture can starve.
 */
const sampleOpacityWhile = async (
  target: Locator,
  action: () => Promise<void>,
  settleMs = 600
): Promise<number[]> => {
  const samples: number[] = [];
  const state: { running: boolean } = { running: true };
  const poll = (async () => {
    while (state.running) {
      try {
        // biome-ignore lint/performance/noAwaitInLoops: one sample at a time keeps readings ordered
        const opacity = await target.evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).opacity)
        );
        samples.push(opacity);
      } catch {
        // The action may detach the popup; keep the samples already taken.
      }
      await new Promise((resolve) => setTimeout(resolve, 16));
    }
  })();

  await action();
  await new Promise((resolve) => setTimeout(resolve, settleMs));
  state.running = false;
  await poll;

  return samples;
};

/** Poll a popup until its computed opacity reaches the expected value. */
const waitForOpacity = async (
  page: Page,
  selector: string,
  expected: number,
  label: string
) => {
  try {
    await page.waitForFunction(
      ({ elementSelector, value }) => {
        const element = document.querySelector(elementSelector);
        if (!element) {
          return false;
        }

        return (
          Math.abs(
            Number.parseFloat(getComputedStyle(element).opacity) - value
          ) < 0.01
        );
      },
      { elementSelector: selector, value: expected },
      { timeout: 5000 }
    );
  } catch (error) {
    throw new Error(`${label} did not reach opacity ${expected}`, {
      cause: error,
    });
  }
};

const openOverlay = async (trigger: Locator, action: OverlayOpenAction) => {
  if (action === 'fill') {
    await trigger.fill('status');
    return;
  }

  if (action === 'hover') {
    await trigger.hover();
    return;
  }

  await trigger.click(
    action === 'right-click'
      ? { button: 'right', position: CONTEXT_MENU_POINT }
      : undefined
  );
};

/** Open an overlay, retrying so a cold dev server can finish hydrating. */
const openOverlayWhenReady = async (
  page: Page,
  trigger: Locator,
  popup: Locator,
  action: OverlayOpenAction
): Promise<void> => {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    // biome-ignore lint/performance/noAwaitInLoops: attempts are ordered so a cold page can hydrate between them
    await openOverlay(trigger, action);

    try {
      await popup.waitFor({ state: 'visible', timeout: 3000 });
      return;
    } catch {
      await page.mouse.move(0, 0);
    }
  }

  await openOverlay(trigger, action);
  await popup.waitFor({ state: 'visible' });
};

const waitForValueIncrease = async (
  page: Page,
  selector: string,
  previousValue: number
) => {
  await page.waitForFunction(
    ({ rootSelector, value }) => {
      const nextValue = Number(
        document.querySelector(rootSelector)?.getAttribute('aria-valuenow')
      );
      return Number.isFinite(nextValue) && nextValue > value;
    },
    { rootSelector: selector, value: previousValue },
    { timeout: 5000 }
  );
};

const waitForIndicatorWidthIncrease = async (
  page: Page,
  selector: string,
  previousWidth: number
) => {
  await page.waitForFunction(
    ({ indicatorSelector, width }) => {
      const indicator = document.querySelector(indicatorSelector);
      return (
        indicator instanceof HTMLElement &&
        indicator.getBoundingClientRect().width > width + 1
      );
    },
    { indicatorSelector: selector, width: previousWidth },
    { timeout: 5000 }
  );
};

/**
 * The scale a computed transform currently shows. A resting element reports
 * `none`, which is the identity.
 */
const scaleOf = (element: Element): number => {
  const style = getComputedStyle(element);

  if (style.scale !== 'none') {
    return Number.parseFloat(style.scale);
  }

  if (style.transform === 'none') {
    return 1;
  }

  const matrix = style.transform.match(/^matrix\(([^)]+)\)$/)?.[1]?.split(',');
  if (!matrix || matrix.length < 4) {
    return Number.parseFloat(style.transform);
  }

  const [a = '1', b = '0'] = matrix;
  return Math.hypot(Number(a), Number(b));
};

/** Poll a rendered element until its sampled scale satisfies a predicate. */
const waitForScale = async (
  target: Locator,
  predicate: (scale: number) => boolean,
  label: string,
  timeout = 5000
): Promise<number> => {
  const deadline = Date.now() + timeout;
  let scale = await target.evaluate(scaleOf);

  while (!predicate(scale)) {
    if (Date.now() >= deadline) {
      throw new Error(`${label} did not reach its scale (last ${scale})`);
    }

    // biome-ignore lint/performance/noAwaitInLoops: one element is sampled at a time so scale readings stay ordered
    await new Promise((resolve) => setTimeout(resolve, 16));
    scale = await target.evaluate(scaleOf);
  }

  return scale;
};

/** Whether a computed transform is the identity, so no travel is applied. */
const isIdentityTransform = (transform: string): boolean => {
  if (transform === 'none') {
    return true;
  }

  const matrix = transform.match(/^matrix\(([^)]+)\)$/)?.[1]?.split(',');
  if (matrix?.length !== 6) {
    return false;
  }

  const [a = 'NaN', b, c, d, e, f] = matrix;

  return (
    Number(a) === 1 &&
    Number(b) === 0 &&
    Number(c) === 0 &&
    Number(d) === 1 &&
    Number(e) === 0 &&
    Number(f) === 0
  );
};

/** The frames a toggle is sampled for, enough to cover a spring settling. */
const SAMPLE_FRAMES = 30;

type MotionSample = { checked: string | null; samples: number[] };

/**
 * Toggle an Example's label and sample its motion target every frame inside
 * the page, so a fast spring is observed even when the round trip is slow.
 */
const toggleAndSample = (
  preview: Locator,
  selector: string,
  mode: 'scale' | 'translateX'
): Promise<MotionSample> =>
  preview.evaluate(
    (root, options) => {
      const read = (): number => {
        const element = root.querySelector(options.selector);
        const identity = options.mode === 'scale' ? 1 : 0;
        if (!(element instanceof HTMLElement)) {
          return identity;
        }
        const style = getComputedStyle(element);
        if (options.mode === 'scale') {
          if (style.scale !== 'none') {
            return Number.parseFloat(style.scale);
          }
          if (style.transform === 'none') {
            return 1;
          }
        } else if (style.transform === 'none') {
          return 0;
        }
        const matrix = style.transform
          .match(/^matrix\(([^)]+)\)$/)?.[1]
          ?.split(',');
        if (!matrix) {
          return identity;
        }
        return options.mode === 'scale'
          ? Math.hypot(Number(matrix[0]), Number(matrix[1]))
          : Number.parseFloat(matrix[4] ?? '0');
      };
      const control = root.querySelector('[role="checkbox"], [role="switch"]');
      const label = root.querySelector('label');
      label?.click();

      return new Promise<MotionSample>((resolve) => {
        const samples: number[] = [];
        const tick = () => {
          samples.push(read());
          if (samples.length < options.frames) {
            requestAnimationFrame(tick);
            return;
          }
          resolve({
            checked: control?.getAttribute('aria-checked') ?? null,
            samples,
          });
        };
        requestAnimationFrame(tick);
      });
    },
    { frames: SAMPLE_FRAMES, mode, selector }
  );

const webDir = join(import.meta.dirname, '..');
const outputDir = join(webDir, CAPTURE_DIR);
const port = Number(process.env.VISUAL_PORT ?? 3210);

/** The docs server to capture, either external or started for this run. */
type Server = {
  baseUrl: string;
  stop: () => void;
};

/** Poll an origin until it answers, so a cold dev server is not a failure. */
const waitForServer = async (
  url: string,
  timeoutMs = 300_000,
  deadline = Date.now() + timeoutMs
): Promise<void> => {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(Math.min(deadline - Date.now(), 120_000)),
    });
    if (response.ok) {
      return;
    }
  } catch {
    // The server has not finished booting; poll again.
  }

  if (Date.now() >= deadline) {
    throw new Error(`${url} did not answer within ${timeoutMs}ms`);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await waitForServer(url, timeoutMs, deadline);
};

/** Reuse a running docs app when given one, otherwise start it from source. */
const startServer = async (): Promise<Server> => {
  const externalBaseUrl = process.env.VISUAL_BASE_URL;

  if (externalBaseUrl) {
    await waitForServer(`${externalBaseUrl}/docs/zen`);
    return { baseUrl: externalBaseUrl, stop: () => undefined };
  }

  const child = spawn(
    join(webDir, 'node_modules/.bin/next'),
    ['dev', '--port', String(port)],
    {
      cwd: webDir,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
      stdio: 'inherit',
    }
  );
  const baseUrl = `http://localhost:${port}`;

  try {
    await waitForServer(`${baseUrl}/docs/zen`);
  } catch (error) {
    child.kill('SIGTERM');
    throw error;
  }

  return {
    baseUrl,
    stop: () => {
      child.kill('SIGTERM');
      child.unref();
    },
  };
};

/**
 * Screenshot every zen Example in both schemes. Pixel differences are never
 * compared: the run fails only when a page or its preview cannot be captured.
 */
const main = async () => {
  const manifest = await captureManifest(webDir);
  const requested = process.env.VISUAL_EXAMPLES?.split(',')
    .map((example) => example.trim())
    .filter(Boolean);
  const captures = requested?.length
    ? manifest.filter(({ example }) => requested.includes(example))
    : manifest;
  const expected = captures.length * CAPTURE_SCHEMES.length;

  await rm(outputDir, { force: true, recursive: true });

  const server = await startServer();
  const browser = await chromium.launch();
  const failures: string[] = [];

  /** Open an Example page with the browser's reduced-motion preference set. */
  const openReducedMotionPage = async (
    route: string,
    colorScheme: (typeof CAPTURE_SCHEMES)[number]
  ) => {
    const context = await browser.newContext({
      colorScheme,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(`${server.baseUrl}${route}`, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');
    return { context, page };
  };

  /** Capture every Example in one scheme, reusing one page for the whole run. */
  const captureScheme = async (scheme: (typeof CAPTURE_SCHEMES)[number]) => {
    await mkdir(join(outputDir, scheme), { recursive: true });

    const context = await browser.newContext({
      colorScheme: scheme,
      deviceScaleFactor: 1,
      viewport: { height: 1000, width: 1440 },
    });
    await context.addInitScript(
      (theme) => window.localStorage.setItem('theme', theme),
      scheme
    );

    const page = await context.newPage();
    page.setDefaultTimeout(60_000);

    for (const { example, route } of captures) {
      try {
        // biome-ignore lint/performance/noAwaitInLoops: one page navigates at a time, keeping captures ordered and memory-bounded
        await page.goto(`${server.baseUrl}${route}`, { waitUntil: 'load' });
        await page.waitForLoadState('networkidle');
        await page.waitForFunction(
          (dark) =>
            document.documentElement.classList.contains('dark') === dark,
          scheme === 'dark'
        );
        await page.evaluate(() => document.fonts.ready.then(() => undefined));

        const preview = page.locator(captureSelector(example));
        await preview.waitFor({ state: 'visible' });

        if (example === 'accordion' || example === 'collapsible') {
          await page.waitForLoadState('networkidle');
          const trigger = preview
            .locator(`[data-slot="${example}-trigger"]`)
            .first();
          const panel = preview
            .locator(
              '[data-slot="accordion-panel"], [data-slot="collapsible-panel"]'
            )
            .first();
          const triggerSelector = `[data-example="${example}"] [data-slot="${example === 'accordion' ? 'accordion-trigger' : 'collapsible-trigger'}"]`;
          const clickAndExpect = async (expanded: boolean) => {
            await trigger.click();
            try {
              await page.waitForFunction(
                ({ selector, value }) =>
                  document
                    .querySelector(selector)
                    ?.getAttribute('aria-expanded') === String(value),
                { selector: triggerSelector, value: expanded },
                { timeout: 5000 }
              );
            } catch (error) {
              const actual = await trigger.getAttribute('aria-expanded');
              throw new Error(
                `${example} expected expanded=${expanded}, got ${actual}`,
                { cause: error }
              );
            }
          };
          await clickAndExpect(true);
          await clickAndExpect(false);
          await page.waitForTimeout(300);
          const closedPanelCount = await panel.count();
          if (closedPanelCount > 0) {
            const collapsedHeight = await panel.evaluate(
              (element) => element.getBoundingClientRect().height
            );
            if (collapsedHeight > 1) {
              throw new Error(`${example} did not finish collapsing`);
            }
          }
          await clickAndExpect(true);
          await trigger.click();
          await trigger.click();
          const finalExpanded =
            (await trigger.getAttribute('aria-expanded')) === 'true';
          await page.waitForTimeout(300);
          const settledPanelCount = await panel.count();
          if (finalExpanded && settledPanelCount === 0) {
            throw new Error(
              `${example} did not settle open after interruption`
            );
          }
          if (settledPanelCount > 0) {
            const settledHeight = await panel.evaluate(
              (element) => element.getBoundingClientRect().height
            );
            if (finalExpanded ? settledHeight < 1 : settledHeight > 1) {
              throw new Error(
                `${example} did not settle to its current state after interruption`
              );
            }
          }

          const { context: reducedContext, page: reducedPage } =
            await openReducedMotionPage(route, scheme);
          const reducedPreview = reducedPage.locator(captureSelector(example));
          const reducedTrigger = reducedPreview
            .locator(`[data-slot="${example}-trigger"]`)
            .first();
          const reducedPanel = reducedPreview
            .locator(
              '[data-slot="accordion-panel"], [data-slot="collapsible-panel"]'
            )
            .first();
          await reducedTrigger.click();
          try {
            await reducedPage.waitForFunction(
              (selector) =>
                document
                  .querySelector(selector)
                  ?.getAttribute('aria-expanded') === 'true',
              triggerSelector,
              { timeout: 5000 }
            );
          } catch (error) {
            throw new Error(`${example} did not open with reduced motion`, {
              cause: error,
            });
          }
          const transitionProperty = await reducedPanel.evaluate(
            (element) => getComputedStyle(element).transitionProperty
          );
          if (transitionProperty !== 'none') {
            throw new Error(
              `${example} retains a transition with reduced motion`
            );
          }
          await reducedContext.close();
        }

        if (example === 'button') {
          const touchContext = await browser.newContext({
            hasTouch: true,
            isMobile: true,
            viewport: { height: 1000, width: 1440 },
          });
          const touchPage = await touchContext.newPage();
          await touchPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await touchPage.waitForLoadState('networkidle');
          const touchButton = touchPage
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          const touchBounds = await touchButton.boundingBox();
          if (!touchBounds) {
            throw new Error('Touch target has no visible bounds');
          }
          const touchSession = await touchContext.newCDPSession(touchPage);
          await touchButton.evaluate((element) => {
            element.addEventListener('pointerdown', (event) => {
              (element as HTMLElement).dataset.touchPointerType = (
                event as PointerEvent
              ).pointerType;
            });
          });
          await touchSession.send('Input.dispatchTouchEvent', {
            touchPoints: [
              {
                id: 0,
                x: touchBounds.x + touchBounds.width / 2,
                y: touchBounds.y + touchBounds.height / 2,
              },
            ],
            type: 'touchStart',
          });
          const touchScale = await waitForScale(
            touchButton,
            (scale) => scale < 0.975,
            'Touch press'
          );
          const touchPointer = await touchButton.evaluate(
            (element) => (element as HTMLElement).dataset.touchPointerType
          );
          await touchSession.send('Input.dispatchTouchEvent', {
            touchPoints: [],
            type: 'touchEnd',
          });
          await waitForScale(
            touchButton,
            (scale) => scale > 0.995,
            'Touch release'
          );
          await touchSession.detach();
          await touchContext.close();
          if (touchPointer !== 'touch' || touchScale > 0.975) {
            throw new Error(
              `Touch press feedback was pointer=${touchPointer}, scale=${touchScale}`
            );
          }

          const pointerPage = await page.context().newPage();
          await pointerPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await pointerPage.waitForLoadState('networkidle');
          const pointerButton = pointerPage
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          await pointerButton.hover();
          await pointerPage.mouse.down();
          const pointerScale = await waitForScale(
            pointerButton,
            (scale) => scale < 0.975,
            'Pointer press'
          );
          await pointerPage.mouse.up();
          await waitForScale(
            pointerButton,
            (scale) => scale > 0.995,
            'Pointer release'
          );

          await pointerPage.mouse.down();
          const midPressScale = await waitForScale(
            pointerButton,
            (scale) => scale < 0.997,
            'Pointer mid-press'
          );
          await pointerPage.mouse.up();
          const reversedScale = await pointerButton.evaluate(scaleOf);
          await waitForScale(
            pointerButton,
            (scale) => scale > 0.995,
            'Pointer reversal'
          );
          await pointerPage.close();
          if (
            pointerScale > 0.975 ||
            midPressScale <= pointerScale ||
            reversedScale >= 1
          ) {
            throw new Error(
              `Button press was pointer=${pointerScale}, mid=${midPressScale}, reversed=${reversedScale}`
            );
          }

          const keyboardPage = await page.context().newPage();
          await keyboardPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await keyboardPage.waitForLoadState('networkidle');
          const keyboardButton = keyboardPage
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          await keyboardPage.waitForTimeout(200);
          const pressWithKeyboard = async (key: string) => {
            await keyboardButton.evaluate((element) =>
              (element as HTMLElement).blur()
            );
            await keyboardButton.focus();
            await keyboardPage.keyboard.down(key);
            try {
              return await waitForScale(
                keyboardButton,
                (scale) => scale < 0.975,
                `Keyboard press (${key})`,
                1500
              );
            } finally {
              await keyboardPage.keyboard.up(key);
            }
          };
          const pressUntilScaled = async (key: string): Promise<number> => {
            try {
              return await pressWithKeyboard(key);
            } catch {
              // A cold dev server can hydrate after `load`, so retry the press
              // once the page has certainly attached its focus listeners.
              try {
                return await pressWithKeyboard(key);
              } catch (retryError) {
                const state = await keyboardButton.evaluate((element) => ({
                  active: document.activeElement === element,
                  focused: document.hasFocus(),
                  reduced: matchMedia('(prefers-reduced-motion: reduce)')
                    .matches,
                  transform: getComputedStyle(element).transform,
                }));
                throw new Error(
                  `Keyboard press (${key}) never scaled: ${JSON.stringify(state)}`,
                  { cause: retryError }
                );
              }
            }
          };
          const keyboardScales: number[] = [];
          for (const key of ['Enter', ' ']) {
            // biome-ignore lint/performance/noAwaitInLoops: presses run one at a time so each sampled scale is attributable
            keyboardScales.push(await pressUntilScaled(key));
            await waitForScale(
              keyboardButton,
              (scale) => scale > 0.995,
              `Keyboard release (${key})`
            );
          }
          const [keyboardScale, spaceScale] = keyboardScales;
          if (keyboardScale === undefined || spaceScale === undefined) {
            throw new Error('Keyboard press did not report a scale');
          }
          if (spaceScale > 0.975) {
            throw new Error(`Space press scale was ${spaceScale}`);
          }
          await keyboardPage.close();

          for (const name of ['Disabled', 'Loading', 'Popup trigger']) {
            const stationary = preview.getByRole('button', { name });
            // biome-ignore lint/performance/noAwaitInLoops: presses run one at a time so each sampled scale is attributable
            const stationaryBox = await stationary.boundingBox();
            if (!stationaryBox) {
              throw new Error(`${name} button has no visible bounds`);
            }
            await page.mouse.move(
              stationaryBox.x + stationaryBox.width / 2,
              stationaryBox.y + stationaryBox.height / 2
            );
            await page.mouse.down();
            await page.waitForTimeout(120);
            const scale = await stationary.evaluate(scaleOf);
            await page.mouse.up();
            if (scale !== 1) {
              throw new Error(`${name} button moved during press feedback`);
            }
          }

          const { page: reducedMotion } = await openReducedMotionPage(
            route,
            scheme
          );
          const honorsReducedMotion = await reducedMotion.evaluate(
            () => matchMedia('(prefers-reduced-motion: reduce)').matches
          );
          if (!honorsReducedMotion) {
            throw new Error('Browser did not enable reduced motion');
          }
          const reducedButton = reducedMotion
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          await reducedButton.hover();
          await reducedMotion.mouse.down();
          await reducedMotion.waitForTimeout(80);
          const reducedTransform = await reducedButton.evaluate(scaleOf);
          const reducedInline = await reducedButton.evaluate(
            (element) => (element as HTMLElement).style.transform
          );
          await reducedMotion.mouse.up();
          await reducedMotion.context().close();
          if (
            reducedTransform !== 1 ||
            (reducedInline !== '' && reducedInline !== 'none')
          ) {
            throw new Error(
              `Button moved with reduced motion: transform=${reducedTransform}, inline=${reducedInline}`
            );
          }

          if (keyboardScale > 0.975) {
            throw new Error(`Keyboard press scale was ${keyboardScale}`);
          }
        }

        if (isOverlayExample(example)) {
          const {
            focusPopup,
            mobileViewport,
            openAction,
            popupSlot,
            positionerSlot,
            restoreFocus,
            triggerSlot,
            transitionProperty,
          } = OVERLAY_EXAMPLES[example] as OverlayExampleConfig;
          const popupSelector = `[data-slot="${popupSlot}"]`;
          const engine = MOTION_OVERLAYS.has(example) ? 'motion' : 'css';
          const cheapOverlay = isCheapOverlay(example);
          const trigger = preview
            .locator(`[data-slot="${triggerSlot}"]`)
            .first();
          await trigger.scrollIntoViewIfNeeded();
          const triggerBefore = await trigger.boundingBox();

          if (example === 'select') {
            const mountedBeforeInteraction = await page
              .locator(`[data-slot="${popupSlot}"]`)
              .count();
            if (mountedBeforeInteraction !== 0) {
              throw new Error(
                `${example} mounted its popup before the first interaction`
              );
            }
          }

          await page.waitForTimeout(500);
          const popup = page.locator(popupSelector).first();
          const entranceSamples: number[] = cheapOverlay
            ? await sampleOpacityWhile(popup, () =>
                openOverlayWhenReady(page, trigger, popup, openAction)
              )
            : [];
          if (!cheapOverlay) {
            await openOverlayWhenReady(page, trigger, popup, openAction);
          }
          let commandSize: { height: number; width: number } | undefined;
          if (focusPopup) {
            try {
              await page.waitForFunction(
                (selector) => {
                  const element = document.querySelector(selector);
                  return element?.contains(document.activeElement) ?? false;
                },
                `[data-slot="${popupSlot}"]`,
                { timeout: 5000 }
              );
            } catch (error) {
              throw new Error(`${example} did not move focus into its popup`, {
                cause: error,
              });
            }
          }
          if (example === 'command' && engine === 'motion') {
            const entering = await popup.evaluate((element) => ({
              height: (element as HTMLElement).offsetHeight,
              pointerEvents: getComputedStyle(element).pointerEvents,
              width: (element as HTMLElement).offsetWidth,
            }));
            if (entering.pointerEvents === 'none') {
              throw new Error(
                'command popup blocked pointer events while entering'
              );
            }
            commandSize = entering;
          }
          if (engine === 'css') {
            const motion = await popup.evaluate((element) => {
              const style = getComputedStyle(element);
              return {
                duration: style.transitionDuration,
                properties: style.transitionProperty,
              };
            });
            if (
              !(
                motion.properties.includes(transitionProperty) &&
                motion.duration
                  .split(',')
                  .some((value) => Number.parseFloat(value) > 0)
              )
            ) {
              throw new Error(
                `${example} popup did not animate its open state`
              );
            }
          } else {
            await page.waitForFunction(
              (selector) => {
                const element = document.querySelector(selector);
                return (
                  element !== null &&
                  Number.parseFloat(getComputedStyle(element).opacity) > 0.99
                );
              },
              `[data-slot="${popupSlot}"]`,
              { timeout: 5000 }
            );

            if (cheapOverlay) {
              if (!positionerSlot) {
                throw new Error(`${example} has no positioner slot`);
              }

              if (
                !entranceSamples.some((value) => value > 0.05 && value < 0.95)
              ) {
                throw new Error(
                  `${example} popup jumped to its open state instead of animating`
                );
              }

              const positioner = page
                .locator(`[data-slot="${positionerSlot}"]`)
                .first();
              const positioning = await positioner.evaluate((element) => ({
                opacity: (element as HTMLElement).style.opacity,
                scale: (element as HTMLElement).style.scale,
                transition: getComputedStyle(element).transitionProperty,
              }));
              if (
                positioning.opacity !== '' ||
                positioning.scale !== '' ||
                positioning.transition.includes('opacity') ||
                positioning.transition.includes('scale')
              ) {
                throw new Error(
                  `${example} animated its positioned element instead of its popup`
                );
              }

              await waitForScale(
                popup,
                (scale) => scale > 0.999,
                `${example} open scale`
              );
            }
          }

          if (example === 'command' && commandSize) {
            const settled = await popup.evaluate((element) => ({
              height: (element as HTMLElement).offsetHeight,
              width: (element as HTMLElement).offsetWidth,
            }));
            if (
              settled.width !== commandSize.width ||
              settled.height !== commandSize.height
            ) {
              throw new Error(
                `command popup size changed while entering (${commandSize.width}x${commandSize.height} to ${settled.width}x${settled.height})`
              );
            }
            commandSize = settled;
          }

          if (example === 'alert-dialog' && engine === 'motion') {
            const actionOrder = await popup
              .getByRole('button')
              .evaluateAll((elements) =>
                elements.map((element) => element.textContent?.trim())
              );
            if (actionOrder.join('|') !== 'Cancel|Continue') {
              throw new Error(
                `alert dialog action order was ${actionOrder.join('|')}`
              );
            }
            const semantics = await popup.evaluate((element) => {
              const trigger = document.querySelector(
                '[data-slot="alert-dialog-trigger"]'
              );

              return {
                alertDialog: element.getAttribute('role') === 'alertdialog',
                hidden: Boolean(trigger?.closest('[aria-hidden="true"]')),
                inert: Boolean(trigger?.closest('[data-base-ui-inert]')),
              };
            });
            if (
              !(semantics.alertDialog && semantics.hidden && semantics.inert)
            ) {
              throw new Error(
                `alert dialog did not keep its focus trap (${JSON.stringify(semantics)})`
              );
            }
          }

          const triggerAfterOpen = await trigger.boundingBox();
          if (
            !(triggerBefore && triggerAfterOpen) ||
            triggerBefore.x !== triggerAfterOpen.x ||
            triggerBefore.y !== triggerAfterOpen.y
          ) {
            throw new Error(`${example} trigger moved while its popup opened`);
          }

          if (example === 'dropdown-menu') {
            const anchorWidth = await page.evaluate(() => {
              const positioner = document.querySelector(
                '[data-slot="menu-positioner"]'
              );
              return positioner
                ? Number.parseFloat(
                    getComputedStyle(positioner).getPropertyValue(
                      '--anchor-width'
                    )
                  )
                : Number.NaN;
            });
            if (
              !(triggerBefore && Number.isFinite(anchorWidth)) ||
              Math.abs(anchorWidth - triggerBefore.width) > 1
            ) {
              throw new Error(
                `${example} lost its anchor width (${anchorWidth} vs ${triggerBefore?.width})`
              );
            }
            await page.keyboard.press('ArrowDown');
            const highlightedItem = popup.locator('[data-highlighted]').first();
            await highlightedItem.waitFor({ state: 'visible' });
            const firstHighlight = await highlightedItem.textContent();
            await page.keyboard.press('ArrowDown');
            await page.waitForFunction(
              ({ popupElement, firstHighlight }) => {
                const item = popupElement.querySelector('[data-highlighted]');
                return item !== null && item.textContent !== firstHighlight;
              },
              {
                firstHighlight,
                popupElement: await popup.elementHandle(),
              }
            );
            await page.keyboard.type('next');
            await page.waitForFunction(
              (popupElement) => {
                const item = popupElement.querySelector('[data-highlighted]');
                return item?.textContent?.includes('Next') ?? false;
              },
              await popup.elementHandle(),
              { timeout: 5000 }
            );
          }

          if (example === 'context-menu') {
            const pointer = triggerBefore
              ? {
                  x: triggerBefore.x + CONTEXT_MENU_POINT.x,
                  y: triggerBefore.y + CONTEXT_MENU_POINT.y,
                }
              : null;
            const origin = await popup.evaluate((element) => {
              const rect = element.getBoundingClientRect();
              const [x = Number.NaN, y = Number.NaN] = getComputedStyle(element)
                .transformOrigin.split(' ')
                .map((value) => Number.parseFloat(value));
              return { x: rect.x + x, y: rect.y + y };
            });
            if (
              !pointer ||
              Math.abs(origin.x - pointer.x) > 2 ||
              Math.abs(origin.y - pointer.y) > 4
            ) {
              throw new Error(
                `${example} did not scale from the pointer (origin ${origin.x},${origin.y} vs pointer ${pointer?.x},${pointer?.y})`
              );
            }
          }

          if (cheapOverlay) {
            await page.mouse.move(0, 0);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(40);
            await openOverlay(trigger, openAction);
            try {
              await page.waitForFunction(
                (selector) =>
                  document.querySelector(selector)?.hasAttribute('data-open'),
                popupSelector,
                { timeout: 5000 }
              );
            } catch (error) {
              throw new Error(
                `${example} stuck closed after an interrupted open`,
                { cause: error }
              );
            }
            await waitForOpacity(
              page,
              popupSelector,
              1,
              `${example} interrupted reopen`
            );
            await waitForScale(
              popup,
              (scale) => scale > 0.999,
              `${example} interrupted open scale`
            );

            const exitSamples = await sampleOpacityWhile(popup, async () => {
              await page.mouse.move(0, 0);
              await page.waitForFunction(
                (selector) =>
                  !document.querySelector(selector)?.hasAttribute('data-open'),
                popupSelector,
                { timeout: 5000 }
              );
            });
            await waitForOpacity(
              page,
              popupSelector,
              0,
              `${example} popup closed`
            );
            if (!exitSamples.some((value) => value > 0.05 && value < 0.95)) {
              throw new Error(
                `${example} popup disappeared without an exit fade`
              );
            }
            if (!(await popup.evaluate((element) => element.isConnected))) {
              throw new Error(
                `${example} unmounted its popup instead of keeping it mounted`
              );
            }

            await openOverlay(trigger, openAction);
            await popup.waitFor({ state: 'visible' });
            await waitForOpacity(
              page,
              popupSelector,
              1,
              `${example} final open`
            );
          }

          if (example === 'dialog') {
            await popup.getByRole('button', { name: 'Edit details' }).click();
            await page.waitForFunction(
              (selector) => document.querySelectorAll(selector).length === 2,
              popupSelector,
              { timeout: 5000 }
            );
            const nestedPopup = page.locator(popupSelector).nth(1);
            await nestedPopup.waitFor({ state: 'visible' });
            await page.waitForFunction(
              (selector) => {
                const [parent] = document.querySelectorAll(selector);
                return (
                  parent instanceof HTMLElement &&
                  Number.parseFloat(getComputedStyle(parent).scale) < 0.95 &&
                  parent.contains(document.activeElement) === false &&
                  document
                    .querySelectorAll(selector)[1]
                    ?.contains(document.activeElement) === true
                );
              },
              popupSelector,
              { timeout: 5000 }
            );
            await nestedPopup.locator('input').first().fill('Ada Lovelace');
            if (
              (await nestedPopup.locator('input').first().inputValue()) !==
              'Ada Lovelace'
            ) {
              throw new Error(`${example} nested popup was not interactive`);
            }
            await page.keyboard.press('Escape');
            await page.waitForFunction(
              (selector) => document.querySelectorAll(selector).length === 1,
              popupSelector,
              { timeout: 5000 }
            );
            await page.waitForFunction(
              (selector) => {
                const [parent] = document.querySelectorAll(selector);
                return (
                  parent instanceof HTMLElement &&
                  Number.parseFloat(getComputedStyle(parent).scale) > 0.99 &&
                  Number.parseFloat(getComputedStyle(parent).opacity) > 0.95
                );
              },
              popupSelector,
              { timeout: 5000 }
            );
          }

          if (example === 'select') {
            await popup.evaluate((element) => {
              (element as HTMLElement).dataset.mountProbe = 'first';
            });
          }

          await watchPopupExit(page, `[data-slot="${popupSlot}"]`);
          await page.keyboard.press('Escape');
          if (example === 'command' && engine === 'motion') {
            const exiting = await popup.evaluate((element) => ({
              height: (element as HTMLElement).offsetHeight,
              items: element.querySelectorAll('[data-slot="command-item"]')
                .length,
              width: (element as HTMLElement).offsetWidth,
            }));
            if (exiting.items === 0) {
              throw new Error('command list emptied while exiting');
            }
            if (
              commandSize &&
              (exiting.width !== commandSize.width ||
                exiting.height !== commandSize.height)
            ) {
              throw new Error(
                `command popup changed size while exiting (${exiting.width}x${exiting.height} from ${commandSize.width}x${commandSize.height})`
              );
            }
          }
          if (engine === 'motion') {
            if (cheapOverlay) {
              await popup.waitFor({ state: 'hidden' });
              await waitForOpacity(
                page,
                popupSelector,
                0,
                `${example} dismissed popup`
              );
              if (!(await popup.evaluate((element) => element.isConnected))) {
                throw new Error(
                  `${example} unmounted its popup instead of keeping it mounted`
                );
              }
            } else {
              if (example === 'select') {
                await popup.waitFor({ state: 'hidden' });
                if (
                  (await page.locator(`[data-slot="${popupSlot}"]`).count()) ===
                  0
                ) {
                  throw new Error(
                    `${example} unmounted after its first interaction`
                  );
                }
              } else {
                await popup.waitFor({ state: 'detached' });
              }
              const exit = await readPopupExit(page);
              if (!(exit.ending && exit.faded)) {
                throw new Error(
                  `${example} removed its popup before the exit animation`
                );
              }
            }
          } else {
            await popup.waitFor({ state: 'hidden' });
          }
          await trigger.waitFor({ state: 'visible' });
          if (
            restoreFocus &&
            !(await trigger.evaluate(
              (element) => element === document.activeElement
            ))
          ) {
            throw new Error(`${example} did not restore focus to its trigger`);
          }
          const triggerAfterClose = await trigger.boundingBox();
          if (
            !(triggerBefore && triggerAfterClose) ||
            triggerBefore.x !== triggerAfterClose.x ||
            triggerBefore.y !== triggerAfterClose.y
          ) {
            throw new Error(`${example} trigger moved while its popup closed`);
          }

          if (example === 'select') {
            await trigger.click();
            await popup.waitFor({ state: 'visible' });
            await page.waitForFunction(
              (selector) => {
                const element = document.querySelector<HTMLElement>(selector);
                return (
                  element !== null &&
                  element.dataset.mountProbe === 'first' &&
                  Number.parseFloat(getComputedStyle(element).opacity) > 0.99
                );
              },
              `[data-slot="${popupSlot}"]`,
              { timeout: 5000 }
            );
            await page.keyboard.press('Escape');
            await popup.waitFor({ state: 'hidden' });
          }

          if (cheapOverlay) {
            await waitForOpacity(
              page,
              popupSelector,
              0,
              `${example} dismissed popup`
            );
            if (!(await popup.evaluate((element) => element.isConnected))) {
              throw new Error(
                `${example} unmounted its popup instead of keeping it mounted`
              );
            }
          }

          const { page: reducedPage } = await openReducedMotionPage(
            route,
            scheme
          );
          const reducedPreview = reducedPage.locator(captureSelector(example));
          const reducedTrigger = reducedPreview
            .locator(`[data-slot="${triggerSlot}"]`)
            .first();
          if (mobileViewport) {
            await reducedPage.setViewportSize({ height: 844, width: 390 });
          }
          await reducedTrigger.scrollIntoViewIfNeeded();
          await reducedPage.waitForTimeout(500);
          await reducedPage.evaluate((selector) => {
            document.documentElement.dataset.reducedMotionTransitions = '[]';
            document.addEventListener('transitionrun', (event) => {
              if (
                !(
                  event.target instanceof Element &&
                  event.target.matches(selector)
                )
              ) {
                return;
              }
              const properties = JSON.parse(
                document.documentElement.dataset.reducedMotionTransitions ??
                  '[]'
              ) as string[];
              properties.push((event as TransitionEvent).propertyName);
              document.documentElement.dataset.reducedMotionTransitions =
                JSON.stringify(properties);
            });
          }, `[data-slot="${popupSlot}"]`);
          const reducedPopup = reducedPage
            .locator(`[data-slot="${popupSlot}"]`)
            .first();
          await openOverlayWhenReady(
            reducedPage,
            reducedTrigger,
            reducedPopup,
            openAction
          );
          if (engine === 'motion' && focusPopup) {
            await reducedPage.waitForFunction(
              (selector) =>
                document
                  .querySelector(selector)
                  ?.contains(document.activeElement) ?? false,
              `[data-slot="${popupSlot}"]`,
              { timeout: 5000 }
            );
          }
          const reducedTransition = await reducedPopup.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              properties: style.transitionProperty,
              scale: style.scale,
              transform: style.transform,
              translate: style.translate,
            };
          });
          const activeTransitionProperties = await reducedPage
            .locator('html')
            .getAttribute('data-reduced-motion-transitions');
          const transitionedProperties = JSON.parse(
            activeTransitionProperties ?? '[]'
          ) as string[];
          if (
            reducedTransition.scale !== 'none' &&
            reducedTransition.scale !== '1'
          ) {
            throw new Error(`${example} retained scaling with reduced motion`);
          }
          if (
            engine === 'motion' &&
            !isIdentityTransform(reducedTransition.transform)
          ) {
            throw new Error(
              `${example} retained transform travel with reduced motion (${reducedTransition.transform}, scale ${reducedTransition.scale}, translate ${reducedTransition.translate})`
            );
          }
          const translateDistance =
            reducedTransition.translate === 'none'
              ? 0
              : Math.max(
                  ...reducedTransition.translate
                    .split(' ')
                    .map((value) => Math.abs(Number.parseFloat(value)))
                );
          if (translateDistance > 0.5) {
            throw new Error(
              `${example} retained popup travel with reduced motion (${reducedTransition.translate})`
            );
          }
          if (
            reducedTransition.properties
              .split(',')
              .some((property) =>
                ['scale', 'translate', 'transform'].includes(property.trim())
              ) ||
            transitionedProperties.some((property) =>
              ['scale', 'translate', 'transform'].includes(property)
            )
          ) {
            throw new Error(
              `${example} retained a travel transition with reduced motion`
            );
          }

          if (cheapOverlay) {
            await waitForOpacity(
              reducedPage,
              popupSelector,
              1,
              `${example} reduced-motion popup`
            );
            if ((await reducedPopup.evaluate(scaleOf)) !== 1) {
              throw new Error(`${example} scaled with reduced motion enabled`);
            }
            await reducedPage.keyboard.press('Escape');
            await reducedPage.waitForFunction(
              (selector) =>
                !document.querySelector(selector)?.hasAttribute('data-open'),
              popupSelector,
              { timeout: 5000 }
            );
            if (
              !(await reducedPopup.evaluate((element) => element.isConnected))
            ) {
              throw new Error(
                `${example} unmounted its popup with reduced motion`
              );
            }
          }
          await reducedPage.close();

          if (example === 'dialog') {
            await trigger.click();
            const interrupted = page.locator(popupSelector).first();
            await interrupted.waitFor({ state: 'visible' });
            await interrupted.evaluate((element) => {
              (element as HTMLElement).dataset.interrupted = 'true';
            });
            await page.keyboard.press('Escape');
            await page.waitForFunction(
              (selector) => {
                const elements = [...document.querySelectorAll(selector)];
                return (
                  elements.length === 1 &&
                  elements[0] instanceof HTMLElement &&
                  elements[0].dataset.interrupted === 'true' &&
                  !elements[0].hasAttribute('data-open')
                );
              },
              popupSelector,
              { timeout: 5000 }
            );
            // The exiting backdrop covers the trigger, so reopen through the element.
            await trigger.evaluate((element) => {
              (element as HTMLElement).click();
            });
            await page.waitForFunction(
              (selector) => {
                const elements = [...document.querySelectorAll(selector)];
                return (
                  elements.length === 1 &&
                  elements[0] instanceof HTMLElement &&
                  elements[0].dataset.interrupted === 'true' &&
                  elements[0].hasAttribute('data-open') &&
                  Number.parseFloat(getComputedStyle(elements[0]).opacity) >
                    0.95
                );
              },
              popupSelector,
              { timeout: 5000 }
            );
            const reopened = await page.evaluate(
              (selector) =>
                document
                  .querySelector(selector)
                  ?.contains(document.activeElement) ?? false,
              popupSelector
            );
            if (!reopened) {
              throw new Error(`${example} lost focus when reopened mid-flight`);
            }
            await page.keyboard.press('Escape');
            await page.waitForFunction(
              (selector) => document.querySelector(selector) === null,
              popupSelector,
              { timeout: 5000 }
            );
          }

          if (example === 'sheet' && engine === 'motion') {
            const popupSelector = `[data-slot="${popupSlot}"]`;
            const mobile = await page.context().newPage();
            await mobile.setViewportSize({ height: 844, width: 390 });
            await mobile.goto(`${server.baseUrl}${route}`, {
              waitUntil: 'load',
            });
            await mobile.waitForLoadState('networkidle');
            await mobile.waitForTimeout(500);
            const travelFrom = async (triggerIndex: number) => {
              const travel = await mobile.evaluate(
                async ({ index, selector }) => {
                  const triggers = document.querySelectorAll<HTMLElement>(
                    '[data-slot="sheet-trigger"]'
                  );
                  triggers[index]?.click();

                  return await new Promise<{ x: number; y: number } | null>(
                    (resolve) => {
                      const deadline = performance.now() + 3000;
                      const sample = () => {
                        const element = document.querySelector(selector);
                        const matrix = element
                          ? getComputedStyle(element)
                              .transform.match(/^matrix\(([^)]+)\)$/)?.[1]
                              ?.split(',')
                          : undefined;
                        const x = Number(matrix?.[4] ?? 0);
                        const y = Number(matrix?.[5] ?? 0);

                        if (Math.abs(x) > 0.5 || Math.abs(y) > 0.5) {
                          resolve({ x, y });
                          return;
                        }

                        if (performance.now() > deadline) {
                          resolve(null);
                          return;
                        }

                        requestAnimationFrame(sample);
                      };

                      requestAnimationFrame(sample);
                    }
                  );
                },
                { index: triggerIndex, selector: popupSelector }
              );
              await mobile.keyboard.press('Escape');
              await mobile.waitForFunction(
                (selector) => document.querySelector(selector) === null,
                popupSelector,
                { timeout: 5000 }
              );
              return travel;
            };
            const edges = [
              { axis: 'x' as const, direction: 1, name: 'right' },
              { axis: 'x' as const, direction: -1, name: 'left' },
              { axis: 'y' as const, direction: -1, name: 'top' },
              { axis: 'y' as const, direction: 1, name: 'bottom' },
            ];

            for (const [index, edge] of edges.entries()) {
              // biome-ignore lint/performance/noAwaitInLoops: one Sheet edge is measured per iteration so each travel reading is attributable
              const travel = await travelFrom(index);
              const distance = (travel?.[edge.axis] ?? 0) * edge.direction;

              if (distance <= 0) {
                throw new Error(
                  `sheet did not travel from its ${edge.name} edge on a small screen (${JSON.stringify(travel)})`
                );
              }
            }

            await mobile.close();
          }

          if (example === 'command' && engine === 'motion') {
            const popupSelector = `[data-slot="${popupSlot}"]`;
            const sampleEnter = () =>
              page.evaluate(async (triggerSelector) => {
                document.querySelector<HTMLElement>(triggerSelector)?.click();

                return await new Promise<{
                  count: number;
                  opacity: number;
                  pointerEvents: string;
                  text: string;
                } | null>((resolve) => {
                  const deadline = performance.now() + 3000;
                  let attempts = 0;

                  const sample = () => {
                    const popup = document.querySelector(
                      '[data-slot="command-dialog-popup"]'
                    );
                    const input = popup?.querySelector('input');
                    attempts += 1;

                    if (popup && input && attempts > 1) {
                      const { opacity, pointerEvents } =
                        getComputedStyle(popup);
                      const currentOpacity = Number.parseFloat(opacity);
                      const setter = Object.getOwnPropertyDescriptor(
                        HTMLInputElement.prototype,
                        'value'
                      )?.set;

                      setter?.call(input, 'lin');
                      input.dispatchEvent(
                        new Event('input', { bubbles: true })
                      );

                      const collect = () => {
                        const items = popup.querySelectorAll(
                          '[data-slot="command-item"]'
                        );
                        const text = items[0]?.textContent ?? '';

                        if (
                          (items.length === 1 && text.includes('Linear')) ||
                          performance.now() > deadline
                        ) {
                          resolve({
                            count: items.length,
                            opacity: currentOpacity,
                            pointerEvents,
                            text,
                          });
                          return;
                        }

                        requestAnimationFrame(collect);
                      };

                      requestAnimationFrame(collect);
                      return;
                    }

                    if (attempts > 120) {
                      resolve(null);
                      return;
                    }

                    requestAnimationFrame(sample);
                  };

                  requestAnimationFrame(sample);
                });
              }, `[data-slot="${triggerSlot}"]`);
            let opened: {
              count: number;
              opacity: number;
              pointerEvents: string;
              text: string;
            } | null = null;

            for (let attempt = 0; attempt < 3 && !opened; attempt += 1) {
              // biome-ignore lint/performance/noAwaitInLoops: each attempt opens the palette once so the sampled frame is attributable
              const sampled = await sampleEnter();

              if (!sampled) {
                throw new Error('command popup never mounted for its enter');
              }

              if (sampled.opacity < 1) {
                opened = sampled;
                break;
              }

              await page.keyboard.press('Escape');
              await page.waitForFunction(
                (selector) => document.querySelector(selector) === null,
                popupSelector,
                { timeout: 5000 }
              );
            }

            if (!opened) {
              throw new Error('command never entered while its list was used');
            }
            if (opened.pointerEvents === 'none') {
              throw new Error(
                'command popup blocked pointer events while entering'
              );
            }
            if (opened.count !== 1 || !opened.text.includes('Linear')) {
              throw new Error(
                `command list did not filter while entering (${opened.count} items)`
              );
            }

            await page.keyboard.press('Escape');
            await page.waitForFunction(
              (selector) => document.querySelector(selector) === null,
              popupSelector,
              { timeout: 5000 }
            );
          }
        }

        const selectionState = (element: Element) =>
          [
            element.getAttribute('aria-checked'),
            element.getAttribute('data-checked'),
            element.getAttribute('aria-pressed'),
            element.getAttribute('data-pressed'),
            element.getAttribute('data-state'),
            String((element as HTMLInputElement).checked),
          ].join('|');
        const hasNoTravel = (element: Element) =>
          getComputedStyle(element).transitionProperty === 'none';

        if (example === 'checkbox') {
          const control = preview.getByRole('checkbox');
          const before = await control.evaluate(selectionState);
          await preview.getByText('Enable notifications').click();
          await page.waitForTimeout(100);
          const after = await control.evaluate(selectionState);
          if (before === after) {
            throw new Error(
              `${example} did not communicate its toggled state: ${before} -> ${after}`
            );
          }

          const settle = await toggleAndSample(
            preview,
            '[data-slot="checkbox-indicator"]',
            'scale'
          );
          const settled = settle.samples.at(-1) ?? 1;
          if (!settle.samples.some((scale) => scale < 0.999)) {
            throw new Error(
              `Checkbox mark snapped instead of settling: ${JSON.stringify(settle.samples)}`
            );
          }
          if (settle.checked !== 'true') {
            throw new Error('Checkbox mark did not follow its state');
          }
          if (Math.abs(settled - 1) > 0.001) {
            throw new Error(`Checkbox mark did not settle: ${settled}`);
          }

          const { page: reduced } = await openReducedMotionPage(route, scheme);
          const reducedPreview = reduced.locator(captureSelector(example));
          const reducedControl = reducedPreview.getByRole('checkbox');
          const reducedBefore = await reducedControl.evaluate(selectionState);
          await reducedPreview.getByText('Enable notifications').click();
          await reduced.waitForTimeout(100);
          if (
            (await reducedControl.evaluate(selectionState)) === reducedBefore
          ) {
            throw new Error(`${example} lost its state with reduced motion`);
          }
          const reducedSettle = await toggleAndSample(
            reducedPreview,
            '[data-slot="checkbox-indicator"]',
            'scale'
          );
          await reduced.close();
          if (reducedSettle.checked !== 'true') {
            throw new Error('Checkbox lost its state with reduced motion');
          }
          if (
            reducedSettle.samples.some((scale) => Math.abs(scale - 1) > 0.001)
          ) {
            throw new Error(
              `Checkbox scaled with reduced motion: ${JSON.stringify(reducedSettle.samples)}`
            );
          }
        }

        if (example === 'switch') {
          const control = preview.getByRole('switch');
          const thumb = preview.locator('[data-slot="switch-thumb"]');
          const thumbBox = await thumb.boundingBox();
          if (!thumbBox) {
            throw new Error('Switch thumb is not visible');
          }
          const travel = thumbBox.width - 4;

          const before = await control.evaluate(selectionState);
          await preview.getByText('Enable notifications').click();
          await page.waitForTimeout(400);
          const after = await control.evaluate(selectionState);
          if (before === after) {
            throw new Error(
              `${example} did not communicate its toggled state: ${before} -> ${after}`
            );
          }

          const toggle = await toggleAndSample(
            preview,
            '[data-slot="switch-thumb"]',
            'translateX'
          );
          const travelled = toggle.samples.at(-1) ?? 0;
          if (toggle.checked !== 'true') {
            throw new Error('Switch thumb did not follow its state');
          }
          if (!toggle.samples.some((x) => x > 1 && x < travel - 1)) {
            throw new Error(
              `Switch jumped without travelling: ${JSON.stringify(toggle.samples)}`
            );
          }
          if (Math.abs(travelled - travel) > 1) {
            throw new Error(
              `Switch thumb settled at ${travelled}, expected ${travel}`
            );
          }

          const controlBox = await control.boundingBox();
          if (!controlBox) {
            throw new Error('Switch has no visible bounds');
          }
          await page.mouse.move(
            controlBox.x + controlBox.width / 2,
            controlBox.y + controlBox.height / 2
          );
          await page.mouse.down();
          const pointerSquash = await waitForScale(
            thumb,
            (scale) => scale > 1.05,
            'Switch pointer squash'
          );
          await page.mouse.up();
          await waitForScale(
            thumb,
            (scale) => scale < 1.005,
            'Switch pointer release'
          );
          if (pointerSquash <= 1.05) {
            throw new Error(`Switch pointer squash was ${pointerSquash}`);
          }

          const keyboardPage = await page.context().newPage();
          await keyboardPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await keyboardPage.waitForLoadState('networkidle');
          const keyboardControl = keyboardPage
            .locator(captureSelector(example))
            .getByRole('switch');
          const keyboardThumb = keyboardPage
            .locator(captureSelector(example))
            .locator('[data-slot="switch-thumb"]');
          const focusControl = async () => {
            await keyboardControl.evaluate((element) =>
              (element as HTMLElement).blur()
            );
            await keyboardControl.focus();
            await keyboardPage.waitForTimeout(100);
          };
          const pressWithKeyboard = async (key: string) => {
            await focusControl();
            await keyboardPage.keyboard.down(key);
            try {
              return await waitForScale(
                keyboardThumb,
                (scale) => scale > 1.05,
                `Switch keyboard squash (${key})`,
                1500
              );
            } finally {
              await keyboardPage.keyboard.up(key);
            }
          };
          const pressUntilSquashed = async (key: string): Promise<number> => {
            try {
              return await pressWithKeyboard(key);
            } catch {
              // A cold dev server can hydrate after `load`, so retry once the
              // page has certainly attached its focus listeners.
              try {
                return await pressWithKeyboard(key);
              } catch (retryError) {
                const state = await keyboardControl.evaluate((element) => ({
                  active: document.activeElement === element,
                  focused: document.hasFocus(),
                  reduced: matchMedia('(prefers-reduced-motion: reduce)')
                    .matches,
                  transform: getComputedStyle(
                    element.querySelector('[data-slot="switch-thumb"]') ??
                      element
                  ).transform,
                }));
                throw new Error(
                  `Switch keyboard squash (${key}) never ran: ${JSON.stringify(state)}`,
                  { cause: retryError }
                );
              }
            }
          };
          const keyboardSquashes: number[] = [];
          for (const key of ['Enter', ' ']) {
            // biome-ignore lint/performance/noAwaitInLoops: presses run one at a time so each sampled scale is attributable
            keyboardSquashes.push(await pressUntilSquashed(key));
            await waitForScale(
              keyboardThumb,
              (scale) => scale < 1.005,
              `Switch keyboard release (${key})`
            );
          }
          await keyboardPage.close();
          if (keyboardSquashes.some((squash) => squash <= 1.05)) {
            throw new Error(
              `Switch keyboard squash was ${keyboardSquashes.join(', ')}`
            );
          }

          const reduced = await page.context().newPage();
          await reduced.emulateMedia({ reducedMotion: 'reduce' });
          await reduced.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await reduced.waitForLoadState('networkidle');
          const reducedPreview = reduced.locator(captureSelector(example));
          const reducedThumb = reducedPreview.locator(
            '[data-slot="switch-thumb"]'
          );
          const reducedBox = await reducedThumb.boundingBox();
          if (!reducedBox) {
            throw new Error('Reduced-motion Switch thumb is not visible');
          }
          const reducedTravel = reducedBox.width - 4;
          await reducedPreview.getByRole('switch').click();
          await reduced.waitForTimeout(100);
          const reducedToggle = await toggleAndSample(
            reducedPreview,
            '[data-slot="switch-thumb"]',
            'translateX'
          );
          await reduced.close();
          if (reducedToggle.checked !== 'true') {
            throw new Error('Switch lost its state with reduced motion');
          }
          if (
            reducedToggle.samples.some(
              (x) => Math.abs(x) > 1 && Math.abs(x - reducedTravel) > 1
            )
          ) {
            throw new Error(
              `Switch travelled with reduced motion: ${JSON.stringify(reducedToggle.samples)}`
            );
          }
          if (
            Math.abs((reducedToggle.samples.at(-1) ?? 0) - reducedTravel) > 1
          ) {
            throw new Error(
              `Switch did not reach ${reducedTravel} with reduced motion`
            );
          }

          const rtl = await page.context().newPage();
          await rtl.goto(`${server.baseUrl}${route}`, { waitUntil: 'load' });
          await rtl.waitForLoadState('networkidle');
          await rtl.evaluate(() => {
            document.documentElement.dir = 'rtl';
          });
          const rtlPreview = rtl.locator(captureSelector(example));
          const rtlThumb = rtlPreview.locator('[data-slot="switch-thumb"]');
          await rtlPreview.getByRole('switch').click();
          await rtl.waitForTimeout(100);
          const rtlToggle = await toggleAndSample(
            rtlPreview,
            '[data-slot="switch-thumb"]',
            'translateX'
          );
          const rtlBox = await rtlThumb.boundingBox();
          await rtl.close();
          if (!rtlBox) {
            throw new Error('Right-to-left Switch thumb is not visible');
          }
          const rtlEnd = rtlToggle.samples.at(-1) ?? 0;
          if (Math.abs(rtlEnd + (rtlBox.width - 4)) > 1) {
            throw new Error(
              `Switch right-to-left travel was ${rtlEnd}, expected ${-(rtlBox.width - 4)}`
            );
          }
        }

        if (example === 'radio-group') {
          const radios = preview.getByRole('radio');
          await radios.nth(1).click();
          await radios.nth(1).focus();
          await page.keyboard.press('ArrowUp');
          await page.waitForTimeout(100);
          if (
            !(await radios
              .first()
              .evaluate(
                (element) => element.getAttribute('aria-checked') === 'true'
              ))
          ) {
            throw new Error('Radio arrow navigation did not update selection');
          }
        }

        if (example === 'toggle' || example === 'toggle-group') {
          const toggle = preview.locator('[data-slot="toggle"]').first();
          const toggleBox = await toggle.boundingBox();
          if (!toggleBox) {
            throw new Error(`${example} toggle has no visible bounds`);
          }
          await page.mouse.move(
            toggleBox.x + toggleBox.width / 2,
            toggleBox.y + toggleBox.height / 2
          );
          await page.mouse.down();
          const togglePress = await waitForScale(
            toggle,
            (scale) => scale < 0.975,
            `${example} press`
          );
          await page.mouse.up();
          await waitForScale(
            toggle,
            (scale) => scale > 0.995,
            `${example} release`
          );
          if (togglePress > 0.98) {
            throw new Error(`${example} press scale was ${togglePress}`);
          }
          const before = await toggle.evaluate(selectionState);
          await toggle.click();
          await page.waitForTimeout(100);
          const after = await toggle.evaluate(selectionState);
          if (before === after) {
            throw new Error(
              `${example} did not communicate its selected state: ${before} -> ${after}`
            );
          }
          const reduced = await page.context().newPage();
          await reduced.emulateMedia({ reducedMotion: 'reduce' });
          await reduced.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await reduced.waitForLoadState('networkidle');
          const reducedToggle = reduced
            .locator(captureSelector(example))
            .locator('[data-slot="toggle"]')
            .first();
          if (!(await reducedToggle.evaluate(hasNoTravel))) {
            throw new Error(`${example} moved with reduced motion enabled`);
          }
          const reducedToggleBox = await reducedToggle.boundingBox();
          if (!reducedToggleBox) {
            throw new Error(
              `${example} reduced-motion toggle has no visible bounds`
            );
          }
          await reduced.mouse.move(
            reducedToggleBox.x + reducedToggleBox.width / 2,
            reducedToggleBox.y + reducedToggleBox.height / 2
          );
          await reduced.mouse.down();
          await reduced.waitForTimeout(80);
          const reducedTogglePress = await reducedToggle.evaluate(scaleOf);
          await reduced.mouse.up();
          if (reducedTogglePress !== 1) {
            throw new Error(
              `${example} pressed with reduced motion: ${reducedTogglePress}`
            );
          }
          const reducedBefore = await reducedToggle.evaluate(selectionState);
          await reducedToggle.click();
          await reduced.waitForTimeout(100);
          if (
            (await reducedToggle.evaluate(selectionState)) === reducedBefore
          ) {
            throw new Error(`${example} lost its state with reduced motion`);
          }
          await reduced.close();
        }

        if (example === 'slider') {
          const thumb = preview.locator('[data-slot="slider-thumb"]').first();
          const thumbBox = await thumb.boundingBox();
          if (!thumbBox) {
            throw new Error('Slider thumb is not visible');
          }
          const input = thumb.locator('input');
          const valueBefore = Number(await input.getAttribute('aria-valuenow'));
          await page.mouse.move(
            thumbBox.x + thumbBox.width / 2,
            thumbBox.y + thumbBox.height / 2
          );
          await page.mouse.down();
          await page.mouse.move(
            thumbBox.x + thumbBox.width / 2 + 12,
            thumbBox.y + thumbBox.height / 2
          );
          await page.waitForTimeout(50);
          const trackedBox = await thumb.boundingBox();
          const draggingScale = await waitForScale(
            thumb,
            (scale) => scale > 1.1,
            'Slider drag scale'
          );
          const draggingValue = Number(
            await input.getAttribute('aria-valuenow')
          );
          await page.mouse.up();
          await waitForScale(thumb, (scale) => scale < 1.02, 'Slider release');
          await page.waitForTimeout(400);
          const settledScale = await thumb.evaluate(scaleOf);
          const settledValue = Number(
            await input.getAttribute('aria-valuenow')
          );

          if (!trackedBox || trackedBox.x - thumbBox.x < 6) {
            throw new Error(
              `Slider thumb did not track the drag: ${
                trackedBox ? trackedBox.x - thumbBox.x : 'no bounds'
              }`
            );
          }
          if (draggingScale < 1.1) {
            throw new Error(`Slider drag feedback scale was ${draggingScale}`);
          }
          if (draggingValue <= valueBefore) {
            throw new Error(
              `Slider did not move during the drag: ${valueBefore} -> ${draggingValue}`
            );
          }
          if (settledValue !== draggingValue) {
            throw new Error(
              `Slider overshot on release: ${draggingValue} -> ${settledValue}`
            );
          }
          if (Math.abs(settledScale - 1) > 0.01) {
            throw new Error(`Slider did not settle its scale: ${settledScale}`);
          }

          const { page: reduced } = await openReducedMotionPage(route, scheme);
          const reducedThumb = reduced
            .locator(captureSelector(example))
            .locator('[data-slot="slider-thumb"]')
            .first();
          const reducedThumbBox = await reducedThumb.boundingBox();
          if (!reducedThumbBox) {
            throw new Error('Reduced-motion Slider thumb is not visible');
          }
          const reducedInput = reducedThumb.locator('input');
          const reducedValueBefore = Number(
            await reducedInput.getAttribute('aria-valuenow')
          );
          await reduced.mouse.move(
            reducedThumbBox.x + reducedThumbBox.width / 2,
            reducedThumbBox.y + reducedThumbBox.height / 2
          );
          await reduced.mouse.down();
          await reduced.mouse.move(
            reducedThumbBox.x + reducedThumbBox.width / 2 + 12,
            reducedThumbBox.y + reducedThumbBox.height / 2
          );
          await reduced.waitForTimeout(80);
          const reducedMotion = await reducedThumb.evaluate((element) => {
            const style = getComputedStyle(element);
            return { scale: style.scale, transform: style.transform };
          });
          const reducedValue = Number(
            await reducedInput.getAttribute('aria-valuenow')
          );
          await reduced.mouse.up();
          await reduced.close();

          if (reducedMotion.transform !== 'none') {
            throw new Error(
              `Slider retained scale with reduced motion: ${JSON.stringify(reducedMotion)}`
            );
          }
          if (reducedValue <= reducedValueBefore) {
            throw new Error('Slider stopped tracking with reduced motion');
          }
        }

        if (example === 'progress' || example === 'meter') {
          const root = preview.locator(`[data-slot="${example}"]`).first();
          const indicator = preview
            .locator(`[data-slot="${example}-indicator"]`)
            .first();
          const rootSelector = `${captureSelector(example)} [data-slot="${example}"]`;
          const indicatorSelector = `${captureSelector(example)} [data-slot="${example}-indicator"]`;
          const controlName =
            example === 'progress' ? 'Advance progress' : 'Increase usage';
          const initialValue = Number(await root.getAttribute('aria-valuenow'));
          const initialWidth = await indicator.evaluate(
            (element) => element.getBoundingClientRect().width
          );
          const transitionProperty = await indicator.evaluate(
            (element) => getComputedStyle(element).transitionProperty
          );
          if (transitionProperty !== 'width') {
            throw new Error(
              `${example} transitions ${transitionProperty} instead of width only`
            );
          }
          await preview.getByRole('button', { name: controlName }).click();
          await waitForValueIncrease(page, rootSelector, initialValue);
          await waitForIndicatorWidthIncrease(
            page,
            indicatorSelector,
            initialWidth
          );
          const updatedValue = Number(await root.getAttribute('aria-valuenow'));
          const updatedWidth = await indicator.evaluate(
            (element) => element.getBoundingClientRect().width
          );
          if (updatedValue <= initialValue || updatedWidth <= initialWidth) {
            throw new Error(
              `${example} value changed from ${initialValue} to ${updatedValue}, but its indicator did not grow (${initialWidth}px to ${updatedWidth}px)`
            );
          }

          const { page: reduced } = await openReducedMotionPage(route, scheme);
          const reducedRoot = reduced
            .locator(captureSelector(example))
            .locator(`[data-slot="${example}"]`)
            .first();
          const reducedIndicator = reduced
            .locator(captureSelector(example))
            .locator(`[data-slot="${example}-indicator"]`)
            .first();
          const reducedInitialValue = Number(
            await reducedRoot.getAttribute('aria-valuenow')
          );
          const reducedInitialWidth = await reducedIndicator.evaluate(
            (element) => element.getBoundingClientRect().width
          );
          await reduced
            .locator(captureSelector(example))
            .getByRole('button', { name: controlName })
            .click();
          await waitForValueIncrease(
            reduced,
            rootSelector,
            reducedInitialValue
          );
          await waitForIndicatorWidthIncrease(
            reduced,
            indicatorSelector,
            reducedInitialWidth
          );
          const reducedUpdatedValue = Number(
            await reducedRoot.getAttribute('aria-valuenow')
          );
          const reducedUpdatedWidth = await reducedIndicator.evaluate(
            (element) => element.getBoundingClientRect().width
          );
          if (
            reducedUpdatedValue <= reducedInitialValue ||
            reducedUpdatedWidth <= reducedInitialWidth
          ) {
            throw new Error(
              `${example} lost its value update with reduced motion: ${reducedInitialValue} -> ${reducedUpdatedValue}`
            );
          }
          if (!(await reducedIndicator.evaluate(hasNoTravel))) {
            throw new Error(`${example} transitioned with reduced motion`);
          }
          await reduced.close();
        }

        if (example === 'sidebar') {
          const sidebar = preview.locator('[data-slot="sidebar"]').first();
          const trigger = preview.locator('[data-slot="sidebar-trigger"]');
          await trigger.click();
          if ((await sidebar.getAttribute('data-state')) !== 'collapsed') {
            throw new Error('Sidebar did not collapse after activation');
          }
          const { page: reduced } = await openReducedMotionPage(route, scheme);
          const reducedSidebar = reduced
            .locator(captureSelector(example))
            .locator('[data-slot="sidebar"]')
            .first();
          const reducedGap = reduced
            .locator(captureSelector(example))
            .locator('[data-slot="sidebar-gap"]');
          if (!(await reducedGap.evaluate(hasNoTravel))) {
            throw new Error('Sidebar moved with reduced motion enabled');
          }
          await reduced
            .locator(captureSelector(example))
            .locator('[data-slot="sidebar-trigger"]')
            .click();
          if (
            (await reducedSidebar.getAttribute('data-state')) !== 'collapsed'
          ) {
            throw new Error(
              'Sidebar lost its collapse state with reduced motion'
            );
          }
          await reduced.close();
        }

        if (example === 'toast') {
          await preview.getByRole('button', { name: 'Default Toast' }).click();
          const toast = page.locator('[data-slot="toast"]').first();
          await toast.waitFor({ state: 'visible' });
          const { page: reduced } = await openReducedMotionPage(route, scheme);
          await reduced
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Default Toast' })
            .click();
          const reducedToast = reduced.locator('[data-slot="toast"]').first();
          await reducedToast.waitFor({ state: 'visible' });
          const transitionProperties = await reducedToast.evaluate(
            (element) => getComputedStyle(element).transitionProperty
          );
          if (transitionProperties.includes('transform')) {
            throw new Error(
              'Toast retained travel transitions with reduced motion'
            );
          }
          await reduced.close();
        }

        await preview.screenshot({
          animations: 'disabled',
          path: join(outputDir, scheme, `${example}.png`),
        });
      } catch (error) {
        failures.push(
          `${scheme}/${example}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }

    await context.close();
  };

  try {
    await Promise.all(CAPTURE_SCHEMES.map((scheme) => captureScheme(scheme)));
  } finally {
    await browser.close();
    server.stop();
  }

  if (failures.length > 0) {
    console.error(`${failures.length} of ${expected} captures failed:`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`${expected} captures written to ${CAPTURE_DIR}/`);
};

await main();
