import { isNil } from "ramda";
import { AppThunk } from "..";
import { DamageType } from "../../schemas/lancerData/damageType.schema";
import { mechStatusDamageApplied, mechStatusUpdated } from "../mechStatuses";
import { selectNpcById } from "../npcData/selectors/selectNpcById";
import { applyHeatDamageToNpc } from "./applyHeatDamageToNpc";

export function damageNpc(
  npcId: string,
  amount: number,
  damageType: DamageType
): AppThunk {
  return (dispatch, getState) => {
    const npc = selectNpcById(npcId)(getState());
    const canTakeHeatDamage = !isNil(npc.stats.maxHeat);

    if (damageType === "Heat") {
      if (canTakeHeatDamage) {
        dispatch(applyHeatDamageToNpc(npcId, amount));
      } else {
        dispatch(damageNpc(npc.id, amount, "Energy"));
      }

      return;
    }

    if (damageType === "Burn") {
      dispatch(
        mechStatusUpdated({
          id: npc.mechStatusId,
          changes: {
            burnReceived: npc.stats.burn + amount,
          },
        })
      );
    }

    dispatch(
      mechStatusDamageApplied({
        mechStatusId: npc.mechStatusId,
        amount,
        maxHp: npc.stats.maxHp,
      })
    );
  };
}
