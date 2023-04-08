import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNpc } from "../../store/npcs/selectors/selectNpc";
import { NpcCombatStats } from "./NpcCombatStats";
import { NpcSkills } from "./NpcSkills";
import { NpcStatuses } from "./NpcStatuses";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NpcFeatureView } from "../../components/NpcFeatureView";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { addOvershieldToNpc, damageNpc, healNpc } from "../../store/npcs";

function NpcActions({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpc(npcId));
  const [amount, setAmount] = useState(0);
  console.log({ amount });
  const dispatch = useAppDispatch();

  const handleAction = (fn: (amount: number) => void) => () => {
    fn(amount);
    setAmount(0);
  };

  return (
    <div className={`${className}`}>
      <FormInput
        label={"Amount"}
        value={amount}
        type="number"
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <div className="flex flex-wrap -mr-2">
        <Button
          className="mt-2 mr-2"
          onClick={handleAction(() => dispatch(damageNpc({ npc, amount })))}
        >
          Damage
        </Button>
        <Button
          className="mt-2 mr-2"
          onClick={handleAction(() => dispatch(healNpc({ npc, amount })))}
        >
          Heal
        </Button>
        <Button
          className="mt-2 mr-2"
          onClick={handleAction(() =>
            dispatch(addOvershieldToNpc({ npc, amount }))
          )}
        >
          Overshield
        </Button>
      </div>
    </div>
  );
}

export function NpcView({ npcId }: { npcId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const npc = useAppSelector(selectNpc(npcId));

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center px-3 py-2 text-lg font-bold bg-bgcolor-800 hover:bg-bgcolor-700 transition-colors"
        onClick={() => setIsOpen((state) => !state)}
      >
        <div>{npc.name}</div>
        <div className="pl-3 ml-3 border-l-4 text-bgcolor-400 border-l-bgcolor-700 capitalize italic">
          {npc.npcClass.role}
        </div>
        <div className="ml-auto">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </button>
      <div className="px-3 pb-3 bg-bgcolor-800">
        <div className="flex mt-3">
          <div className="flex">
            <NpcSkills npcId={npcId} className="mr-8" />
            <NpcCombatStats npcId={npcId} className="mr-8" />
            <NpcStatuses npcId={npcId} className="mr-8" />
            <NpcActions npcId={npcId} />
          </div>
        </div>
      </div>

      <div className={`bg-bgcolor-800 px-3 pb-3 ${isOpen ? "hidden" : ""}`}>
        <div className="font-bold mb-2">Features</div>
        <div className="flex flex-wrap -mr-2 -mb-2">
          {npc.features.map((feature) => {
            return (
              <div className="flex flex-col mr-2 mb-2" key={feature.id}>
                <NpcFeatureView npcFeature={feature} className="max-w-lg" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
