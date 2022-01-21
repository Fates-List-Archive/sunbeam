import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { B as BotServerVotePage } from "../../../../chunks/BotServerVotePage-788b5671.js";
import "../../../../chunks/index-f2488d65.js";
import "../../../../chunks/Ripple-a012c9fe.js";
import "tslib";
import "../../../../chunks/classAdderBuilder-d630724f.js";
import "../../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../../chunks/Icon-8a17b723.js";
import "../../../../chunks/enums-2aac69e1.js";
import "../../../../chunks/stores-d5eb43fc.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  const url = `/api/v2/bots/${params.id}/_sunbeam`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    let data = await res.json();
    return {
      props: {
        data: data.data,
        cacheVersion: data.fl_cache_ver
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Bot Not Found`)
  };
}
const Vote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(BotServerVotePage, "BotServerVotePage").$$render($$result, { data, type: "bot" }, {}, {})}`;
});
export { Vote as default, load, prerender };
