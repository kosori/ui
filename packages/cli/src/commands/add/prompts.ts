import * as p from '@clack/prompts';

import type { Index } from './schema';
import { highlight } from '~/utils/highlight';

export const componentsPrompts = ({ components }: { components: Index }) => ({
  componentsToInstall: () =>
    p.multiselect({
      message: `Which ${highlight('components')} would you like to add?`,
      options: components.map(({ name, required }) => ({
        value: name,
        label: name,
        hint: required?.length ? 'Will install another component(s)' : '',
      })),
      required: true,
    }),
});
