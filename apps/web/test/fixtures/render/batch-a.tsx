import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from '@/components/ui/alert-dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from '@/components/ui/input-otp';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSeparator,
} from '@/components/ui/toggle-group';

export const accepted = (
  <>
    <Accordion render={<div />} />
    <AccordionItem render={<div />} />
    <AccordionTrigger render={<button type='button' />} />
    <AccordionContent render={<div />} />
    <AlertDialogPortal render={<div />} />
    <AlertDialogTrigger render={<button type='button' />} />
    <AlertDialogBackdrop render={<div />} />
    <AlertDialogViewport render={<div />} />
    <AlertDialogPopup render={<div />} />
    <AlertDialogContent render={<div />} />
    <AlertDialogOverlay render={<div />} />
    <AlertDialogTitle render={<div />} />
    <AlertDialogDescription render={<div />} />
    <AlertDialogClose render={<button type='button' />} />
    <Avatar render={<span />} />
    <AvatarImage render={<span />} />
    <AvatarFallback render={<span />} />
    <AvatarGroupCount render={<span />} />
    <Badge render={<a href='/' />} />
    <BreadcrumbLink render={<a href='/' />} />
    <Button nativeButton={false} render={<a href='/' />} />
    <ButtonGroupText render={<span />} />
    <ButtonGroupSeparator render={<div />} />
    <Checkbox render={<span />} />
    <Collapsible render={<div />} />
    <CollapsibleTrigger render={<button type='button' />} />
    <CollapsibleContent render={<div />} />
    <Field render={<div />} />
    <FieldLabel render={<div />} />
    <FieldItem render={<div />} />
    <FieldDescription render={<div />} />
    <FieldError render={<div />} />
    <FieldControl render={<input />} />
    <Fieldset render={<fieldset />} />
    <FieldsetLegend render={<legend />} />
    <Form render={<form />} />
    <OTPField length={6} render={<div />} />
    <OTPFieldInput render={<input />} />
    <Toggle render={<button type='button' />} />
    <ToggleGroup render={<div />} />
    <ToggleGroupItem render={<button type='button' />} />
    <ToggleGroupSeparator render={<div />} />
  </>
);

export const rejected = (
  <>
    {/* @ts-expect-error AlertDialog is a root with no element to render */}
    <AlertDialog render={<div />} />
    {/* @ts-expect-error Alert renders a plain element */}
    <Alert render={<div />} />
    {/* @ts-expect-error AlertAction renders a plain element */}
    <AlertAction render={<div />} />
    {/* @ts-expect-error AlertDescription renders a plain element */}
    <AlertDescription render={<div />} />
    {/* @ts-expect-error AlertTitle renders a plain element */}
    <AlertTitle render={<div />} />
    {/* @ts-expect-error AvatarGroup renders a plain element */}
    <AvatarGroup render={<div />} />
    {/* @ts-expect-error Breadcrumb renders a plain element */}
    <Breadcrumb render={<nav />} />
    {/* @ts-expect-error BreadcrumbEllipsis renders a plain element */}
    <BreadcrumbEllipsis render={<span />} />
    {/* @ts-expect-error BreadcrumbItem renders a plain element */}
    <BreadcrumbItem render={<li />} />
    {/* @ts-expect-error BreadcrumbList renders a plain element */}
    <BreadcrumbList render={<ol />} />
    {/* @ts-expect-error BreadcrumbPage renders a plain element */}
    <BreadcrumbPage render={<span />} />
    {/* @ts-expect-error BreadcrumbSeparator renders a plain element */}
    <BreadcrumbSeparator render={<li />} />
    {/* @ts-expect-error ButtonGroup renders a plain element */}
    <ButtonGroup render={<div />} />
    {/* @ts-expect-error Card renders a plain element */}
    <Card render={<div />} />
    {/* @ts-expect-error CardAction renders a plain element */}
    <CardAction render={<div />} />
    {/* @ts-expect-error CardContent renders a plain element */}
    <CardContent render={<div />} />
    {/* @ts-expect-error CardDescription renders a plain element */}
    <CardDescription render={<div />} />
    {/* @ts-expect-error CardFooter renders a plain element */}
    <CardFooter render={<div />} />
    {/* @ts-expect-error CardFrame renders a plain element */}
    <CardFrame render={<div />} />
    {/* @ts-expect-error CardFrameAction renders a plain element */}
    <CardFrameAction render={<div />} />
    {/* @ts-expect-error CardFrameDescription renders a plain element */}
    <CardFrameDescription render={<div />} />
    {/* @ts-expect-error CardFrameFooter renders a plain element */}
    <CardFrameFooter render={<div />} />
    {/* @ts-expect-error CardFrameHeader renders a plain element */}
    <CardFrameHeader render={<div />} />
    {/* @ts-expect-error CardFrameTitle renders a plain element */}
    <CardFrameTitle render={<div />} />
    {/* @ts-expect-error CardHeader renders a plain element */}
    <CardHeader render={<div />} />
    {/* @ts-expect-error CardTitle renders a plain element */}
    <CardTitle render={<div />} />
    {/* @ts-expect-error Empty renders a plain element */}
    <Empty render={<div />} />
    {/* @ts-expect-error EmptyContent renders a plain element */}
    <EmptyContent render={<div />} />
    {/* @ts-expect-error EmptyDescription renders a plain element */}
    <EmptyDescription render={<p />} />
    {/* @ts-expect-error EmptyHeader renders a plain element */}
    <EmptyHeader render={<div />} />
    {/* @ts-expect-error EmptyMedia renders a plain element */}
    <EmptyMedia render={<div />} />
    {/* @ts-expect-error EmptyTitle renders a plain element */}
    <EmptyTitle render={<div />} />
    {/* @ts-expect-error Input renders a plain element */}
    <Input render={<input />} />
    {/* @ts-expect-error InputGroup renders a plain element */}
    <InputGroup render={<div />} />
    {/* @ts-expect-error InputGroupAddon renders a plain element */}
    <InputGroupAddon render={<div />} />
    {/* @ts-expect-error InputGroupInput renders the plain Input */}
    <InputGroupInput render={<input />} />
    {/* @ts-expect-error InputGroupText renders a plain element */}
    <InputGroupText render={<span />} />
    {/* @ts-expect-error InputGroupTextarea renders the plain Textarea */}
    <InputGroupTextarea render={<textarea />} />
    {/* @ts-expect-error OTPFieldSeparator renders a plain element */}
    <OTPFieldSeparator render={<div />} />
    {/* @ts-expect-error Kbd renders a plain element */}
    <Kbd render={<kbd />} />
    {/* @ts-expect-error KbdGroup renders a plain element */}
    <KbdGroup render={<kbd />} />
    {/* @ts-expect-error Label renders a plain element */}
    <Label render={<span />} />
  </>
);
