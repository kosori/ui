import * as p from '@clack/prompts';

import { highlight } from '~/utils/highlight';

export const uiPrompts = {
  componentsAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('components')}`,
      initialValue: '~/components',
    }),

  uiAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('ui')} components`,
      initialValue: '~/components/ui',
    }),

  utilsAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('utils')}`,
      initialValue: '~/utils',
    }),

  hooksAlias: () =>
    p.text({
      message: `Configure the alias for ${highlight('hooks')}`,
      initialValue: '~/hooks',
    }),
};
