import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { Pilot } from "../../../schemas/pilot.schema";
import { PilotTalent } from "../../../schemas/pilotTalent.schema";

const MAX_TALENT_RANK = 3;

export function addTalentRankReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{ pilotId: Pilot["id"]; talentId: PilotTalent["id"] }>
) {
  const { pilotId, talentId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);
  const talent = pilot.talents.find((t) => t.id === talentId);

  if (talent) {
    if (talent.rank === MAX_TALENT_RANK) {
      console.warn("Rank is already at max.");
      return;
    }

    talent.rank++;
  } else {
    pilot.talents.push({
      id: talentId,
      rank: 1,
    });
  }
}
