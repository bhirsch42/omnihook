import { Button } from "../components/Button";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { addNpcToEncounter } from "../store/encounters";
import { selectEncounter } from "../store/encounters/selectors/selectEncounter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ChooseNpc } from "./ChooseNpc.page";

type EncounterProps = {
  encounterId: string;
};

const CHOOSE_NPC_WINDOW_ID = "encounter-choose-npc";

export function EncounterView({ encounterId }: EncounterProps) {
  const encounter = useAppSelector(selectEncounter(encounterId));
  const dispatch = useAppDispatch();

  const { openWindow } = useWindowManager();

  const handleSelectNpc = (npcId: string) => {
    dispatch(addNpcToEncounter({ encounterId, npcId }));
  };

  const handleClickAddNpc = () => {
    openWindow({
      label: `Add NPC to ${encounter.name}`,
      component: <ChooseNpc onSelect={handleSelectNpc} />,
    });
  };

  return (
    <div className="px-3 py-1">
      <div className="text-lg font-bold">=== Combatants ===</div>
      <div>
        {encounter.npcs.map((npc) => (
          <div>
            {npc.name}, {npc.class.role}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Button onClick={handleClickAddNpc}>Add NPC</Button>{" "}
        <Button>Add PC</Button>
      </div>
    </div>
  );
}
