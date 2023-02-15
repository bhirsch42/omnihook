import { Link } from "@tanstack/react-router";

export function Compendium() {
  return (
    <>
      <h1>Compendium</h1>
      <Link className="block underline" to="/">
        Back
      </Link>
      <Link className="block underline" to="/pilots">
        Pilots
      </Link>
    </>
  );
}
