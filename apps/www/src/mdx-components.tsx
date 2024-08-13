import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultComponents from 'fumadocs-ui/mdx';

import { ComponentPreview } from '~/components/ComponentPreview';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Accordions,
    Accordion,
    Steps,
    Step,
    Tab,
    Tabs,
    ComponentPreview,
  };
}
