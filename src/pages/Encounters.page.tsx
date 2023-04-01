import { Button } from "../components/Button";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";

function CreateEncounterButton() {
  const { openWindow } = useWindowManager();

  const handleClick = () => {
    openWindow({
      label: "New Encounter",
      component: undefined,
    });
  };

  return <Button onClick={handleClick}>New Encounter</Button>;
}

export function Encounters() {
  return (
    <div className="p-3">
      <CreateEncounterButton />
    </div>
  );
}
