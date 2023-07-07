import { always } from "ramda";
import { createContext, useContext } from "react";
import { OpenWindowProps } from ".";

type WindowManagerContextProps = {
  openWindow: (props: OpenWindowProps) => void;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
};

export const WindowManagerContext = createContext<WindowManagerContextProps>({
  openWindow: always,
  closeWindow: always,
  focusWindow: always,
});

export function useWindowManager() {
  return useContext(WindowManagerContext);
}
