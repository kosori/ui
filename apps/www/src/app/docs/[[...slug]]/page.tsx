import { notFound } from 'next/navigation';
import { ExternalLinkIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';

import { Badge } from '@kosori/ui/badge';
import { Button } from '@kosori/ui/button';

import { docs } from '~/app/source';
import { Contribute } from '../_components/Contribute';

export const generateStaticParams = () => {
  return docs.getPages().map((page) => ({
    slug: page.slugs,
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug?: string[] };
}) => {
  const page = docs.getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    links: page.data.links,
  };
};

const Page = ({ params }: { params: { slug?: string[] } }) => {
  const page = docs.getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const path = `apps/www/content/docs/${page.file.path}`;
  const MDX = page.data.exports.default;

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={{ footer: <Contribute path={path} /> }}
      tableOfContentPopover={{ footer: <Contribute path={path} /> }}
      toc={page.data.exports.toc}
    >
      <DocsBody>
        <h1 className='mb-0'>{page.data.title}</h1>
        <p className={page.data.links ? 'my-2' : 'mb-12 mt-2'}>
          {page.data.description}
        </p>

        {page.data.links && (
          <div className='not-prose mb-12 space-x-2'>
            {page.data.links.doc && (
              <a
                href={page.data.links.doc}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Badge>
                  Docs <ExternalLinkIcon className='ml-1.5 size-3' />
                </Badge>
              </a>
            )}
            {page.data.links.api && (
              <a
                href={page.data.links.api}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Badge>
                  API Reference <ExternalLinkIcon className='ml-1.5 size-3' />
                </Badge>
              </a>
            )}
          </div>
        )}
        <MDX />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;
