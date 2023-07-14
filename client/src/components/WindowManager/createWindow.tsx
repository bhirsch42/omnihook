import { ReactNode } from "react";
import { ManagedWindow, OpenWindowProps } from ".";
import { WindowView, WindowViewBounds } from "../WindowView";

type CreateWindowProps = OpenWindowProps & {
  id: string;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
};

function createBoundsFromPadding(padding: number): WindowViewBounds {
  return {
    top: padding,
    left: padding,
    width: 1 - padding * 2,
    height: 1 - padding * 2,
  };
}

export const WINDOW_SIZES = ["sm", "md", "lg"] as const;
export type WindowSizes = (typeof WINDOW_SIZES)[number];

const BOUNDS: Record<WindowSizes, WindowViewBounds> = {
  sm: createBoundsFromPadding(0.3),
  md: createBoundsFromPadding(0.1),
  lg: createBoundsFromPadding(0.05),
};

export function createWindow({
  id,
  label,
  component,
  focusWindow,
  closeWindow,
  size,
}: CreateWindowProps): ManagedWindow {
  const initialBounds =
    size && WINDOW_SIZES.includes(size) ? BOUNDS[size] : undefined;

  return {
    id,
    component: (
      <WindowView
        label={label}
        onMouseDown={() => focusWindow(id)}
        key={id}
        onClickClose={() => closeWindow(id)}
        initialBounds={initialBounds}
        maximized={size === "full"}
      >
        {component}
      </WindowView>
    ),
  };
}
