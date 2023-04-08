import { AppThunk } from "..";
import { mechStatusHealingApplied } from "../mechStatuses";
import { npcDataSelectors } from "../npcData";

export function healNpc(npcId: string, amount: number): AppThunk {
  return (dispatch, getState) => {
    const npcData = npcDataSelectors.selectById(getState(), npcId);

    if (!npcData) throw new Error(`Could not find npcData with id ${npcId}`);

    dispatch(
      mechStatusHealingApplied({
        mechStatusId: npcData.mechStatusId,
        amount,
      })
    );
  };
}
