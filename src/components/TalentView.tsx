import { Talent } from "../schemas/lancerData/talent.schema";
import { TalentRank } from "../schemas/lancerData/talentRank.schema";
import { ActionView } from "./ActionView";
import { HLine } from "./HLine";

function TalentRankView({
  talentRank,
  rankNum,
}: {
  talentRank: TalentRank;
  rankNum: number;
}) {
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

export function TalentView({ talent }: { talent: Talent }) {
  return (
    <div id={talent.id}>
      <div className="text-xl font-bold">{talent.name}</div>
      <div dangerouslySetInnerHTML={{ __html: talent.terse }}></div>
      <div
        className="pl-3 my-2 ml-3 text-sm italic border-l-2 border-accentcolor-400 user-text"
        dangerouslySetInnerHTML={{ __html: talent.description }}
      ></div>
      {talent.ranks.map((talentRank, i) => (
        <TalentRankView
          talentRank={talentRank}
          rankNum={i + 1}
          key={talentRank.name}
        />
      ))}
    </div>
  );
}
