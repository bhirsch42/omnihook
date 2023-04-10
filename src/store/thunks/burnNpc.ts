import { AppThunk } from "..";
import { mechStatusDamageApplied, mechStatusUpdated } from "../mechStatuses";
import { selectNpcById } from "../npcData/selectors/selectNpcById";
import { selectMechStatusByNpcId } from "../selectors/selectMechStatusByNpcId";

export function burnNpc(npcId: string, amount: number): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const npc = selectNpcById(npcId)(state);
    const mechStatus = selectMechStatusByNpcId(npcId)(state);

    dispatch(
      mechStatusUpdated({
        id: mechStatus.id,
        changes: {
          burnReceived: mechStatus.burnReceived + amount,
        },
      })
    );

    dispatch(
      mechStatusDamageApplied({
        amount,
        maxHp: npc.stats.maxHp,
        mechStatusId: mechStatus.id,
      })
    );
  };
}
