import { Button } from "../components/Button";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { selectEncounter } from "../store/encounters/selectors/selectEncounter";
import { useAppSelector } from "../store/hooks";
import { ChooseNpc } from "./ChooseNpc.page";

type EncounterProps = {
  encounterId: string;
};

const CHOOSE_NPC_WINDOW_ID = "encounter-choose-npc";

export function EncounterView({ encounterId }: EncounterProps) {
  const encounter = useAppSelector(selectEncounter(encounterId));

  const { openWindow } = useWindowManager();

  const handleClickAddNpc = () => {
    openWindow({
      label: `Add NPC to ${encounter.name}`,
      component: <ChooseNpc />,
    });
  };

  return (
    <div className="px-3 py-1">
      <div className="text-lg font-bold">=== Combatants ===</div>
      <div className="mt-3">
        <Button onClick={handleClickAddNpc}>Add NPC</Button>{" "}
        <Button>Add PC</Button>
      </div>
    </div>
  );
}
