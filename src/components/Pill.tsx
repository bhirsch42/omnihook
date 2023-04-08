import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PillProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  onClickRemove?: () => void;
};

export function Pill({
  children,
  className,
  onClickRemove,
  ...props
}: PillProps) {
  if (onClickRemove) {
    return (
      <div className={`flex ${className}`}>
        <button
          {...props}
          className={`bg-bgcolor-600 hover:bg-bgcolor-500 transition-colors rounded-l-full whitespace-nowrap text-sm pl-3 pr-1 py-1 ${
            props.onClick ? "" : "pointer-events-none"
          }`}
        >
          {children}
        </button>

        <button
          {...props}
          className={`bg-bgcolor-600 hover:bg-bgcolor-500 transition-colors rounded-r-full whitespace-nowrap pr-3 pl-2 py-1 flex items-center justify-center text-sm`}
          onClick={onClickRemove}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  }
  return (
    <button
      {...props}
      className={`bg-bgcolor-600 hover:bg-bgcolor-500 transition-colors rounded-full whitespace-nowrap text-sm px-3 py-1 ${
        props.onClick ? "" : "pointer-events-none"
      } ${className}`}
    >
      {children}
    </button>
  );
}
