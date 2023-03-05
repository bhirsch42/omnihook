import { Frame } from "../schemas/lancerData/frame.schema";
import { StatsTable, StatsTableRow } from "./StatsTable";

export function MechFrameStatsView({ mechFrame }: { mechFrame: Frame }) {
  const rows: StatsTableRow[] = [];

  return <StatsTable rows={rows} />;
}
