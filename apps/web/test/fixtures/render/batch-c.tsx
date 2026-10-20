import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '@/components/ui/progress';
import { Radio, RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider, SliderValue } from '@/components/ui/slider';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { AnchoredToastProvider, ToastProvider } from '@/components/ui/toast';

export const BatchC = () => (
  <>
    <Progress render={<div />} value={50} />
    <ProgressLabel render={<span />} />
    <ProgressTrack render={<span />} />
    <ProgressIndicator render={<span />} />
    <ProgressValue render={<span />} />

    <RadioGroup render={<div />}>
      <Radio render={<button type='button' />} value='a' />
      <RadioGroupItem render={<button type='button' />} value='b' />
    </RadioGroup>

    <Separator render={<div />} />

    <Slider render={<div />} />
    <SliderValue render={<span />} />

    <Switch render={<button type='button' />} />

    <ToastProvider
      // @ts-expect-error toast provider is a context provider and accepts no render prop
      render={<div />}
    />
    <AnchoredToastProvider
      // @ts-expect-error toast provider is a context provider and accepts no render prop
      render={<div />}
    />

    <Pagination
      // @ts-expect-error pagination is a plain nav and accepts no render prop
      render={<nav />}
    />
    <PaginationContent
      // @ts-expect-error pagination content is a plain list and accepts no render prop
      render={<ul />}
    />
    <PaginationItem
      // @ts-expect-error pagination item is a plain list item and accepts no render prop
      render={<li />}
    />
    <PaginationLink
      href='https://kosori.codingcodax.dev'
      // @ts-expect-error pagination link composes a Button and accepts no render prop
      render={<a href='https://kosori.codingcodax.dev' />}
    />
    <PaginationPrevious
      href='https://kosori.codingcodax.dev'
      // @ts-expect-error pagination previous composes a Button and accepts no render prop
      render={<a href='https://kosori.codingcodax.dev' />}
    />
    <PaginationNext
      href='https://kosori.codingcodax.dev'
      // @ts-expect-error pagination next composes a Button and accepts no render prop
      render={<a href='https://kosori.codingcodax.dev' />}
    />
    <PaginationEllipsis
      // @ts-expect-error pagination ellipsis is a plain span and accepts no render prop
      render={<span />}
    />

    <Skeleton
      // @ts-expect-error skeleton is a plain div and accepts no render prop
      render={<div />}
    />

    <Spinner
      // @ts-expect-error spinner is a plain icon and accepts no render prop
      render={<svg />}
    />

    <Table
      // @ts-expect-error table is a plain element and accepts no render prop
      render={<div />}
    />
    <TableHeader
      // @ts-expect-error table header is a plain element and accepts no render prop
      render={<thead />}
    />
    <TableBody
      // @ts-expect-error table body is a plain element and accepts no render prop
      render={<tbody />}
    />
    <TableFooter
      // @ts-expect-error table footer is a plain element and accepts no render prop
      render={<tfoot />}
    />
    <TableRow
      // @ts-expect-error table row is a plain element and accepts no render prop
      render={<tr />}
    />
    <TableHead
      // @ts-expect-error table head is a plain element and accepts no render prop
      render={<th />}
    />
    <TableCell
      // @ts-expect-error table cell is a plain element and accepts no render prop
      render={<td />}
    />
    <TableCaption
      // @ts-expect-error table caption is a plain element and accepts no render prop
      render={<caption />}
    />

    <Textarea
      // @ts-expect-error textarea is a plain element and accepts no render prop
      render={<textarea />}
    />
  </>
);
