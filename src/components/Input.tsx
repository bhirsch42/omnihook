import { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      autoComplete="off"
      autoCorrect="off"
      className={`bg-transparent border py-1 px-3 outline-none transition-colors ${className}`}
    ></input>
  );
}
