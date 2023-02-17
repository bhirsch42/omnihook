import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler, PropsWithChildren, useRef, useState } from "react";
import { clamp, min } from "ramda";

function CloseButton() {
  return (
    <button
      type="button"
      className="bg-red-400 hover:bg-red-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}

function MinimizeButton() {
  return (
    <button
      type="button"
      className="bg-yellow-400 hover:bg-yellow-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
    >
      <FontAwesomeIcon icon={faMinus} />
    </button>
  );
}

function MaximizeButton() {
  return (
    <button
      type="button"
      className="bg-green-400 hover:bg-green-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

function WindowViewLabel({ children }: PropsWithChildren) {
  return (
    <div className="absolute -top-6 -left-1 bg-bgcolor-400 text-bgcolor-900 font-bold pl-3 pr-8 clip-tr cursor-move">
      {children}
    </div>
  );
}

function WindowViewDecoration() {
  return (
    <div className="absolute -top-3 left-1 w-full h-2 bg-striped border border-bgcolor-400 clip-tr-1 cursor-move"></div>
  );
}

function WindowViewButtonContainer({ children }: PropsWithChildren) {
  return (
    <div className="absolute top-0 right-0 bg-bgcolor-400 text-bgcolor-900 font-bold pl-6 pr-1 clip-bl items-center pb-1 grid gap-2 grid-cols-3">
      {children}
    </div>
  );
}

const DRAG_BUFFER = 20;

export function WindowView({
  children,
  label,
}: PropsWithChildren<{ label: string }>) {
  const drag = useRef({ top: 0, left: 0 });
  const isDragging = useRef<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const windowViewEl = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({
    width: 0.8,
    height: 0.8,
    top: 0.1,
    left: 0.1,
  });

  const { clientWidth, clientHeight } = window.document.documentElement;
  const elWidth = position.width * clientWidth;
  const elHeight = position.height * clientHeight;

  const minDragX = -position.left * clientWidth - elWidth + DRAG_BUFFER;
  const maxDragX = -position.left * clientWidth + clientWidth - DRAG_BUFFER;
  const clampDragX = clamp(minDragX, maxDragX - DRAG_BUFFER);

  const minDragY = -position.top * clientHeight;
  const maxDragY = minDragY + clientHeight;
  const clampDragY = clamp(minDragY + DRAG_BUFFER, maxDragY - DRAG_BUFFER);

  const clampResizeX = clamp(400, clientWidth * 1.5);
  const clampResizeY = clamp(300, clientHeight * 1.5);

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

    setPosition({
      ...position,
      top: clampDragY(y) / clientHeight + position.top,
      left: clampDragX(x) / clientWidth + position.left,
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

  const moveResize = (e: MouseEvent) => {
    if (!windowViewEl.current || !isResizing.current) return;

    const x = e.clientX - drag.current.left;
    const y = e.clientY - drag.current.top;

    const width = clampResizeX(x + position.width * clientWidth);
    const height = clampResizeY(y + position.height * clientHeight);

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
    const x = e.clientX - drag.current.left + position.width * clientWidth;
    const y = e.clientY - drag.current.top + position.height * clientHeight;

    setPosition({
      ...position,
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

  const style = {
    width: `${position.width * 100}%`,
    height: `${position.height * 100}%`,
    top: `${position.top * 100}%`,
    left: `${position.left * 100}%`,
  };

  return (
    <div
      className="absolute bg-bgcolor-900 border-4 border-bgcolor-400"
      style={style}
      ref={windowViewEl}
    >
      <div onMouseDown={startDrag}>
        <WindowViewDecoration />
        <WindowViewLabel>{label}</WindowViewLabel>
      </div>
      <div
        className="absolute -bottom-1 -right-1 w-7 h-7 bg-red-500 resize-handle border-0 border-bgcolor-400 cursor-nwse-resize"
        onMouseDown={startResize}
      ></div>
      <WindowViewButtonContainer>
        <CloseButton />
        <MinimizeButton />
        <MaximizeButton />
      </WindowViewButtonContainer>
      {children}
    </div>
  );
}
