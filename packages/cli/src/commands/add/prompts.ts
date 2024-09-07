import * as p from '@clack/prompts';

import { highlight } from '~/utils/highlight';
import { getComponentsIndex } from './helpers/components';

const components = await getComponentsIndex();

export const componentsPrompts = {
  components: () =>
    p.multiselect({
      message: `Which ${highlight('components')} would you like to add?`,
      options: components.map(({ name, required }) => ({
        value: name,
        label: name,
        hint: required?.length ? 'Will install another component(s)' : '',
      })),
      required: true,
    }),
};
