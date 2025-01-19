import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';

import { Badge } from '@kosori/ui/badge';

import { source } from '~/app/source';
import { MDXComponents } from '~/components/mdx';
import { versions } from '~/config/versions';
import { Contribute } from '../_components/contribute';

export const generateStaticParams = () => {
  return source.generateParams();
};

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
};

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const path = `apps/www/content/docs/${page.file.path}`;
  const { body: MDX, lastModified, toc } = page.data;

  return (
    <DocsPage
      editOnGithub={{ repo: 'ui', owner: 'kosori', sha: 'dev', path }}
      full={page.data.full}
      lastUpdate={lastModified}
      tableOfContent={{
        style: 'clerk',
        single: false,
        footer: <Contribute />,
      }}
      tableOfContentPopover={{ footer: <Contribute /> }}
      toc={toc}
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
            <div
              className={clsx(
                'flex flex-col items-start gap-4 border-t pt-4',
                'min-[480px]:flex-row min-[480px]:items-center',
              )}
            >
              <span className='text-fd-muted-foreground text-xs'>
                Dependencies
              </span>

              <div className='flex flex-wrap gap-2'>
                {page.data.dependencies.map((dep) => (
                  <a
                    key={dep}
                    href={`https://www.npmjs.com/package/${dep}/v/${versions[dep]}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <Badge size='small' variant='outline'>
                      {dep}: v{versions[dep]}{' '}
                      <ExternalLinkIcon className='ml-1.5 size-2.5' />
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <MDX components={MDXComponents} />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;
