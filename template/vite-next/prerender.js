// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

const fs = require("fs");
const path = require("path");
require("isomorphic-fetch");
const _ = require("lodash");

const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = require("./dist/static/ssr-manifest.json");
fs.copyFileSync(
  toAbsolute("dist/static/index.html"),
  toAbsolute("dist/static/200.html")
);
const template = fs.readFileSync(toAbsolute("dist/static/200.html"), "utf-8");
const { render } = require("./dist/server/entry-server.js");
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute("src/pages"))
  .map((file) => {
    const name = file.replace(/\.vue$/, "").toLowerCase();
    return name === "home" ? `/` : `/${name}`;
  });

routesToPrerender.push("/");
(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [
      err,
      appHtml,
      preloadLinks,
      syncState,
      headTags,
      htmlAttrs,
      bodyAttrs,
    ] = await render(url, manifest, {});
    const regex = /href="(\/[^"]+)"/gm;
    let m;

    while ((m = regex.exec(appHtml)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      if (m.length > 1) {
        if (!_.includes(routesToPrerender, m[1])) {
          routesToPrerender.push(m[1]);
        }
      }
    }
    const html = template
      .replace("data-html-attrs", htmlAttrs)
      .replace("<!--head-tags-->", headTags)
      .replace("data-body-attrs", bodyAttrs)
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--ssr-outlet-->", appHtml)
      .replace(
        "/*sync-state-outlet*/",
        `window.__syncState__ = ${JSON.stringify(syncState)}`
      );

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true });

    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
    await sleep(400);
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute("dist/static/ssr-manifest.json"));
})();
