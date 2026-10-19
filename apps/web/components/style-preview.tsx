import { ComponentPreview } from '@/components/component-preview';
import type { ExampleName } from '@/lib/registry/examples';
import type { StyleName } from '@/registry/preset';

type Props = {
  name: ExampleName;
};

/**
 * Bind the Style a documentation page documents to every Example preview it
 * renders, because MDX passes only the Example's name.
 */
export const createStylePreview = (style?: StyleName) => {
  /** Render one Example preview with the page's Style bound. */
  const StylePreview = ({ name }: Props) => (
    <ComponentPreview name={name} style={style} />
  );

  return StylePreview;
};
