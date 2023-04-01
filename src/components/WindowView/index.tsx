import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "./useDrag";
import { useResize } from "./useResize";
import { CloseButton } from "./CloseButton";
import { MaximizeButton } from "./MaximizeButton";
import { WindowViewLabel } from "./WindowViewLabel";
import { WindowViewDecoration } from "./WindowViewDecoration";
import { WindowViewButtonContainer } from "./WindowViewButtonContainer";

const DRAG_BUFFER = 20;

export const DEFAULT_WINDOW_VIEW_BOUNDS: WindowViewBounds = {
  top: 0.1,
  left: 0.1,
  width: 0.8,
  height: 0.8,
};

const EMPTY_WINDOW_VIEW_BOUNDS: WindowViewBounds = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

export type WindowViewBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type WindowViewProps = PropsWithChildren<{
  label: string;
  onMouseDown?: MouseEventHandler;
  onClickClose?: MouseEventHandler;
  initialBounds?: WindowViewBounds;
}>;

export function WindowView({
  children,
  label,
  onMouseDown,
  onClickClose,
  initialBounds,
}: WindowViewProps) {
  const windowViewEl = useRef<HTMLDivElement | null>(null);

  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isIn, setIsIn] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const [oldBounds, setOldBounds] = useState<WindowViewBounds>(
    EMPTY_WINDOW_VIEW_BOUNDS
  );

  const [bounds, setBounds] = useState<WindowViewBounds>(
    initialBounds || DEFAULT_WINDOW_VIEW_BOUNDS
  );

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
