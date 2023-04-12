import { forwardRef } from "react";

const BUTTON_COLOR_STYLES = {
  default: "bg-bgcolor-700 hover:bg-bgcolor-600 focus:border-bgcolor-400",
  green: "bg-green-700 hover:bg-green-600 focus:border-green-400",
  red: "bg-red-700 hover:bg-red-600 focus:border-red-400",
} as const;

const BUTTON_SIZE_STYLES = {
  sm: "text-sm",
  md: "",
  lg: "text-lg",
} as const;

type ButtonColors = keyof typeof BUTTON_COLOR_STYLES;
type ButtonSizes = keyof typeof BUTTON_SIZE_STYLES;

const BUTTON_CIRCLE_SIZE_STYLES = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-10 h-10",
} satisfies Record<ButtonSizes, string>;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: ButtonColors;
  circle?: boolean;
  size?: ButtonSizes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, color, size, circle, ...buttonProps }, ref) => {
    const colorStyles = BUTTON_COLOR_STYLES[color || "default"];
    const sizeStyles = BUTTON_SIZE_STYLES[size || "md"];
    const circleStyles = circle
      ? `rounded-full flex items-center justify-center ${
          BUTTON_CIRCLE_SIZE_STYLES[size || "md"]
        }`
      : "rounded px-2 py-1";

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={`transition-colors outline-none border border-transparent ${colorStyles} ${sizeStyles} ${circleStyles} ${className}`}
      >
        {children}
      </button>
    );
  }
);
