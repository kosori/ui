'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import { useStep } from '@kosori/hooks/use-step';
import { Button } from '@kosori/ui/button';

export const UseStepDemo = () => {
  const {
    currentStep,
    canGoToPrevStep,
    canGoToNextStep,
    setStep,
    goToPrevStep,
    goToNextStep,
  } = useStep(4);

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <p className='font-mono'>Current step: {currentStep}</p>

      <div className='flex gap-1'>
        <Button
          icon
          disabled={!canGoToPrevStep}
          variant='ghost'
          onClick={() => setStep(1)}
        >
          <DoubleArrowLeftIcon />
        </Button>

        <Button
          icon
          disabled={!canGoToPrevStep}
          variant='ghost'
          onClick={goToPrevStep}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          icon
          variant={currentStep === 1 ? 'outline' : 'ghost'}
          onClick={() => setStep(1)}
        >
          1
        </Button>

        <Button
          icon
          variant={currentStep === 2 ? 'outline' : 'ghost'}
          onClick={() => setStep(2)}
        >
          2
        </Button>

        <Button
          icon
          variant={currentStep === 3 ? 'outline' : 'ghost'}
          onClick={() => setStep(3)}
        >
          3
        </Button>

        <Button
          icon
          variant={currentStep === 4 ? 'outline' : 'ghost'}
          onClick={() => setStep(4)}
        >
          4
        </Button>

        <Button
          icon
          disabled={!canGoToNextStep}
          variant='ghost'
          onClick={goToNextStep}
        >
          <ChevronRightIcon />
        </Button>

        <Button
          icon
          disabled={!canGoToNextStep}
          variant='ghost'
          onClick={() => setStep(4)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
