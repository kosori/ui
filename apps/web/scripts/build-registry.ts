import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { STYLES } from '../registry/preset';

const webDir = join(import.meta.dirname, '..');
const shadcn = join(webDir, 'node_modules/.bin/shadcn');

/** Build one Style's Registry into the docs app's static output. */
const buildStyle = (style: string) =>
  new Promise<number>((resolve, reject) => {
    const child = spawn(
      shadcn,
      ['build', `registry/${style}/registry.json`, '-o', `public/r/${style}`],
      { cwd: webDir, stdio: 'inherit' }
    );

    child.on('error', reject);
    child.on('exit', (code) => resolve(code ?? 1));
  });

for (const style of STYLES) {
  // biome-ignore lint/performance/noAwaitInLoops: each Style writes its own output directory
  const code = await buildStyle(style.name);

  if (code !== 0) {
    process.exit(code);
  }
}
