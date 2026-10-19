import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/component-preview';
import type { ExampleName } from '@/lib/registry/examples';
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
    ComponentPreview: (props: { name: ExampleName }) => (
      <ComponentPreview {...props} style={style} />
    ),
    ...components,
  }) satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
