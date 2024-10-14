import type { BuiltInParserName, LiteralUnion } from 'prettier';
import prettier from '@prettier/sync';

export const buildPrettifier = () => {
  const config = prettier.resolveConfig(process.cwd()) ?? {
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };

  return (text: string, language?: LiteralUnion<BuiltInParserName, string>) =>
    prettier.format(text, {
      ...config,
      parser: config.parser ?? language ?? 'babel',
    });
};
