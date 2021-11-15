import { createApp } from "./main";
import { renderToString } from "@vue/server-renderer";
async function renderMetaToString(app, ctx = {}) {
  if (!ctx.teleports || !ctx.teleports.head) {
    const teleports = app.config.globalProperties.$metaManager?.render();
    await Promise.all(
      teleports.map((teleport) => renderToString(teleport, ctx))
    );
  }
  const { teleports } = ctx;
  for (const target in teleports) {
    if (target.endsWith("Attrs")) {
      const str = teleports[target];

      teleports[target] = str.slice(str.indexOf(" ") + 1, str.indexOf(">"));
    }
  }
  return ctx;
}
export async function render(url, manifest, context = { host: "", ua: "" }) {
  let renderError = null;
  const sessionContext = {
    host: context.host,
    token: "",
    UUID: "",
    ua: context.ua,
    resetToken: (token) => {},
  };
  const syncState = {};

  const { app, router } = await createApp(sessionContext, syncState);

  router.push(url);
  try {
    await router.isReady();
  } catch (e) {
    renderError = e;
  }

  const matchedComponents = router.currentRoute.value.matched;

  if (matchedComponents.some((m) => m.name === "404")) {
    renderError = new Error(`404: ${url}`);
  }

  const ctx = {};
  let html = "";
  try {
    html = await renderToString(app, ctx);
  } catch (e) {
    renderError = e;
  }
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  await renderMetaToString(app, ctx);

  const htmlAttrs = ctx.teleports ? ctx.teleports.htmlAttrs || "" : "";
  const bodyAttrs = ctx.teleports ? ctx.teleports.bodyAttrs || "" : "";
  const head = ctx.teleports ? ctx.teleports.head || "" : "";

  return [
    renderError,
    html,
    preloadLinks,
    syncState,
    head,
    htmlAttrs || "",
    bodyAttrs || "",
  ];
}

function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return "";
  }
}
