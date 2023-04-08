import { AppThunk } from "..";
import { mechStatusDamageApplied } from "../mechStatuses";
import { selectNpcById } from "../npcData/selectors/selectNpcById";

export function damageNpc(npcId: string, amount: number): AppThunk {
  return (dispatch, getState) => {
    const npc = selectNpcById(npcId)(getState());

    dispatch(
      mechStatusDamageApplied({
        mechStatusId: npc.mechStatusId,
        amount,
        maxHp: npc.stats.maxHp,
      })
    );
  };
}
