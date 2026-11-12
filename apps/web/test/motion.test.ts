import { expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  type ControllableOpenOptions,
  useControllableOpen,
} from '../registry/zen/lib/motion';

type ProbeProps = ControllableOpenOptions;

const Probe = (props: ProbeProps) =>
  createElement('span', null, String(useControllableOpen(props).open));

const resolvedOpen = (props: ProbeProps) =>
  renderToStaticMarkup(createElement(Probe, props));

test('a popup open state resolves controlled and uncontrolled props', () => {
  expect(resolvedOpen({}), 'an unset popup starts closed').toBe(
    '<span>false</span>'
  );
  expect(
    resolvedOpen({ defaultOpen: true }),
    'defaultOpen seeds the state'
  ).toBe('<span>true</span>');
  expect(resolvedOpen({ open: true }), 'a controlled open wins').toBe(
    '<span>true</span>'
  );
  expect(
    resolvedOpen({ defaultOpen: true, open: false }),
    'a controlled open overrides the uncontrolled default'
  ).toBe('<span>false</span>');
});
