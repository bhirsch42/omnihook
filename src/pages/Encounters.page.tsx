import { Button } from "../components/Button";
import { CreateEncounterForm } from "../components/CreateEncounterForm";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { Encounter } from "../schemas/encounter.schema";
import { selectAllEncounters } from "../store/encounters/selectors/selectAllEncounters";
import { useAppSelector } from "../store/hooks";

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

function EncounterView({ encounter, className }: EncounterViewProps) {
  return (
    <div>
      <div className="text-lg">{encounter.name}</div>
    </div>
  );
}

export function Encounters() {
  const encounters = useAppSelector(selectAllEncounters);

  return (
    <div className="p-3">
      {encounters.map((encounter) => (
        <EncounterView key={encounter.id} encounter={encounter} />
      ))}

      <CreateEncounterButton className="mt-3" />
    </div>
  );
}
