import { Button } from "../../components/Button";
import { TalentView } from "../../components/TalentView";
import { UnspentPoints } from "../../components/UnspentPoints";
import { useWindowManager } from "../../components/WindowManager";
import { useCollections } from "../../hooks/useCollections";
import { useAppSelector } from "../../store/hooks";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { selectUnspentPilotTalentPoints } from "../../store/pilots/selectors/selectUnspentPilotTalentPoints";
import { EditTalents } from "./EditTalents";

export function PilotTalents({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const { openWindow } = useWindowManager();
  const lancerCollections = useCollections();

  const pilot = useAppSelector(selectPilot(pilotId));
  const unspentTalentPoints = useAppSelector(
    selectUnspentPilotTalentPoints(pilotId)
  );

  const talentIds = pilot.talents.map((talent) => talent.id);
  const talents = lancerCollections.talents.findAll(talentIds);

  function handleClickEditTalents() {
    openWindow({
      id: "edit-talents",
      label: "Edit Talents",
      component: <EditTalents pilotId={pilotId} />,
    });
  }

  return (
    <div className={className}>
      <div className="flex items-center h-10 px-3 bg-bgcolor-800">
        <div className="pr-3 mr-auto whitespace-nowrap">=== Talents ===</div>
        {unspentTalentPoints > 0 && (
          <>
            <UnspentPoints count={unspentTalentPoints} />

            <Button
              onClick={handleClickEditTalents}
              className="ml-3 text-xs whitespace-nowrap"
            >
              Edit Talents
            </Button>
          </>
        )}
      </div>

      {talents.map((talent, i) => (
        <TalentView
          key={talent.id}
          talent={talent}
          pilotId={pilotId}
          className="py-3 border-b-4 border-b-bgcolor-800 last:border-b-0"
        />
      ))}
    </div>
  );
}
