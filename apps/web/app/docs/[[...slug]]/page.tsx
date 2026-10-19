import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';
import { isStyleName } from '@/registry/preset';

/** Resolve the requested documentation page and the route params that led to it. */
const getDocsPage = async (props: PageProps<'/docs/[[...slug]]'>) => {
  const params = await props.params;

  return { page: source.getPage(params.slug), params };
};

const Page = async (props: PageProps<'/docs/[[...slug]]'>) => {
  const { page, params } = await getDocsPage(props);

  if (!page) {
    if (!params.slug || params.slug.length === 0) {
      redirect('/docs/zen');
    }

    notFound();
  }

  const MDX = page.data.body;
  const style = params.slug?.[0];

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents(
            { a: createRelativeLink(source, page) },
            style && isStyleName(style) ? style : undefined
          )}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

/** Every documentation page, so the whole site prerenders. */
export const generateStaticParams = async () => source.generateParams();

export const generateMetadata = async (
  props: PageProps<'/docs/[[...slug]]'>
): Promise<Metadata> => {
  const { page } = await getDocsPage(props);

  if (!page) {
    return {};
  }

  return {
    description: page.data.description,
    title: page.data.title,
  };
};
