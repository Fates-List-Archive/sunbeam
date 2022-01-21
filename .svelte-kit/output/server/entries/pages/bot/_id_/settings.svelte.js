import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-36284ca1.js";
import { I as Iframe } from "../../../../chunks/Iframe-4e66cd3b.js";
import "../../../../chunks/stores-d5eb43fc.js";
import "../../../../chunks/BristlefrostMeta-5512d822.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  return { props: { id: params.id } };
}
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `${validate_component(Iframe, "PageFrame").$$render($$result, {
    iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/bot/" + id + "/settings",
    title: "Add Bot Page",
    metaTitle: "Fates List | Bot Settings",
    metaUrl: "https://fateslist.xyz/bot/" + id + "/settings"
  }, {}, {})}`;
});
export { Settings as default, load, prerender };
