const BUTTON_COLOR_STYLES = {
  default: "bg-bgcolor-700 hover:bg-bgcolor-600 focus:border-bgcolor-400",
  green: "bg-green-700 hover:bg-green-600 focus:border-green-400",
} as const;

type ButtonColors = keyof typeof BUTTON_COLOR_STYLES;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: ButtonColors;
};

export function Button({
  className,
  children,
  color,
  ...buttonProps
}: ButtonProps) {
  const colorStyles = BUTTON_COLOR_STYLES[color || "default"];

  return (
    <button
      {...buttonProps}
      className={`transition-colors px-2 py-1 rounded outline-none border border-transparent ${colorStyles} ${className}`}
    >
      {children}
    </button>
  );
}
