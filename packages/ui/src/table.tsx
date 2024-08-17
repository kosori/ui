import { forwardRef } from 'react';

import { cn } from '@kosori/ui';

type TableRef = HTMLTableElement;
type TableProps = React.HTMLAttributes<HTMLTableElement>;

/**
 * Table component that serves as a container for tabular data.
 *
 * @param {TableProps} props - The props for the Table component.
 *
 * @example
 * <Table>
 *   <TableCaption>A list of your recent invoices.</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead className='w-[100px]'>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead>Method</TableHead>
 *       <TableHead className='text-right'>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell className='font-medium'>INV001</TableCell>
 *       <TableCell>Paid</TableCell>
 *       <TableCell>Credit Card</TableCell>
 *       <TableCell className='text-right'>$250.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 *
 * @see {@link https://dub.sh/ui-table Table Docs} for further information.
 */
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

/**
 * TableHeader component that represents the header section of the table.
 *
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the TableHeader component.
 *
 * @example
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Header</TableHead>
 *   </TableRow>
 * </TableHeader>
 */
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

type TableBodyRef = HTMLTableSectionElement;
type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * TableBody component that represents the body section of the table.
 *
 * @param {TableBodyProps} props - The props for the TableBody component.
 *
 * @example
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data</TableCell>
 *   </TableRow>
 * </TableBody>
 */
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

type TableFooterRef = HTMLTableSectionElement;
type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * TableFooter component that represents the footer section of the table.
 *
 * @param {TableFooterProps} props - The props for the TableFooter component.
 *
 * @example
 * <TableFooter>
 *   <TableRow>
 *     <TableCell>Footer Data</TableCell>
 *   </TableRow>
 * </TableFooter>
 */
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

type TableHeadRef = HTMLTableCellElement;
type TableHeadProps = React.HTMLAttributes<HTMLTableCellElement>;

/**
 * TableHead component that represents a header cell in the table.
 *
 * @param {TableHeadProps} props - The props for the TableHead component.
 *
 * @example
 * <TableHead>Header</TableHead>
 */
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

type TableRowRef = HTMLTableRowElement;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

/**
 * TableRow component that represents a row in the table.
 *
 * @param {TableRowProps} props - The props for the TableRow component.
 *
 * @example
 * <TableRow>
 *   <TableCell>Row Data</TableCell>
 * </TableRow>
 */
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

type TableCellRef = HTMLTableCellElement;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

/**
 * TableCell component that represents a cell in the table.
 *
 * @param {TableCellProps} props - The props for the TableCell component.
 *
 * @example
 * <TableCell>Cell Data</TableCell>
 */
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

type TableCaptionRef = HTMLTableCaptionElement;
type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

/**
 * TableCaption component that provides a caption for the table.
 *
 * @param {TableCaptionProps} props - The props for the TableCaption component.
 *
 * @example
 * <TableCaption>Table Caption</TableCaption>
 */
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