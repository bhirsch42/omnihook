import { Background } from "../schemas/background.schema";

export function BackgroundView({ background }: { background: Background }) {
  return (
    <div id={background.id}>
      <div className="font-bold text-lg">{background.name}</div>
      <div dangerouslySetInnerHTML={{ __html: background.description }}></div>
    </div>
  );
}
