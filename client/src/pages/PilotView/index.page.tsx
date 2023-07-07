import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { PilotStatsTable } from "./PilotStatsTable";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { PilotSkills } from "./PilotSkills";
import { LicenseLevel } from "./LicenseLevel";
import { Grit } from "./Grit";
import { PilotTalents } from "./PilotTalents";
import { PilotEquipment as PilotGearInventory } from "./PilotGearInventory";
import { PilotWeaponsAndArmor } from "./PilotWeaponsAndArmor";

export function PilotView({ pilotId }: { pilotId: string }) {
  const pilot = useAppSelector(selectPilot(pilotId));

  return (
    <div className="h-full p-3 overflow-y-scroll @container">
      <div className="flex items-center mb-3">
        <FontAwesomeIcon icon={faCircleUser} className="mr-3 text-5xl" />
        <div className="text-left">
          <div className="font-bold">{pilot.name}</div>
          <div className="text-sm">{pilot.callsign}</div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] @7xl:grid-cols-[auto_auto_1fr] gap-3">
        <div className="grid gap-3 grid-rows-[auto_auto_1fr]">
          <div className="grid grid-rows-[auto_auto] gap-2 grid-cols-[auto_1fr]">
            <LicenseLevel pilotId={pilotId} className="w-full h-full" />
            <PilotStatsTable
              pilotId={pilotId}
              className="row-span-2 p-3 bg-bgcolor-800"
            />
            <Grit pilotId={pilotId} className="w-full h-full" />
          </div>

          <PilotSkills pilotId={pilotId} />

          <PilotGearInventory pilotId={pilotId} className="block @7xl:hidden" />
        </div>

        <div className="@7xl:max-w-2xl">
          <PilotWeaponsAndArmor pilotId={pilotId} className="mb-3" />
          <PilotTalents pilotId={pilotId} />
        </div>

        <PilotGearInventory
          pilotId={pilotId}
          className="hidden @7xl:block @7xl:max-w-lg"
        />
      </div>
    </div>
  );
}
