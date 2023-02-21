import { Talent } from "../../schemas/lancerData/talent.schema";
import { TalentRank } from "../../schemas/lancerData/talentRank.schema";
import { useAppSelector } from "../../store/hooks";
import { selectPilotSafe } from "../../store/pilots/selectors/selectPilotSafe";
import { EditableTalentRankView } from "./EditableTalentRankView";
import { TalentRankView } from "./TalentRankView";

export function TalentView({
  className,
  talent,
  pilotId,
  isEditing,
  showDescription,
}: {
  className?: string;
  talent: Talent;
  pilotId?: string;
  isEditing?: boolean;
  showDescription?: boolean;
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

  function renderRank(talentRank: TalentRank, i: number) {
    return pilot ? (
      <EditableTalentRankView
        talentRank={talentRank}
        rankNum={i + 1}
        key={talentRank.name}
        pilot={pilot}
        talentId={talent.id}
      />
    ) : (
      <TalentRankView
        talentRank={talentRank}
        rankNum={i + 1}
        key={talentRank.name}
      />
    );
  }

  return (
    <div className={className}>
      <div className="text-xl font-bold">{talent.name}</div>
      <div dangerouslySetInnerHTML={{ __html: talent.terse }}></div>
      {showDescription && (
        <div
          className="pl-3 my-2 ml-3 text-sm italic border-l-2 border-accentcolor-400 user-text"
          dangerouslySetInnerHTML={{ __html: talent.description }}
        ></div>
      )}
      {ranks.map(renderRank)}
    </div>
  );
}
