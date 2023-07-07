import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { PilotGear } from "../../../schemas/lancerData/pilotGear.schema";
import { Pilot } from "../../../schemas/pilot.schema";
import { v4 as uuidv4 } from "uuid";
import { lancerCollections } from "../../../data/lancerData";
import { z } from "zod";

export function addPilotGearReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{
    pilotId: Pilot["id"];
    pilotGearId: PilotGear["id"];
  }>
) {
  const { pilotId, pilotGearId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);

  const gear = lancerCollections.pilotGear.find(pilotGearId);
  const limitedTag = gear.tags.find((t) => t.id === "tg_limited");
  const uses =
    (limitedTag?.val && z.coerce.number().parse(limitedTag.val)) || null;

  pilot.gear.push({
    id: uuidv4(),
    pilotGearId,
    uses,
  });
}
