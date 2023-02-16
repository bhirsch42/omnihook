import { Skill } from "../schemas/skill.schema";

export function SkillView({ skill }: { skill: Skill }) {
  return (
    <div id={skill.id}>
      <div className="font-bold text-lg">{skill.name}</div>
      <div dangerouslySetInnerHTML={{ __html: skill.description }}></div>
    </div>
  );
}
