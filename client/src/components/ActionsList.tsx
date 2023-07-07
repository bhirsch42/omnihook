import clsx from "clsx";
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
    <div
      className={clsx("@container flex flex-wrap mt-3 -mb-2 -mr-2", className)}
    >
      {actions.map((action) => (
        <div key={action.detail} className="mb-2 mr-2 w-full @md:w-auto">
          <ActionView action={action} />
        </div>
      ))}
    </div>
  );
}
