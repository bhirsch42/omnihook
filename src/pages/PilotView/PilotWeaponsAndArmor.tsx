import { times } from "ramda";
import { PilotGearView } from "../../components/PilotGearView";
import { useCollections } from "../../hooks/useCollections";
import { useAppSelector } from "../../store/hooks";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { EmptyGearSlot } from "./EmptyGearSlot";

export function PilotWeaponsAndArmor({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const pilot = useAppSelector(selectPilot(pilotId));
  const pilotStats = useAppSelector(selectPilotStats(pilotId));
  const lancerCollections = useCollections();

  const { maxWeapons, maxArmor } = pilotStats;

  const pilotGear = lancerCollections.pilotGear.findAll(
    pilot.gear.map((item) => item.pilotGearId)
  );

  const weapons = pilotGear.filter((gear) => gear.type === "Weapon");
  const armor = pilotGear.filter((gear) => gear.type === "Armor");

  const emptyWeaponSlotCount = maxWeapons - weapons.length;
  const emptyArmorSlotCount = maxArmor - armor.length;

  return (
    <div className={className}>
      <div className="flex items-center h-10 px-3 mb-3 bg-bgcolor-800 whitespace-nowrap">
        === Weapons / Armor ===
      </div>
      <div className="grid grid-flow-col gap-3">
        {weapons.map((item) => (
          <PilotGearView
            pilotGear={item}
            key={item.id}
            className="px-3 py-2 border rounded border-bgcolor-800"
          />
        ))}
        {times(
          (i) => (
            <EmptyGearSlot pilotId={pilotId} type="Weapon" key={i} />
          ),
          emptyWeaponSlotCount
        )}
        {armor.map((item) => (
          <PilotGearView
            pilotGear={item}
            key={item.id}
            className="px-3 py-2 border rounded border-bgcolor-800"
          />
        ))}
        {times(
          (i) => (
            <EmptyGearSlot pilotId={pilotId} type="Armor" key={i} />
          ),
          emptyArmorSlotCount
        )}
      </div>
    </div>
  );
}
