import {
  faHeartCirclePlus,
  IconDefinition,
  faMicrochip,
  faShield,
  faBurst,
  faCirclePlus,
  faTag,
  faBolt,
  faExplosion,
  faPersonFallingBurst,
  faFireExtinguisher,
  faWrench,
  faSatelliteDish,
  faExpand,
  faRunning,
  faHandcuffs,
  faPlusCircle,
  faIdCard,
  faBriefcase,
  faCarBurst,
  faBullseye,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bonus } from "../schemas/lancerData/bonus.schema";
import { BonusId } from "../schemas/lancerData/bonusId.schema";
import { humanize } from "inflection";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { Fragment } from "react";

const BONUS_ICONS: Record<BonusId, IconDefinition> = {
  ai_cap: faMicrochip,
  armor: faShield,
  attack: faBurst,
  cb_point: faCirclePlus,
  cheap_stress: faTag,
  cheap_struct: faTag,
  core_power: faBolt,
  damage: faExplosion,
  deployable_armor: faShield,
  deployable_charges: faCirclePlus,
  deployable_edef: faMicrochip,
  deployable_evasion: faPersonFallingBurst,
  deployable_heatcap: faFireExtinguisher,
  deployable_hp: faHeartCirclePlus,
  deployable_repcap: faWrench,
  deployable_save: faCirclePlus,
  deployable_sensor_range: faSatelliteDish,
  deployable_size: faExpand,
  deployable_speed: faRunning,
  deployable_tech_attack: faBolt,
  drone_armor: faShield,
  drone_charges: faCirclePlus,
  drone_edef: faMicrochip,
  drone_evasion: faPersonFallingBurst,
  drone_heatcap: faFireExtinguisher,
  drone_hp: faHeartCirclePlus,
  drone_repcap: faWrench,
  drone_save: faCirclePlus,
  drone_sensor_range: faSatelliteDish,
  drone_size: faExpand,
  drone_speed: faRunning,
  drone_tech_attack: faBolt,
  edef: faMicrochip,
  evasion: faPersonFallingBurst,
  grapple: faHandcuffs,
  heatcap: faFireExtinguisher,
  hp: faHeartCirclePlus,
  license_point: faIdCard,
  limited_bonus: faPlusCircle,
  mech_skill_point: faPlusCircle,
  overcharge: faBolt,
  pilot_armor: faShield,
  pilot_edef: faMicrochip,
  pilot_evasion: faPersonFallingBurst,
  pilot_gear: faBriefcase,
  pilot_hp: faHeartCirclePlus,
  pilot_speed: faRunning,
  ram: faCarBurst,
  range: faBullseye,
  repcap: faWrench,
  save: faCirclePlus,
  sensor: faSatelliteDish,
  size: faExpand,
  skill_point: faCirclePlus,
  sp: faCirclePlus,
  speed: faPersonRunning,
  stress: faHeartCirclePlus,
  structure: faHeartCirclePlus,
  talent_point: faCirclePlus,
  tech_attack: faBolt,
};

function bonusIdToName(bonusId: BonusId): string {
  const name = bonusId.replace("pilot_", "");
  return humanize(name).replace("Hp", "HP").replace("Edef", "E-Defense");
}

function createBonusStatRow(bonus: Bonus): StatsTableRow {
  return [
    BONUS_ICONS[bonus.id],
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
