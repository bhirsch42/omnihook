import { SelectNpcReturns } from "../store/npcData/selectors/selectNpcById";
import { ICONS } from "../utils/icons";
import { StatsTable, StatsTableRow } from "./StatsTable";

export function NpcStatsView({
  npc,
  className,
}: {
  npc: SelectNpcReturns;
  className?: string;
}) {
  const { npcClass, stats: currentStats } = npc;
  const { stats: classStats } = npcClass;

  const rows: StatsTableRow[] = [
    [
      ICONS.hp,
      "HP",
      <>
        {currentStats.hp}/{currentStats.maxHp}
      </>,
    ],
    [ICONS.evasion, "Evasion", classStats.evade],
    [ICONS.speed, "Speed", classStats.speed],
    [ICONS.heatcap, "Heat Capacity", classStats.heatcap],
    [ICONS.sensor, "Sensor Range", classStats.sensor],
    [ICONS.armor, "Armor", classStats.armor],
    [ICONS.edef, "E-Defense", classStats.edef],
    [ICONS.size, "Size", classStats.size],
    [ICONS.save, "Save Target", classStats.save],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
