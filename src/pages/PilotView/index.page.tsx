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
        <div className="flex flex-col mr-5">
          <div className="grid grid-rows-[auto_auto] gap-2 grid-cols-[auto_1fr] mb-3">
            <LicenseLevel pilotId={pilotId} className="w-full h-full" />
            <PilotStatsTable
              pilotId={pilotId}
              className="row-span-2 p-3 bg-bgcolor-800"
            />
            <Grit pilotId={pilotId} className="w-full h-full" />
          </div>
          <div>
            <PilotSkills pilotId={pilotId} />
          </div>
        </div>
        <div className="flex flex-col">
          <PilotTalents pilotId={pilotId} className="max-w-lg" />
        </div>
      </div>
    </div>
  );
}
