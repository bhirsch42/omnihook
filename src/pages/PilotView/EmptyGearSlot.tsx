import { useWindowManager } from "../../components/WindowManager/WindowManagerContext";
import { PilotGearType } from "../../schemas/lancerData/pilotGearType.schema";
import { useAppDispatch } from "../../store/hooks";
import { addPilotGear } from "../../store/pilots";
import { ChoosePilotGear } from "./ChoosePilotGear";

export function EmptyGearSlot({
  type,
  pilotId,
}: {
  type: PilotGearType;
  pilotId: string;
}) {
  const dispatch = useAppDispatch();
  const { openWindow, closeWindow } = useWindowManager();
  const windowId = `choose-pilot-${type}`;

  const handleSelect = (pilotGearId: string) => {
    dispatch(addPilotGear({ pilotId, pilotGearId }));
    closeWindow(windowId);
  };

  const handleClickEmptySlot = () => {
    console.log("click!");
    openWindow({
      component: <ChoosePilotGear type={type} onSelect={handleSelect} />,
      label: `Choose ${type}`,
      id: windowId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClickEmptySlot}
      className="block w-full p-3 mb-2 text-center transition-colors bg-bgcolor-800 hover:bg-bgcolor-700"
    >
      Choose {type}
    </button>
  );
}
