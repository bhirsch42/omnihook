import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { ICONS } from "../utils/icons";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { TieredSizeView } from "./TieredSizeView";
import { TieredStatView } from "./TieredStatView";

export function NpcClassStatsView({
  npcClass,
  className,
}: {
  npcClass: NpcClass;
  className?: string;
}) {
  const { stats } = npcClass;

  const sizes = stats.size.map((tieredSize) => (
    <div className="flex flex-col">
      {tieredSize.map((size, i) => (
        <div key={i}>{size}</div>
      ))}
    </div>
  ));

  const rows: StatsTableRow[] = [
    [ICONS.hp, "HP", <TieredStatView tieredStat={stats.hp} />],
    [ICONS.evasion, "Evasion", <TieredStatView tieredStat={stats.evade} />],
    [ICONS.speed, "Speed", <TieredStatView tieredStat={stats.speed} />],
    [
      ICONS.heatcap,
      "Heat Capacity",
      <TieredStatView tieredStat={stats.heatcap} />,
    ],
    [
      ICONS.sensor,
      "Sensor Range",
      <TieredStatView tieredStat={stats.sensor} />,
    ],
    [ICONS.armor, "Armor", <TieredStatView tieredStat={stats.armor} />],
    [ICONS.edef, "E-Defense", <TieredStatView tieredStat={stats.edef} />],
    [ICONS.size, "Size", <TieredSizeView tieredSize={stats.size} />],
    [ICONS.save, "Save Target", <TieredStatView tieredStat={stats.save} />],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
