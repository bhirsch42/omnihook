import { NpcFeature } from "../schemas/lancerData/npcFeature.schema";
import { TieredStatView } from "./TieredStatView";

export function TieredDamageView({
  tieredDamage,
}: {
  tieredDamage: Required<NpcFeature>["damage"];
}) {
  return (
    <>
      {tieredDamage.map(({ damage, type }, i) => {
        const isLast = i === tieredDamage.length - 1;
        return (
          <span className="font-bold" key={i}>
            <TieredStatView tieredStat={damage} /> {type}
            {!isLast && <span className="mr-2">,</span>}
          </span>
        );
      })}
    </>
  );
}
