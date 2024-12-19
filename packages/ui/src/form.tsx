import type { Root } from '@radix-ui/react-label';
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormProps,
} from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';
import { createContext, forwardRef, useContext, useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Slot } from '@radix-ui/react-slot';
import {
  useForm as __useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { tv } from 'tailwind-variants';

import { Label } from '@kosori/ui/label';

const formStyles = tv({
  slots: {
    item: 'space-y-2',
    label: '',
    description: 'text-sm text-grey-text',
    message: 'text-sm font-medium text-error-solid',
  },
  variants: {
    error: {
      true: {
        label: 'text-error-solid',
      },
    },
  },
});

const { item, label, description, message } = formStyles();

/**
 * Form component that provides context for form fields.
 *
 * @param {React.ComponentPropsWithoutRef<typeof FormProvider>} props - The props for the Form component.
 *
 * @example
 * ```tsx
 * <Form>
 *   <FormField control={...} name='...' render={() => <FormControl />} />
 * </Form>
 * ```
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
 * ```tsx
 * <FormField
 *   control={...}
 *   name='...'
 *   render={...} />
 * </>
 * ```
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

type FormItemRef = HTMLDivElement;
type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * FormItem component that serves as a wrapper for form fields.
 *
 * @param {FormItemProps} props - The props for the FormItem component.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel />
 *   <FormControl />
 *   <FormDescription />
 *   <FormMessage />
 * </FormItem>
 * ```
 */
export const FormItem = forwardRef<FormItemRef, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={item({ className })} {...props} />
      </FormItemContext.Provider>
    );
  },
);

FormItem.displayName = 'FormItem';

type FormLabelRef = React.ElementRef<typeof Root>;
type FormLabelProps = React.ComponentPropsWithoutRef<typeof Root>;

/**
 * FormLabel component that renders a label for the form field.
 *
 * @param {FormLabelProps} props - The props for the FormLabel component.
 *
 * @example
 * ```tsx
 * <FormLabel>Label</FormLabel>
 * ```
 */
export const FormLabel = forwardRef<FormLabelRef, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        className={label({ className, error: error ? true : false })}
        htmlFor={formItemId}
        {...props}
      />
    );
  },
);

FormLabel.displayName = 'FormLabel';

type FormControlRef = React.ElementRef<typeof Slot>;
type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

/**
 * FormControl component that wraps the form control element.
 *
 * @param {FormControlProps} props - The props for the FormControl component.
 *
 * @example
 * ```tsx
 * <FormControl>
 *   {...}
 * </FormControl>
 * ```
 */
export const FormControl = forwardRef<FormControlRef, FormControlProps>(
  ({ ...props }, ref) => {
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
  },
);

FormControl.displayName = 'FormControl';

type FormDescriptionRef = HTMLParagraphElement;
type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * FormDescription component that provides additional information about the form field.
 *
 * @param {FormDescriptionProps} props - The props for the FormDescription component.
 *
 * @example
 * ```tsx
 * <FormDescription>Description</FormDescription>
 * ```
 */
export const FormDescription = forwardRef<
  FormDescriptionRef,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      className={description({ className })}
      id={formDescriptionId}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';

type FormMessageRef = HTMLParagraphElement;
type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * FormMessage component that displays error messages for the form field.
 *
 * @param {FormMessageProps} props - The props for the FormMessage component.
 *
 * @example
 * ```tsx
 * <FormMessage>Error message</FormMessage>
 * ```
 */
export const FormMessage = forwardRef<FormMessageRef, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={message({ className })}
        id={formMessageId}
        {...props}
      >
        {body}
      </p>
    );
  },
);

FormMessage.displayName = 'FormMessage';

export const useForm = <
  TOut extends FieldValues,
  TDef extends ZodTypeDef,
  TIn extends FieldValues,
>(
  props: Omit<UseFormProps<TIn>, 'resolver'> & {
    schema: ZodType<TOut, TDef, TIn>;
  },
) => {
  const form = __useForm<TIn, unknown, TOut>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
};
