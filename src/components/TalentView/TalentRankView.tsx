import { faUnlock, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TalentRank } from "../../schemas/lancerData/talentRank.schema";
import { ActionsList } from "../ActionsList";
import { ActionView } from "../ActionView";
import { Button } from "../Button";
import { HLine } from "../HLine";
import { UserText } from "../UserText";

export type TalentRankViewProps = {
  talentRank: TalentRank;
  rankNum: number;
  showRemove?: boolean;
  showAdd?: boolean;
  showOwned?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
};

export function TalentRankView({
  talentRank,
  rankNum,
  showRemove,
  showAdd,
  showOwned,
  onAdd,
  onRemove,
}: TalentRankViewProps) {
  if (showRemove && showAdd) {
    throw new Error("showRemove and showAdd cannot both be true");
  }

  function renderEditButton() {
    if (showAdd) {
      return (
        <Button
          className="flex items-center py-0.5 mr-2 text-xs bg-green-700 hover:bg-green-600 text-textcolor-50"
          onClick={onAdd}
        >
          Unlock <FontAwesomeIcon icon={faUnlock} className="ml-2" />
        </Button>
      );
    }

    if (showRemove) {
      return (
        <Button
          className="flex items-center py-0.5 mr-2 text-xs bg-red-700 hover:bg-red-600 text-textcolor-50"
          onClick={onRemove}
        >
          Remove <FontAwesomeIcon icon={faX} className="ml-2" />
        </Button>
      );
    }

    if (showOwned) {
      return (
        <Button
          className="flex items-center py-0.5 mr-2 text-xs pointer-events-none"
          disabled
        >
          Unlocked
        </Button>
      );
    }

    return null;
  }

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <div className="font-bold">{talentRank.name}</div>
        <HLine />
        <div className="flex items-center ml-2 font-bold text-bgcolor-400">
          {renderEditButton()}
          <div>Rank {rankNum}</div>
        </div>
      </div>
      <UserText className="text-sm user-text" text={talentRank.description} />
      <ActionsList actions={talentRank.actions} />
    </div>
  );
}
