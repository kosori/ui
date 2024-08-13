import type { Root } from '@radix-ui/react-label';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { createContext, forwardRef, useContext, useId } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { cn } from '@kosori/ui';
import { Label } from '@kosori/ui/label';

/**
 * Form component that provides context for form fields.
 *
 * @param {React.ComponentPropsWithoutRef<typeof FormProvider>} props - The props for the Form component.
 *
 * @example
 * <>
 *   <Form>
 *     <FormField control={...} name='...' render={() => <FormControl />} />
 *   </Form>
 * </>
 *
 * @see {@link https://dub.sh/ui-form Form Docs} for further information.
 */
export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * FormField component that wraps a Controller from react-hook-form.
 *
 * @param {ControllerProps<TFieldValues, TName>} props - The props for the FormField component.
 *
 * @example
 * <FormField
 *   control={...}
 *   name='...'
 *   render={...} />
 * </>
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * FormItem component that serves as a wrapper for form fields.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the FormItem component.
 *
 * @example
 * <>
 *   <FormItem>
 *     <FormLabel />
 *     <FormControl />
 *     <FormDescription />
 *     <FormMessage />
 *   </FormItem>
 * </>
 */
export const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = 'FormItem';

/**
 * FormLabel component that renders a label for the form field.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Root>} props - The props for the FormLabel component.
 *
 * @example
 * <FormLabel>Label</FormLabel>
 */
export const FormLabel = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-error-solid', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = 'FormLabel';

/**
 * FormControl component that wraps the form control element.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - The props for the FormControl component.
 *
 * @example
 * <>
 *   <FormControl>
 *     {...}
 *   </FormControl>
 */
export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      id={formItemId}
      {...props}
    />
  );
});

FormControl.displayName = 'FormControl';

/**
 * FormDescription component that provides additional information about the form field.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the FormDescription component.
 *
 * @example
 * <FormDescription>Description</FormDescription>
 */
export const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      className={cn('text-sm text-grey-text', className)}
      id={formDescriptionId}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';

/**
 * FormMessage component that displays error messages for the form field.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The props for the FormMessage component.
 *
 * @example
 * <FormMessage>Error message</FormMessage>
 */
export const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-error-solid', className)}
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = 'FormMessage';
