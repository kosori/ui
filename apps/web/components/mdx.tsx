import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { createStylePreview } from '@/components/style-preview';
import type { StyleName } from '@/registry/preset';

/**
 * Merge the fumadocs default components with the ones a page needs, binding
 * every Example preview to the Style the page documents.
 */
export const getMDXComponents = (
  components?: MDXComponents,
  style?: StyleName
) =>
  ({
    ...defaultMdxComponents,
    ComponentPreview: createStylePreview(style),
    ...components,
  }) satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
