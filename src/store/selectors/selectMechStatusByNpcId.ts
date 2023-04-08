import { RootState } from "..";
import { MechStatus } from "../../schemas/mechStatus.schema";
import { selectMechStatusById } from "../mechStatuses";
import { selectNpcDataById } from "../npcData";

export const selectMechStatusByNpcId =
  (npcId: string) =>
  (state: RootState): MechStatus => {
    const npcData = selectNpcDataById(state, npcId);
    if (!npcData) throw new Error(`Could not find npcData for id ${npcId}`);
    const { mechStatusId } = npcData;
    const mechStatus = selectMechStatusById(state, mechStatusId);
    if (!mechStatus)
      throw new Error(`Could not find mechStatus for id ${mechStatusId}`);
    return mechStatus;
  };
