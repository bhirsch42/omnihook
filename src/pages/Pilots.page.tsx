import { Link } from "@tanstack/react-router";

export function Pilots() {
  return (
    <>
      <h1>Pilots</h1>
      <Link className="block underline" to="/">
        Home
      </Link>
      <Link className="block underline" to="/compendium">
        Compendium
      </Link>
      <Link className="block underline" to="/pilots">
        Pilots
      </Link>
    </>
  );
}
