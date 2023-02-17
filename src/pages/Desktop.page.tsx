import { Link } from "@tanstack/react-router";
import { faBookAtlas, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { Compendium } from "./Compendium.page";
import { WindowView } from "../components/WindowView";
import { DesktopBackground } from "../components/DesktopBackground";
import { DesktopIcon } from "../components/DesktopIcon";

export function Desktop() {
  return (
    <>
      <DesktopBackground />

      <div className="flex justify-end p-5">
        <div className="grid gap-5">
          <Link to="/compendium">
            <DesktopIcon icon={faBookAtlas} label="Compendium" />
          </Link>
          <Link to="/pilots">
            <DesktopIcon icon={faWarehouse} label="Mechs" />
          </Link>
        </div>
      </div>

      <WindowView label="Compendium">
        <Compendium />
      </WindowView>
    </>
  );
}
