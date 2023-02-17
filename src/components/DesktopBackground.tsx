import { AsciiArt } from "./AsciiArt";

export function DesktopBackground() {
  return (
    <div className="fixed w-screen h-screen pointer-events-none flex justify-center items-center top-0 left-0 text-textcolor-600 -z-10">
      <div>
        <AsciiArt className="text-3xl" />
        <div className="text-right mt-1">
          General Massive Systems | OmniOS v0.0.1
        </div>
      </div>
    </div>
  );
}
