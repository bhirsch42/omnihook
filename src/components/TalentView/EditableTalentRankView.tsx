import { useSelector } from "react-redux";
import { LicenseLevelSnapshot } from "../../schemas/licenseLevelSnapshot.schema";
import { Pilot } from "../../schemas/pilot.schema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTalentRank, removeTalentRank } from "../../store/pilots";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { selectUnspentPilotTalentPoints } from "../../store/pilots/selectors/selectUnspentPilotTalentPoints";
import { TalentRankView, TalentRankViewProps } from "./TalentRankView";

export function EditableTalentRankView({
  pilot,
  talentId,
  talentRank,
  rankNum,
}: TalentRankViewProps & { pilot: Pilot; talentId: string }) {
  const dispatch = useAppDispatch();

  const maxAllowedRank = useAppSelector(
    (state) => selectPilotStats(pilot.id)(state).maxPointsPerTalent
  );

  const unspentTalentPoints = useAppSelector(
    selectUnspentPilotTalentPoints(pilot.id)
  );

  const prevSnapshot = pilot.licenseLevelSnapshots[
    pilot.licenseLevel - 1
  ] as LicenseLevelSnapshot | null;

  const minAllowedRank = prevSnapshot?.talents?.find(
    (t) => t.id === talentId
  )?.rank;

  const hasRank = Boolean(
    pilot.talents.find((t) => t.id === talentId && t.rank >= rankNum)
  );

  const isMaxOwnedRank = Boolean(
    pilot.talents.find((t) => t.id === talentId && t.rank === rankNum)
  );

  const isFirstRank = rankNum === 1;

  const isMinAllowedRank = Boolean(
    minAllowedRank && rankNum === minAllowedRank
  );

  const hasPrevRank = Boolean(
    pilot.talents.find((t) => t.id === talentId && t.rank === rankNum - 1)
  );

  const isNextUnownedRank = (isFirstRank && !hasRank) || hasPrevRank;

  const hasUnspentPoints = unspentTalentPoints > 0;

  const isTooHigh = rankNum > maxAllowedRank;

  const handleRemove = () => {
    dispatch(removeTalentRank({ pilotId: pilot.id, talentId: talentId }));
  };

  const handleAdd = () => {
    dispatch(addTalentRank({ pilotId: pilot.id, talentId: talentId }));
  };

  return (
    <TalentRankView
      talentRank={talentRank}
      rankNum={rankNum}
      key={talentRank.name}
      showRemove={isMaxOwnedRank && !isMinAllowedRank}
      showAdd={hasUnspentPoints && isNextUnownedRank && !isTooHigh}
      showOwned={hasRank}
      onRemove={handleRemove}
      onAdd={handleAdd}
    />
  );
}
