import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';

import { Badge } from '@kosori/ui/badge';

import { docs } from '~/app/source';
import { versions } from '~/config/versions';
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
    dependencies: page.data.dependencies,
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
        <p
          className={
            page.data.links || page.data.dependencies ? 'my-2' : 'mb-12 mt-2'
          }
        >
          {page.data.description}
        </p>

        {page.data.links && (
          <div
            className={clsx(
              'not-prose space-x-2',
              page.data.dependencies ? 'mb-4' : 'mb-12',
            )}
          >
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

        {page.data.dependencies && (
          <div className='not-prose mb-12 space-x-2'>
            <div className='flex items-center gap-4 border-t pt-4'>
              <span className='text-fd-muted-foreground text-xs'>
                Dependencies
              </span>

              <div className='flex gap-2'>
                {page.data.dependencies.map((dep) => (
                  <a
                    key={dep}
                    href={`https://www.npmjs.com/package/${dep}/v/${versions[dep]}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <Badge size='small' variant='outline'>
                      {dep}: {versions[dep]}{' '}
                      <ExternalLinkIcon className='ml-1.5 size-2.5' />
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        <MDX />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;
