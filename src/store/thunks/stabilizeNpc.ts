import { without } from "ramda";
import { AppThunk } from "..";
import { mechStatusUpdated } from "../mechStatuses";
import { selectMechStatusByNpcId } from "../selectors/selectMechStatusByNpcId";
import { StatusType } from "../../schemas/lancerData/statusType.schema";

export function stabilizeNpc(npcId: string): AppThunk {
  return (dispatch, getState) => {
    const mechStatus = selectMechStatusByNpcId(npcId)(getState());

    dispatch(
      mechStatusUpdated({
        id: mechStatus.id,
        changes: {
          heatReceived: 0,
          statuses: without(
            ["EXPOSED"] satisfies StatusType[],
            mechStatus.statuses
          ),
        },
      })
    );
  };
}
