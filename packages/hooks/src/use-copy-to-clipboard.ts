import { useCallback, useState } from 'react';

/**
 * A custom hook that provides a way to copy text to the clipboard.
 *
 * @param {number} [timeoutDuration=1000] - The duration in milliseconds to wait before clearing the copied text.
 *
 * @returns An object containing the following properties:
 *  - `isCopied`: A boolean indicating whether the text has been copied to the clipboard.
 *  - `copyToClipboard`: A function that takes a string as an argument and attempts to copy it to the clipboard.
 *  - `error`: An optional error object that can be used to handle any errors that occur during the copy operation.
 *
 * @example
 * const { isCopied, copyToClipboard } = useCopyToClipboard();
 * copyToClipboard('Text to copy');
 */
export const useCopyToClipboard = (timeoutDuration = 1000) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const oldSchoolCopy = (text: string) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  };

  const copyToClipboard = useCallback(
    async (text: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (navigator?.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          setError(null);
          setTimeout(() => setIsCopied(false), timeoutDuration);
          return true;
        } catch (error) {
          setError(
            error instanceof Error ? error : new Error('Failed to copy text'),
          );
          return false;
        }
      } else {
        try {
          oldSchoolCopy(text);
          setIsCopied(true);
          setError(null);
          setTimeout(() => setIsCopied(false), timeoutDuration);
          return true;
        } catch (error) {
          setError(
            error instanceof Error ? error : new Error('Failed to copy text'),
          );
          return false;
        }
      }
    },
    [timeoutDuration],
  );

  return { isCopied, copyToClipboard, error };
};
