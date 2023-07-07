import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

export function CloseButton({ onClick }: { onClick?: MouseEventHandler }) {
  return (
    <button
      type="button"
      className="bg-red-400 hover:bg-red-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}
