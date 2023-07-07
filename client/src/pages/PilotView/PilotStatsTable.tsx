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
import { StatsTable } from "../../components/StatsTable";

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
    <StatsTable
      fillHeight
      className={className}
      rows={[
        [faHeart, "HP", `${pilot.hp}/${pilotStats.maxHp}`],
        [faShield, "Armor", pilotStats.armor],
        [faMicrochip, "E-Defense", pilotStats.edef],
        [faPersonFallingBurst, "Evasion", pilotStats.evasion],
        [faRunning, "Speed", pilotStats.speed],
      ]}
    />
  );
}
