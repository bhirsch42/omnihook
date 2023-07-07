import { MutableRefObject, PropsWithChildren, ReactNode, useRef } from "react";
import { usePopper } from "react-popper";
import { useShowPopover } from "./useShowPopover";

type PopoverProps = PropsWithChildren<{
  targetRef: MutableRefObject<null | HTMLElement>;
  duration?: number;
  hover?: boolean;
  render: (actions: { close: () => void }) => ReactNode;
}>;

export type PopperUpdate = ReturnType<typeof usePopper>["update"];

export function Popover({
  targetRef,
  hover = false,
  duration,
  children,
  render,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const { styles, attributes, update } = usePopper(
    targetRef.current,
    popoverRef.current,
    {}
  );

  const { isShowingPopover, showPopover, hidePopover } = useShowPopover({
    targetRef,
    popoverRef,
    duration,
    hover,
    update,
  });

  return (
    <div
      ref={popoverRef}
      style={styles.popper}
      {...attributes.popper}
      className={`transition-opacity max-w-sm ${
        isShowingPopover
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {render({ close: hidePopover })}
    </div>
  );
}
