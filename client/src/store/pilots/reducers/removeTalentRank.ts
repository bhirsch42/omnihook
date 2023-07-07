import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { without } from "ramda";
import { PilotsState } from "..";
import { Pilot } from "../../../schemas/pilot.schema";
import { PilotTalent } from "../../../schemas/pilotTalent.schema";

export function removeTalentRankReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{ pilotId: Pilot["id"]; talentId: PilotTalent["id"] }>
) {
  const { pilotId, talentId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);
  const talent = pilot.talents.find((t) => t.id === talentId);

  if (!talent) {
    console.warn("Cannot remove talent. Pilot doesn't have it.");
    return;
  }

  if (talent.rank === 1) {
    pilot.talents = without([talent], pilot.talents);
    return;
  }

  talent.rank--;
}
