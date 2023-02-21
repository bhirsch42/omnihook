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

function EmptyGearSlot({
  type,
  pilotId,
}: {
  type: PilotGearType;
  pilotId: string;
}) {
  const dispatch = useAppDispatch();
  const { openWindow, closeWindow } = useWindowManager();
  console.log("Render EmptyGearSlot");
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
      className="p-3 block text-center bg-bgcolor-800 mb-2 w-full hover:bg-bgcolor-700 transition-colors"
    >
      Choose {type}
    </button>
  );
}

export function PilotEquipment({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const pilot = useAppSelector(selectPilot(pilotId));
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

  const { maxWeapons, maxArmor, maxGear } = pilotStats;

  const pilotGear = lancerCollections.pilotGear.findAll(
    pilot.gear.map((item) => item.pilotGearId)
  );

  const weapons = pilotGear.filter((gear) => gear.type === "Weapon");
  const armor = pilotGear.filter((gear) => gear.type === "Armor");
  const gear = pilotGear.filter((gear) => gear.type === "Gear");

  const emptyWeaponSlotCount = maxWeapons - weapons.length;
  const emptyArmorSlotCount = maxArmor - armor.length;
  const emptyGearSlotCount = maxGear - gear.length;

  return (
    <div className="max-w-lg">
      <div className="flex items-center h-10 px-3 mb-2 bg-bgcolor-800 whitespace-nowrap">
        === Gear ===
      </div>
      {weapons.map((item) => (
        <PilotGearView
          className="border-b-4 border-b-bgcolor-800 py-3"
          pilotGear={item}
          key={item.id}
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
          className="border-b-4 border-b-bgcolor-800 py-3"
          pilotGear={item}
          key={item.id}
        />
      ))}
      {times(
        (i) => (
          <EmptyGearSlot pilotId={pilotId} type="Armor" key={i} />
        ),
        emptyArmorSlotCount
      )}
      {gear.map((item) => (
        <PilotGearView
          className="border-b-4 border-b-bgcolor-800 py-3"
          pilotGear={item}
          key={item.id}
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
