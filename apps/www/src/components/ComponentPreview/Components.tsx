import { lazy } from 'react';

type Component<T = object> = {
  name: string;
  type: 'component:example' | 'hook:example';
  component: React.LazyExoticComponent<(props: T) => JSX.Element>;
};

export const Components: Record<string, Component> = {
  accordion: {
    name: 'accordion',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Accordion').then((module) => ({
        default: module.AccordionDemo,
      })),
    ),
  },
  alert: {
    name: 'alert',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Alert').then((module) => ({
        default: module.AlertDemo,
      })),
    ),
  },
  'alert-error': {
    name: 'alert-error',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Alert').then((module) => ({
        default: module.AlertErrorDemo,
      })),
    ),
  },
  'alert-info': {
    name: 'alert-info',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Alert').then((module) => ({
        default: module.AlertInfoDemo,
      })),
    ),
  },
  'alert-success': {
    name: 'alert-success',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Alert').then((module) => ({
        default: module.AlertSuccessDemo,
      })),
    ),
  },
  'alert-warning': {
    name: 'alert-warning',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Alert').then((module) => ({
        default: module.AlertWarningDemo,
      })),
    ),
  },
  'alert-dialog': {
    name: 'alert-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/AlertDialog').then((module) => ({
        default: module.AlertDialogDemo,
      })),
    ),
  },
  'aspect-ratio': {
    name: 'aspect-ratio',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/AspectRatio').then((module) => ({
        default: module.AspectRatioDemo,
      })),
    ),
  },
  avatar: {
    name: 'avatar',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Avatar').then((module) => ({
        default: module.AvatarDemo,
      })),
    ),
  },
  'avatar-shapes': {
    name: 'avatar-shapes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Avatar').then((module) => ({
        default: module.AvatarShapesDemo,
      })),
    ),
  },
  'avatar-sizes': {
    name: 'avatar-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Avatar').then((module) => ({
        default: module.AvatarSizesDemo,
      })),
    ),
  },
  badge: {
    name: 'badge',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Badge').then((module) => ({
        default: module.BadgeDemo,
      })),
    ),
  },
  'badge-intents': {
    name: 'badge-intents',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Badge').then((module) => ({
        default: module.BadgeIntentsDemo,
      })),
    ),
  },
  'badge-sizes': {
    name: 'badge-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Badge').then((module) => ({
        default: module.BadgeSizesDemo,
      })),
    ),
  },
  breadcrumb: {
    name: 'breadcrumb',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Breadcrumb').then((module) => ({
        default: module.BreadcrumbDemo,
      })),
    ),
  },
  button: {
    name: 'button',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Button').then((module) => ({
        default: module.ButtonDemo,
      })),
    ),
  },
  'button-icon': {
    name: 'button-icon',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Button').then((module) => ({
        default: module.ButtonIconDemo,
      })),
    ),
  },
  'button-intents': {
    name: 'button-intents',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Button').then((module) => ({
        default: module.ButtonIntentsDemo,
      })),
    ),
  },
  'button-sizes': {
    name: 'button-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Button').then((module) => ({
        default: module.ButtonSizesDemo,
      })),
    ),
  },
  calendar: {
    name: 'calendar',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Calendar').then((module) => ({
        default: module.CalendarDemo,
      })),
    ),
  },
  card: {
    name: 'card',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Card').then((module) => ({
        default: module.CardDemo,
      })),
    ),
  },
  carousel: {
    name: 'carousel',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselDemo,
      })),
    ),
  },
  'carousel-api': {
    name: 'carousel-api',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselApiDemo,
      })),
    ),
  },
  'carousel-autoplay': {
    name: 'carousel-autoplay',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselAutoplayDemo,
      })),
    ),
  },
  'carousel-orientation': {
    name: 'carousel-orientation',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselOrientationDemo,
      })),
    ),
  },
  'carousel-sizes': {
    name: 'carousel-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselSizesDemo,
      })),
    ),
  },
  'carousel-spacing': {
    name: 'carousel-spacing',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Carousel').then((module) => ({
        default: module.CarouselSpacingDemo,
      })),
    ),
  },
  checkbox: {
    name: 'checkbox',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxDemo,
      })),
    ),
  },
  'checkbox-caption': {
    name: 'checkbox-caption',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxCaptionDemo,
      })),
    ),
  },
  'checkbox-form-complex': {
    name: 'checkbox-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxFormComplexDemo,
      })),
    ),
  },
  'checkbox-form-simple': {
    name: 'checkbox-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxFormSimpleDemo,
      })),
    ),
  },
  'checkbox-disabled': {
    name: 'checkbox-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxDisabledDemo,
      })),
    ),
  },
  'checkbox-shapes': {
    name: 'checkbox-shapes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxShapesDemo,
      })),
    ),
  },
  'checkbox-sizes': {
    name: 'checkbox-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Checkbox').then((module) => ({
        default: module.CheckboxSizesDemo,
      })),
    ),
  },
  collapsible: {
    name: 'collapsible',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Collapsible').then((module) => ({
        default: module.CollapsibleDemo,
      })),
    ),
  },
  combobox: {
    name: 'combobox',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Combobox').then((module) => ({
        default: module.ComboboxDemo,
      })),
    ),
  },
  'combobox-popover': {
    name: 'combobox-popover',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Combobox').then((module) => ({
        default: module.ComboboxPopoverDemo,
      })),
    ),
  },
  'combobox-dropdown-menu': {
    name: 'combobox-dropdown',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Combobox').then((module) => ({
        default: module.ComboboxDropdownMenuDemo,
      })),
    ),
  },
  'combobox-responsive': {
    name: 'combobox-responsive',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Combobox').then((module) => ({
        default: module.ComboboxResponsiveDemo,
      })),
    ),
  },
  command: {
    name: 'command',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Command').then((module) => ({
        default: module.CommandDemo,
      })),
    ),
  },
  'command-dialog': {
    name: 'command-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Command').then((module) => ({
        default: module.CommandDialogDemo,
      })),
    ),
  },
  'context-menu': {
    name: 'context-menu',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ContextMenu').then((module) => ({
        default: module.ContextMenuDemo,
      })),
    ),
  },
  'data-table': {
    name: 'data-table',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DataTable').then((module) => ({
        default: module.DataTableDemo,
      })),
    ),
  },
  'date-picker': {
    name: 'date-picker',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DatePicker').then((module) => ({
        default: module.DatePickerDemo,
      })),
    ),
  },
  'date-picker-range': {
    name: 'date-picker-range',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DatePicker').then((module) => ({
        default: module.DatePickerRangeDemo,
      })),
    ),
  },
  'date-picker-presets': {
    name: 'date-picker-presets',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DatePicker').then((module) => ({
        default: module.DatePickerPresetsDemo,
      })),
    ),
  },
  'date-picker-form': {
    name: 'date-picker-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DatePicker').then((module) => ({
        default: module.DatePickerFormDemo,
      })),
    ),
  },
  dialog: {
    name: 'dialog',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Dialog').then((module) => ({
        default: module.DialogDemo,
      })),
    ),
  },
  'dialog-custom-close-button': {
    name: 'dialog-custom-close-button',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Dialog').then((module) => ({
        default: module.DialogCustomCloseButtonDemo,
      })),
    ),
  },
  drawer: {
    name: 'drawer',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Drawer').then((module) => ({
        default: module.DrawerDemo,
      })),
    ),
  },
  'drawer-dialog': {
    name: 'drawer-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Drawer').then((module) => ({
        default: module.DrawerDialogDemo,
      })),
    ),
  },
  'dropdown-menu': {
    name: 'dropdown-menu',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DropdownMenu').then((module) => ({
        default: module.DropdownMenuDemo,
      })),
    ),
  },
  'dropdown-menu-checkboxes': {
    name: 'dropdown-menu-checkboxes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DropdownMenu').then((module) => ({
        default: module.DropdownMenuCheckboxesDemo,
      })),
    ),
  },
  'dropdown-menu-radio-group': {
    name: 'dropdown-menu-radio-group',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/DropdownMenu').then((module) => ({
        default: module.DropdownMenuRadioGroupDemo,
      })),
    ),
  },
  form: {
    name: 'form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Form').then((module) => ({
        default: module.FormDemo,
      })),
    ),
  },
  'hover-card': {
    name: 'hover-card',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/HoverCard').then((module) => ({
        default: module.HoverCardDemo,
      })),
    ),
  },
  input: {
    name: 'input',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Input').then((module) => ({
        default: module.InputDemo,
      })),
    ),
  },
  'input-button': {
    name: 'input-button',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Input').then((module) => ({
        default: module.InputButtonDemo,
      })),
    ),
  },
  'input-disabled': {
    name: 'input-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Input').then((module) => ({
        default: module.InputDisabledDemo,
      })),
    ),
  },
  'input-file': {
    name: 'input-file',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Input').then((module) => ({
        default: module.InputFileDemo,
      })),
    ),
  },
  'input-label': {
    name: 'input-label',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Input').then((module) => ({
        default: module.InputLabelDemo,
      })),
    ),
  },
  'input-otp': {
    name: 'input-otp',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/InputOTP').then((module) => ({
        default: module.InputOTPDemo,
      })),
    ),
  },
  'input-otp-controlled': {
    name: 'input-otp-controlled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/InputOTP').then((module) => ({
        default: module.InputOTPControlledDemo,
      })),
    ),
  },
  'input-otp-form': {
    name: 'input-otp-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/InputOTP').then((module) => ({
        default: module.InputOTPFormDemo,
      })),
    ),
  },
  'input-otp-pattern': {
    name: 'input-otp-pattern',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/InputOTP').then((module) => ({
        default: module.InputOTPPatternDemo,
      })),
    ),
  },
  'input-otp-separator': {
    name: 'input-otp-separator',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/InputOTP').then((module) => ({
        default: module.InputOTPSeparatorDemo,
      })),
    ),
  },
  menubar: {
    name: 'menubar',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Menubar').then((module) => ({
        default: module.MenubarDemo,
      })),
    ),
  },
  'navigation-menu': {
    name: 'navigation-menu',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/NavigationMenu').then((module) => ({
        default: module.NavigationMenuDemo,
      })),
    ),
  },
  pagination: {
    name: 'pagination',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Pagination').then((module) => ({
        default: module.PaginationDemo,
      })),
    ),
  },
  popover: {
    name: 'popover',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Popover').then((module) => ({
        default: module.PopoverDemo,
      })),
    ),
  },
  progress: {
    name: 'progress',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Progress').then((module) => ({
        default: module.ProgressDemo,
      })),
    ),
  },
  'radio-group': {
    name: 'radio-group',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/RadioGroup').then((module) => ({
        default: module.RadioGroupDemo,
      })),
    ),
  },
  'radio-group-form': {
    name: 'radio-group-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/RadioGroup').then((module) => ({
        default: module.RadioGroupFormDemo,
      })),
    ),
  },
  resizable: {
    name: 'resizable',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Resizable').then((module) => ({
        default: module.ResizableDemo,
      })),
    ),
  },
  'resizable-handle': {
    name: 'resizable-handle',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Resizable').then((module) => ({
        default: module.ResizableHandleDemo,
      })),
    ),
  },
  'resizable-vertical': {
    name: 'resizable-vertical',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Resizable').then((module) => ({
        default: module.ResizableVerticalDemo,
      })),
    ),
  },
  'scroll-area': {
    name: 'scroll-area',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ScrollArea').then((module) => ({
        default: module.ScrollAreaDemo,
      })),
    ),
  },
  'scroll-area-horizontal': {
    name: 'scroll-area-horizontal',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ScrollArea').then((module) => ({
        default: module.ScrollAreaHorizontalDemo,
      })),
    ),
  },
  select: {
    name: 'select',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Select').then((module) => ({
        default: module.SelectDemo,
      })),
    ),
  },
  'select-form': {
    name: 'select-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Select').then((module) => ({
        default: module.SelectFormDemo,
      })),
    ),
  },
  'select-scrollable': {
    name: 'select-scrollable',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Select').then((module) => ({
        default: module.SelectScrollableDemo,
      })),
    ),
  },
  separator: {
    name: 'separator',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Separator').then((module) => ({
        default: module.SeparatorDemo,
      })),
    ),
  },
  sheet: {
    name: 'sheet',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Sheet').then((module) => ({
        default: module.SheetDemo,
      })),
    ),
  },
  'sheet-sides': {
    name: 'sheet-sides',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Sheet').then((module) => ({
        default: module.SheetSidesDemo,
      })),
    ),
  },
  skeleton: {
    name: 'skeleton',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Skeleton').then((module) => ({
        default: module.SkeletonDemo,
      })),
    ),
  },
  'skeleton-card': {
    name: 'skeleton-card',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Skeleton').then((module) => ({
        default: module.SkeletonCardDemo,
      })),
    ),
  },
  slider: {
    name: 'slider',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Slider').then((module) => ({
        default: module.SliderDemo,
      })),
    ),
  },
  sonner: {
    name: 'sonner',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Sonner').then((module) => ({
        default: module.SonnerDemo,
      })),
    ),
  },
  switch: {
    name: 'switch',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Switch').then((module) => ({
        default: module.SwitchDemo,
      })),
    ),
  },
  'switch-form': {
    name: 'switch-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Switch').then((module) => ({
        default: module.SwitchFormDemo,
      })),
    ),
  },
  'switch-sizes': {
    name: 'switch-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Switch').then((module) => ({
        default: module.SwitchSizesDemo,
      })),
    ),
  },
  table: {
    name: 'table',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Table').then((module) => ({
        default: module.TableDemo,
      })),
    ),
  },
  tabs: {
    name: 'tabs',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Tabs').then((module) => ({
        default: module.TabsDemo,
      })),
    ),
  },
  textarea: {
    name: 'textarea',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaDemo,
      })),
    ),
  },
  'textarea-button': {
    name: 'textarea-button',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaButtonDemo,
      })),
    ),
  },
  'textarea-disabled': {
    name: 'textarea-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaDisabledDemo,
      })),
    ),
  },
  'textarea-form': {
    name: 'textarea-form',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaFormDemo,
      })),
    ),
  },
  'textarea-label': {
    name: 'textarea-label',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaLabelDemo,
      })),
    ),
  },
  'textarea-text': {
    name: 'textarea-text',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Textarea').then((module) => ({
        default: module.TextareaTextDemo,
      })),
    ),
  },
  toast: {
    name: 'toast',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toast').then((module) => ({
        default: module.ToastDemo,
      })),
    ),
  },
  'toast-action': {
    name: 'toast-action',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toast').then((module) => ({
        default: module.ToastActionDemo,
      })),
    ),
  },
  'toast-intents': {
    name: 'toast-intents',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toast').then((module) => ({
        default: module.ToastIntentsDemo,
      })),
    ),
  },
  'toast-simple': {
    name: 'toast-simple',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toast').then((module) => ({
        default: module.ToastSimpleDemo,
      })),
    ),
  },
  'toast-title': {
    name: 'toast-title',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toast').then((module) => ({
        default: module.ToastTitleDemo,
      })),
    ),
  },
  toggle: {
    name: 'toggle',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toggle').then((module) => ({
        default: module.ToggleDemo,
      })),
    ),
  },
  'toggle-disabled': {
    name: 'toggle-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toggle').then((module) => ({
        default: module.ToggleDisabledDemo,
      })),
    ),
  },
  'toggle-sizes': {
    name: 'toggle-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toggle').then((module) => ({
        default: module.ToggleSizesDemo,
      })),
    ),
  },
  'toggle-text': {
    name: 'toggle-text',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toggle').then((module) => ({
        default: module.ToggleTextDemo,
      })),
    ),
  },
  'toggle-variants': {
    name: 'toggle-variants',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Toggle').then((module) => ({
        default: module.ToggleVariantsDemo,
      })),
    ),
  },
  'toggle-group': {
    name: 'toggle-group',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ToggleGroup').then((module) => ({
        default: module.ToggleGroupDemo,
      })),
    ),
  },
  'toggle-group-disabled': {
    name: 'toggle-group-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ToggleGroup').then((module) => ({
        default: module.ToggleGroupDisabledDemo,
      })),
    ),
  },
  'toggle-group-single': {
    name: 'toggle-group-single',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ToggleGroup').then((module) => ({
        default: module.ToggleGroupSingleDemo,
      })),
    ),
  },
  'toggle-group-sizes': {
    name: 'toggle-group-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ToggleGroup').then((module) => ({
        default: module.ToggleGroupSizesDemo,
      })),
    ),
  },
  'toggle-group-variants': {
    name: 'toggle-group-variants',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/ToggleGroup').then((module) => ({
        default: module.ToggleGroupVariantsDemo,
      })),
    ),
  },
  tooltip: {
    name: 'tooltip',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Tooltip').then((module) => ({
        default: module.TooltipDemo,
      })),
    ),
  },
  'use-is-mounted': {
    name: 'use-is-mounted',
    type: 'hook:example',
    component: lazy(() =>
      import('../demos/UseIsMounted').then((module) => ({
        default: module.UseIsMountedDemo,
      })),
    ),
  },
  'use-isomorphic-layout-effect': {
    name: 'use-isomorphic-layout-effect',
    type: 'hook:example',
    component: lazy(() =>
      import('../demos/UseIsomorphicLayoutEffect').then((module) => ({
        default: module.UseIsomorphicLayoutEffectDemo,
      })),
    ),
  },
  'use-media-query': {
    name: 'use-media-query',
    type: 'hook:example',
    component: lazy(() =>
      import('../demos/UseMediaQuery').then((module) => ({
        default: module.UseMediaQueryDemo,
      })),
    ),
  },
};
