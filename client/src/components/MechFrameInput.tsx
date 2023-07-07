import { useCollections } from "../hooks/useCollections";
import { ChooseMechFrame } from "../pages/MechView/ChooseMechFrame";
import { useAppSelector } from "../store/hooks";
import { selectPilot } from "../store/pilots/selectors/selectPilot";
import { useWindowManager } from "./WindowManager/WindowManagerContext";

type MechFrameInputProps = {
  pilotId: string;
  onSelect: (mechFrameId: string) => void;
  value: string;
};

export function MechFrameInput({
  pilotId,
  onSelect,
  value,
}: MechFrameInputProps) {
  const { openWindow, closeWindow } = useWindowManager();
  const windowId = `choose-mech-frame-${pilotId}`;
  const pilot = useAppSelector(selectPilot(pilotId));
  const { mechFrames } = useCollections();

  const selectedFrame = mechFrames.findSafe(value);

  const handleSelect = (mechFrameId: string) => {
    onSelect(mechFrameId);
    closeWindow(windowId);
  };

  const handleClickEmptySlot = () => {
    openWindow({
      component: (
        <ChooseMechFrame onSelect={handleSelect} licenses={pilot.licenses} />
      ),
      label: `Choose mech frame`,
      id: windowId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClickEmptySlot}
      className="block w-full p-3 mb-2 text-center transition-colors bg-bgcolor-800 hover:bg-bgcolor-700"
    >
      {selectedFrame ? selectedFrame.name : "Choose Mech Frame"}
    </button>
  );
}
