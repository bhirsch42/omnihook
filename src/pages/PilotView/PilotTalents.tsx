import { Button } from "../../components/Button";
import { TalentView } from "../../components/TalentView";
import { useWindowManager } from "../../components/WindowManager";
import { lancerCollections } from "../../data/lancerData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { EditTalents } from "./EditTalents";

export function PilotTalents({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const { openWindow, closeWindow } = useWindowManager();
  const dispatch = useAppDispatch();

  const pilot = useAppSelector(selectPilot(pilotId));
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

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
      {talents.map((talent, i) => (
        <TalentView talent={talent} pilotId={pilotId} />
      ))}
      <Button onClick={handleClickEditTalents}>Edit Talents</Button>
    </div>
  );
}
