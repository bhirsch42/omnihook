import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { MechStatusInput } from "../../components/MechStatusInput";
import {
  npcUpdated,
  updateNpcConditions,
  updateNpcResistances,
  updateNpcStatuses,
} from "../../store/npcData";
import { MechConditionsInput } from "../../components/MechConditionsInput";
import { MechResistancesInput } from "../../components/MechResistancesInput";

export function NpcStatuses({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const npc = useAppSelector(selectNpcById(npcId));
  const dispatch = useAppDispatch();

  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        <div className="mb-3">
          <label className="block mb-1">Statuses</label>
          <MechStatusInput
            value={npc.statuses}
            onChange={(statusIds) => {
              dispatch(
                npcUpdated({
                  id: npcId,
                  changes: {
                    combatStatus: {
                      statuses: statusIds,
                    },
                  },
                })
              );
              dispatch(updateNpcStatuses({ npcId, statusIds }));
            }}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Conditions</label>
          <MechConditionsInput
            value={npc.conditions}
            onChange={(conditionIds) => {
              dispatch(updateNpcConditions({ npcId, conditionIds }));
            }}
          />
        </div>
        <div>
          <label className="block mb-1">Resistances</label>
          <MechResistancesInput
            value={npc.resistances}
            onChange={(resistanceIds) => {
              dispatch(updateNpcResistances({ npcId, resistanceIds }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
