import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

type ComponentsConfig = {
  aliases: {
    components: string;
    hooks: string;
    lib: string;
    ui: string;
    utils: string;
  };
};

test('the docs app aliases match the shadcn install rewriter', async () => {
  const raw = await readFile(
    new URL('../components.json', import.meta.url),
    'utf8'
  );
  const config = JSON.parse(raw) as ComponentsConfig;

  expect(config.aliases).toEqual({
    components: '@/components',
    hooks: '@/hooks',
    lib: '@/lib',
    ui: '@/components/ui',
    utils: '@/lib/utils',
  });
});
