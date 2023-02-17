import { clamp } from "ramda";
import { useState, useRef, MouseEventHandler } from "react";
import { Dimensions } from "./useResize";

type Position = {
  top: number;
  left: number;
};

type Bounds = Position & Dimensions;

type UseDragProps = {
  windowViewEl: React.MutableRefObject<HTMLDivElement | null>;
  onChange: (bounds: Position) => void;
  bounds: Bounds;
};

const DRAG_BUFFER = 20;

export function useDrag({ windowViewEl, bounds, onChange }: UseDragProps) {
  const drag = useRef({ top: 0, left: 0 });
  const isDragging = useRef<boolean>(false);

  const { clientWidth, clientHeight } = window.document.documentElement;
  const elWidth = bounds.width * clientWidth;

  const minDragX = -bounds.left * clientWidth - elWidth + DRAG_BUFFER;
  const maxDragX = -bounds.left * clientWidth + clientWidth - DRAG_BUFFER;
  const clampDragX = clamp(minDragX, maxDragX - DRAG_BUFFER);

  const minDragY = -bounds.top * clientHeight;
  const maxDragY = minDragY + clientHeight;
  const clampDragY = clamp(minDragY + DRAG_BUFFER, maxDragY - DRAG_BUFFER);

  const moveDrag = (e: MouseEvent) => {
    if (!windowViewEl.current || !isDragging.current) return;
    const x = clampDragX(e.clientX - drag.current.left);
    const y = clampDragY(e.clientY - drag.current.top);
    windowViewEl.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
  };

  const endDrag = (e: MouseEvent) => {
    if (!windowViewEl.current || !isDragging.current) return;
    isDragging.current = false;
    windowViewEl.current.style.transform = "";
    window.document.removeEventListener("mousemove", moveDrag);
    window.document.body.style.userSelect = "";
    window.document.body.style.cursor = "";

    const x = clampDragX(e.clientX - drag.current.left);
    const y = clampDragX(e.clientY - drag.current.top);

    onChange({
      top: clampDragY(y) / clientHeight + bounds.top,
      left: clampDragX(x) / clientWidth + bounds.left,
    });
  };

  const startDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    drag.current.left = e.clientX;
    drag.current.top = e.clientY;
    isDragging.current = true;
    window.document.addEventListener("mousemove", moveDrag);
    window.document.addEventListener("mouseup", endDrag, { once: true });
    window.document.body.style.userSelect = "none";
    window.document.body.style.cursor = "move";
  };

  return { startDrag };
}
