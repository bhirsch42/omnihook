import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { ICONS } from "../utils/icons";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { TieredStatView } from "./TieredStatView";

export function NpcClassSkillsView({
  npcClass,
  className,
}: {
  npcClass: NpcClass;
  className?: string;
}) {
  const { stats } = npcClass;

  const rows: StatsTableRow[] = [
    [
      ICONS.tier,
      <div className="font-bold">Tier</div>,

      <TieredStatView
        tieredStat={[
          <div className="font-bold">T1</div>,
          <div className="font-bold">T2</div>,
          <div className="font-bold">T3</div>,
        ]}
      />,
    ],

    [ICONS.hull, "Hull", <TieredStatView tieredStat={stats.hull} />],
    [ICONS.agility, "Agility", <TieredStatView tieredStat={stats.agility} />],
    [ICONS.systems, "Systems", <TieredStatView tieredStat={stats.systems} />],
    [
      ICONS.engineering,
      "Engineering",
      <TieredStatView tieredStat={stats.engineering} />,
    ],
  ];

  return <StatsTable rightAlignLastColumn rows={rows} className={className} />;
}
