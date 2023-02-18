import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faHeart,
  faShield,
  faMicrochip,
  faRunning,
  faPersonFallingBurst,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../store/hooks";
import { selectPilotStats } from "../store/pilots/selectors/selectPilotStats";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";

function PilotStatsTable({ className }: { className?: string }) {
  const pilot = useAppSelector(selectActivePilot);
  const pilotStats = useAppSelector(selectPilotStats);

  return (
    <div className={`grid grid-cols-2 gap-x-3 auto-cols-min ${className}`}>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faHeart} className="mr-2 text-bgcolor-400" />
        <div>HP</div>
      </div>
      <div>
        {pilot.hp}/{pilotStats.maxHp}
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faShield} className="mr-2 text-bgcolor-400" />
        <div>Armor</div>
      </div>
      <div>{pilotStats.armor}</div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faMicrochip} className="mr-2 text-bgcolor-400" />
        <div>E-Defense</div>
      </div>
      <div>{pilotStats.edef}</div>
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faPersonFallingBurst}
          className="mr-2 text-bgcolor-400"
        />
        <div>Evasion</div>
      </div>
      <div>{pilotStats.evasion}</div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faRunning} className="mr-2 text-bgcolor-400" />
        <div>Speed</div>
      </div>
      <div>{pilotStats.speed}</div>
    </div>
  );
}

export function PilotView() {
  const pilot = useAppSelector(selectActivePilot);
  const pilotStats = useAppSelector(selectPilotStats);

  return (
    <div className="p-3">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCircleUser} className="text-5xl mr-3" />
        <div className="text-left">
          <div className="font-bold">{pilot.name}</div>
          <div className="text-sm">{pilot.callsign}</div>
        </div>
      </div>
      <div className="flex mt-3">
        <div>
          Stats
          <PilotStatsTable className="p-3 bg-bgcolor-800" />
        </div>
      </div>
    </div>
  );
}
