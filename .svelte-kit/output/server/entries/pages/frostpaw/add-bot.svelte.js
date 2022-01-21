import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-36284ca1.js";
import { I as Iframe } from "../../../chunks/Iframe-4e66cd3b.js";
import "../../../chunks/stores-d5eb43fc.js";
import "../../../chunks/BristlefrostMeta-5512d822.js";
const Add_bot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Iframe, "PageFrame").$$render($$result, {
    iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/add-bot",
    title: "Add Bot Page",
    metaTitle: "Fates List | Add Bot",
    metaUrl: "https://fateslist.xyz/frostpaw/add-bot"
  }, {}, {})}`;
});
export { Add_bot as default };
