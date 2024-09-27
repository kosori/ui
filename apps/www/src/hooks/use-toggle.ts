import { useCallback, useState } from 'react';

/**
 * A custom hook that manages a boolean toggle state.
 *
 * @param {boolean} [defaultValue=false] - Initial value for the toggle state. Defaults to `false` if not provided.
 *
 * @returns An object containing:
 * - `on`: A boolean indicating the current state of the toggle (`true` for `on`, `false` for `off`).
 * - `toggle`: A function to toggle the state between `on` and `off`.
 * - `setToggle`: A function to directly set the toggle state to a specific boolean value.
 *
 * @example
 * const { on, toggle, setToggle } = useToggle();
 * on ? 'On' : 'Off';
 * toggle();
 * setToggle(true);
 */
export const useToggle = (defaultValue = false) => {
  const [on, setToggle] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setToggle((x) => !x);
  }, []);

  return { on, toggle, setToggle };
};
