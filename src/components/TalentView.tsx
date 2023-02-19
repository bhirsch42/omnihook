import { isNil } from "ramda";
import { Talent } from "../schemas/lancerData/talent.schema";
import { TalentRank } from "../schemas/lancerData/talentRank.schema";
import { PilotTalent } from "../schemas/pilotTalent.schema";
import { useAppSelector } from "../store/hooks";
import { selectPilot } from "../store/pilots/selectors/selectPilot";
import { selectPilotSafe } from "../store/pilots/selectors/selectPilotSafe";
import { ActionView } from "./ActionView";
import { HLine } from "./HLine";

function TalentRankView({
  talentRank,
  rankNum,
  pilotId,
  isEditing,
}: {
  talentRank: TalentRank;
  rankNum: number;
  pilotId?: string;
  isEditing?: boolean;
}) {
  if (isEditing && !pilotId) {
    throw new Error(`TalentRankView requires pilotId when isEditing=true`);
  }

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <div className="font-bold">{talentRank.name}</div>
        <HLine />
        <div className="ml-2 font-bold text-bgcolor-400">Rank {rankNum}</div>
      </div>
      <div
        className="user-text"
        dangerouslySetInnerHTML={{ __html: talentRank.description }}
      ></div>
      {talentRank.actions && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {talentRank.actions.map((action) => (
            <ActionView action={action} key={action.detail} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TalentView({
  talent,
  pilotId,
  isEditing,
}: {
  talent: Talent;
  pilotId?: string;
  isEditing?: boolean;
}) {
  const pilot = useAppSelector(selectPilotSafe(pilotId));

  let ranks = talent.ranks;

  if (pilot && !isEditing) {
    const pilotTalent = pilot.talents.find((t) => t.id === talent.id);

    if (!pilotTalent)
      throw new Error(`Could not find pilot talent: ${talent.id}`);

    const maxRank = pilotTalent.rank;

    ranks = ranks.slice(0, maxRank);
  }

  return (
    <div id={talent.id}>
      <div className="text-xl font-bold">{talent.name}</div>
      <div dangerouslySetInnerHTML={{ __html: talent.terse }}></div>
      <div
        className="pl-3 my-2 ml-3 text-sm italic border-l-2 border-accentcolor-400 user-text"
        dangerouslySetInnerHTML={{ __html: talent.description }}
      ></div>
      {ranks.map((talentRank, i) => (
        <TalentRankView
          talentRank={talentRank}
          rankNum={i + 1}
          key={talentRank.name}
          pilotId={pilotId}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
}
