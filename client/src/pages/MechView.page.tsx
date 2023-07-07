import {
  SelectMechReturns,
  selectMech,
} from "../store/mechs/selectors/selectMech";
import { useAppSelector } from "../store/hooks";
import { MechSkills } from "../schemas/mechSkills.schema";
import { StatsTable, StatsTableRow } from "../components/StatsTable";
import { ICONS } from "../utils/icons";
import { ModifiedValueView } from "./ModifiedValueView";

type MechProps = {
  mechId: string;
};

const CHOOSE_NPC_WINDOW_ID = "mech-choose-npc";

export function MechView({ mechId }: MechProps) {
  const mech = useAppSelector(selectMech(mechId));

  return (
    <div className="px-3 py-1 overflow-y-scroll h-full">
      <div className="text-lg font-bold">{mech.name}</div>
      <div className="flex">
        <MechSkillsView
          mechSkills={mech.pilotMechSkills}
          className="bg-bgcolor-800 p-3"
        />
        <MechStatsView mech={mech} className="bg-bgcolor-800 p-3 ml-3" />
      </div>
    </div>
  );
}

export function MechSkillsView({
  mechSkills,
  className,
}: {
  mechSkills: MechSkills;
  className?: string;
}) {
  const rows = [
    [
      ICONS["hull"],
      "Hull",
      <span className="font-bold ml-3">{mechSkills.hull}</span>,
    ],
    [
      ICONS["agility"],
      "Agility",
      <span className="font-bold ml-3">{mechSkills.agility}</span>,
    ],
    [
      ICONS["systems"],
      "Systems",
      <span className="font-bold ml-3">{mechSkills.systems}</span>,
    ],
    [
      ICONS["engineering"],
      "Engineering",
      <span className="font-bold ml-3">{mechSkills.engineering}</span>,
    ],
  ] satisfies StatsTableRow[];

  return <StatsTable rows={rows} className={className} />;
}

function MechStatsView({
  mech,
  className,
}: {
  mech: SelectMechReturns;
  className?: string;
}) {
  const rows: StatsTableRow[] = [
    [
      ICONS.armor,
      "Armor",
      <ModifiedValueView modifiedValue={mech.stats.armor} />,
    ],
    [ICONS.edef, "Edef", <ModifiedValueView modifiedValue={mech.stats.edef} />],
    [
      ICONS.evasion,
      "Evasion",
      <ModifiedValueView modifiedValue={mech.stats.evasion} />,
    ],
    [
      ICONS.heatcap,
      "Heatcap",
      <ModifiedValueView modifiedValue={mech.stats.heatcap} />,
    ],
    [ICONS.hp, "Hp", <ModifiedValueView modifiedValue={mech.stats.hp} />],
    [ICONS.save, "Save", <ModifiedValueView modifiedValue={mech.stats.save} />],
    [
      ICONS.sensor,
      "Sensor range",
      <ModifiedValueView modifiedValue={mech.stats.sensorRange} />,
    ],
    [ICONS.size, "Size", <ModifiedValueView modifiedValue={mech.stats.size} />],
    [
      ICONS.speed,
      "Speed",
      <ModifiedValueView modifiedValue={mech.stats.speed} />,
    ],
    [
      ICONS.limited_bonus,
      "Limited Bonus",
      <ModifiedValueView modifiedValue={mech.stats.limitedBonus} prefix="+" />,
    ],
    [
      ICONS.structure,
      "Structure",
      <ModifiedValueView modifiedValue={mech.stats.structure} />,
    ],
    [
      ICONS.stress,
      "Stress",
      <ModifiedValueView modifiedValue={mech.stats.stress} />,
    ],
    [
      ICONS.tech_attack,
      "Tech Attack Bonus",
      <ModifiedValueView modifiedValue={mech.stats.techAttack} prefix="+" />,
    ],
    [
      ICONS.attack,
      "Attack Bonus",
      <ModifiedValueView modifiedValue={mech.stats.attack} prefix="+" />,
    ],
  ];

  return <StatsTable rows={rows} className={className} rightAlignLastColumn />;
}
