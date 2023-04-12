import { isNil } from "ramda";
import { mechStatusUpdated } from "../mechStatuses";
import {
  SelectNpcReturns,
  selectNpcById,
} from "../npcData/selectors/selectNpcById";
import { AppThunk } from "..";
import { selectMechStatusByNpcId } from "../selectors/selectMechStatusByNpcId";

export function applyHeatDamageToNpc(npcId: string, amount: number): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const npc = selectNpcById(npcId)(state);
    const mechStatus = selectMechStatusByNpcId(npcId)(state);

    const maxHeat = npc.stats.maxHeat;
    const currentHeat = npc.stats.heat;

    if (isNil(maxHeat) || isNil(currentHeat))
      throw new Error(`npc:${npc.id} cannot take heat damage`);

    const appliedHeat = Math.min(amount, maxHeat - currentHeat);
    const newHeat = currentHeat + appliedHeat;
    const didOverHeat = newHeat === maxHeat;

    if (didOverHeat) {
      dispatch(
        mechStatusUpdated({
          id: npc.mechStatusId,
          changes: {
            heatReceived: 0,
            stressLost: mechStatus.stressLost + 1,
          },
        })
      );

      if (npc.stats.maxStress === 1) {
        dispatch(
          mechStatusUpdated({
            id: npc.mechStatusId,
            changes: {
              statuses: [...npc.statuses, "EXPOSED"],
            },
          })
        );
      }

      // TODO: Add overheat flow to EncounterEvent stack
      const spilloverHeat = amount - appliedHeat;

      if (spilloverHeat > 0) {
        applyHeatDamageToNpc(npc.id, spilloverHeat);
      }

      return;
    }

    dispatch(
      mechStatusUpdated({
        id: npc.mechStatusId,
        changes: {
          heatReceived: newHeat,
        },
      })
    );
  };
}
