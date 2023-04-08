import { AppDispatch, AppGetState, AppThunk } from "..";
import { npcDataSelectors, npcUpdated } from "../npcData";

export function addFeatureToNpc(npcId: string, featureId: string): AppThunk {
  return (dispatch, getState) => {
    const npcData = npcDataSelectors.selectById(getState(), npcId);
    if (!npcData) throw new Error(`Could not find npcData with id ${npcId}`);

    dispatch(
      npcUpdated({
        id: npcId,
        changes: { featureIds: [...npcData.featureIds, featureId] },
      })
    );
  };
}
