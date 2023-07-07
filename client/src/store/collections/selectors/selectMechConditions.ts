import { RootState } from "../..";
import { Status } from "../../../schemas/lancerData/status.schema";

export function selectMechConditions(state: RootState): Status[] {
  return state.collections.statuses.filter(
    (status) =>
      (!status.exclusive || status.exclusive === "Mech") &&
      status.type === "Condition"
  );
}
