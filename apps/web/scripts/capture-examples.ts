import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import {
  CAPTURE_DIR,
  CAPTURE_SCHEMES,
  captureManifest,
  captureSelector,
} from './capture/manifest';

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

          const reducedContext = await browser.newContext({
            colorScheme: scheme,
            reducedMotion: 'reduce',
            viewport: { height: 1000, width: 1440 },
          });
          const reducedPage = await reducedContext.newPage();
          await reducedPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await reducedPage.waitForLoadState('networkidle');
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
          const button = preview.getByRole('button', { name: 'Button' });
          await button.hover();
          await page.mouse.down();
          await page.waitForFunction(
            (element) => getComputedStyle(element).scale === '0.97',
            await button.elementHandle()
          );
          await page.mouse.up();
          await button.focus();
          await page.keyboard.down(' ');
          await page.waitForFunction(
            (element) => getComputedStyle(element).scale === '0.97',
            await button.elementHandle()
          );
          const keyboardTransform = await button.evaluate(
            (element) => getComputedStyle(element).scale
          );
          await page.keyboard.up(' ');

          const touchContext = await browser.newContext({
            hasTouch: true,
            isMobile: true,
            viewport: { height: 1000, width: 1440 },
          });
          const touchPage = await touchContext.newPage();
          await touchPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          const touchButton = touchPage
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          await touchButton.evaluate((element) => {
            element.addEventListener(
              'pointerdown',
              (event) => {
                if (
                  event instanceof PointerEvent &&
                  event.pointerType === 'touch'
                ) {
                  document.documentElement.dataset.buttonTouchPointer =
                    event.pointerType;
                }
              },
              { once: true }
            );
          });
          await touchButton.tap();
          const touchScale = await touchPage
            .locator('html')
            .getAttribute('data-button-touch-pointer');
          await touchContext.close();
          if (touchScale !== 'touch') {
            throw new Error(`Touch input was reported as ${touchScale}`);
          }

          const stationaryScales = await Promise.all(
            ['Disabled', 'Loading', 'Popup trigger'].map(async (name) => ({
              name,
              scale: await preview
                .getByRole('button', { name })
                .evaluate((element) => getComputedStyle(element).scale),
            }))
          );
          for (const { name, scale } of stationaryScales) {
            if (scale !== 'none') {
              throw new Error(`${name} button moved during press feedback`);
            }
          }

          const reducedMotion = await page.context().newPage();
          await reducedMotion.emulateMedia({ reducedMotion: 'reduce' });
          const honorsReducedMotion = await reducedMotion.evaluate(
            () => matchMedia('(prefers-reduced-motion: reduce)').matches
          );
          if (!honorsReducedMotion) {
            throw new Error('Browser did not enable reduced motion');
          }
          await reducedMotion.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          const reducedButton = reducedMotion
            .locator(captureSelector(example))
            .getByRole('button', { name: 'Button' });
          await reducedButton.hover();
          await reducedMotion.mouse.down();
          await reducedMotion.waitForTimeout(50);
          const reducedTransform = await reducedButton.evaluate(
            (element) => getComputedStyle(element).scale
          );
          await reducedMotion.mouse.up();
          await reducedMotion.close();

          if (keyboardTransform !== '0.97' || reducedTransform !== '1') {
            throw new Error(
              `Button press scale was keyboard=${keyboardTransform}, reduced=${reducedTransform}`
            );
          }
        }

        if (['dialog', 'popover', 'dropdown-menu'].includes(example)) {
          const popupSlot =
            example === 'dialog'
              ? 'dialog-popup'
              : example === 'popover'
                ? 'popover-popup'
                : 'menu-popup';
          const triggerSlot =
            example === 'dialog'
              ? 'dialog-trigger'
              : example === 'popover'
                ? 'popover-trigger'
                : 'menu-trigger';
          const trigger = preview
            .locator(`[data-slot="${triggerSlot}"]`)
            .first();
          await trigger.scrollIntoViewIfNeeded();
          const triggerBefore = await trigger.boundingBox();

          await page.waitForTimeout(500);
          await trigger.click();
          const popup = page.locator(`[data-slot="${popupSlot}"]`).first();
          await popup.waitFor({ state: 'visible' });
          if (example !== 'popover') {
            const focusIsInPopup = await popup.evaluate((element) =>
              element.contains(document.activeElement)
            );
            if (!focusIsInPopup) {
              throw new Error(`${example} did not move focus into its popup`);
            }
          }
          const motion = await popup.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              duration: style.transitionDuration,
              properties: style.transitionProperty,
            };
          });
          if (
            !(
              motion.properties.includes('opacity') &&
              motion.duration
                .split(',')
                .some((value) => Number.parseFloat(value) > 0)
            )
          ) {
            throw new Error(`${example} popup did not animate its open state`);
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
          }

          await page.keyboard.press('Escape');
          await popup.waitFor({ state: 'hidden' });
          await trigger.waitFor({ state: 'visible' });
          if (
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

          const reducedPage = await page.context().newPage();
          await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
          await reducedPage.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          const reducedPreview = reducedPage.locator(captureSelector(example));
          const reducedTrigger = reducedPreview
            .locator(`[data-slot="${triggerSlot}"]`)
            .first();
          await reducedTrigger.scrollIntoViewIfNeeded();
          await reducedPage.waitForTimeout(500);
          await reducedTrigger.click();
          const reducedPopup = reducedPage
            .locator(`[data-slot="${popupSlot}"]`)
            .first();
          await reducedPopup.waitFor({ state: 'visible' });
          const reducedTransition = await reducedPopup.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              scale: style.scale,
              transform: style.transform,
              translate: style.translate,
            };
          });
          if (
            reducedTransition.scale !== 'none' &&
            reducedTransition.scale !== '1'
          ) {
            throw new Error(`${example} retained scaling with reduced motion`);
          }
          if (reducedTransition.translate !== 'none') {
            throw new Error(
              `${example} retained popup travel with reduced motion`
            );
          }
          await reducedPage.close();
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

        if (example === 'checkbox' || example === 'switch') {
          const control = preview.getByRole(
            example === 'checkbox' ? 'checkbox' : 'switch'
          );
          const before = await control.evaluate(selectionState);
          await preview.getByText('Enable notifications').click();
          await page.waitForTimeout(100);
          const after = await control.evaluate(selectionState);
          if (before === after) {
            throw new Error(
              `${example} did not communicate its toggled state: ${before} -> ${after}`
            );
          }
          const reduced = await page.context().newPage();
          await reduced.emulateMedia({ reducedMotion: 'reduce' });
          await reduced.goto(`${server.baseUrl}${route}`, {
            waitUntil: 'load',
          });
          await reduced.waitForLoadState('networkidle');
          const reducedControl = reduced
            .locator(captureSelector(example))
            .getByRole(example === 'checkbox' ? 'checkbox' : 'switch');
          const motionTarget =
            example === 'checkbox'
              ? reduced
                  .locator(captureSelector(example))
                  .locator('[data-slot="checkbox-indicator"]')
              : reducedControl;
          if (!(await motionTarget.evaluate(hasNoTravel))) {
            throw new Error(`${example} moved with reduced motion enabled`);
          }
          const reducedBefore = await reducedControl.evaluate(selectionState);
          await reduced
            .locator(captureSelector(example))
            .getByText('Enable notifications')
            .click();
          await reduced.waitForTimeout(100);
          if (
            (await reducedControl.evaluate(selectionState)) === reducedBefore
          ) {
            throw new Error(`${example} lost its state with reduced motion`);
          }
          await reduced.close();
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
