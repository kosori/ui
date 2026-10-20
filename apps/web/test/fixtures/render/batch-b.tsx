/**
 * Compile-time seam for the `render` prop on batch B's zen components.
 * Accepted and rejected cases are checked by `bun run check-types`.
 */
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
} from '@/components/ui/autocomplete';
import { Calendar } from '@/components/ui/calendar';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogBackdrop,
  CommandDialogPopup,
  CommandDialogPortal,
  CommandDialogTrigger,
  CommandDialogViewport,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPanel,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBar,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerPortal,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectButton,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPanel,
  SheetPopup,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
} from '@/components/ui/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const BatchB = () => (
  <>
    <Autocomplete
      // @ts-expect-error the autocomplete root renders no element; no render prop
      render={<div />}
    />
    <AutocompleteInput render={<input />} />
    <AutocompletePopup render={<div />} />
    <AutocompleteItem render={<div />} value='one' />
    <AutocompleteSeparator render={<div />} />
    <AutocompleteGroup render={<div />} />
    <AutocompleteGroupLabel render={<div />} />
    <AutocompleteEmpty render={<div />} />
    <AutocompleteRow render={<div />} />
    <AutocompleteValue
      // @ts-expect-error the autocomplete value renders no element; no render prop
      render={<span />}
    />
    <AutocompleteList render={<div />} />
    <AutocompleteClear render={<button type='button' />} />
    <AutocompleteStatus render={<div />} />
    <AutocompleteCollection
      // @ts-expect-error the autocomplete collection renders no element; no render prop
      render={<div />}
    >
      {() => null}
    </AutocompleteCollection>
    <AutocompleteTrigger render={<button type='button' />} />

    <Calendar
      // @ts-expect-error calendar wraps DayPicker and accepts no render prop
      render={<div />}
    />

    <Combobox
      // @ts-expect-error the combobox root renders no element; no render prop
      render={<div />}
    />
    <ComboboxChipsInput render={<input />} />
    <ComboboxInput render={<input />} />
    <ComboboxTrigger render={<button type='button' />} />
    <ComboboxPopup render={<div />} />
    <ComboboxItem render={<div />} value='one' />
    <ComboboxSeparator render={<div />} />
    <ComboboxGroup render={<div />} />
    <ComboboxGroupLabel render={<div />} />
    <ComboboxEmpty render={<div />} />
    <ComboboxRow render={<div />} />
    <ComboboxValue
      // @ts-expect-error the combobox value renders no element; no render prop
      render={<span />}
    />
    <ComboboxList render={<div />} />
    <ComboboxClear render={<button type='button' />} />
    <ComboboxStatus render={<div />} />
    <ComboboxCollection
      // @ts-expect-error the combobox collection renders no element; no render prop
      render={<div />}
    >
      {() => null}
    </ComboboxCollection>
    <ComboboxChips render={<div />} />
    <ComboboxChip render={<div />} />
    <ComboboxChipRemove render={<button type='button' />} />

    <Command
      // @ts-expect-error the command root renders no element; no render prop
      render={<div />}
    />
    <CommandDialog
      // @ts-expect-error the command dialog root renders no element; no render prop
      render={<div />}
    />
    <CommandDialogPortal render={<div />} />
    <CommandDialogTrigger render={<button type='button' />} />
    <CommandDialogBackdrop render={<div />} />
    <CommandDialogViewport render={<div />} />
    <CommandDialogPopup render={<div />} />
    <CommandInput render={<input />} />
    <CommandList render={<div />} />
    <CommandEmpty render={<div />} />
    <CommandPanel
      // @ts-expect-error the command panel is a plain div; no render prop
      render={<div />}
    />
    <CommandGroup render={<div />} />
    <CommandGroupLabel render={<div />} />
    <CommandCollection
      // @ts-expect-error the command collection renders no element; no render prop
      render={<div />}
    >
      {() => null}
    </CommandCollection>
    <CommandItem render={<div />} value='one' />
    <CommandSeparator render={<div />} />
    <CommandShortcut
      // @ts-expect-error the command shortcut is a plain kbd; no render prop
      render={<kbd />}
    />
    <CommandFooter
      // @ts-expect-error the command footer is a plain div; no render prop
      render={<div />}
    />

    <ContextMenu
      // @ts-expect-error the context menu root renders no element; no render prop
      render={<div />}
    />
    <ContextMenuPortal render={<div />} />
    <ContextMenuTrigger render={<div />} />
    <ContextMenuPopup render={<div />} />
    <ContextMenuGroup render={<div />} />
    <ContextMenuItem render={<div />} />
    <ContextMenuLinkItem render={<a href='/' />} />
    <ContextMenuCheckboxItem render={<div />} />
    <ContextMenuRadioGroup render={<div />} />
    <ContextMenuRadioItem render={<div />} value='one' />
    <ContextMenuGroupLabel render={<div />} />
    <ContextMenuSeparator render={<div />} />
    <ContextMenuShortcut
      // @ts-expect-error the context menu shortcut is a plain kbd; no render prop
      render={<kbd />}
    />
    <ContextMenuSub
      // @ts-expect-error the context menu sub root renders no element; no render prop
      render={<div />}
    />
    <ContextMenuSubTrigger render={<div />} />
    <ContextMenuSubPopup render={<div />} />

    <Dialog
      // @ts-expect-error the dialog root renders no element; no render prop
      render={<div />}
    />
    <DialogPortal render={<div />} />
    <DialogTrigger render={<button type='button' />} />
    <DialogClose render={<button type='button' />} />
    <DialogBackdrop render={<div />} />
    <DialogOverlay render={<div />} />
    <DialogViewport render={<div />} />
    <DialogPopup render={<div />} />
    <DialogContent render={<div />} />
    <DialogHeader render={<header />} />
    <DialogFooter render={<footer />} />
    <DialogTitle render={<div />} />
    <DialogDescription render={<p />} />
    <DialogPanel render={<div />} />

    <Drawer
      // @ts-expect-error the drawer root renders no element; no render prop
      render={<div />}
    />
    <DrawerPortal render={<div />} />
    <DrawerTrigger render={<button type='button' />} />
    <DrawerClose render={<button type='button' />} />
    <DrawerSwipeArea render={<div />} />
    <DrawerBackdrop render={<div />} />
    <DrawerViewport render={<div />} />
    <DrawerPopup render={<div />} />
    <DrawerHeader render={<header />} />
    <DrawerFooter render={<footer />} />
    <DrawerTitle render={<div />} />
    <DrawerDescription render={<p />} />
    <DrawerPanel render={<div />} />
    <DrawerBar render={<div />} />
    <DrawerContent render={<div />} />
    <DrawerMenu render={<nav />} />
    <DrawerMenuItem render={<button type='button' />} />
    <DrawerMenuSeparator render={<div />} />
    <DrawerMenuGroup render={<div />} />
    <DrawerMenuGroupLabel render={<div />} />
    <DrawerMenuTrigger render={<button type='button' />} />
    <DrawerMenuCheckboxItem render={<div />} />
    <DrawerMenuRadioGroup render={<div />} />
    <DrawerMenuRadioItem render={<div />} value='one' />

    <DropdownMenu
      // @ts-expect-error the dropdown menu root renders no element; no render prop
      render={<div />}
    />
    <DropdownMenuPortal render={<div />} />
    <DropdownMenuTrigger render={<button type='button' />} />
    <DropdownMenuContent render={<div />} />
    <DropdownMenuGroup render={<div />} />
    <DropdownMenuLabel render={<div />} />
    <DropdownMenuItem render={<div />} />
    <DropdownMenuCheckboxItem render={<div />} />
    <DropdownMenuRadioGroup render={<div />} />
    <DropdownMenuRadioItem render={<div />} value='one' />
    <DropdownMenuSeparator render={<div />} />
    <DropdownMenuShortcut
      // @ts-expect-error the dropdown menu shortcut is a plain kbd; no render prop
      render={<kbd />}
    />
    <DropdownMenuSub
      // @ts-expect-error the dropdown menu sub root renders no element; no render prop
      render={<div />}
    />
    <DropdownMenuSubTrigger render={<div />} />
    <DropdownMenuSubContent render={<div />} />

    <HoverCard
      // @ts-expect-error the hover card root renders no element; no render prop
      render={<div />}
    />
    <HoverCardTrigger render={<button type='button' />} />
    <HoverCardContent render={<div />} />

    <Popover
      // @ts-expect-error the popover root renders no element; no render prop
      render={<div />}
    />
    <PopoverTrigger render={<button type='button' />} />
    <PopoverContent render={<div />} />
    <PopoverClose render={<button type='button' />} />
    <PopoverTitle render={<div />} />
    <PopoverDescription render={<p />} />

    <ScrollArea render={<div />} />
    <ScrollBar render={<div />} />

    <Select
      // @ts-expect-error the select root renders no element; no render prop
      render={<div />}
    />
    <SelectButton render={<button type='button' />} />
    <SelectTrigger render={<button type='button' />} />
    <SelectValue render={<span />} />
    <SelectContent render={<div />} />
    <SelectItem render={<div />} value='one' />
    <SelectSeparator render={<div />} />
    <SelectGroup render={<div />} />
    <SelectLabel render={<div />} />
    <SelectGroupLabel render={<div />} />

    <Sheet
      // @ts-expect-error the sheet root renders no element; no render prop
      render={<div />}
    />
    <SheetPortal render={<div />} />
    <SheetTrigger render={<button type='button' />} />
    <SheetClose render={<button type='button' />} />
    <SheetBackdrop render={<div />} />
    <SheetOverlay render={<div />} />
    <SheetViewport render={<div />} />
    <SheetPopup render={<div />} />
    <SheetContent render={<div />} />
    <SheetHeader render={<header />} />
    <SheetFooter render={<footer />} />
    <SheetTitle render={<div />} />
    <SheetDescription render={<p />} />
    <SheetPanel render={<div />} />

    <SidebarProvider
      // @ts-expect-error the sidebar provider is a plain div; no render prop
      render={<div />}
    />
    <Sidebar
      // @ts-expect-error the sidebar is a plain element; no render prop
      render={<div />}
    />
    <SidebarTrigger render={<button type='button' />} />
    <SidebarRail
      // @ts-expect-error the sidebar rail is a plain button; no render prop
      render={<button type='button' />}
    />
    <SidebarInset
      // @ts-expect-error the sidebar inset is a plain main; no render prop
      render={<main />}
    />
    <SidebarInput
      // @ts-expect-error input no longer accepts render
      render={<input />}
    />
    <SidebarHeader
      // @ts-expect-error the sidebar header is a plain div; no render prop
      render={<div />}
    />
    <SidebarFooter
      // @ts-expect-error the sidebar footer is a plain div; no render prop
      render={<div />}
    />
    <SidebarSeparator render={<div />} />
    <SidebarContent
      // @ts-expect-error the sidebar content is a plain div; no render prop
      render={<div />}
    />
    <SidebarGroup
      // @ts-expect-error the sidebar group is a plain div; no render prop
      render={<div />}
    />
    <SidebarGroupLabel render={<div />} />
    <SidebarGroupAction render={<button type='button' />} />
    <SidebarGroupContent
      // @ts-expect-error the sidebar group content is a plain div; no render prop
      render={<div />}
    />
    <SidebarMenu
      // @ts-expect-error the sidebar menu is a plain ul; no render prop
      render={<ul />}
    />
    <SidebarMenuItem
      // @ts-expect-error the sidebar menu item is a plain li; no render prop
      render={<li />}
    />
    <SidebarMenuButton render={<button type='button' />} />
    <SidebarMenuAction render={<button type='button' />} />
    <SidebarMenuBadge
      // @ts-expect-error the sidebar menu badge is a plain div; no render prop
      render={<div />}
    />
    <SidebarMenuSkeleton
      // @ts-expect-error the sidebar menu skeleton is a plain div; no render prop
      render={<div />}
    />
    <SidebarMenuSub
      // @ts-expect-error the sidebar menu sub is a plain ul; no render prop
      render={<ul />}
    />
    <SidebarMenuSubItem
      // @ts-expect-error the sidebar menu sub item is a plain li; no render prop
      render={<li />}
    />
    <SidebarMenuSubButton render={<a href='/' />} />

    <Tabs render={<div />} />
    <TabsList render={<div />} />
    <TabsTrigger render={<button type='button' />} value='one' />
    <TabsContent render={<div />} value='one' />

    <TooltipProvider
      // @ts-expect-error the tooltip provider renders no element; no render prop
      render={<div />}
    />
    <Tooltip
      // @ts-expect-error the tooltip root renders no element; no render prop
      render={<div />}
    />
    <TooltipTrigger render={<button type='button' />} />
    <TooltipContent render={<div />} />
  </>
);
