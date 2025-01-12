import * as p from '@clack/prompts';

import type { ComponentsIndices } from './schema';
import { highlight } from '~/utils/highlight';

export const componentsPrompts = ({
  components,
}: {
  components: ComponentsIndices;
}) => ({
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
