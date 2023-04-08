import { MutableRefObject, useEffect, useRef, useState } from "react";
import { PopperUpdate } from ".";
import { Timeout } from "../../utils/types";

export function useShowPopover({
  targetRef,
  popoverRef,
  duration,
  hover,
  update,
}: {
  targetRef: MutableRefObject<HTMLElement | null>;
  popoverRef: MutableRefObject<HTMLElement | null>;
  duration?: number;
  hover: boolean;
  update: PopperUpdate;
}) {
  const [isShowing, setIsShowing] = useState(false);
  const hidePopoverTimeout = useRef<Timeout>();

  const hidePopover = () => {
    setIsShowing(false);
  };

  const showPopover = (e: MouseEvent) => {
    if (isShowing) return hidePopover();
    clearTimeout(hidePopoverTimeout.current);
    setIsShowing(true);
    update && update();
  };

  const handleClickAway = (e: MouseEvent) => {
    if (
      !popoverRef.current ||
      !e.target ||
      popoverRef.current === e.target ||
      targetRef.current === e.target ||
      popoverRef.current.contains(e.target as Node)
    )
      return;

    hidePopover();
  };

  useEffect(() => {
    if (!targetRef.current || !popoverRef.current || !duration) return;

    const targetEl = targetRef.current;
    const popoverEl = popoverRef.current;

    const hidePopoverDebounced = () => {
      hidePopoverTimeout.current = setTimeout(() => {
        hidePopover();
      }, duration);
    };

    targetEl.addEventListener("mouseleave", hidePopoverDebounced);
    popoverEl.addEventListener("mouseleave", hidePopoverDebounced);

    return () => {
      targetEl.removeEventListener("mouseleave", hidePopoverDebounced);
      popoverEl.removeEventListener("mouseleave", hidePopoverDebounced);
    };
  });

  useEffect(() => {
    if (!targetRef.current || !popoverRef.current || !hover) return;

    const targetEl = targetRef.current;
    const popoverEl = popoverRef.current;

    targetEl.addEventListener("mouseenter", showPopover);
    targetEl.addEventListener("blur", hidePopover);
    popoverEl.addEventListener("mouseenter", showPopover);

    return () => {
      targetEl.removeEventListener("mouseenter", showPopover);
      targetEl.removeEventListener("blur", hidePopover);
      popoverEl.removeEventListener("mouseenter", showPopover);
    };
  });

  useEffect(() => {
    if (!targetRef.current || !popoverRef.current) return;

    const targetEl = targetRef.current;

    targetEl.addEventListener("click", showPopover);
    window.document.addEventListener("click", handleClickAway);

    return () => {
      targetEl.removeEventListener("click", showPopover);
      window.document.removeEventListener("click", handleClickAway);
    };
  });

  return { showPopover, hidePopover, isShowingPopover: isShowing };
}
