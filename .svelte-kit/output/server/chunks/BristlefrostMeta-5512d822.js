import { c as create_ssr_component, k as escape, f as add_attribute } from "./index-36284ca1.js";
const BristlefrostMeta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { description } = $$props;
  let { thumbnail } = $$props;
  let { url } = $$props;
  let { pageTitle = title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.thumbnail === void 0 && $$bindings.thumbnail && thumbnail !== void 0)
    $$bindings.thumbnail(thumbnail);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  return `${$$result.head += `${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<meta name="${"title"}"${add_attribute("content", title, 0)} data-svelte="svelte-1hha9kl"><meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta name="${"language"}" content="${"English"}" data-svelte="svelte-1hha9kl"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-1hha9kl"><meta property="${"og:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:title"}"${add_attribute("content", title, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:image"}"${add_attribute("content", thumbnail, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:card"}" content="${"summary"}" data-svelte="svelte-1hha9kl"><meta property="${"twitter:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:title"}"${add_attribute("content", title, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:image"}"${add_attribute("content", thumbnail, 0)} data-svelte="svelte-1hha9kl"><link rel="${"canonical"}"${add_attribute("href", url || "https://fateslist.xyz/", 0)} data-svelte="svelte-1hha9kl">`, ""}`;
});
export { BristlefrostMeta as B };
