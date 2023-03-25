import { Skill } from "../schemas/lancerData/skill.schema";
import { Button } from "./Button";
import { UserText } from "./UserText";

export function SkillView({
  skill,
  className,
  onSelect,
}: {
  skill: Skill;
  className?: string;
  onSelect?: (skillId: string) => void;
}) {
  return (
    <div className={className}>
      <div className="flex">
        <div className="text-lg font-bold mr-auto">{skill.name}</div>
        {onSelect && (
          <Button onClick={() => onSelect(skill.id)} className="text-sm">
            Add
          </Button>
        )}
      </div>

      <UserText text={skill.description} />
    </div>
  );
}
