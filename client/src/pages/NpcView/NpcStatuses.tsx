import { useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { MechStatusInput } from "../../components/MechStatusInput";
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

  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        <div className="mb-3">
          <label className="block mb-1">Statuses</label>
          <MechStatusInput mechStatusId={npc.mechStatusId} />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Conditions</label>
          <MechConditionsInput mechStatusId={npc.mechStatusId} />
        </div>
        <div>
          <label className="block mb-1">Resistances</label>
          <MechResistancesInput mechStatusId={npc.mechStatusId} />
        </div>
      </div>
    </div>
  );
}
