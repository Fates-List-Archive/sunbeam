import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { B as BotServerPage } from "../../../../chunks/BotServerPage-0f5308d5.js";
import "../../../../chunks/index-f2488d65.js";
import "../../../../chunks/Ripple-a012c9fe.js";
import "tslib";
import "../../../../chunks/classAdderBuilder-d630724f.js";
import "../../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../../chunks/Icon-8a17b723.js";
import "../../../../chunks/enums-2aac69e1.js";
import "marked";
import "../../../../chunks/stores-d5eb43fc.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  const url = `/api/v2/guilds/${params.id}/_sunbeam`;
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
    error: new Error(`Server Not Found`)
  };
}
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(BotServerPage, "BotServerPage").$$render($$result, { data, type: "server" }, {}, {})}`;
});
export { U5Bidu5D as default, load, prerender };
