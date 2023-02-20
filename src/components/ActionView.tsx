import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Action } from "../schemas/lancerData/action.schema";
import { Button } from "./Button";

export function ActionView({
  action,
  isOpen: _isOpen,
}: {
  action: Action;
  isOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(_isOpen));

  const toggleIsOpen = () => setIsOpen((state) => !state);

  return (
    <div className="border border-l-4 border-bgcolor-700 border-l-purple-500">
      <button
        type="button"
        className="flex flex-wrap items-center w-full p-2 transition-colors hover:bg-bgcolor-700 whitespace-nowrap"
        onClick={toggleIsOpen}
      >
        <div className="pr-3 mr-auto text-sm font-bold">{action.name}</div>
        <div className="text-sm italic">
          {action.frequency && `${action.frequency}, `}
          {action.activation}
        </div>
        <div className="flex items-center justify-center w-5 h-5 ml-2 text-xs rounded-full">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </button>

      {isOpen && (
        <div className="mx-2 mb-2">
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
      )}
    </div>
  );
}
