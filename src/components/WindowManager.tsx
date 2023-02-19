import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
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
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerContextProps>({
  openWindow: always,
  closeWindow: always,
  focusWindow: always,
});

export function useWindowManager() {
  return useContext(WindowManagerContext);
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
  const [displayWindows, setDisplayWindows] = useState<ManagedWindow[]>([]);
  const windows = useRef<ManagedWindow[]>([]);

  function updateDisplayWindows() {
    setDisplayWindows([...windows.current]);
  }

  function focusWindow(id: string) {
    const withoutActive = reject<ManagedWindow>((w) => w.id === id);
    const activeWindow = windows.current.find((w) => w.id === id);
    if (!activeWindow) throw new Error(`Error focusing window: ${id}`);
    windows.current = [...withoutActive(windows.current), activeWindow];
    updateDisplayWindows();
  }

  function closeWindow(id: string) {
    const withoutWindow = reject<ManagedWindow>((w) => w.id === id);
    windows.current = withoutWindow(windows.current);
    updateDisplayWindows();
  }

  function openWindow({ id, label, component }: OpenWindowProps) {
    if (id && windows.current.find((w) => w.id === id)) {
      focusWindow(id);
      return;
    }

    windows.current.push(
      createWindow({
        id: id || uuidv4(),
        label,
        component,
        focusWindow,
        closeWindow,
      })
    );

    updateDisplayWindows();
  }

  return (
    <WindowManagerContext.Provider
      value={{ openWindow, closeWindow, focusWindow }}
    >
      {children}
      {displayWindows.map((w) => {
        return w.component;
      })}
    </WindowManagerContext.Provider>
  );
}
