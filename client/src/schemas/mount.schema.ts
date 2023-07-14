import { z } from "zod";
import { weaponSizeSchema } from "./lancerData/weaponSize.schema";
import { mountTypeSchema } from "./lancerData/mountType.schema";

mountTypeSchema;

const baseMountSchema = z.object({
  disabled: z.boolean(),
});

const baseMountedEquipment = z.object({ id: z.string().uuid() });

const mainMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum.Main),
  equipped: z.tuple([
    baseMountedEquipment
      .extend({
        type: z.union([
          z.literal(weaponSizeSchema.Enum.Main),
          z.literal(weaponSizeSchema.Enum.Auxiliary),
        ]),
      })
      .nullable(),
  ]),
});

const heavyMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum.Heavy),
  equipped: z.tuple([
    baseMountedEquipment
      .extend({
        type: z.union([
          z.literal(weaponSizeSchema.Enum.Heavy),
          z.literal(weaponSizeSchema.Enum.Main),
          z.literal(weaponSizeSchema.Enum.Auxiliary),
        ]),
      })
      .nullable(),
  ]),
});

const auxAuxMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum["Aux/Aux"]),
  equipped: z.tuple([
    baseMountedEquipment
      .extend({
        type: z.literal(weaponSizeSchema.Enum.Auxiliary),
      })
      .nullable(),
    baseMountedEquipment
      .extend({
        type: z.literal(weaponSizeSchema.Enum.Auxiliary),
      })
      .nullable(),
  ]),
});

const mainAuxMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum["Main/Aux"]),
  equipped: z.union([
    z.tuple([
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Main),
        })
        .nullable(),
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
    ]),
    z.tuple([
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Main),
        })
        .nullable(),
    ]),
    z.tuple([
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
    ]),
  ]),
});

const flexMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum.Flex),
  equipped: z.union([
    z.tuple([
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Main),
        })
        .nullable(),
    ]),
    z.tuple([
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
      baseMountedEquipment
        .extend({
          type: z.literal(weaponSizeSchema.Enum.Auxiliary),
        })
        .nullable(),
    ]),
  ]),
});

const integratedMountSchema = baseMountSchema.extend({
  type: z.literal(mountTypeSchema.Enum.Integrated),
  equipped: baseMountedEquipment
    .extend({
      type: weaponSizeSchema,
    })
    .array(),
});

export const mountSchema = z.union([
  mainMountSchema,
  heavyMountSchema,
  auxAuxMountSchema,
  mainAuxMountSchema,
  flexMountSchema,
  integratedMountSchema,
]);

export type Mount = z.infer<typeof mountSchema>;

export type MainMount = z.infer<typeof mainMountSchema>;
export type HeavyMount = z.infer<typeof heavyMountSchema>;
export type AuxAuxMount = z.infer<typeof auxAuxMountSchema>;
export type MainAuxMount = z.infer<typeof mainAuxMountSchema>;
export type FlexMount = z.infer<typeof flexMountSchema>;
export type IntegratedMount = z.infer<typeof integratedMountSchema>;
