import { lancerData } from "../data/lancerData";
import { PilotsState } from "../store/pilots";

export const pilotsTestData: PilotsState = {
  activePilotId: "kelly",
  all: [
    {
      id: "kelly",
      name: "Kelly McSpacey",
      callsign: "Pot of Gold",
      licenseLevel: 0,
      canReallocate: false,
      hp: lancerData.rules.basePilotHp,
      skills: [],
      licenseLevelSnapshots: {},
    },
  ],
};
