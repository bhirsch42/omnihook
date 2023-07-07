import { without } from "ramda";
import { AppDispatch, AppGetState } from "..";
import { npcDataSelectors, npcUpdated } from "../npcData";

export function removeFeatureFromNpc(npcId: string, featureId: string) {
  return (dispatch: AppDispatch, getState: AppGetState) => {
    const npcData = npcDataSelectors.selectById(getState(), npcId);
    if (!npcData) throw new Error(`Could not find npcData with id ${npcId}`);

    dispatch(
      npcUpdated({
        id: npcId,
        changes: { featureIds: without([featureId], npcData.featureIds) },
      })
    );
  };
}
