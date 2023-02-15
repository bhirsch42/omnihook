import { z } from "zod";
import camelize from "camelize-ts";
import { standardActionSchema } from "./standardAction.schema";
import { backgroundSchema } from "./background.schema";
import { coreBonusSchema } from "./coreBonus.schema";
import { environmentSchema } from "./environment.schema";
import { frameSchema } from "./frame.schema";
import { manufacturerSchema } from "./manufacturer.schema";
import { modSchema } from "./mod.schema";
import { pilotGearSchema } from "./pilotGear.schema";

export const lancerDataSchema = z
  .object({
    actions: standardActionSchema.array(),
    backgrounds: backgroundSchema.array(),
    core_bonuses: coreBonusSchema.array(),
    environments: environmentSchema.array(),
    factions: z.never().array(),
    frames: frameSchema.array(),
    glossary: z.object({ name: z.string(), description: z.string() }).array(),
    info: z.object({
      active: z.boolean(),
      author: z.string(),
      description: z.string(),
      name: z.string(),
      version: z.string(),
      website: z.string(),
    }),
    manufacturers: manufacturerSchema.array(),
    mods: modSchema.array(),
    npc_classes: z.never().array(),
    npc_features: z.never().array(),
    npc_templates: z.never().array(),
    pilot_gear: pilotGearSchema.array(),
  })
  .transform((o) => camelize(o, true));

export type LancerData = z.infer<typeof lancerDataSchema>;
