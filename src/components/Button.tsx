import { ButtonProps } from "../pages/Pilots.page";

export function Button({ className, children, ...buttonProps }: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`${className} bg-bgcolor-700 hover:bg-bgcolor-600 transition-colors px-2 py-1 rounded outline-none focus:border-bgcolor-400 border border-transparent`}
    >
      {children}
    </button>
  );
}
