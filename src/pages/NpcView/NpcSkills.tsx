import { StatsTable, StatsTableRow } from "../../components/StatsTable";
import { useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { ICONS } from "../../utils/icons";

export function NpcSkills({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpcById(npcId));

  const rows: StatsTableRow[] = [
    [ICONS.hull, "Hull", npc.skills.hull],
    [ICONS.agility, "Agility", npc.skills.agility],
    [ICONS.systems, "Systems", npc.skills.systems],
    [ICONS.engineering, "Engineering", npc.skills.engineering],
    [ICONS.save, "Save", npc.skills.save],
    [ICONS.evade, "Evade", npc.skills.evade],
    [ICONS.edef, "E-Defense", npc.skills.edef],
    [ICONS.sensor, "Sensor", npc.skills.sensor],
    [ICONS.size, "Size", npc.skills.size],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
