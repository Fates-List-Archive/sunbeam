import { c as create_ssr_component, v as validate_component, r as each } from "../../chunks/index-36284ca1.js";
import { f as fetchFates, r as roll } from "../../chunks/request-b58a31ec.js";
import { S as SearchBar, T as Tag } from "../../chunks/Tag-f7b294e7.js";
import { B as BotCard, C as CardContainer } from "../../chunks/CardContainer-4f729b6c.js";
import "../../chunks/Icon-8a17b723.js";
import { B as Button_1 } from "../../chunks/enums-2aac69e1.js";
import { B as BristlefrostMeta } from "../../chunks/BristlefrostMeta-5512d822.js";
import { S as Section } from "../../chunks/Section-76e09033.js";
import "../../chunks/Ripple-a012c9fe.js";
import "tslib";
var RandomBot_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".spacer.svelte-1she08m{margin-bottom:10px}.flex.svelte-1she08m{margin-left:auto;margin-right:auto;display:flex;align-items:center;justify-content:center;flex-direction:column}.random-button{display:flex !important;border:solid thin !important;outline:none !important}",
  map: null
};
const RandomBot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { randomBot } = $$props;
  console.log(randomBot);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.randomBot === void 0 && $$bindings.randomBot && randomBot !== void 0)
    $$bindings.randomBot(randomBot);
  $$result.css.add(css$1);
  return `<div class="${"flex svelte-1she08m"}">${validate_component(BotCard, "BotCard").$$render($$result, { type, rand: false, data: randomBot }, {}, {})}
    ${validate_component(Button_1, "Button").$$render($$result, {
    class: "random-button white",
    touch: true,
    variant: "outlined"
  }, {}, { default: () => `Roll` })}</div>
<div class="${"spacer svelte-1she08m"}"></div>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
  map: null
};
const prerender = true;
async function load({ params, fetch, session, stuff }) {
  const url = `/api/v2/index?type=0`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    return {
      props: {
        data: await res.json(),
        randomBot: await roll("bot")
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { randomBot } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.randomBot === void 0 && $$bindings.randomBot && randomBot !== void 0)
    $$bindings.randomBot(randomBot);
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz",
    title: "Fates List | Discord Bot List",
    description: "Find, invite and discover the best bots & servers now on Fates List",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>

${validate_component(SearchBar, "SearchBar").$$render($$result, { type: "bot", query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType: "bot", tags: data.tags_fixed }, {}, {})}
${validate_component(RandomBot, "RandomBot").$$render($$result, { type: "bot", randomBot }, {}, {})}

${validate_component(Section, "Section").$$render($$result, {
    icon: "fa-solid:certificate",
    title: "Certified"
  }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.certified_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
  })}

${validate_component(Section, "Section").$$render($$result, {
    icon: "fa-solid:sort-amount-up",
    title: "Top Voted"
  }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.top_voted, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
  })}

${validate_component(Section, "Section").$$render($$result, { icon: "fa-solid:plus", title: "New Bots" }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.new_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
  })}`;
});
export { Routes as default, load, prerender };
