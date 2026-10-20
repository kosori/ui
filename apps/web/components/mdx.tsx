import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { createCompatibility } from '@/components/compatibility';
import { createComponentsStatus } from '@/components/components-status';
import { DatePickerPreview } from '@/components/date-picker-preview';
import { createStylePreview } from '@/components/style-preview';
import type { StyleName } from '@/registry/preset';

/**
 * Merge the fumadocs default components with the ones a page needs, binding
 * every Example preview and components status to the Style the page documents.
 */
export const getMDXComponents = (
  components?: MDXComponents,
  style?: StyleName
) =>
  ({
    ...defaultMdxComponents,
    Compatibility: createCompatibility(style),
    ComponentPreview: createStylePreview(style),
    ComponentsStatus: createComponentsStatus(style),
    DatePickerPreview,
    ...components,
  }) satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
