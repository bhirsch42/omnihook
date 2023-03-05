import {
  faBullseye,
  faCubesStacked,
  faExplosion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Damage } from "../schemas/lancerData/damage.schema";
import { Range } from "../schemas/lancerData/range.schema";
import { TagRef } from "../schemas/lancerData/tagRef.schema";
import { ICONS } from "../utils/icons";
import { isNilOrEmpty } from "../utils/isNilOrEmpty";
import { StatsTable } from "./StatsTable";

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
    <StatsTable
      className={className}
      rows={[
        damageString && [
          ICONS.damage,
          "Damage",
          <span className="font-bold">{damageString}</span>,
        ],
        rangeString && [
          ICONS.range,
          "Range",
          <span className="font-bold">{rangeString}</span>,
        ],
        usesCount && [
          faCubesStacked,
          "Uses",
          <span className="font-bold">{usesCount}</span>,
        ],
      ]}
    />
  );
}
