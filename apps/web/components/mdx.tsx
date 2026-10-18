import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/component-preview';

/** Merge the fumadocs default components with the ones a page needs. */
export const getMDXComponents = (components?: MDXComponents) =>
  ({
    ...defaultMdxComponents,
    ComponentPreview,
    ...components,
  }) satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
