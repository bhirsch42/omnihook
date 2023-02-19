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
    <div className={`grid grid-cols-[auto_auto_1fr] gap-x-3 ${className}`}>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faHeart} className="text-bgcolor-400" />
      </div>
      <div className="flex items-center">HP</div>
      <div className="flex items-center">
        {pilot.hp}/{pilotStats.maxHp}
      </div>

      <div className="flex items-center">
        <FontAwesomeIcon icon={faShield} className="text-bgcolor-400" />
      </div>
      <div className="flex items-center">Armor</div>
      <div className="flex items-center">{pilotStats.armor}</div>

      <div className="flex items-center">
        <FontAwesomeIcon icon={faMicrochip} className="text-bgcolor-400" />
      </div>
      <div className="flex items-center">E-Defense</div>
      <div className="flex items-center">{pilotStats.edef}</div>

      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faPersonFallingBurst}
          className="text-bgcolor-400"
        />
      </div>
      <div className="flex items-center">Evasion</div>
      <div className="flex items-center">{pilotStats.evasion}</div>

      <div className="flex items-center">
        <FontAwesomeIcon icon={faRunning} className="text-bgcolor-400" />
      </div>
      <div className="flex items-center">Speed</div>
      <div className="flex items-center">{pilotStats.speed}</div>
    </div>
  );
}
