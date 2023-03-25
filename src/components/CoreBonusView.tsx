import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { ActionView } from "./ActionView";
import { UserText } from "./UserText";

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

      <UserText text={coreBonus.description} />

      <div className="flex mt-1">
        <div className="pr-3">{">"}</div>
        <UserText text={coreBonus.effect} className="font-bold" />
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
