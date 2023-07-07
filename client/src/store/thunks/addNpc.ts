import { AppDispatch, AppGetState, AppThunk } from "..";
import { selectCollections } from "../collections/selectors/selectCollections";
import { npcAdded, npcDataSelectors, npcUpdated } from "../npcData";
import { v4 as uuidv4 } from "uuid";
import { addMechStatus } from "./addMechStatus";

type AddNpcProps = {
  classId: string;
  id?: string;
  name?: string;
};

export function addNpc({ id, classId, name }: AddNpcProps): AppThunk {
  return (dispatch, getState) => {
    const state = getState();
    const collections = selectCollections(state);
    const npcClass = collections.npcClasses.find(classId);

    const mechStatusId = uuidv4();

    dispatch(addMechStatus({ id: mechStatusId }));

    dispatch(
      npcAdded({
        id: id || uuidv4(),
        classId,
        featureIds: npcClass.baseFeatures,
        name: name || npcClass.name,
        tier: 1,
        mechStatusId,
      })
    );
  };
}
