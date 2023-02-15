import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link className="block underline" to="/compendium">
        Compendium
      </Link>
      <Link className="block underline" to="/pilots">
        Pilots
      </Link>
    </>
  );
}
