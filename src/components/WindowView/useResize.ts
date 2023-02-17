import { clamp } from "ramda";
import { useState, useRef, MouseEventHandler } from "react";

export type Dimensions = { width: number; height: number };

type UseResizeProps = {
  windowViewEl: React.MutableRefObject<HTMLDivElement | null>;
  dimensions: Dimensions;
  onChange: ({ width, height }: Dimensions) => void;
};

export function useResize({
  windowViewEl,
  dimensions,
  onChange,
}: UseResizeProps) {
  const drag = useRef({ top: 0, left: 0 });

  const isResizing = useRef<boolean>(false);

  const { clientWidth, clientHeight } = window.document.documentElement;

  const clampResizeX = clamp(400, clientWidth * 1.5);
  const clampResizeY = clamp(300, clientHeight * 1.5);

  const moveResize = (e: MouseEvent) => {
    if (!windowViewEl.current || !isResizing.current) return;

    const x = e.clientX - drag.current.left;
    const y = e.clientY - drag.current.top;

    const width = clampResizeX(x + dimensions.width * clientWidth);
    const height = clampResizeY(y + dimensions.height * clientHeight);

    console.log(width, height);

    windowViewEl.current.style.width = `${width}px`;
    windowViewEl.current.style.height = `${height}px`;
  };

  const endResize = (e: MouseEvent) => {
    if (!windowViewEl.current || !isResizing.current) return;
    isResizing.current = false;
    window.document.removeEventListener("mousemove", moveResize);
    window.document.body.style.userSelect = "";
    window.document.body.style.cursor = "";
    const x = e.clientX - drag.current.left + dimensions.width * clientWidth;
    const y = e.clientY - drag.current.top + dimensions.height * clientHeight;

    onChange({
      width: clampResizeX(x) / clientWidth,
      height: clampResizeY(y) / clientHeight,
    });
  };

  const startResize: MouseEventHandler<HTMLDivElement> = (e) => {
    drag.current.left = e.clientX;
    drag.current.top = e.clientY;
    isResizing.current = true;
    window.document.addEventListener("mousemove", moveResize);
    window.document.addEventListener("mouseup", endResize, { once: true });
    window.document.body.style.userSelect = "none";
    window.document.body.style.cursor = "move";
  };

  return { startResize };
}
