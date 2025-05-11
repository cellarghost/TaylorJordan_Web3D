import type { Route } from "./+types/scene";
import AboutInfo from "../about/aboutinfo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AboutInfo />
}