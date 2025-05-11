import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/scene", "routes/scene.tsx"),
    route("/about", "routes/about.tsx"),

    // route("/3D_Preview", "assets/Page3D/index.html")
] satisfies RouteConfig;
