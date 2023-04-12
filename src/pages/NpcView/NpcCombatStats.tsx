import { StatsTable, StatsTableRow } from "../../components/StatsTable";
import { useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { ICONS } from "../../utils/icons";

export function NpcCombatStats({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpcById(npcId));

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
        {npc.stats.heat}/{npc.stats.maxHeat}
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
    [
      ICONS["stress"],
      "Stress",
      <>
        {npc.stats.stress}/{npc.stats.maxStress}
      </>,
    ],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
