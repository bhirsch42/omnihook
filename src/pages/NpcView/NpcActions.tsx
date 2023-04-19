import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { damageNpc } from "../../store/thunks/damageNpc";
import { healNpc } from "../../store/thunks/healNpc";
import { setOvershieldOnNpc } from "../../store/thunks/setOvershieldOnNpc";
import { clearBurnOnNpc } from "../../store/thunks/clearBurnOnNpc";
import { DAMAGE_TYPES } from "../../schemas/lancerData/damageType.schema";
import { stabilizeNpc } from "../../store/thunks/stabilizeNpc";
import { clearHeatOnNpc } from "../../store/thunks/clearHeatOnNpc";

export function NpcActions({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpcById(npcId));
  const [amount, setAmount] = useState(0);
  const dispatch = useAppDispatch();

  const handleAction = (fn: (amount: number) => void) => () => {
    fn(amount);
    setAmount(0);
  };

  return (
    <div className={`flex gap-8 items-end ${className}`}>
      <FormInput
        label={"Amount"}
        value={amount}
        type="number"
        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
      />
      <div>
        <div className="font-bold mb-1">Damage</div>
        <div className="flex gap-2">
          {DAMAGE_TYPES.map((damageType) => (
            <Button
              key={damageType}
              onClick={handleAction(() =>
                dispatch(damageNpc(npcId, amount, damageType))
              )}
            >
              {damageType}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="font-bold mb-1">Repair</div>
        <div className="flex gap-2">
          <Button
            onClick={handleAction(() => dispatch(healNpc(npcId, amount)))}
          >
            Heal
          </Button>
          <Button
            onClick={handleAction(() =>
              dispatch(setOvershieldOnNpc(npcId, amount))
            )}
          >
            Set Overshield
          </Button>
          <Button onClick={handleAction(() => dispatch(stabilizeNpc(npcId)))}>
            Stabilize
          </Button>
          <Button onClick={handleAction(() => dispatch(clearBurnOnNpc(npcId)))}>
            Clear Burn
          </Button>
          <Button onClick={handleAction(() => dispatch(clearHeatOnNpc(npcId)))}>
            Clear Heat
          </Button>
        </div>
      </div>
    </div>
  );
}
