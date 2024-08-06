import { lazy } from 'react';

type Component = {
  name: string;
  type: 'component:example';
  component: React.LazyExoticComponent<() => JSX.Element>;
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
  'button-variants': {
    name: 'button-variants',
    type: 'component:example',
    component: lazy(() =>
      import('../demos/Button').then((module) => ({
        default: module.ButtonVariantsDemo,
      })),
    ),
  },
};
