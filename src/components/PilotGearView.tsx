import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { ActionsList } from "./ActionsList";
import { BonusTable } from "./BonusTable";
import { AttackStatsTable } from "./WeaponStatsTable";

export function PilotGearView({ pilotGear }: { pilotGear: PilotGear }) {
  return (
    <div>
      <div className="font-bold">{pilotGear.name}</div>
      <div className="flex">
        <AttackStatsTable
          item={pilotGear}
          className="pr-2 mr-2 border-r border-r-bgcolor-700"
        />
        <BonusTable
          bonuses={pilotGear.bonuses}
          className="pr-2 mr-2 border-r border-r-bgcolor-700"
        />
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: pilotGear.description }}
        ></div>
      </div>
      <ActionsList actions={pilotGear.actions} />
    </div>
  );
}
