import { Button } from "../components/Button";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { selectMech } from "../store/mechs/selectors/selectMech";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ChooseNpc } from "./ChooseNpc.page";
import { NpcView } from "./NpcView";

type MechProps = {
  mechId: string;
};

const CHOOSE_NPC_WINDOW_ID = "mech-choose-npc";

export function MechView({ mechId }: MechProps) {
  const mech = useAppSelector(selectMech(mechId));

  const { openWindow } = useWindowManager();

  return <div className="px-3 py-1 overflow-y-scroll h-full">{mech.name}</div>;
}
