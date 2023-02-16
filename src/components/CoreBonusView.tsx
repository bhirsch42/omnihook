import { isNil, reject } from "ramda";
import { Action } from "../schemas/action.schema";
import { CoreBonus } from "../schemas/coreBonus.schema";

function ActionView({ action }: { action: Action }) {
  return (
    <div className="p-2 border border-gray-500">
      <div className="flex mb-3">
        <div className="font-bold mr-auto">{action.name}</div>
        <div className="italic">
          {action.frequency && `${action.frequency}, `}
          {action.activation}
        </div>
      </div>

      <div>{action.detail}</div>

      {action.trigger && (
        <div className="">
          <label className="text-sm text-gray-500">Trigger</label>
          <div>{action.trigger}</div>
        </div>
      )}
    </div>
  );
}

export function CoreBonusView({ coreBonus }: { coreBonus: CoreBonus }) {
  return (
    <div id={coreBonus.id}>
      <div className="font-bold text-lg">{coreBonus.name}</div>
      <div dangerouslySetInnerHTML={{ __html: coreBonus.description }}></div>
      <div className="mt-1 flex">
        <div className="pr-3">{">"}</div>
        <div
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: coreBonus.effect }}
        ></div>
      </div>
      {coreBonus.actions && (
        <div className="flex mt-3">
          {coreBonus.actions.map((action) => (
            <ActionView action={action} />
          ))}
        </div>
      )}
    </div>
  );
}
