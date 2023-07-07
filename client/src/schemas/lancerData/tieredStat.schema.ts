import { z } from "zod";

export const tieredStatSchema = z.number().array().length(3);

export type TieredStat = z.infer<typeof tieredStatSchema>;
