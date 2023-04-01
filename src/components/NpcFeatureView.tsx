import {
  faChevronUp,
  faChevronDown,
  faTriangleExclamation,
  faCirclePlus,
  faBarcode,
  faGun,
  faBullseye,
  faBolt,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmpty } from "ramda";
import { Fragment, useState } from "react";
import { NpcFeature } from "../schemas/lancerData/npcFeature.schema";
import { TieredStat } from "../schemas/lancerData/tieredStat.schema";
import { ICONS } from "../utils/icons";
import { RangeView } from "./RangeView";
import { StatsTable, StatsTableRow } from "./StatsTable";
import { UserText } from "./UserText";

function TieredStatView({ tieredStat }: { tieredStat: TieredStat }) {
  return (
    <div className="inline-block">
      <div className="font-medium flex items-center bg-bgcolor-700 overflow-hidden h-4 px-3 rounded-full text-sm">
        {tieredStat.map((stat, i) => {
          const isLast = i === tieredStat.length - 1;

          return (
            <Fragment key={i}>
              <div>{stat}</div>

              {!isLast && (
                <div className="pill-divider h-5 mx-2 bg-bgcolor-800"></div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function TieredDamageView({
  tieredDamage,
}: {
  tieredDamage: Required<NpcFeature>["damage"];
}) {
  return (
    <>
      {tieredDamage.map(({ damage, type }, i) => {
        const isLast = i === tieredDamage.length - 1;
        return (
          <span className="font-bold" key={i}>
            <TieredStatView tieredStat={damage} /> {type}
            {!isLast && <span className="mr-2">,</span>}
          </span>
        );
      })}
    </>
  );
}

function NpcWeaponView({
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

export function NpcFeatureView({
  npcFeature,
  isOpen: _isOpen,
  className,
}: {
  npcFeature: NpcFeature;
  isOpen?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(_isOpen));

  const toggleIsOpen = () => setIsOpen((state) => !state);

  const isAttack = npcFeature.type === "Weapon" || npcFeature.type === "Tech";

  return (
    <div
      className={`border border-l-4 border-bgcolor-700 border-l-gray-500 ${className}`}
    >
      <button
        type="button"
        className="flex flex-wrap items-center w-full p-2 transition-colors hover:bg-bgcolor-700 whitespace-nowrap"
        onClick={toggleIsOpen}
      >
        <div className="pr-3 mr-auto text-sm font-bold">{npcFeature.name}</div>
        <div className="text-sm italic">{npcFeature.type}</div>
        <div className="flex items-center justify-center w-5 h-5 ml-2 text-xs rounded-full">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </button>
      {isOpen && (
        <div className="px-2 pb-2">
          {npcFeature.trigger && (
            <div>
              <label className="text-sm text-gray-400">Trigger</label>
              <UserText className="text-sm" text={npcFeature.trigger} />
            </div>
          )}

          {npcFeature.effect && (
            <div>
              <label className="text-sm text-gray-400">Effect</label>
              <UserText className="text-sm" text={npcFeature.effect} />
            </div>
          )}

          {npcFeature.resistance && (
            <div>
              <label className="text-sm text-gray-400">Resistance</label>
              <div className="text-sm">{npcFeature.resistance.join(", ")}</div>
            </div>
          )}

          {npcFeature.immunity && (
            <div>
              <label className="text-sm text-gray-400">Immunity</label>
              <div className="text-sm">{npcFeature.immunity.join(", ")}</div>
            </div>
          )}

          {isAttack && (
            <NpcWeaponView npcFeature={npcFeature} className="mt-2" />
          )}
        </div>
      )}
    </div>
  );
}

// tags;
// exclusive;
// locked;
// on_hit;
// bonus;
// override;
