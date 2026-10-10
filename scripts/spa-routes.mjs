// GitHub Pages has no SPA rewrites: copy index.html to each top-level route
// (so /about, /blog... return 200) and to 404.html (for /blog/:id etc.).
import { copyFileSync, mkdirSync } from "fs";

const routes = ["blog", "projects", "til", "about"];
copyFileSync("dist/index.html", "dist/404.html");
for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
