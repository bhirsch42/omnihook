import {
  faBullseye,
  faBolt,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "ramda";
import { NpcFeature } from "../schemas/lancerData/npcFeature.schema";
import { ICONS } from "../utils/icons";
import { RangeView } from "./RangeView";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { TieredStatView } from "./TieredStatView";
import { TieredDamageView } from "./TieredDamageView";

export function NpcWeaponView({
  npcFeature,
  className,
}: {
  npcFeature: NpcFeature;
  className?: string;
}) {
  const hasDamage = npcFeature.damage && !isEmpty(npcFeature.damage);

  const rows = [
    npcFeature.weaponType && [
      faCircleInfo,
      "Weapon Type",
      <span className="font-bold">{npcFeature.weaponType}</span>,
    ],

    npcFeature.techType && [
      faBolt,
      "Tech Type",
      <span className="font-bold">{npcFeature.techType}</span>,
    ],

    npcFeature.accuracy && [
      faBullseye,
      "Accuracy",
      <TieredStatView tieredStat={npcFeature.accuracy} />,
    ],

    npcFeature.attackBonus && [
      ICONS["attack"],
      "Attack Bonus",
      <TieredStatView tieredStat={npcFeature.attackBonus} />,
    ],

    npcFeature.damage &&
      !isEmpty(npcFeature.damage) && [
        ICONS["damage"],
        "Damage",
        <TieredDamageView tieredDamage={npcFeature.damage} />,
      ],

    npcFeature.range && [
      ICONS["range"],
      "Range",
      <RangeView range={npcFeature.range} />,
    ],
  ] satisfies StatsTableRow[];

  return <StatsTable rows={rows} className={className} />;
}
