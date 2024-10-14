import type { BuiltInParserName, LiteralUnion } from 'prettier';
import prettier from '@prettier/sync';

type Props = { parser?: LiteralUnion<BuiltInParserName, string> };

export const buildPrettifier = ({ parser }: Props) => {
  const config = prettier.resolveConfig(process.cwd()) ?? {
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };

  config.parser = config.parser ?? parser ?? 'babel';

  return (text: string) => prettier.format(text, config);
};
