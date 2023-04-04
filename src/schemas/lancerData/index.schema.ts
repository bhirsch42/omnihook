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
import { reserveSchema } from "./reserve.schema";
import { rulesSchema } from "./rules.schema";
import { sitrepSchema } from "./sitrep.schema";
import { skillSchema } from "./skill.schema";
import { statusSchema } from "./status.schema";
import { systemSchema } from "./system.schema";
import { tagSchema } from "./tag.schema";
import { talentSchema } from "./talent.schema";
import { weaponSchema } from "./weapon.schema";
import { npcClassSchema } from "./npcClass.schema";
import { npcFeatureSchema } from "./npcFeature.schema";
import { npcTemplateSchema } from "./npcTemplate.schema";

const _lancerDataSchema = z
  .object({
    actions: standardActionSchema.array(),
    backgrounds: backgroundSchema.array(),
    core_bonuses: coreBonusSchema.array(),
    environments: environmentSchema.array(),
    factions: z.never().array(),
    frames: frameSchema.array(),
    glossary: z.object({ name: z.string(), description: z.string() }).array(),
    info: z
      .object({
        active: z.boolean(),
        author: z.string(),
        description: z.string(),
        name: z.string(),
        version: z.string(),
        website: z.string(),
      })
      .strict(),
    manufacturers: manufacturerSchema.array(),
    mods: modSchema.array(),
    npc_classes: npcClassSchema.array(),
    npc_features: npcFeatureSchema.array(),
    npc_templates: npcTemplateSchema.array(),
    pilot_gear: pilotGearSchema.array(),
    reserves: reserveSchema.array(),
    rules: rulesSchema,
    sitreps: sitrepSchema.array(),
    skills: skillSchema.array(),
    statuses: statusSchema.array(),
    systems: systemSchema.array(),
    tables: z
      .object({
        pilot_names: z.never().array(),
        callsigns: z.never().array(),
        mech_names: z.never().array(),
        team_names: z.never().array(),
        quirks: z.string().array(),
      })
      .strict()
      .transform((o) => camelize(o, true)),
    tags: tagSchema.array(),
    talents: talentSchema.array(),
    weapons: weaponSchema.array(),
  })
  .strict();

export const lancerDataSchemaPartial = _lancerDataSchema
  .partial()
  .transform((o) => camelize(o, true));

export const lancerDataSchema = _lancerDataSchema.transform((o) =>
  camelize(o, true)
);

export type LancerData = z.infer<typeof lancerDataSchema>;
