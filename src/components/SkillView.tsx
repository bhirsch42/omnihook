import { Skill } from "../schemas/lancerData/skill.schema";

export function SkillView({
  skill,
  className,
}: {
  skill: Skill;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-6" id={skill.id}></div>
      <div className="text-lg font-bold">{skill.name}</div>
      <div dangerouslySetInnerHTML={{ __html: skill.description }}></div>
    </div>
  );
}
