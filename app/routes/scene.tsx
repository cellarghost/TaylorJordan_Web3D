import type { Route } from "./+types/scene";
import Scene3D from "../scene/scene3D";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Scene() {
  return <Scene3D />;
}
