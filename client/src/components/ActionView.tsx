import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Action } from "../schemas/lancerData/action.schema";
import { Button } from "./Button";
import { UserText } from "./UserText";
import { AttackStatsTable } from "./WeaponStatsTable";

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
        <div className="flex mx-2 mb-2">
          <AttackStatsTable
            item={action}
            className="pr-2 mr-2 border-r border-r-bgcolor-700"
          />
          <div>
            {action.init && <UserText text={action.init} className="text-sm" />}

            {action.trigger && (
              <div>
                <label className="text-sm text-gray-400">Trigger</label>
                <div className="text-sm">{action.trigger}</div>
              </div>
            )}

            <label className="text-sm text-gray-400">Effect</label>
            <UserText text={action.detail} className="text-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
