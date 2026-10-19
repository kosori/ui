import type { StyleName } from '@/registry/preset';

type Props = {
  name: StyleName;
};

/** Mark every page of a Style that serves only part of the catalog. */
export const IncompleteStyleBanner = ({ name }: Props) => (
  <div
    className='not-prose mb-6 rounded-lg border border-amber-600/30 bg-amber-500/10 px-4 py-3 text-amber-950 text-sm dark:text-amber-50'
    role='note'
  >
    <p>
      <strong>{name} is an Incomplete Style.</strong> It serves a subset of the
      kosori catalog; components without a page here are Pending.
    </p>
  </div>
);
