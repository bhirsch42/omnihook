import { z } from "zod";
import { licenseLevelSnapshotSchema } from "./licenseLevelSnapshot.schema";
import { pilotGearRefSchema } from "./pilotGearRef.schema";
import { pilotSkillSchema } from "./pilotSkill.schema";
import { pilotTalentSchema } from "./pilotTalent.schema";
import { mechLicenseSchema } from "./mechLicense.schema";
import { mechSkillsSchema } from "./mechSkills.schema";

export const pilotSchema = z.object({
  id: z.string(),
  name: z.string(),
  callsign: z.string(),
  background: z.string().optional(),
  biography: z.string().optional(),
  description: z.string().optional(),
  licenseLevel: z.number(),
  canReallocate: z.boolean(),
  hp: z.number(),
  skills: pilotSkillSchema.array(),
  talents: pilotTalentSchema.array(),
  licenseLevelSnapshots: z.record(z.number(), licenseLevelSnapshotSchema),
  gear: pilotGearRefSchema.array(),
  licenses: mechLicenseSchema.array(),
  mechSkills: mechSkillsSchema,
});

export type Pilot = z.infer<typeof pilotSchema>;
