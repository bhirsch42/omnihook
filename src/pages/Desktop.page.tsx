import { Link } from "@tanstack/react-router";
import { faBookAtlas, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { Compendium } from "./Compendium.page";
import { WindowView } from "../components/WindowView";
import { DesktopBackground } from "../components/DesktopBackground";
import { DesktopIcon } from "../components/DesktopIcon";
import { ReactNode, useState } from "react";
import { reject } from "ramda";

type CreateWindowProps = {
  id: string;
  label: string;
  component: ReactNode;
  focusWindow: (id: string) => void;
};

function createWindow({
  id,
  label,
  component,
  focusWindow,
}: CreateWindowProps): ManagedWindow {
  return {
    id,
    component: (
      <WindowView label={label} onMouseDown={() => focusWindow(id)} key={id}>
        {component}
      </WindowView>
    ),
  };
}

type ManagedWindow = {
  id: string;
  component: ReactNode;
};

function WindowManager() {
  const [windows, setWindows] = useState<ManagedWindow[]>([
    createWindow({
      id: "compendium",
      label: "Compendium",
      component: <Compendium />,
      focusWindow,
    }),
  ]);

  function focusWindow(id: string) {
    const withoutActive = reject<ManagedWindow>((w) => w.id === id);
    const activeWindow = windows.find((w) => w.id === id);
    if (!activeWindow) throw new Error("Error focusing window");
    setWindows([...withoutActive(windows), activeWindow]);
  }

  return (
    <>
      {windows.map((w) => {
        return w.component;
      })}
    </>
  );
}

export function Desktop() {
  return (
    <>
      <DesktopBackground />

      <div className="flex justify-end p-5">
        <div className="grid gap-5">
          <Link to="/compendium">
            <DesktopIcon icon={faBookAtlas} label="Compendium" />
          </Link>
          <Link to="/pilots">
            <DesktopIcon icon={faWarehouse} label="Mechs" />
          </Link>
        </div>
      </div>
      <WindowManager />
    </>
  );
}
