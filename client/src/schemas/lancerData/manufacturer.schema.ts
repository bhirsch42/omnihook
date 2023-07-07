import { z } from "zod";

export const manufacturerSchema = z
  .object({
    id: z.string(),
    dark: z.string(),
    light: z.string(),
    logo: z.string(),
    name: z.string(),
    quote: z.string(),
    description: z.string(),
  })
  .strict();

export type Manufacturer = z.infer<typeof manufacturerSchema>;
