import { mechStatusSelectors } from "..";
import { RootState } from "../..";
import { MechStatus } from "../../../schemas/mechStatus.schema";

export const selectMechStatusById =
  (mechStatusId: string) =>
  (state: RootState): MechStatus => {
    const mechStatus = mechStatusSelectors.selectById(state, mechStatusId);
    if (!mechStatus)
      throw new Error(`Could not find mech status with id ${mechStatusId}`);
    return mechStatus;
  };
