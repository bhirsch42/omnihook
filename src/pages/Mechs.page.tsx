import { MechList } from "./MechList.page";

type MechsProps = {
  pilotId: string;
};

export function Mechs({ pilotId }: MechsProps) {
  return <MechList />;
}
