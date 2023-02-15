import camelize from "camelize-ts";
import { z } from "zod";
import { actionSchema } from "./action.schema";
import { ammoSchema } from "./ammo.schema";
import { bonusSchema } from "./bonus.schema";
import { counterSchema } from "./counter.schema";
import { deployableSchema } from "./deployable.schema";
import { synergySchema } from "./synergy.schema";
import { systemTypeSchema } from "./systemType.schema";
import { tagRefSchema } from "./tagRef.schema";

export const systemSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: systemTypeSchema.optional(),
    sp: z.number(),
    tags: tagRefSchema.array().optional(),
    source: z.string(),
    license: z.string(),
    license_level: z.number(),
    effect: z.string().optional(),
    description: z.string().optional(),
    license_id: z.string(),
    deployables: deployableSchema.array().optional(),
    actions: actionSchema.array().optional(),
    bonuses: bonusSchema.array().optional(),
    synergies: synergySchema.array().optional(),
    counters: counterSchema.array().optional(),
    talent_item: z.boolean().default(false),
    talent_id: z.string().optional(),
    talent_rank: z.number().optional(),
    ammo: ammoSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type System = z.infer<typeof systemSchema>;

// {
//     "id": "ms_comp_con_class_assistant_unit",
//     "name": "Comp/Con-Class Assistant Unit",
//     "type": "AI",
//     "sp": 2,
//     "tags": [
//         {
//             "id": "tg_ai"
//         },
//         {
//             "id": "tg_no_cascade"
//         },
//         {
//             "id": "tg_unique"
//         }
//     ],
//     "source": "GMS",
//     "license": "GMS",
//     "license_level": 0,
//     "effect": "Your mech has a basic comp/con unit, granting it the AI tag. The comp/con can speak to you and has a personality, but, unlike an NHP, is not truly capable of independent thought. It is obedient to you alone.<br>You can give control of your mech to its comp/con as a protocol, allowing your mech to act independently on your turn with its own set of actions. Unlike other AIs, a mech controlled by a comp/con has no independent initiative and requires direct input. Your mech will follow basic courses of action (defend this area, attack this enemy, protect me, etc.) to the best of its ability, or will act to defend itself if its instructions are complete or it receives no further guidance. You can issue new commands at the start of your turn as long as you are within Range 50 and have the means to communicate with your mech. Comp/con units are not true NHPs and thus cannot enter cascade.",
//     "description": "The GMS Companion/Concierge-Class Assistant Unit conforms to all galaxy-wide standards. These virtual assistants pass even the most rigid Turing-Null assessment criteria and are cleared to operate even in the absence of a pilot.",
//     "license_id": ""
// }
