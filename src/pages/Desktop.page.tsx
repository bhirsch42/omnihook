import {
  faBookAtlas,
  faWarehouse,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { DesktopBackground } from "../components/DesktopBackground";
import { DesktopIcon } from "../components/DesktopIcon";
import { useWindowManager } from "../components/WindowManager";
import { useAppSelector } from "../store/hooks";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";
import { Compendium } from "./Compendium.page";
import { PilotView } from "./PilotView/index.page";

export function Desktop() {
  const { openWindow } = useWindowManager();
  const pilotId = useAppSelector(selectActivePilot).id;

  async function handleClickCompendium() {
    openWindow({
      id: "compendium",
      label: "Compendium",
      component: <Compendium />,
    });
  }

  async function handleClickPilot() {
    openWindow({
      id: "pilot",
      label: "Pilot",
      component: <PilotView pilotId={pilotId} />,
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
