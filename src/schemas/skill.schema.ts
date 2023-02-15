import { z } from "zod";
import { skillFamilySchema } from "./skillFamily.schema";

export const skillSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    detail: z.string(),
    family: skillFamilySchema,
  })
  .strict();

export type Skill = z.infer<typeof skillSchema>;

// {
//     "id": "sk_assault",
//     "name": "ASSAULT",
//     "description": "Take part in direct and overt combat.",
//     "detail": "Take part in direct and overt combat: fighting your way through a building packed with hostile mercenaries, trading shots between rain-slick trenches, fighting in chaotic microgravity as part of a boarding action, or engaging the enemy in the smoking urban rubble of a city under orbital bombardment — When you assault, you’re always assaulting something (a position, a rival pilot, an enemy force, a group of guards), and it’s always loud, open, direct action.",
//     "family": "str"
// }
