import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { MechsState } from "..";
import { v4 as uuidv4 } from "uuid";
import { MechFrame } from "../../../schemas/lancerData/mechFrame.schema";
import {
  AuxAuxMount,
  FlexMount,
  HeavyMount,
  IntegratedMount,
  MainAuxMount,
  MainMount,
  Mount,
} from "../../../schemas/mount.schema";
import { exhaustiveGuard } from "../../../utils/exhaustiveGuard";

type CreateMech = {
  name: string;
  pilotId: string;
  frame: MechFrame;
};

function mountsForFrame(frame: MechFrame): Mount[] {
  return frame.mounts.map((mount) => {
    switch (mount) {
      case "Aux/Aux":
        return {
          type: mount,
          equipped: [null, null],
          disabled: false,
        } satisfies AuxAuxMount;
      case "Flex":
        return {
          type: mount,
          equipped: [null],
          disabled: false,
        } satisfies FlexMount;
      case "Heavy":
        return {
          type: mount,
          equipped: [null],
          disabled: false,
        } satisfies HeavyMount;
      case "Main":
        return {
          type: mount,
          equipped: [null],
          disabled: false,
        } satisfies MainMount;
      case "Integrated":
        return {
          type: mount,
          equipped: [],
          disabled: false,
        } satisfies IntegratedMount;
      case "Main/Aux":
        return {
          type: mount,
          equipped: [null, null],
          disabled: false,
        } satisfies MainAuxMount;
      default:
        exhaustiveGuard(mount);
    }
  });
}

export function createMechReducer(
  state: Draft<MechsState>,
  action: PayloadAction<CreateMech>
) {
  const { frame, name, pilotId } = action.payload;

  state.all.push({
    name,
    pilotId,
    frameId: frame.id,
    id: uuidv4(),
    mounts: mountsForFrame(frame),
  });
}
