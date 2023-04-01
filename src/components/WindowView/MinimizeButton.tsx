import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function MinimizeButton() {
  return (
    <button
      type="button"
      className="bg-yellow-400 hover:bg-yellow-500 transition-colors w-4 h-4 rounded-full flex items-center justify-center text-zinc-900 text-xs row-span-1"
    >
      <FontAwesomeIcon icon={faMinus} />
    </button>
  );
}
