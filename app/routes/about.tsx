import type { Route } from "./+types/scene";
import AboutInfo from "../about/aboutinfo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "About" },
  ];
}

export default function About() {
  return <AboutInfo />
}