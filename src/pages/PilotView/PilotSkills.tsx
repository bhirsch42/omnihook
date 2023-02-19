import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { lancerCollections } from "../../data/lancerData";
import { Button } from "../../components/Button";
import { useWindowManager } from "../../components/WindowManager";
import { ChooseSkill } from "./ChooseSkill";
import { addSkill, decrementSkill, incrementSkill } from "../../store/pilots";
import { selectPilotSkillModifiers } from "../../store/pilots/selectors/selectPilotSkillModifiers";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Skill } from "../../schemas/lancerData/skill.schema";
import { useDispatch } from "react-redux";
import { selectUnspentPilotSkillPoints } from "../../store/pilots/selectors/selectUnspentPilotSkillPoints";

export const CHOOSE_SKILL_WINDOW_ID = "choose-new-skill";

type PilotSkillRowProps = {
  skill: Skill;
  modifier: number;
  minPoints: number;
  points: number;
  maxPoints: number;
  pilotId: string;
};

function PilotSkillRow({
  skill,
  modifier,
  minPoints,
  points,
  maxPoints,
  pilotId,
}: PilotSkillRowProps) {
  const dispatch = useDispatch();
  const unspentPoints = useAppSelector(selectUnspentPilotSkillPoints(pilotId));

  function handleClickDecrement() {
    dispatch(decrementSkill({ pilotId, skillId: skill.id }));
  }

  function handleClickIncrement() {
    dispatch(incrementSkill({ pilotId, skillId: skill.id }));
  }

  const isDecrementDisabled = points <= minPoints;
  const isIncrementDisabled = points >= maxPoints || unspentPoints === 0;

  return (
    <Fragment key={skill.id}>
      <div>
        <div className="flex items-center font-bold">
          <div>{skill.name}</div>
          <div className="ml-2 grow bg-bgcolor-700 h-1px"></div>
        </div>
        <div className="max-w-md text-sm">{skill.description}</div>
      </div>
      <div>+{modifier}</div>
      <div className="grid grid-cols-2 gap-1 pt-1">
        <button
          type="button"
          className={`flex items-center justify-center w-4 h-4 text-xs transition-colors rounded-full bg-zinc-600 hover:bg-zinc-500 ${
            isDecrementDisabled && "opacity-50"
          }`}
          onClick={handleClickDecrement}
          disabled={isDecrementDisabled}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          type="button"
          className={`flex items-center justify-center w-4 h-4 text-xs transition-colors rounded-full bg-zinc-600 hover:bg-zinc-500 ${
            isIncrementDisabled && "opacity-50"
          }`}
          onClick={handleClickIncrement}
          disabled={isIncrementDisabled}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </Fragment>
  );
}

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
  const unspentPoints = useAppSelector(selectUnspentPilotSkillPoints(pilotId));

  const skillIds = pilot.skills.map((skill) => skill.id);
  const skills = lancerCollections.skills.findAll(skillIds);

  const prevPilotSnapshot = pilot.licenseLevelSnapshots[
    pilot.licenseLevel - 1
  ] || {
    skills: [],
  };

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
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-2">
        {skills.map((skill, i) => {
          const prevSkill = prevPilotSnapshot.skills.find(
            (s) => s.id === skill.id
          );

          const prevPoints = (prevSkill && prevSkill.rank) || 0;

          return (
            <PilotSkillRow
              key={skill.id}
              skill={skill}
              modifier={skillModifiers[i]}
              minPoints={prevPoints}
              points={pilot.skills[i].rank}
              maxPoints={pilotStats.maxPointsPerSkill}
              pilotId={pilotId}
            />
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
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <div className="text-sm">
              Unspent points:
              <span className="ml-2 font-bold">{unspentPoints}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
