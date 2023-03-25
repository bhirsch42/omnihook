import camelize from "camelize-ts";
import { z } from "zod";
import { actionTypeSchema } from "./actionType.schema";
import { bonusIdSchema } from "./bonusId.schema";
import { damageSchema } from "./damage.schema";
import { damageTypeSchema } from "./damageType.schema";
import { npcFeatureTypeSchema } from "./npcFeatureType.schema";
import { rangeTypeSchema } from "./rangeType.schema";
import { rollValueSchema } from "./rollValue.schema";
import { tagRefSchema } from "./tagRef.schema";
import { tieredStatSchema } from "./tieredStat.schema";

export const npcFeatureSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    origin: z.object({
      type: z.string(),
      name: z.string(),
      base: z.boolean(),
    }),
    locked: z.boolean(),
    type: npcFeatureTypeSchema,
    effect: z.string(),
    tags: tagRefSchema.array(),
    weapon_type: z.string().optional(),
    attack_bonus: tieredStatSchema.optional(),
    accuracy: tieredStatSchema.optional(),
    damage: z
      .object({ type: damageTypeSchema, damage: tieredStatSchema })
      .array()
      .optional(),
    range: z
      .object({ type: rangeTypeSchema, val: z.number() })
      .array()
      .optional(),
    on_hit: z.string().optional(),
    bonus: z.record(bonusIdSchema, rollValueSchema).optional(),
    override: z.record(bonusIdSchema, rollValueSchema).optional(),
    exclusive: z.string().array().optional(),
    trigger: z.string().optional(),
    tech_type: actionTypeSchema.optional(),
    resistance: z.string().array().optional(),
    immunity: z.string().array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type NpcFeature = z.infer<typeof npcFeatureSchema>;
