import { forwardRef } from 'react';

import { cn } from '@kosori/ui';

// --- Component:Table ---
type TableRef = HTMLTableElement;
type TableProps = React.HTMLAttributes<HTMLTableElement>;

export const Table = forwardRef<TableRef, TableProps>(
  ({ className, ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  ),
);

Table.displayName = 'Table';

// --- Component:TableHeader ---
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('[&_tr]:border-b [&_tr]:border-grey-line', className)}
    {...props}
  />
));

TableHeader.displayName = 'TableHeader';

// --- Component:TableBody ---
type TableBodyRef = HTMLTableSectionElement;
type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = forwardRef<TableBodyRef, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  ),
);

TableBody.displayName = 'TableBody';

// --- Component:TableFooter ---
type TableFooterRef = HTMLTableSectionElement;
type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableFooter = forwardRef<TableFooterRef, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-grey-line bg-grey-bg font-medium',
        '[&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  ),
);

TableFooter.displayName = 'TableFooter';

// --- Component:TableHead ---
type TableHeadRef = HTMLTableCellElement;
type TableHeadProps = React.HTMLAttributes<HTMLTableCellElement>;

export const TableHead = forwardRef<TableHeadRef, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-grey-text',
        '[&:has([role=checkbox])]:pr-0',
        '[&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  ),
);

TableHead.displayName = 'TableHead';

// --- Component:TableRow ---
type TableRowRef = HTMLTableRowElement;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = forwardRef<TableRowRef, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-grey-line transition-colors',
        'hover:bg-grey-bg-hover',
        'data-[state=selected]:bg-grey-bg-active',
        className,
      )}
      {...props}
    />
  ),
);

TableRow.displayName = 'TableRow';

// --- Component:TableCell ---
type TableCellRef = HTMLTableCellElement;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = forwardRef<TableCellRef, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-2 align-middle',
        '[&:has([role=checkbox])]:pr-0',
        '[&>[role=checkbox]]:translate-y-[0px]',
        className,
      )}
      {...props}
    />
  ),
);

TableCell.displayName = 'TableCell';

// --- Component:TableCaption ---
type TableCaptionRef = HTMLTableCaptionElement;
type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export const TableCaption = forwardRef<TableCaptionRef, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-grey-text', className)}
      {...props}
    />
  ),
);

TableCaption.displayName = 'TableCaption';
