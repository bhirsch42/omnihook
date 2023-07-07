import { AppThunk } from "..";
import { mechStatusAdded } from "../mechStatuses";
import { v4 as uuidv4 } from "uuid";

type AddMechStatusProps = {
  id?: string;
};

export function addMechStatus({ id }: AddMechStatusProps): AppThunk {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(
      mechStatusAdded({
        id: id || uuidv4(),
        statuses: [],
        conditions: [],
        resistances: [],
        damageReceived: 0,
        overshield: 0,
        heatReceived: 0,
        movementUsed: 0,
        burnReceived: 0,
        activationsUsed: 0,
        stressLost: 0,
        structure: 0,
      })
    );
  };
}
