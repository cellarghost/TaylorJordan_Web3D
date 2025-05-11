import type { Route } from "./+types/scene";
import Scene3D from "../scene/scene3D";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D Scene" },
    { name: "description", content: "3D Scene" },
  ];
}

export default function Scene() {
  return <Scene3D />;
}
