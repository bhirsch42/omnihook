import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

export function MaximizeButton({
  onClick,
  isMaximized,
}: {
  onClick?: MouseEventHandler;
  isMaximized: boolean;
}) {
  return (
    <button
      type="button"
      className="bg-green-400 hover:bg-green-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isMaximized ? faMinus : faPlus} />
    </button>
  );
}
