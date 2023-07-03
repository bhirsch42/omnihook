import { Button } from "../components/Button";
import { CreateMechForm } from "../components/CreateMechForm";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { Mech } from "../schemas/mech.schema";
import { useAppSelector } from "../store/hooks";
import { selectMechsForPilot } from "../store/mechs/selectors/selectMechsForPilot";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";
import { MechView } from "./MechView.page";

const CREATE_MECH_WINDOW_ID = "create-mech";

function CreateMechButton({ className }: { className?: string }) {
  const { openWindow, closeWindow } = useWindowManager();

  const handleClick = () => {
    openWindow({
      id: CREATE_MECH_WINDOW_ID,
      label: "New Mech",
      size: "sm",
      component: (
        <CreateMechForm
          afterSubmit={() => closeWindow(CREATE_MECH_WINDOW_ID)}
        />
      ),
    });
  };

  return (
    <Button className={className} onClick={handleClick}>
      New Mech
    </Button>
  );
}

type MechViewProps = {
  mech: Mech;
  className?: string;
};

function MechListItem({ mech, className }: MechViewProps) {
  const { openWindow } = useWindowManager();

  const handleClick = () => {
    openWindow({
      id: mech.id,
      label: `Mech • ${mech.name}`,
      component: <MechView mechId={mech.id} />,
    });
  };

  return (
    <Button
      className={`block mb-2 text-left ${className}`}
      onClick={handleClick}
    >
      {mech.name}
    </Button>
  );
}

export function MechList() {
  const pilotId = useAppSelector(selectActivePilot).id;
  const mechs = useAppSelector(selectMechsForPilot(pilotId));

  return (
    <div className="p-3">
      <div className="flex">
        <div className="flex flex-col">
          {mechs.map((mech) => (
            <MechListItem key={mech.id} mech={mech} />
          ))}
        </div>
      </div>

      <CreateMechButton className="mt-3" />
    </div>
  );
}
