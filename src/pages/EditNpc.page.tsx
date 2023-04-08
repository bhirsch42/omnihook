import { without } from "ramda";
import { useCollections } from "../hooks/useCollections";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectNpc } from "../store/npcs/selectors/selectNpc";
import { NpcFeatureView } from "../components/NpcFeatureView";
import { NpcClassSkillsView } from "../components/NpcClassSkillsView";
import { NpcClassStatsView } from "../components/NpcClassStatsView";
import { Button } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { addFeatureToNpc, removeFeatureFromNpc } from "../store/npcs";

type EditNpcProps = { npcId: string; onSave: () => void; onCancel: () => void };

export function EditNpc({ npcId, onSave, onCancel }: EditNpcProps) {
  const npc = useAppSelector(selectNpc(npcId));
  const collections = useCollections();
  const dispatch = useAppDispatch();

  const selectedFeatures = collections.npcFeatures.findAll(npc.featureIds);

  const recommendedFeatures = collections.npcFeatures.findAll(
    without(npc.featureIds, [
      ...npc.npcClass.baseFeatures,
      ...npc.npcClass.optionalFeatures,
    ])
  );

  const handleClickAddFeature = (featureId: string) => {
    dispatch(addFeatureToNpc({ npcId, featureId }));
  };

  const handleClickRemoveFeature = (featureId: string) => {
    dispatch(removeFeatureFromNpc({ npcId, featureId }));
  };

  const handleClickDelete = () => {
    onCancel();
  };

  const handleClickSave = () => {
    onSave();
  };

  return (
    <div className="h-full overflow-y-scroll p-3">
      <div className="flex mb-2 text-lg font-bold">
        <div>{npc.name}</div>
        <div className="pl-3 ml-3 border-l-4 text-bgcolor-400 border-l-bgcolor-700 capitalize italic">
          {npc.npcClass.role}
        </div>
      </div>

      {/* <div>
        <UserText text={npc.class.info.flavor} className="text-sm" />

        <div className="font-bold mt-2">Tactics</div>
        <UserText text={npc.class.info.tactics} className="text-sm" />
      </div> */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <NpcClassSkillsView
            npcClass={npc.npcClass}
            className="px-3 py-2 border border-bgcolor-700 mb-3"
          />
          <NpcClassStatsView
            npcClass={npc.npcClass}
            className="px-3 py-2 border border-bgcolor-700"
          />
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <div className="font-bold mt-2">Selected Features</div>
              <div className="flex flex-col items-start -mb-2 mt-1">
                {selectedFeatures.map((npcFeature) => (
                  <div className="flex w-full" key={npcFeature.id}>
                    <div className="flex items-center h-10">
                      <Button
                        circle
                        className="mr-2 text-sm"
                        onClick={() => handleClickRemoveFeature(npcFeature.id)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                    </div>
                    <NpcFeatureView
                      npcFeature={npcFeature}
                      className="mb-2 max-w-lg w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold mt-2">Add Features</div>
              <div className="flex flex-col items-start -mb-2 mt-1">
                {recommendedFeatures.map((npcFeature) => (
                  <div className="flex w-full" key={npcFeature.id}>
                    <div className="flex items-center h-10">
                      <Button
                        color="green"
                        circle
                        className="mr-2 text-sm"
                        onClick={() => handleClickAddFeature(npcFeature.id)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                    <NpcFeatureView
                      npcFeature={npcFeature}
                      className="mb-2 max-w-lg w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mt-3 grid grid-flow-col gap-2">
          <Button color="red" onClick={handleClickDelete}>
            Delete
          </Button>
          <Button color="green" onClick={handleClickSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
