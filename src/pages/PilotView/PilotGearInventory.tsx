import { times } from "ramda";
import { PilotGearView } from "../../components/PilotGearView";
import { useWindowManager } from "../../components/WindowManager";
import { lancerCollections } from "../../data/lancerData";
import { PilotGear } from "../../schemas/lancerData/pilotGear.schema";
import { PilotGearType } from "../../schemas/lancerData/pilotGearType.schema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPilotGear } from "../../store/pilots";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { ChoosePilotGear } from "./ChoosePilotGear";
import { EmptyGearSlot } from "./EmptyGearSlot";

export function PilotEquipment({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const pilot = useAppSelector(selectPilot(pilotId));
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

  const { maxGear } = pilotStats;

  const pilotGear = lancerCollections.pilotGear.findAll(
    pilot.gear.map((item) => item.pilotGearId)
  );

  const gear = pilotGear.filter((gear) => gear.type === "Gear");

  const emptyGearSlotCount = maxGear - gear.length;

  return (
    <div className={className}>
      <div className="flex items-center h-10 px-3 mb-2 bg-bgcolor-800 whitespace-nowrap">
        === Gear ===
      </div>
      {gear.map((item) => (
        <PilotGearView
          className="py-3 border-b-4 border-b-bgcolor-800 last:border-b-0"
          pilotGear={item}
          key={item.id}
          showDescription
        />
      ))}
      {times(
        (i) => (
          <EmptyGearSlot pilotId={pilotId} type="Gear" key={i} />
        ),
        emptyGearSlotCount
      )}
    </div>
  );
}
