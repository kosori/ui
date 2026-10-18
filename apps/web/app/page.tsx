import Link from 'next/link';

const Page = () => (
  <main className='mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center gap-8 p-6'>
    <div className='flex flex-col gap-3'>
      <h1 className='font-semibold text-4xl tracking-tight'>kosori</h1>
      <p className='text-lg text-muted-foreground'>
        Copy-paste React components built on Base UI. Install the source through
        the shadcn CLI and own it from then on.
      </p>
    </div>
    <nav className='flex flex-wrap gap-3 text-sm'>
      <Link
        className='rounded-lg bg-primary px-3 py-2 font-medium text-primary-foreground'
        href='/docs/zen'
      >
        Read the documentation
      </Link>
      <Link
        className='rounded-lg border border-border px-3 py-2 font-medium'
        href='/docs/zen/installation'
      >
        Install zen
      </Link>
    </nav>
  </main>
);

export default Page;
