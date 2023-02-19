import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShield,
  faMicrochip,
  faRunning,
  faPersonFallingBurst,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";

export function PilotStatsTable({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const pilot = useAppSelector(selectPilot(pilotId));
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

  return (
    <div className={`grid grid-cols-[auto_1fr] gap-x-3 ${className}`}>
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
