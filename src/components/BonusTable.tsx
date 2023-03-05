import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bonus } from "../schemas/lancerData/bonus.schema";
import { BonusId } from "../schemas/lancerData/bonusId.schema";
import { humanize } from "inflection";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { Fragment } from "react";
import { ICONS } from "../utils/icons";

function bonusIdToName(bonusId: BonusId): string {
  const name = bonusId.replace("pilot_", "");
  return humanize(name).replace("Hp", "HP").replace("Edef", "E-Defense");
}

function createBonusStatRow(bonus: Bonus): StatsTableRow {
  return [
    ICONS[bonus.id],
    bonusIdToName(bonus.id),
    <>
      {bonus.replace ? <>&nbsp;</> : "+"}
      {bonus.val}
    </>,
  ];
}

export function BonusTable({
  bonuses,
  className,
}: {
  bonuses?: Bonus[];
  className?: string;
}) {
  if (!bonuses || bonuses.length === 0) return null;

  const rows = bonuses.map(createBonusStatRow);

  return <StatsTable rows={rows} className={className} />;
}
