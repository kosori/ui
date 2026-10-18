import { expect, test } from 'bun:test';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  cp,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GET } from '../app/init/[style]/[baseColor]/route';

const webDir = join(import.meta.dirname, '..');
const fixtureDir = join(import.meta.dirname, 'fixtures/consumer');
const shadcn = join(webDir, 'node_modules/.bin/shadcn');
const tsc = join(webDir, 'node_modules/.bin/tsc');
const productionNamespace =
  'https://kosori.codingcodax.dev/r/{style}/{name}.json';

/**
 * The shape shadcn's CLI expects from `${REGISTRY_URL}/colors/<baseColor>.json`.
 * The Tokens under test come from our preset, so the values here stay empty.
 */
const baseColorDoc = {
  cssVars: { dark: {}, light: {} },
  cssVarsTemplate: '',
  inlineColors: { dark: {}, light: {} },
  inlineColorsTemplate: '',
};

/** Run a command to completion, capturing its output and exit code. */
const run = (
  command: string,
  args: string[],
  cwd: string,
  env?: Record<string, string | undefined>
) =>
  new Promise<{ exitCode: number; stdout: string; stderr: string }>(
    (resolve, reject) => {
      const child = spawn(command, args, env ? { cwd, env } : { cwd });
      let stdout = '';
      let stderr = '';
      child.stdout.on('data', (chunk: Buffer) => {
        stdout += chunk.toString();
      });
      child.stderr.on('data', (chunk: Buffer) => {
        stderr += chunk.toString();
      });
      child.on('error', reject);
      child.on('exit', (code) => {
        resolve({ exitCode: code ?? 1, stderr, stdout });
      });
    }
  );

/** Build the Registry into the docs app's static output, discarding stale output. */
const buildRegistry = async () => {
  await rm(join(webDir, 'public/r'), { force: true, recursive: true });

  return run(
    shadcn,
    ['build', 'registry/zen/registry.json', '-o', 'public/r/zen'],
    webDir
  );
};

/**
 * Serve the interop surface over local HTTP the way production will: the preset
 * route handler and the built Registry as static files. It also stands in for
 * shadcn's own host, which a stock CLI reaches for its style list and Base color
 * data whatever the Namespace says.
 */
const serveInterop = () =>
  Bun.serve({
    async fetch(request) {
      const { pathname } = new URL(request.url);

      if (pathname.startsWith('/init/')) {
        const [, , style, baseColor] = pathname.split('/');
        return GET(request, { params: Promise.resolve({ baseColor, style }) });
      }

      if (pathname === '/r/styles/index.json') {
        return Response.json([]);
      }

      if (pathname.startsWith('/r/colors/')) {
        return Response.json(baseColorDoc);
      }

      const asset = join(webDir, 'public', pathname);
      if (!existsSync(asset)) {
        return new Response('Not found', { status: 404 });
      }

      return new Response(await readFile(asset));
    },
    hostname: '127.0.0.1',
    port: 0,
  });

/** The declarations a CSS file holds inside a selector's block. */
const declarations = (css: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? '';
};

test('installing the preset and Button leaves a Consumer project that typechecks', async () => {
  const build = await buildRegistry();
  expect(build.exitCode, build.stdout + build.stderr).toBe(0);

  const server = serveInterop();
  const origin = `http://127.0.0.1:${server.port}`;
  const cliEnv = { ...process.env, REGISTRY_URL: `${origin}/r` };
  const scratch = await mkdtemp(join(tmpdir(), 'kosori-consumer-'));

  try {
    await cp(fixtureDir, scratch, { recursive: true });
    await symlink(join(webDir, 'node_modules'), join(scratch, 'node_modules'));

    const init = await run(
      shadcn,
      ['init', `${origin}/init/zen/neutral`, '-f', '-s', '--no-reinstall'],
      scratch,
      cliEnv
    );
    expect(init.exitCode, init.stdout + init.stderr).toBe(0);

    const config = JSON.parse(
      await readFile(join(scratch, 'components.json'), 'utf8')
    );
    expect(config.style).toBe('zen');
    expect(config.tailwind.baseColor).toBe('neutral');
    expect(config.registries['@kosori']).toBe(productionNamespace);

    // The preset writes the production Namespace; pointing that same handle at
    // the harness afterwards keeps the shipped URL under assertion while the
    // locally-run `add` never has to resolve production.
    config.registries['@kosori'] = `${origin}/r/{style}/{name}.json`;
    await writeFile(
      join(scratch, 'components.json'),
      `${JSON.stringify(config, null, 2)}\n`
    );

    const add = await run(
      shadcn,
      ['add', '@kosori/button', '-y', '-s'],
      scratch,
      cliEnv
    );
    expect(add.exitCode, add.stdout + add.stderr).toBe(0);

    expect(existsSync(join(scratch, 'components/ui/button.tsx'))).toBe(true);

    const css = await readFile(join(scratch, 'app/globals.css'), 'utf8');
    expect(declarations(css, ':root')).toContain('--background: oklch(1 0 0)');
    expect(declarations(css, ':root')).toContain('--radius: 0.625rem');
    expect(declarations(css, '.dark')).toContain(
      '--background: oklch(0.145 0 0)'
    );

    const typecheck = await run(
      tsc,
      ['--noEmit', '-p', 'tsconfig.json'],
      scratch
    );
    expect(typecheck.exitCode, typecheck.stdout + typecheck.stderr).toBe(0);
  } finally {
    server.stop(true);
    await rm(scratch, { force: true, recursive: true });
  }
}, 120_000);
