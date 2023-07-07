import { AppThunk } from "..";
import { mechStatusUpdated } from "../mechStatuses";
import { selectMechStatusByNpcId } from "../selectors/selectMechStatusByNpcId";

export function clearHeatOnNpc(npcId: string): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const mechStatus = selectMechStatusByNpcId(npcId)(state);

    dispatch(
      mechStatusUpdated({
        id: mechStatus.id,
        changes: {
          heatReceived: 0,
        },
      })
    );
  };
}
