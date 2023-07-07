import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NpcFeature } from "../schemas/lancerData/npcFeature.schema";
import { UserText } from "./UserText";
import { NpcWeaponView } from "./NpcWeaponView";
import { TagId } from "../schemas/lancerData/tagId.schema";
import { useCollections } from "../hooks/useCollections";
import { titleize } from "inflection";

const FEATURE_DESCRIPTOR_TAG_IDS: TagId[] = [
  "tg_quick_action",
  "tg_quick_tech",
];

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
  const collections = useCollections();

  const toggleIsOpen = () => setIsOpen((state) => !state);

  const isAttack = npcFeature.type === "Weapon" || npcFeature.type === "Tech";

  const tags = collections.tags.findAll(npcFeature.tags.map((o) => o.id));

  const descriptorsFromTags = tags
    .filter((tag) => FEATURE_DESCRIPTOR_TAG_IDS.includes(tag.id))
    .map((tag) => titleize(tag.name));

  const descriptors = [npcFeature.type, ...descriptorsFromTags];

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
        <div className="text-sm italic">{descriptors.join(", ")}</div>
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
