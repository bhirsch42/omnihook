import { lancerData } from "../data/lancerData";
import { PilotsState } from "../store/pilots";

export const pilotsTestData: PilotsState = {
  activePilotId: "63ae4377-e0dc-4f94-8e50-c4b22f12e779",
  all: [
    {
      id: "63ae4377-e0dc-4f94-8e50-c4b22f12e779",
      name: "Kelly McSpacey",
      callsign: "Pot of Gold",
      licenseLevel: 0,
      canReallocate: false,
      hp: lancerData.rules.basePilotHp,
      skills: [],
      talents: [],
      licenseLevelSnapshots: {},
      gear: [],
    },
  ],
};
