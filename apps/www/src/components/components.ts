import { lazy } from 'react';

type Component<T = object> = {
  name: string;
  type: 'component:example' | 'hook:example' | 'component:mini';
  component: React.LazyExoticComponent<(props: T) => JSX.Element>;
};

export const Components: Record<string, Component> = {
  accordion: {
    name: 'accordion',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/accordion').then((module) => ({
        default: module.AccordionDemo,
      })),
    ),
  },
  alert: {
    name: 'alert',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert').then((module) => ({
        default: module.AlertDemo,
      })),
    ),
  },
  'alert-error': {
    name: 'alert-error',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert').then((module) => ({
        default: module.AlertErrorDemo,
      })),
    ),
  },
  'alert-info': {
    name: 'alert-info',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert').then((module) => ({
        default: module.AlertInfoDemo,
      })),
    ),
  },
  'alert-success': {
    name: 'alert-success',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert').then((module) => ({
        default: module.AlertSuccessDemo,
      })),
    ),
  },
  'alert-warning': {
    name: 'alert-warning',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert').then((module) => ({
        default: module.AlertWarningDemo,
      })),
    ),
  },
  'alert-dialog': {
    name: 'alert-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/alert-dialog').then((module) => ({
        default: module.AlertDialogDemo,
      })),
    ),
  },
  'aspect-ratio': {
    name: 'aspect-ratio',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/aspect-ratio').then((module) => ({
        default: module.AspectRatioDemo,
      })),
    ),
  },
  'aspect-ratio-square': {
    name: 'aspect-ratio-square',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/aspect-ratio').then((module) => ({
        default: module.AspectRatioSquareDemo,
      })),
    ),
  },
  'aspect-ratio-portrait': {
    name: 'aspect-ratio-portrait',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/aspect-ratio').then((module) => ({
        default: module.AspectRatioPortraitDemo,
      })),
    ),
  },
  avatar: {
    name: 'avatar',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/avatar').then((module) => ({
        default: module.AvatarDemo,
      })),
    ),
  },
  'avatar-shapes': {
    name: 'avatar-shapes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/avatar').then((module) => ({
        default: module.AvatarShapesDemo,
      })),
    ),
  },
  'avatar-sizes': {
    name: 'avatar-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/avatar').then((module) => ({
        default: module.AvatarSizesDemo,
      })),
    ),
  },
  badge: {
    name: 'badge',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/badge').then((module) => ({
        default: module.BadgeDemo,
      })),
    ),
  },
  'badge-intents': {
    name: 'badge-intents',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/badge').then((module) => ({
        default: module.BadgeIntentsDemo,
      })),
    ),
  },
  'badge-sizes': {
    name: 'badge-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/badge').then((module) => ({
        default: module.BadgeSizesDemo,
      })),
    ),
  },
  'blend-shift': {
    name: 'blend-shift',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/blend-shift').then((module) => ({
        default: module.BlendShiftDemo,
      })),
    ),
  },
  breadcrumb: {
    name: 'breadcrumb',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/breadcrumb').then((module) => ({
        default: module.BreadcrumbDemo,
      })),
    ),
  },
  button: {
    name: 'button',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/button').then((module) => ({
        default: module.ButtonDemo,
      })),
    ),
  },
  'button-disabled': {
    name: 'button-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/button').then((module) => ({
        default: module.ButtonDisabledDemo,
      })),
    ),
  },
  'button-icon': {
    name: 'button-icon',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/button').then((module) => ({
        default: module.ButtonIconDemo,
      })),
    ),
  },
  'button-intents': {
    name: 'button-intents',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/button').then((module) => ({
        default: module.ButtonIntentsDemo,
      })),
    ),
  },
  'button-sizes': {
    name: 'button-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/button').then((module) => ({
        default: module.ButtonSizesDemo,
      })),
    ),
  },
  calendar: {
    name: 'calendar',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/calendar').then((module) => ({
        default: module.CalendarDemo,
      })),
    ),
  },
  card: {
    name: 'card',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/card').then((module) => ({
        default: module.CardDemo,
      })),
    ),
  },
  carousel: {
    name: 'carousel',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselDemo,
      })),
    ),
  },
  'carousel-api': {
    name: 'carousel-api',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselApiDemo,
      })),
    ),
  },
  'carousel-autoplay': {
    name: 'carousel-autoplay',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselAutoplayDemo,
      })),
    ),
  },
  'carousel-orientation': {
    name: 'carousel-orientation',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselOrientationDemo,
      })),
    ),
  },
  'carousel-sizes': {
    name: 'carousel-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselSizesDemo,
      })),
    ),
  },
  'carousel-spacing': {
    name: 'carousel-spacing',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/carousel').then((module) => ({
        default: module.CarouselSpacingDemo,
      })),
    ),
  },
  checkbox: {
    name: 'checkbox',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxDemo,
      })),
    ),
  },
  'checkbox-caption': {
    name: 'checkbox-caption',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxCaptionDemo,
      })),
    ),
  },
  'checkbox-form-complex': {
    name: 'checkbox-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxFormComplexDemo,
      })),
    ),
  },
  'checkbox-form-simple': {
    name: 'checkbox-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxFormSimpleDemo,
      })),
    ),
  },
  'checkbox-disabled': {
    name: 'checkbox-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxDisabledDemo,
      })),
    ),
  },
  'checkbox-shapes': {
    name: 'checkbox-shapes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxShapesDemo,
      })),
    ),
  },
  'checkbox-sizes': {
    name: 'checkbox-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/checkbox').then((module) => ({
        default: module.CheckboxSizesDemo,
      })),
    ),
  },
  collapsible: {
    name: 'collapsible',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/collapsible').then((module) => ({
        default: module.CollapsibleDemo,
      })),
    ),
  },
  combobox: {
    name: 'combobox',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/combobox').then((module) => ({
        default: module.ComboboxDemo,
      })),
    ),
  },
  'combobox-popover': {
    name: 'combobox-popover',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/combobox').then((module) => ({
        default: module.ComboboxPopoverDemo,
      })),
    ),
  },
  'combobox-dropdown-menu': {
    name: 'combobox-dropdown',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/combobox').then((module) => ({
        default: module.ComboboxDropdownMenuDemo,
      })),
    ),
  },
  'combobox-responsive': {
    name: 'combobox-responsive',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/combobox').then((module) => ({
        default: module.ComboboxResponsiveDemo,
      })),
    ),
  },
  command: {
    name: 'command',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/command').then((module) => ({
        default: module.CommandDemo,
      })),
    ),
  },
  'command-dialog': {
    name: 'command-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/command').then((module) => ({
        default: module.CommandDialogDemo,
      })),
    ),
  },
  'context-menu': {
    name: 'context-menu',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/context-menu').then((module) => ({
        default: module.ContextMenuDemo,
      })),
    ),
  },
  'data-table': {
    name: 'data-table',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/data-table').then((module) => ({
        default: module.DataTableDemo,
      })),
    ),
  },
  'date-picker': {
    name: 'date-picker',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/date-picker').then((module) => ({
        default: module.DatePickerDemo,
      })),
    ),
  },
  'date-picker-range': {
    name: 'date-picker-range',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/date-picker').then((module) => ({
        default: module.DatePickerRangeDemo,
      })),
    ),
  },
  'date-picker-presets': {
    name: 'date-picker-presets',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/date-picker').then((module) => ({
        default: module.DatePickerPresetsDemo,
      })),
    ),
  },
  'date-picker-form': {
    name: 'date-picker-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/date-picker').then((module) => ({
        default: module.DatePickerFormDemo,
      })),
    ),
  },
  dialog: {
    name: 'dialog',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dialog').then((module) => ({
        default: module.DialogDemo,
      })),
    ),
  },
  'dialog-custom-close-button': {
    name: 'dialog-custom-close-button',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dialog').then((module) => ({
        default: module.DialogCustomCloseButtonDemo,
      })),
    ),
  },
  'doble-spinner': {
    name: 'doble-spinner',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/doble-spinner').then((module) => ({
        default: module.DobleSpinnerDemo,
      })),
    ),
  },
  'dot-wave': {
    name: 'dot-wave',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dot-wave').then((module) => ({
        default: module.DotWaveDemo,
      })),
    ),
  },
  'dots-pulse': {
    name: 'dots-pulse',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dots-pulse').then((module) => ({
        default: module.DotsPulseDemo,
      })),
    ),
  },
  'dots-scale': {
    name: 'dots-scale',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dots-scale').then((module) => ({
        default: module.DotsScaleDemo,
      })),
    ),
  },
  drawer: {
    name: 'drawer',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/drawer').then((module) => ({
        default: module.DrawerDemo,
      })),
    ),
  },
  'drawer-dialog': {
    name: 'drawer-dialog',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/drawer').then((module) => ({
        default: module.DrawerDialogDemo,
      })),
    ),
  },
  'dropdown-menu': {
    name: 'dropdown-menu',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dropdown-menu').then((module) => ({
        default: module.DropdownMenuDemo,
      })),
    ),
  },
  'file-tree': {
    name: 'file-tree',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/file-tree').then((module) => ({
        default: module.FileTreeDemo,
      })),
    ),
  },
  'dropdown-menu-checkboxes': {
    name: 'dropdown-menu-checkboxes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dropdown-menu').then((module) => ({
        default: module.DropdownMenuCheckboxesDemo,
      })),
    ),
  },
  'dropdown-menu-radio-group': {
    name: 'dropdown-menu-radio-group',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/dropdown-menu').then((module) => ({
        default: module.DropdownMenuRadioGroupDemo,
      })),
    ),
  },
  'fill-shift': {
    name: 'fill-shift',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/fill-shift').then((module) => ({
        default: module.FillShiftDemo,
      })),
    ),
  },
  'fill-shrink': {
    name: 'fill-shrink',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/fill-shrink').then((module) => ({
        default: module.FillShrinkDemo,
      })),
    ),
  },
  flick: {
    name: 'flick',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/flick').then((module) => ({
        default: module.FlickDemo,
      })),
    ),
  },
  form: {
    name: 'form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/form').then((module) => ({
        default: module.FormDemo,
      })),
    ),
  },
  'hover-card': {
    name: 'hover-card',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/hover-card').then((module) => ({
        default: module.HoverCardDemo,
      })),
    ),
  },
  input: {
    name: 'input',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputDemo,
      })),
    ),
  },
  'input-button': {
    name: 'input-button',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputButtonDemo,
      })),
    ),
  },
  'input-disabled': {
    name: 'input-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputDisabledDemo,
      })),
    ),
  },
  'input-end-icon': {
    name: 'input-end-icon',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputEndIconDemo,
      })),
    ),
  },
  'input-file': {
    name: 'input-file',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputFileDemo,
      })),
    ),
  },
  'input-invalid': {
    name: 'input-invalid',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputInvalidDemo,
      })),
    ),
  },
  'input-label': {
    name: 'input-label',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputLabelDemo,
      })),
    ),
  },
  'input-start-icon': {
    name: 'input-start-icon',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input').then((module) => ({
        default: module.InputStartIconDemo,
      })),
    ),
  },
  'input-otp': {
    name: 'input-otp',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input-otp').then((module) => ({
        default: module.InputOTPDemo,
      })),
    ),
  },
  'input-otp-controlled': {
    name: 'input-otp-controlled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input-otp').then((module) => ({
        default: module.InputOTPControlledDemo,
      })),
    ),
  },
  'input-otp-form': {
    name: 'input-otp-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input-otp').then((module) => ({
        default: module.InputOTPFormDemo,
      })),
    ),
  },
  'input-otp-pattern': {
    name: 'input-otp-pattern',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input-otp').then((module) => ({
        default: module.InputOTPPatternDemo,
      })),
    ),
  },
  'input-otp-separator': {
    name: 'input-otp-separator',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/input-otp').then((module) => ({
        default: module.InputOTPSeparatorDemo,
      })),
    ),
  },
  keycap: {
    name: 'keycap',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/keycap').then((module) => ({
        default: module.KeycapDemo,
      })),
    ),
  },
  menubar: {
    name: 'menubar',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/menubar').then((module) => ({
        default: module.MenubarDemo,
      })),
    ),
  },
  'navigation-menu': {
    name: 'navigation-menu',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/navigation-menu').then((module) => ({
        default: module.NavigationMenuDemo,
      })),
    ),
  },
  pagination: {
    name: 'pagination',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/pagination').then((module) => ({
        default: module.PaginationDemo,
      })),
    ),
  },
  popover: {
    name: 'popover',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/popover').then((module) => ({
        default: module.PopoverDemo,
      })),
    ),
  },
  progress: {
    name: 'progress',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/progress').then((module) => ({
        default: module.ProgressDemo,
      })),
    ),
  },
  'radio-group': {
    name: 'radio-group',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/radio-group').then((module) => ({
        default: module.RadioGroupDemo,
      })),
    ),
  },
  'radio-group-form': {
    name: 'radio-group-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/radio-group').then((module) => ({
        default: module.RadioGroupFormDemo,
      })),
    ),
  },
  resizable: {
    name: 'resizable',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/resizable').then((module) => ({
        default: module.ResizableDemo,
      })),
    ),
  },
  'resizable-handle': {
    name: 'resizable-handle',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/resizable').then((module) => ({
        default: module.ResizableHandleDemo,
      })),
    ),
  },
  'resizable-vertical': {
    name: 'resizable-vertical',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/resizable').then((module) => ({
        default: module.ResizableVerticalDemo,
      })),
    ),
  },
  'scroll-area': {
    name: 'scroll-area',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/scroll-area').then((module) => ({
        default: module.ScrollAreaDemo,
      })),
    ),
  },
  'scroll-area-horizontal': {
    name: 'scroll-area-horizontal',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/scroll-area').then((module) => ({
        default: module.ScrollAreaHorizontalDemo,
      })),
    ),
  },
  select: {
    name: 'select',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/select').then((module) => ({
        default: module.SelectDemo,
      })),
    ),
  },
  'select-form': {
    name: 'select-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/select').then((module) => ({
        default: module.SelectFormDemo,
      })),
    ),
  },
  'select-scrollable': {
    name: 'select-scrollable',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/select').then((module) => ({
        default: module.SelectScrollableDemo,
      })),
    ),
  },
  separator: {
    name: 'separator',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/separator').then((module) => ({
        default: module.SeparatorDemo,
      })),
    ),
  },
  sheet: {
    name: 'sheet',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/sheet').then((module) => ({
        default: module.SheetDemo,
      })),
    ),
  },
  'sheet-sides': {
    name: 'sheet-sides',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/sheet').then((module) => ({
        default: module.SheetSidesDemo,
      })),
    ),
  },
  shine: {
    name: 'shine',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/shine').then((module) => ({
        default: module.ShineDemo,
      })),
    ),
  },
  skeleton: {
    name: 'skeleton',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/skeleton').then((module) => ({
        default: module.SkeletonDemo,
      })),
    ),
  },
  'skeleton-card': {
    name: 'skeleton-card',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/skeleton').then((module) => ({
        default: module.SkeletonCardDemo,
      })),
    ),
  },
  slider: {
    name: 'slider',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/slider').then((module) => ({
        default: module.SliderDemo,
      })),
    ),
  },
  sonner: {
    name: 'sonner',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/sonner').then((module) => ({
        default: module.SonnerDemo,
      })),
    ),
  },
  spinner: {
    name: 'spinner',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/spinner').then((module) => ({
        default: module.SpinnerDemo,
      })),
    ),
  },
  squiggle: {
    name: 'squiggle',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/squiggle').then((module) => ({
        default: module.SquiggleDemo,
      })),
    ),
  },
  swing: {
    name: 'swing',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/swing').then((module) => ({
        default: module.SwingDemo,
      })),
    ),
  },
  switch: {
    name: 'switch',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/switch').then((module) => ({
        default: module.SwitchDemo,
      })),
    ),
  },
  'switch-form': {
    name: 'switch-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/switch').then((module) => ({
        default: module.SwitchFormDemo,
      })),
    ),
  },
  'switch-sizes': {
    name: 'switch-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/switch').then((module) => ({
        default: module.SwitchSizesDemo,
      })),
    ),
  },
  table: {
    name: 'table',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/table').then((module) => ({
        default: module.TableDemo,
      })),
    ),
  },
  tabs: {
    name: 'tabs',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/tabs').then((module) => ({
        default: module.TabsDemo,
      })),
    ),
  },
  'text-shine': {
    name: 'text-shine',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/text-shine').then((module) => ({
        default: module.TextShineDemo,
      })),
    ),
  },
  'text-gradient': {
    name: 'text-gradient',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/text-gradient').then((module) => ({
        default: module.TextGradientDemo,
      })),
    ),
  },
  textarea: {
    name: 'textarea',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaDemo,
      })),
    ),
  },
  'textarea-button': {
    name: 'textarea-button',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaButtonDemo,
      })),
    ),
  },
  'textarea-disabled': {
    name: 'textarea-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaDisabledDemo,
      })),
    ),
  },
  'textarea-form': {
    name: 'textarea-form',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaFormDemo,
      })),
    ),
  },
  'textarea-label': {
    name: 'textarea-label',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaLabelDemo,
      })),
    ),
  },
  'textarea-text': {
    name: 'textarea-text',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/textarea').then((module) => ({
        default: module.TextareaTextDemo,
      })),
    ),
  },
  toast: {
    name: 'toast',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toast').then((module) => ({
        default: module.ToastDemo,
      })),
    ),
  },
  'toast-action': {
    name: 'toast-action',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toast').then((module) => ({
        default: module.ToastActionDemo,
      })),
    ),
  },
  'toast-intents': {
    name: 'toast-intents',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toast').then((module) => ({
        default: module.ToastIntentsDemo,
      })),
    ),
  },
  'toast-simple': {
    name: 'toast-simple',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toast').then((module) => ({
        default: module.ToastSimpleDemo,
      })),
    ),
  },
  'toast-title': {
    name: 'toast-title',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toast').then((module) => ({
        default: module.ToastTitleDemo,
      })),
    ),
  },
  toggle: {
    name: 'toggle',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle').then((module) => ({
        default: module.ToggleDemo,
      })),
    ),
  },
  'toggle-disabled': {
    name: 'toggle-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle').then((module) => ({
        default: module.ToggleDisabledDemo,
      })),
    ),
  },
  'toggle-sizes': {
    name: 'toggle-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle').then((module) => ({
        default: module.ToggleSizesDemo,
      })),
    ),
  },
  'toggle-text': {
    name: 'toggle-text',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle').then((module) => ({
        default: module.ToggleTextDemo,
      })),
    ),
  },
  'toggle-variants': {
    name: 'toggle-variants',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle').then((module) => ({
        default: module.ToggleVariantsDemo,
      })),
    ),
  },
  'toggle-group': {
    name: 'toggle-group',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle-group').then((module) => ({
        default: module.ToggleGroupDemo,
      })),
    ),
  },
  'toggle-group-disabled': {
    name: 'toggle-group-disabled',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle-group').then((module) => ({
        default: module.ToggleGroupDisabledDemo,
      })),
    ),
  },
  'toggle-group-single': {
    name: 'toggle-group-single',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle-group').then((module) => ({
        default: module.ToggleGroupSingleDemo,
      })),
    ),
  },
  'toggle-group-sizes': {
    name: 'toggle-group-sizes',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle-group').then((module) => ({
        default: module.ToggleGroupSizesDemo,
      })),
    ),
  },
  'toggle-group-variants': {
    name: 'toggle-group-variants',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/toggle-group').then((module) => ({
        default: module.ToggleGroupVariantsDemo,
      })),
    ),
  },
  tooltip: {
    name: 'tooltip',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/tooltip').then((module) => ({
        default: module.TooltipDemo,
      })),
    ),
  },
  waveform: {
    name: 'waveform',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/waveform').then((module) => ({
        default: module.WaveformDemo,
      })),
    ),
  },
  wavy: {
    name: 'wavy',
    type: 'component:mini',
    component: lazy(() =>
      import('./demos/wavy').then((module) => ({
        default: module.WavyDemo,
      })),
    ),
  },
  wobble: {
    name: 'wobble',
    type: 'component:example',
    component: lazy(() =>
      import('./demos/wobble').then((module) => ({
        default: module.WobbleDemo,
      })),
    ),
  },
  'use-copy-to-clipboard': {
    name: 'use-copy-to-clipboard',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-copy-to-clipboard').then((module) => ({
        default: module.UseCopyToClipboardDemo,
      })),
    ),
  },
  'use-is-mounted': {
    name: 'use-is-mounted',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-is-mounted').then((module) => ({
        default: module.UseIsMountedDemo,
      })),
    ),
  },
  'use-isomorphic-layout-effect': {
    name: 'use-isomorphic-layout-effect',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-isomorphic-layout-effect').then((module) => ({
        default: module.UseIsomorphicLayoutEffectDemo,
      })),
    ),
  },
  'use-media-query': {
    name: 'use-media-query',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-media-query').then((module) => ({
        default: module.UseMediaQueryDemo,
      })),
    ),
  },
  'use-step': {
    name: 'use-step',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-step').then((module) => ({
        default: module.UseStepDemo,
      })),
    ),
  },
  'use-timeout': {
    name: 'use-timeout',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-timeout').then((module) => ({
        default: module.UseTimeoutDemo,
      })),
    ),
  },
  'use-toggle': {
    name: 'use-toggle',
    type: 'hook:example',
    component: lazy(() =>
      import('./demos/use-toggle').then((module) => ({
        default: module.UseToggleDemo,
      })),
    ),
  },
};
