import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

export function DesktopIcon({
  icon,
  label,
  onClick,
}: {
  icon: IconDefinition;
  label: string;
  onClick?: MouseEventHandler;
}) {
  return (
    <button
      className="flex flex-col justify-center items-center border p-3 rounded border-transparent transition-colors hover:border-bgcolor-500 hover:bg-bgcolor-800"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="text-5xl mb-1" />
      <label className="text-center cursor-pointer">{label}</label>
    </button>
  );
}
