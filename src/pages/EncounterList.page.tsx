import { Button } from "../components/Button";
import { CreateEncounterForm } from "../components/CreateEncounterForm";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { Encounter } from "../schemas/encounter.schema";
import { selectAllEncounters } from "../store/encounters/selectors/selectAllEncounters";
import { useAppSelector } from "../store/hooks";
import { EncounterView } from "./EncounterView.page";

const CREATE_ENCOUNTER_WINDOW_ID = "create-encounter";

function CreateEncounterButton({ className }: { className?: string }) {
  const { openWindow, closeWindow } = useWindowManager();

  const handleClick = () => {
    openWindow({
      id: CREATE_ENCOUNTER_WINDOW_ID,
      label: "New Encounter",
      size: "sm",
      component: (
        <CreateEncounterForm
          afterSubmit={() => closeWindow(CREATE_ENCOUNTER_WINDOW_ID)}
        />
      ),
    });
  };

  return (
    <Button className={className} onClick={handleClick}>
      New Encounter
    </Button>
  );
}

type EncounterViewProps = {
  encounter: Encounter;
  className?: string;
};

function EncounterListItem({ encounter, className }: EncounterViewProps) {
  const { openWindow } = useWindowManager();

  const handleClick = () => {
    openWindow({
      id: encounter.id,
      label: `Encounter • ${encounter.name}`,
      component: <EncounterView encounterId={encounter.id} />,
    });
  };

  return (
    <Button
      className={`block mb-2 text-left ${className}`}
      onClick={handleClick}
    >
      {encounter.name}
    </Button>
  );
}

export function EncounterList() {
  const encounters = useAppSelector(selectAllEncounters);

  return (
    <div className="p-3">
      <div className="flex">
        <div className="flex flex-col">
          {encounters.map((encounter) => (
            <EncounterListItem key={encounter.id} encounter={encounter} />
          ))}
        </div>
      </div>

      <CreateEncounterButton className="mt-3" />
    </div>
  );
}
