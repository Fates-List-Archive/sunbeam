import { c as create_ssr_component, v as validate_component, r as each } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { C as CardContainer, B as BotCard } from "../../../../chunks/CardContainer-4f729b6c.js";
import { S as SearchBar, T as Tag } from "../../../../chunks/Tag-f7b294e7.js";
import { B as BristlefrostMeta } from "../../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../../chunks/Icon-8a17b723.js";
import "../../../../chunks/enums-2aac69e1.js";
import "../../../../chunks/Ripple-a012c9fe.js";
import "tslib";
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
  map: null
};
const prerender = false;
async function load({ session, fetch }) {
  let query = session.query.q;
  let targetType = session.query.target_type;
  console.log(query);
  const searchUrl = `/api/v2/search?target_type=${targetType}&q=${query}`;
  const res = await fetchFates(searchUrl, "", fetch);
  if (res.ok) {
    let data = await res.json();
    return { props: { data, targetType, query } };
  }
  return {
    status: res.status,
    error: new Error(`Search Error`)
  };
}
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { targetType } = $$props;
  let { query } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
    $$bindings.targetType(targetType);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/frostpaw/search?q=" + query + "&target_type=" + targetType,
    title: "Search results for " + targetType + "s matching " + query,
    description: "Find, invite and discover the best " + targetType + "s matching " + query,
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: targetType, query }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType, tags: data.tags_fixed }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.search_res, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: targetType, rand: false }, {}, {})}`)}`
  })}`;
});
export { Search as default, load, prerender };
