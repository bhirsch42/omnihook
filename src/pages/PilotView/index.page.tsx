import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { PilotStatsTable } from "./PilotStatsTable";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { PilotSkills } from "./PilotSkills";
import { LicenseLevel } from "./LicenseLevel";
import { Grit } from "./Grit";
import { PilotTalents } from "./PilotTalents";

export function PilotView({ pilotId }: { pilotId: string }) {
  const pilot = useAppSelector(selectPilot(pilotId));

  return (
    <div className="h-full p-3 overflow-y-scroll">
      <div className="flex items-center mb-3">
        <FontAwesomeIcon icon={faCircleUser} className="mr-3 text-5xl" />
        <div className="text-left">
          <div className="font-bold">{pilot.name}</div>
          <div className="text-sm">{pilot.callsign}</div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="mb-3">
            <LicenseLevel pilotId={pilotId} />
          </div>
          <div className="mb-3">
            <Grit pilotId={pilotId} />
          </div>

          <div className="mb-3">
            === Stats ===
            <PilotStatsTable pilotId={pilotId} className="p-3 bg-bgcolor-800" />
          </div>
          <div>
            === Skills ===
            <PilotSkills pilotId={pilotId} />
          </div>
        </div>
        <div className="flex flex-col ml-3">
          <div>
            === Talents ===
            <PilotTalents pilotId={pilotId} />
          </div>
        </div>
      </div>
    </div>
  );
}
