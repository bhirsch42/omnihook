import { StatsTable, StatsTableRow } from "../../components/StatsTable";
import { useAppSelector } from "../../store/hooks";
import { selectNpc } from "../../store/npcs/selectors/selectNpc";
import { ICONS } from "../../utils/icons";

export function NpcCombatStats({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpc(npcId));

  const rows: StatsTableRow[] = [
    [
      ICONS["hp"],
      "HP",
      <>
        {npc.stats.hp}/{npc.stats.maxHp}
      </>,
    ],
    [ICONS["overshield"], "Overshield", <>{npc.stats.overshield}</>],
    [
      ICONS["heat"],
      "Heat",
      <>
        {npc.stats.heatReceived}/{npc.stats.maxHeat}
      </>,
    ],
    [
      ICONS["speed"],
      "Movement",
      <>
        {npc.stats.moves}/{npc.stats.maxMoves}
      </>,
    ],
    [
      ICONS["activations"],
      "Activations",
      <>
        {npc.stats.activations}/{npc.stats.maxActivations}
      </>,
    ],
    [ICONS["burn"], "Burn", <>{npc.stats.burn}</>],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
