import { ReactNode } from "react";
import { ManagedWindow, OpenWindowProps } from ".";
import { WindowView } from "../WindowView";

type CreateWindowProps = OpenWindowProps & {
  id: string;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
};

export function createWindow({
  id,
  label,
  component,
  focusWindow,
  closeWindow,
}: CreateWindowProps): ManagedWindow {
  return {
    id,
    component: (
      <WindowView
        label={label}
        onMouseDown={() => focusWindow(id)}
        key={id}
        onClickClose={() => closeWindow(id)}
      >
        {component}
      </WindowView>
    ),
  };
}
