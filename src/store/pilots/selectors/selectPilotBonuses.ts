import { RootState } from "../..";
import { lancerCollections } from "../../../data/lancerData";
import { Bonus } from "../../../schemas/lancerData/bonus.schema";
import { selectPilot } from "./selectPilot";
import { flatten, isNil, reject } from "ramda";

export const selectPilotBonuses =
  (id: string) =>
  (state: RootState): Bonus[] => {
    const pilot = selectPilot(id)(state);

    const gearBonuses = reject(
      isNil,
      flatten(
        lancerCollections.pilotGear
          .findAll(pilot.gear.map((gear) => gear.pilotGearId))
          .map((gear) => gear.bonuses)
      )
    );

    return gearBonuses;
  };
