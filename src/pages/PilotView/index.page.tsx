import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { PilotStatsTable } from "./PilotStatsTable";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { PilotSkills } from "./PilotSkills";
import { LicenseLevel } from "./LicenseLevel";
import { Grit } from "./Grit";

export function PilotView({ pilotId }: { pilotId: string }) {
  const pilot = useAppSelector(selectPilot(pilotId));

  return (
    <div className="p-3 overflow-y-scroll h-full">
      <div className="flex items-center mb-3">
        <FontAwesomeIcon icon={faCircleUser} className="text-5xl mr-3" />
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
            Stats
            <PilotStatsTable pilotId={pilotId} className="p-3 bg-bgcolor-800" />
          </div>
          <div>
            Skills
            <PilotSkills pilotId={pilotId} className="p-3 bg-bgcolor-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
