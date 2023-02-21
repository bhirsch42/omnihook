import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { ActionsList } from "./ActionsList";
import { BonusTable } from "./BonusTable";
import { Button } from "./Button";
import { AttackStatsTable } from "./WeaponStatsTable";

export function PilotGearView({
  pilotGear,
  onSelect,
  className,
}: {
  pilotGear: PilotGear;
  onSelect?: (pilotGearId: string) => void;
  className?: string;
}) {
  let description = pilotGear.description;

  if (pilotGear.actions) {
    for (const action of pilotGear.actions) {
      description = description.replace(new RegExp(`${action.detail}\\.?`), "");
    }
  }

  return (
    <div className={className}>
      <div className="mb-1 flex items-center">
        <div className="text-lg font-bold mr-auto">{pilotGear.name}</div>
        {onSelect && (
          <Button onClick={() => onSelect(pilotGear.id)} className="text-sm">
            Add
          </Button>
        )}
      </div>
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
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <ActionsList actions={pilotGear.actions} />
    </div>
  );
}
