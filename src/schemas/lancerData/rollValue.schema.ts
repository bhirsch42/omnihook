import { z } from "zod";

export const rollValueSchema = z.union([
  z.coerce.string().regex(/^[0-9]+$/),
  z.coerce.string().regex(/^[0-9]+d(3|4|6|8|12)$/),
  z.coerce.string().regex(/^[0-9]+d(3|4|6|8|12) ?\+ ?[0-9]+$/),
  z.enum(["???", "N/A"]),
]);

type RollValue = z.infer<typeof rollValueSchema>;
