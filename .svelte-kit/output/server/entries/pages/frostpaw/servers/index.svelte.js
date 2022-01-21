import { c as create_ssr_component, v as validate_component, r as each } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { S as SearchBar, T as Tag } from "../../../../chunks/Tag-f7b294e7.js";
import { C as CardContainer, B as BotCard } from "../../../../chunks/CardContainer-4f729b6c.js";
import { S as Section } from "../../../../chunks/Section-76e09033.js";
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
const prerender = true;
async function load({ params, fetch, session, stuff }) {
  const url = `/api/v2/index?type=1`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    return { props: { data: await res.json() } };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
const Servers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz",
    title: "Fates List | Discord Bot List",
    description: "Find, discover and join the best servers only on Fates List",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}


<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: "server", query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, {
    targetType: "server",
    tags: data.tags_fixed
  }, {}, {})}

${validate_component(Section, "Section").$$render($$result, {
    icon: "fa-solid:certificate",
    title: "Certified"
  }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.certified_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
  })}

${validate_component(Section, "Section").$$render($$result, {
    icon: "fa-solid:sort-amount-up",
    title: "Top Voted"
  }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.top_voted, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
  })}

${validate_component(Section, "Section").$$render($$result, {
    icon: "fa-solid:plus",
    title: "New Servers"
  }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.new_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
  })}`;
});
export { Servers as default, load, prerender };
