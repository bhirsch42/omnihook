import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "./useDrag";
import { useResize } from "./useResize";
import { always } from "ramda";

function CloseButton({ onClick }: { onClick?: MouseEventHandler }) {
  return (
    <button
      type="button"
      className="bg-red-400 hover:bg-red-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
      onClick={onClick}
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

function MaximizeButton({
  onClick,
  isMaximized,
}: {
  onClick?: MouseEventHandler;
  isMaximized: boolean;
}) {
  return (
    <button
      type="button"
      className="bg-green-400 hover:bg-green-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isMaximized ? faMinus : faPlus} />
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
    <div className="absolute top-0 right-0 bg-bgcolor-400 text-bgcolor-900 font-bold pl-6 pr-1 clip-bl items-center pb-1 grid gap-2 grid-cols-2">
      {children}
    </div>
  );
}

const DRAG_BUFFER = 20;

export function WindowView({
  children,
  label,
  onMouseDown,
  onClickClose,
}: PropsWithChildren<{
  label: string;
  onMouseDown?: MouseEventHandler;
  onClickClose?: MouseEventHandler;
}>) {
  const windowViewEl = useRef<HTMLDivElement | null>(null);

  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isIn, setIsIn] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const [oldBounds, setOldBounds] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [bounds, setBounds] = useState({
    top: 0.1,
    left: 0.1,
    width: 0.8,
    height: 0.8,
  });

  const { startDrag } = useDrag({
    windowViewEl,
    bounds,
    onChange(position) {
      setBounds({ ...bounds, ...position });
    },
  });

  const { startResize } = useResize({
    windowViewEl,
    dimensions: bounds,
    onChange(dimensions) {
      setBounds({ ...bounds, ...dimensions });
    },
  });

  function handleMaximize() {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 150);

    if (isMaximized) {
      setBounds(oldBounds);
    } else {
      setOldBounds(bounds);

      setBounds({
        top: 0,
        left: 0,
        width: 1,
        height: 1,
      });
    }

    setIsMaximized((state) => !state);
  }

  const handleClose: MouseEventHandler = (e) => {
    setIsIn(false);
    setIsTransitioning(true);
    onClickClose && setTimeout(() => onClickClose(e), 150);
  };

  const style = {
    width: `${bounds.width * 100}%`,
    height: `${bounds.height * 100}%`,
    top: `${bounds.top * 100}%`,
    left: `${bounds.left * 100}%`,
  };

  useEffect(() => {
    setIsIn(true);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 150);
  }, []);

  return (
    <div
      className={`absolute bg-bgcolor-900 border-4 border-bgcolor-400 ${
        isTransitioning && "transition-all"
      } ease-out ${!isIn && "translate-y-6 opacity-0"}`}
      style={style}
      ref={windowViewEl}
      onMouseDown={onMouseDown}
    >
      <div className="overflow-hidden w-full h-full">{children}</div>

      {!isMaximized && (
        <>
          <div onMouseDown={startDrag}>
            <WindowViewDecoration />
            <WindowViewLabel>{label}</WindowViewLabel>
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-red-500 resize-handle border-0 border-bgcolor-400 cursor-nwse-resize"
            onMouseDown={startResize}
          ></div>
        </>
      )}

      <WindowViewButtonContainer>
        <MaximizeButton onClick={handleMaximize} isMaximized={isMaximized} />
        <CloseButton onClick={handleClose} />
      </WindowViewButtonContainer>
    </div>
  );
}
