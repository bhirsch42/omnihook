import { Skill } from "../schemas/lancerData/skill.schema";

export function SkillView({
  skill,
  className,
}: {
  skill: Skill;
  className?: string;
}) {
  return (
    <div id={skill.id} className={className}>
      <div className="text-lg font-bold">{skill.name}</div>
      <div dangerouslySetInnerHTML={{ __html: skill.description }}></div>
    </div>
  );
}
