import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { reject } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { createWindow } from "./createWindow";
import { WindowManagerContext } from "./WindowManagerContext";

export type OpenWindowProps = {
  id?: string;
  label: string;
  component: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
};

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
    if (activeWindow === windows.current[windows.current.length - 1]) return;
    console.info(`Focusing window:`);
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
