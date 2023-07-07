import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { ActionsList } from "./ActionsList";
import { BonusTable } from "./BonusTable";
import { Button } from "./Button";
import { UserText } from "./UserText";
import { AttackStatsTable } from "./WeaponStatsTable";

type PilotGearViewProps = {
  pilotGear: PilotGear;
  onSelect?: (pilotGearId: string) => void;
  className?: string;
  showDescription?: boolean;
};

export function PilotGearView({
  pilotGear,
  onSelect,
  className,
  showDescription,
}: PilotGearViewProps) {
  let description = pilotGear.description;

  if (pilotGear.actions) {
    for (const action of pilotGear.actions) {
      description = description.replace(new RegExp(`${action.detail}\\.?`), "");
    }
  }

  return (
    <div className={`@container ${className}`}>
      <div className="mb-1 flex items-center">
        <div className="text-lg font-bold mr-auto">{pilotGear.name}</div>
        {onSelect && (
          <Button onClick={() => onSelect(pilotGear.id)} className="text-sm">
            Add
          </Button>
        )}
      </div>
      <div className="w-full @lg:flex">
        <AttackStatsTable
          item={pilotGear}
          className="pr-2 mr-2 mb-2 @lg:mb-0 last:mb-0 @lg:border-r border-r-bgcolor-700 last:pr-0 last:mr-0 last:border-r-0"
        />
        <BonusTable
          bonuses={pilotGear.bonuses}
          className="pr-2 mr-2 mb-2 @lg:mb-0 last:mb-0 @lg:border-r border-r-bgcolor-700 last:pr-0 last:mr-0 last:border-r-0"
        />
        {showDescription && <UserText text={description} className="text-sm" />}
      </div>
      <ActionsList actions={pilotGear.actions} />
    </div>
  );
}
