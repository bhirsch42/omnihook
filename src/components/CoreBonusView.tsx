import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { ActionView } from "./ActionView";

export function CoreBonusView({
  coreBonus,
  className,
}: {
  coreBonus: CoreBonus;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-lg font-bold">{coreBonus.name}</div>
      <div dangerouslySetInnerHTML={{ __html: coreBonus.description }}></div>
      <div className="flex mt-1">
        <div className="pr-3">{">"}</div>
        <div
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: coreBonus.effect }}
        ></div>
      </div>
      {coreBonus.actions && (
        <div className="flex mt-3">
          {coreBonus.actions.map((action) => (
            <ActionView action={action} key={action.detail} />
          ))}
        </div>
      )}
    </div>
  );
}
