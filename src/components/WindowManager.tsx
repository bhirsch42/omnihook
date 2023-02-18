import { Compendium } from "../pages/Compendium.page";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { reject, always } from "ramda";
import { WindowView } from "./WindowView";
import { v4 as uuidv4 } from "uuid";

type OpenWindowProps = {
  id?: string;
  label: string;
  component: ReactNode;
};

type CreateWindowProps = OpenWindowProps & {
  id: string;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
};

type WindowManagerContextProps = {
  openWindow: (props: OpenWindowProps) => void;
};

const WindowManagerContext = createContext<WindowManagerContextProps>({
  openWindow: always,
});

export function useWindowManager() {
  const { openWindow } = useContext(WindowManagerContext);

  return {
    openWindow,
  };
}

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

export type ManagedWindow = {
  id: string;
  component: ReactNode;
};

export function WindowManager({ children }: PropsWithChildren) {
  const [windows, setWindows] = useState<ManagedWindow[]>([]);

  function focusWindow(id: string) {
    const withoutActive = reject<ManagedWindow>((w) => w.id === id);
    const activeWindow = windows.find((w) => w.id === id);
    if (!activeWindow) throw new Error("Error focusing window");
    setWindows([...withoutActive(windows), activeWindow]);
  }

  function closeWindow(id: string) {
    const withoutWindow = reject<ManagedWindow>((w) => w.id === id);
    setWindows(withoutWindow(windows));
  }

  function openWindow({ id, label, component }: OpenWindowProps) {
    if (id && windows.find((w) => w.id === id)) {
      focusWindow(id);
      return;
    }

    setWindows([
      ...windows,
      createWindow({
        id: id || uuidv4(),
        label,
        component,
        focusWindow,
        closeWindow,
      }),
    ]);
  }

  return (
    <WindowManagerContext.Provider value={{ openWindow }}>
      {children}
      {windows.map((w) => {
        return w.component;
      })}
    </WindowManagerContext.Provider>
  );
}
