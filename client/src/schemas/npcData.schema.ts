import { z } from "zod";
import { mechStatusSchema } from "./mechStatus.schema";

export const npcDataSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    classId: z.string(),
    templateId: z.string().optional(),
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    featureIds: z.string().array(),
    mechStatusId: z.string().uuid(),
  })
  .strict();

export type NpcData = z.infer<typeof npcDataSchema>;
