import {
  faBookAtlas,
  faWarehouse,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { DesktopBackground } from "../components/DesktopBackground";
import { DesktopIcon } from "../components/DesktopIcon";
import { useWindowManager } from "../components/WindowManager";
import { Compendium } from "./Compendium.page";
import { PilotView } from "./PilotView.page";

export function Desktop() {
  const { openWindow } = useWindowManager();

  function handleClickCompendium() {
    openWindow({
      id: "compendium",
      label: "Compendium",
      component: <Compendium />,
    });
  }

  function handleClickPilot() {
    openWindow({
      id: "pilot",
      label: "Pilot",
      component: <PilotView />,
    });
  }

  return (
    <>
      <DesktopBackground />

      <div className="flex justify-end p-5">
        <div className="grid gap-5">
          <DesktopIcon
            icon={faBookAtlas}
            label="Compendium"
            onClick={handleClickCompendium}
          />

          <DesktopIcon
            icon={faCircleUser}
            label="Pilot"
            onClick={handleClickPilot}
          />

          <DesktopIcon icon={faWarehouse} label="Mechs" />
        </div>
      </div>
    </>
  );
}
