import type { ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents as TypeMDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';

import { ComponentPreview } from './component-preview';
import { PagePreview } from './page-preview';
import { InstallTabs } from './tabs';

export const MDXComponents: TypeMDXComponents = {
  ...defaultComponents,
  pre: ({ ref: _ref, children, ...props }) => (
    <CodeBlock {...props}>
      <Pre className='max-h-[350px]'>{children}</Pre>
    </CodeBlock>
  ),
  img: (props) => <ImageZoom {...(props as ImageZoomProps)} />,
  ComponentPreview,
  Accordion,
  Accordions,
  Card,
  Cards,
  File,
  Folder,
  Files,
  Step,
  Steps,
  Tab,
  Tabs,
  TypeTable,
  // Custom
  InstallTabs,
  PagePreview,
};
