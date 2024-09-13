import type { MDXComponents as TypeMDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';

import { ComponentPreview } from '~/components/ComponentPreview';

export const MDXComponents: TypeMDXComponents = {
  ...defaultComponents,
  pre: ({ ref: _ref, ...props }) => (
    <CodeBlock {...props}>
      <Pre className='max-h-[350px]'>{props.children}</Pre>
    </CodeBlock>
  ),
  ComponentPreview,
  Accordion,
  Accordions,
  File,
  Folder,
  Files,
  Step,
  Steps,
  Tab,
  Tabs,
  TypeTable,
};