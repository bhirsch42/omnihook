import {
  faBullseye,
  faCubesStacked,
  faExplosion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Damage } from "../schemas/lancerData/damage.schema";
import { Range } from "../schemas/lancerData/range.schema";
import { TagRef } from "../schemas/lancerData/tagRef.schema";
import { isNilOrEmpty } from "../utils/isNilOrEmpty";

type AttackItem = {
  damage?: Damage[];
  range?: Range[];
  tags?: TagRef[];
};

export function AttackStatsTable({
  item: weapon,
  className,
}: {
  item: AttackItem;
  className?: string;
}) {
  const { damage, range, tags } = weapon;

  const usesCount = tags?.find((tag) => tag.id === "tg_limited")?.val;

  if (isNilOrEmpty(damage) && isNilOrEmpty(range) && !usesCount) return null;

  const damageString = damage?.map((d) => `${d.val} ${d.type}`).join(", ");
  const rangeString = range
    ?.map((r) => `${r.val} ${r.type}`)
    .join(", ")
    .replace(" Range", "");

  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`grid grid-cols-[auto_1fr_auto] gap-x-3`}>
        {damageString && (
          <>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faExplosion}
                className="text-bgcolor-400"
              />
            </div>
            <div className="flex items-center whitespace-nowrap">Damage:</div>
            <div className="flex items-center font-bold whitespace-nowrap">
              {damageString}
            </div>
          </>
        )}
        {rangeString && (
          <>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBullseye} className="text-bgcolor-400" />
            </div>
            <div className="flex items-center whitespace-nowrap">Range:</div>
            <div className="flex items-center font-bold whitespace-nowrap">
              {rangeString}
            </div>
          </>
        )}
        {usesCount && (
          <>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCubesStacked}
                className="text-bgcolor-400"
              />
            </div>
            <div className="flex items-center whitespace-nowrap">Ammo:</div>
            <div className="flex items-center font-bold whitespace-nowrap">
              {usesCount}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
