import { z } from "zod";

export const mechLicenseSchema = z.object({
  licenseId: z.string(),
  rank: z.number(),
});

export type MechLicense = z.infer<typeof mechLicenseSchema>;
