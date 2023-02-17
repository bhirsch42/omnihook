import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export function DesktopIcon({
  icon,
  label,
}: {
  icon: IconDefinition;
  label: string;
}) {
  return (
    <div className="flex flex-col border p-3 rounded border-transparent transition-colors hover:border-bgcolor-500 hover:bg-bgcolor-800">
      <FontAwesomeIcon icon={icon} className="text-5xl mb-1" />
      <label className="text-center cursor-pointer">{label}</label>
    </div>
  );
}
