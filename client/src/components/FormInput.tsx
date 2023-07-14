import { ReactNode } from "react";

import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";

export type FormInputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  register?: UseFormRegister<T>;
  fieldName?: Path<T>;
  errors?: FieldErrors;
  errorMessage?: ReactNode;
};

export function FormInput<T extends FieldValues>({
  label,
  className,
  fieldName,
  register,
  errors,
  ...inputProps
}: FormInputProps<T>) {
  const errorMessage = errors && fieldName && errors[fieldName]?.message;

  return (
    <div className={className}>
      <label className="block text-sm text-textcolor-300 mb-1">
        {">"} {label}
      </label>
      <input
        type="text"
        className="w-full bg-bgcolor-800 border-b-bgcolor-700 border-b-2 outline-none py-1 px-2 focus:border-b-bgcolor-50 transition-colors"
        {...(register && fieldName && register(fieldName))}
        {...inputProps}
      />
      {typeof errorMessage === "string" && (
        <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
