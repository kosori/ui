import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';

import { Badge } from '@kosori/ui/badge';

import { source } from '~/app/source';
import { MDXComponents } from '~/components/Mdx';
import { versions } from '~/config/versions';
import { Contribute } from '../_components/Contribute';

export const generateStaticParams = () => {
  return source.generateParams();
};

export const generateMetadata = ({
  params,
}: {
  params: { slug?: string[] };
}) => {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
};

const Page = ({ params }: { params: { slug?: string[] } }) => {
  const page = source.getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const path = `apps/www/content/docs/${page.file.path}`;
  const MDX = page.data.body;

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={{ footer: <Contribute path={path} /> }}
      tableOfContentPopover={{ footer: <Contribute path={path} /> }}
      toc={page.data.toc}
    >
      <DocsBody>
        <h1 className='mb-0'>{page.data.title}</h1>
        <MDX components={MDXComponents} />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;
