import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { lancerCollections } from "../../data/lancerData";
import { Button } from "../../components/Button";
import { useWindowManager } from "../../components/WindowManager";
import { ChooseSkill } from "./ChooseSkill";
import { addSkill } from "../../store/pilots";
import { selectPilotSkillModifiers } from "../../store/pilots/selectors/selectPilotSkillModifiers";
import { Fragment } from "react";

export const CHOOSE_SKILL_WINDOW_ID = "choose-new-skill";

export function PilotSkills({
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
  const skillModifiers = useAppSelector(selectPilotSkillModifiers(pilotId));

  const unspentPoints = pilotStats.pilotSkillPoints - pilot.skills.length;
  const skillIds = pilot.skills.map((skill) => skill.id);
  const skills = lancerCollections.skills.findAll(skillIds);

  function handleSelectSkill(skillId: string) {
    dispatch(addSkill({ pilotId, skillId }));
    closeWindow(CHOOSE_SKILL_WINDOW_ID);
  }

  function handleClickAddSkill() {
    openWindow({
      component: (
        <ChooseSkill
          onSelect={handleSelectSkill}
          alreadySelectedSkillIds={skillIds}
        />
      ),
      label: "Choose New Skill",
      id: CHOOSE_SKILL_WINDOW_ID,
    });
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-[auto_1fr] gap-2">
        {skills.map((skill, i) => {
          return (
            <Fragment key={skill.id}>
              <div>
                <div className="font-bold flex items-center">
                  <div>{skill.name}</div>
                  <div className="grow bg-bgcolor-700 ml-2 h-1px"></div>
                </div>
                <div className="text-sm max-w-md">{skill.description}</div>
              </div>
              <div>+{skillModifiers[i]}</div>
            </Fragment>
          );
        })}
      </div>
      {unspentPoints > 0 && (
        <>
          <div className="my-2">
            <Button onClick={handleClickAddSkill} className="w-full">
              Add Skill
            </Button>
          </div>
          <div className="flex items-center">
            <div className="bg-red-500 w-3 h-3 rounded-full mr-2"></div>
            <div className="text-sm">
              Unspent points:
              <span className="font-bold ml-2">{unspentPoints}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
