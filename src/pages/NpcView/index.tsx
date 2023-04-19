import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../store/hooks";
import { selectNpcById } from "../../store/npcData/selectors/selectNpcById";
import { NpcCombatStats } from "./NpcCombatStats";
import { NpcSkills } from "./NpcSkills";
import { NpcStatuses } from "./NpcStatuses";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NpcFeatureView } from "../../components/NpcFeatureView";
import { NpcActions } from "./NpcActions";
import { selectIsNpcDestroyed } from "../../store/npcData/selectors/selectIsNpcDestroyed";
import { selectIsNpcInDangerZone } from "../../store/npcData/selectors/selectIsNpcInDangerZone";
import { Pill } from "../../components/Pill";
import { selectIsNpcMeltdownImminent } from "../../store/npcData/selectors/isNpcMeltdownImminent";

export function NpcView({
  npcId,
  className,
}: {
  npcId: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const npc = useAppSelector(selectNpcById(npcId));
  const isDestroyed = useAppSelector(selectIsNpcDestroyed(npcId));
  const isInDangerZone = useAppSelector(selectIsNpcInDangerZone(npcId));
  const isMeltdownImminent = useAppSelector(selectIsNpcMeltdownImminent(npcId));

  return (
    <div className={`flex flex-col ${className}`}>
      <button
        className="flex items-center px-3 py-2 text-lg font-bold bg-bgcolor-800 hover:bg-bgcolor-700 transition-colors"
        onClick={() => setIsOpen((state) => !state)}
      >
        <div>{npc.name}</div>

        <div className="pl-3 ml-3 border-l-4 text-bgcolor-400 border-l-bgcolor-700 capitalize italic">
          {npc.npcClass.role}
        </div>

        {isInDangerZone && (
          <Pill color="yellow" className="ml-3">
            DANGER ZONE
          </Pill>
        )}

        {isDestroyed && (
          <Pill color="red" className="ml-3">
            DESTROYED
          </Pill>
        )}

        {isMeltdownImminent && (
          <Pill color="orange" className="ml-3">
            REACTOR MELTDOWN IMMINENT
          </Pill>
        )}

        <div className="ml-auto">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </button>
      <div className="px-3 pb-3 bg-bgcolor-800">
        <div className="flex mt-3">
          <div className="flex w-full gap-8">
            <NpcSkills npcId={npcId} />
            <NpcCombatStats npcId={npcId} />

            <div className="flex flex-col gap-1">
              {npc.features.map((feature) => {
                return (
                  <NpcFeatureView
                    npcFeature={feature}
                    className="max-w-lg"
                    key={feature.id}
                  />
                );
              })}
            </div>
            <NpcStatuses npcId={npcId} className="grow" />
          </div>
        </div>
      </div>

      <div className={`bg-bgcolor-800 px-3 pb-3 ${isOpen ? "" : "hidden"}`}>
        <NpcActions npcId={npcId} />
      </div>
    </div>
  );
}
