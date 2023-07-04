import { RootState } from "../..";
import { Modifier } from "../../../schemas/modifier.schema";
import { half } from "../../../utils/half";
import { selectPilotStats } from "../../pilots/selectors/selectPilotStats";

export function selectModifiers(mechId: string) {
  return (state: RootState): Modifier[] => {
    const mech = state.mechs.all.find((p) => p.id === mechId);
    if (!mech) throw new Error(`Could not find mech with id ${mechId}`);

    const modifiers: Modifier[] = [
      ...selectPilotModifiers(mech.pilotId)(state),
    ];

    return modifiers;
  };
}

const selectPilotModifiers =
  (pilotId: string) =>
  (state: RootState): Modifier[] => {
    const pilot = state.pilots.all.find((p) => p.id === pilotId);
    if (!pilot) throw new Error(`Could not find pilot with id ${pilotId}`);
    const pilotStats = selectPilotStats(pilot.id)(state);
    const { grit } = pilotStats;

    const { hull, agility, systems, engineering } = pilot.mechSkills;

    return [
      { label: "Pilot GRIT bonus", value: grit, op: "add", stat: "hp" },
      { label: "Pilot HULL bonus", value: hull, op: "add", stat: "hp" },
      {
        label: "Pilot HULL bonus",
        value: half(hull),
        op: "add",
        stat: "repcap",
      },
      {
        label: "Pilot AGILITY bonus",
        value: agility,
        op: "add",
        stat: "evasion",
      },
      {
        label: "Pilot AGILITY bonus",
        value: half(agility),
        op: "add",
        stat: "speed",
      },
      {
        label: "Pilot SYSTEMS bonus",
        value: systems,
        op: "add",
        stat: "edef",
      },
      {
        label: "Pilot SYSTEMS bonus",
        value: half(systems),
        op: "add",
        stat: "techAttack",
      },
      {
        label: "Pilot ENGINEERING bonus",
        value: engineering,
        op: "add",
        stat: "heatcap",
      },
      {
        label: "Pilot ENGINEERING bonus",
        value: half(engineering),
        op: "add",
        stat: "limitedBonus",
      },
    ];
  };
