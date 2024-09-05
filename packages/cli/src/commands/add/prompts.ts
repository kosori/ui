import * as p from '@clack/prompts';

import { highlight } from '~/utils/highlight';

export const componentsPrompts = {
  componentsAlias: () =>
    p.multiselect({
      message: `Which ${highlight('components')} would you like to add?`,
      options: [],
    }),
};
