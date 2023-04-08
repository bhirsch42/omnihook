import { AppThunk } from "..";
import { mechStatusUpdated } from "../mechStatuses";
import { selectMechStatusByNpcId } from "../selectors/selectMechStatusByNpcId";

export function addOvershieldToNpc(npcId: string, amount: number): AppThunk {
  return (dispatch, getState) => {
    const mechStatus = selectMechStatusByNpcId(npcId)(getState());

    dispatch(
      mechStatusUpdated({
        id: mechStatus.id,
        changes: {
          overshield: mechStatus.overshield + amount,
        },
      })
    );
  };
}
