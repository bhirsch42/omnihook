import { z } from "zod";

export const artSchema = z.object({
  tag: z.string(),
  src: z.string(),
});

export type Art = z.infer<typeof artSchema>;
