import { Frame } from "../schemas/lancerData/frame.schema";
import { ICONS } from "../utils/icons";
import { StatsTable, StatsTableRow } from "./StatsTable";

export function MechFrameStatsView({
  mechFrame,
  className,
}: {
  mechFrame: Frame;
  className?: string;
}) {
  const { stats } = mechFrame;

  const rows: StatsTableRow[] = [
    [ICONS.size, "Size", stats.size],
    [ICONS.structure, "Structure", stats.structure],
    [ICONS.stress, "Stress", stats.stress],
    [ICONS.armor, "Armor", stats.armor],
    [ICONS.hp, "HP", stats.hp],
    [ICONS.evasion, "Evasion", stats.evasion],
    [ICONS.edef, "E-Defense", stats.edef],
    [ICONS.heatcap, "Heat Capacity", stats.heatcap],
    [ICONS.sensor, "Sensor Range", stats.sensorRange],
    [ICONS.tech_attack, "Tech Attack", stats.techAttack],
    [ICONS.repcap, "Repair Capacity", stats.repcap],
    [ICONS.save, "Save Target", stats.save],
    [ICONS.speed, "Speed", stats.speed],
    [ICONS.sp, "System Points", stats.sp],
  ];

  return <StatsTable rows={rows} className={className} />;
}
