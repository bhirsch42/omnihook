import { AppDispatch, AppGetState, AppThunk } from "..";
import { selectCollections } from "../collections/selectors/selectCollections";
import { npcAdded, npcDataSelectors, npcRemoved, npcUpdated } from "../npcData";
import { v4 as uuidv4 } from "uuid";
import { addMechStatus } from "./addMechStatus";
import { mechStatusRemoved } from "../mechStatuses";

export function removeNpc(id: string): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const npcData = npcDataSelectors.selectById(state, id);
    if (!npcData) throw new Error(`Could not find npc with id ${id}`);

    dispatch(mechStatusRemoved(npcData.mechStatusId));
    dispatch(npcRemoved(id));
  };
}
