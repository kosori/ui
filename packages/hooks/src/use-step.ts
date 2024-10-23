import { useCallback, useState } from 'react';

/**
 * A custom hook that manages multi-step navigation in applications.
 *
 * @param {number} [maxStep] - The maximum number of steps in the navigation process.
 *
 * @returns An object containing the following properties:
 *  - `currentStep`: The current step number, initialized to 1.
 *  - `goToNextStep`: A function that increments the current step by 1 if the next step is available.
 *  - `goToPrevStep`: A function that decrements the current step by 1 if the previous step exists.
 *  - `canGoToNextStep`: A boolean indicating whether the user can proceed to the next step.
 *  - `canGoToPrevStep`: A boolean indicating whether the user can go back to the previous step.
 *  - `setStep`: A function that sets the current step either directly with a number or via a function that computes the new step based on the previous one.
 *  - `reset`: A function that resets the current step back to 1.
 *
 * @example
 * const { currentStep, goToNextStep, setStep, reset } = useStep(5);
 *
 * <p>{currentStep}</p>
 * <button onClick={goToNextStep}>Next</button>
 * <button onClick={() => setStep(currentStep + 2)}>Set Step to 3</button>
 * <button onClick={reset}>Reset</button>
 */
export const useStep = (maxStep: number) => {
  const [currentStep, setCurrentStep] = useState(1);

  const canGoToNextStep = currentStep + 1 <= maxStep;
  const canGoToPrevStep = currentStep - 1 > 0;

  const setStep = useCallback(
    (step: number | ((step: number) => number)) => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step;

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep);
        return;
      }

      throw new Error('Step not valid');
    },
    [maxStep, currentStep],
  );

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep]);

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPrevStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  return {
    currentStep,
    goToNextStep,
    goToPrevStep,
    canGoToNextStep,
    canGoToPrevStep,
    setStep,
    reset,
  };
};
