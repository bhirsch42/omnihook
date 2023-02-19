import { Action } from "../schemas/lancerData/action.schema";

export function ActionView({ action }: { action: Action }) {
  return (
    <div className="p-2 border border-l-4 border-bgcolor-700 border-l-purple-500">
      <div className="flex mb-1">
        <div className="mr-auto text-sm font-bold">{action.name}</div>
        <div className="text-sm italic">
          {action.frequency && `${action.frequency}, `}
          {action.activation}
        </div>
      </div>

      {action.init && (
        <div className="">
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: action.init }}
          ></div>
        </div>
      )}

      {action.trigger && (
        <div className="">
          <label className="text-sm text-gray-400">Trigger</label>
          <div className="text-sm">{action.trigger}</div>
        </div>
      )}

      <label className="text-sm text-gray-400">Effect</label>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: action.detail }}
      ></div>
    </div>
  );
}
