import { transpose } from "ramda";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { ICONS } from "../utils/icons";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { TieredStatView } from "./TieredStatView";

function TieredSizeView({
  tieredSize,
  className,
}: {
  tieredSize: number[][];
  className?: string;
}) {
  return (
    <div className="flex text-sm font-medium rounded-lg overflow-hidden my-1">
      {tieredSize.map((sizes) => (
        <div className="flex flex-col mr-0.5 last:mr-0">
          {sizes.map((size) => (
            <div className="bg-bgcolor-700 h-4 px-2 flex items-center justify-center text-center mb-0.5 last:mb-0 w-8">
              {size.toString().replace("0.", ".")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
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
      {tieredSize.map((size) => (
        <div>{size}</div>
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
