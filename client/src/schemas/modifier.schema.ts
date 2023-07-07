import { z } from "zod";
import { mechStatKeySchema } from "./mechStatKey.schema";

export const modifierSchema = z.intersection(
  z.object({
    label: z.string(),
  }),
  z.discriminatedUnion("op", [
    z.object({
      op: z.literal("add"),
      value: z.number(),
      stat: mechStatKeySchema,
    }),
  ])
);

export type Modifier = z.infer<typeof modifierSchema>;
