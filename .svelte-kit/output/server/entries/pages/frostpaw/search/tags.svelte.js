import { c as create_ssr_component, v as validate_component, r as each } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { C as CardContainer, B as BotCard } from "../../../../chunks/CardContainer-4f729b6c.js";
import { S as SearchBar, T as Tag } from "../../../../chunks/Tag-f7b294e7.js";
import { B as BristlefrostMeta } from "../../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../../chunks/Icon-8a17b723.js";
import "../../../../chunks/enums-2aac69e1.js";
import "../../../../chunks/Ripple-a012c9fe.js";
import "tslib";
var tags_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
  map: null
};
const prerender = false;
async function load({ url, session, fetch }) {
  console.log("url is:", session);
  let tag = session.query.tag;
  let targetType = session.query.target_type;
  console.log(tag);
  const searchUrl = `/api/v2/search/tags?target_type=${targetType}&tag=${tag}`;
  const res = await fetchFates(searchUrl, "", fetch);
  if (res.ok) {
    let data = await res.json();
    return { props: { data, targetType, tag } };
  }
  return {
    status: res.status,
    error: new Error(`Tag Search Error`)
  };
}
const Tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { targetType } = $$props;
  let { tag } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
    $$bindings.targetType(targetType);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/frostpaw/search/tags?q=" + tag + "&target_type=" + targetType,
    title: "Search results for " + targetType + "s tagged with " + tag,
    description: "Find, invite and discover the best " + tag + " " + targetType + "s",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: targetType, query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType, tags: data.tags_fixed }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.search_res, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: targetType, rand: false }, {}, {})}`)}`
  })}`;
});
export { Tags as default, load, prerender };
