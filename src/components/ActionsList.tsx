import { Action } from "../schemas/lancerData/action.schema";
import { ActionView } from "./ActionView";

export function ActionsList({
  actions,
  className,
}: {
  actions?: Action[];
  className?: string;
}) {
  if (!actions || actions.length === 0) return null;
  return (
    <div className={`flex flex-wrap mt-3 -mb-2 -mr-2 ${className}`}>
      {actions.map((action) => (
        <div key={action.detail} className="mb-2 mr-2">
          <ActionView action={action} />
        </div>
      ))}
    </div>
  );
}
