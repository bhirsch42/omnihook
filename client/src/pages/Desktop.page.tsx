import {
  faBookAtlas,
  faWarehouse,
  faCircleUser,
  faChess,
} from "@fortawesome/free-solid-svg-icons";
import { DesktopBackground } from "../components/DesktopBackground";
import { DesktopIcon } from "../components/DesktopIcon";
import { useAppSelector } from "../store/hooks";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";
import { Compendium } from "./Compendium.page";
import { Mechs } from "./Mechs.page";
import { PilotView } from "./PilotView/index.page";
import { EncounterList } from "./EncounterList.page";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { selectActivePilotSafe } from "../store/pilots/selectors/selectActivePilotSafe";

export function Desktop() {
  const { openWindow } = useWindowManager();
  const pilot = useAppSelector(selectActivePilotSafe);

  const router = useRouter();

  useEffect(() => {
    if (!pilot) {
      router.navigate({ to: "/pilots" });
    }
  }, [pilot]);

  if (!pilot) {
    return null;
  }

  const pilotId = pilot.id;

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
      component: <PilotView pilotId={pilotId} />,
    });
  }

  function handleClickMechs() {
    openWindow({
      id: "mechs",
      label: "Mechs",
      component: <Mechs pilotId={pilotId} />,
    });
  }

  function handleClickEncounters() {
    openWindow({
      id: "encounters",
      label: "Encounters",
      component: <EncounterList />,
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

          <DesktopIcon
            icon={faWarehouse}
            label="Mechs"
            onClick={handleClickMechs}
          />

          <DesktopIcon
            icon={faChess}
            label="Encounters"
            onClick={handleClickEncounters}
          />
        </div>
      </div>
    </>
  );
}
