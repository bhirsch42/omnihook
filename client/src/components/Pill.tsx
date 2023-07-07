import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const PILL_COLOR_STYLES = {
  default: "bg-bgcolor-700",
  green: "bg-green-700",
  red: "bg-red-700",
  yellow: "bg-yellow-700",
  orange: "bg-orange-700",
} as const;

type PillColor = keyof typeof PILL_COLOR_STYLES;

const PILL_BUTTON_COLOR_STYLES: Record<PillColor, string> = {
  default: "hover:bg-bgcolor-600 focus:border-bgcolor-400",
  green: "hover:bg-green-600 focus:border-green-400",
  red: "hover:bg-red-600 focus:border-red-400",
  yellow: "hover:bg-yellow-600 focus:border-yellow-400",
  orange: "hover:bg-orange-600 focus:border-orange-400",
} as const;

type PillProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  onClickRemove?: () => void;
  color?: PillColor;
};

export function Pill({
  children,
  className,
  onClickRemove,
  onClick,
  color,
  ...props
}: PillProps) {
  const colorStyle = PILL_COLOR_STYLES[color || "default"];
  const buttonStyle = PILL_BUTTON_COLOR_STYLES[color || "default"];
  const style = "whitespace-nowrap text-sm transition-colors";

  if (onClickRemove) {
    if (onClick)
      throw new Error(
        "Cannot provide <Pill/> with both onClick and onClickRemove"
      );

    return (
      <div className={`flex ${className}`}>
        <div
          className={clsx(colorStyle, style, "rounded-l-full pl-3 pr-1 py-1")}
        >
          {children}
        </div>

        <button
          {...props}
          className={clsx(
            colorStyle,
            buttonStyle,
            "transition-colors rounded-r-full whitespace-nowrap pr-3 pl-2 py-1 flex items-center justify-center text-sm"
          )}
          onClick={onClickRemove}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        {...props}
        onClick={onClick}
        className={clsx(
          colorStyle,
          buttonStyle,
          style,
          "rounded-full px-3 py-1",
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={clsx(colorStyle, style, "rounded-full px-3 py-1", className)}
    >
      {children}
    </div>
  );
}
