import { c as create_ssr_component, j as subscribe, f as add_attribute, v as validate_component } from "./index-36284ca1.js";
import { s as session } from "./stores-d5eb43fc.js";
import { B as BristlefrostMeta } from "./BristlefrostMeta-5512d822.js";
var Iframe_svelte_svelte_type_style_lang = "";
const css = {
  code: "iframe.svelte-1tt8qda{border-width:0px;border:none;height:100vh;margin:0px;padding:0px}.svelte-1tt8qda::-webkit-scrollbar{display:none}html{overflow-y:hidden}",
  map: null
};
const Iframe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { iframeUrl } = $$props;
  let { title } = $$props;
  let { metaTitle } = $$props;
  let { metaUrl } = $$props;
  let token = $session.session.token;
  if ($$props.iframeUrl === void 0 && $$bindings.iframeUrl && iframeUrl !== void 0)
    $$bindings.iframeUrl(iframeUrl);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.metaTitle === void 0 && $$bindings.metaTitle && metaTitle !== void 0)
    $$bindings.metaTitle(metaTitle);
  if ($$props.metaUrl === void 0 && $$bindings.metaUrl && metaUrl !== void 0)
    $$bindings.metaUrl(metaUrl);
  $$result.css.add(css);
  $$unsubscribe_session();
  return `
${token ? `<iframe frameborder="${"0"}"${add_attribute("title", title, 0)}${add_attribute("src", iframeUrl, 0)} width="${"100%"}" class="${"svelte-1tt8qda"}"></iframe>` : `<p class="${"svelte-1tt8qda"}">Logging you in, please wait...</p>`}

${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: metaUrl,
    title: metaTitle,
    description: "Find, invite and discover the best bots & servers now on Fates List",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}`;
});
export { Iframe as I };
