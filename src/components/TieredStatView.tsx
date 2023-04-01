import { Fragment, ReactNode } from "react";
import { TieredStat } from "../schemas/lancerData/tieredStat.schema";

export function TieredStatView({ tieredStat }: { tieredStat: ReactNode[] }) {
  return (
    <div className="inline-block">
      <div className="font-medium flex items-center overflow-hidden rounded-full text-sm">
        {tieredStat.map((stat, i) => {
          const isLast = i === tieredStat.length - 1;

          return (
            <Fragment key={i}>
              <div className="bg-bgcolor-700 h-4 px-2 flex items-center justify-center text-center mr-0.5 last:mr-0 w-8">
                {stat}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
