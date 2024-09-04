import * as p from '@clack/prompts';
import color from 'picocolors';

const highlight = (str: string) => color.bold(color.italic(str));

export const uiPrompts = {
  cssFile: () =>
    p.text({
      message: `Where is your ${color.bold(color.italic('global.css'))} file?`,
      initialValue: 'app/global.css',
    }),

  componentsAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('components')}`,
      initialValue: '~/components',
    }),

  utilsAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('utils')}`,
      initialValue: '~/utils',
    }),
};
