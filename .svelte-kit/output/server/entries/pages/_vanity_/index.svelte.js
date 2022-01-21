import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../chunks/request-b58a31ec.js";
import { B as BotServerPage } from "../../../chunks/BotServerPage-0f5308d5.js";
import "../../../chunks/index-f2488d65.js";
import "../../../chunks/Ripple-a012c9fe.js";
import "tslib";
import "../../../chunks/classAdderBuilder-d630724f.js";
import "../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../chunks/Icon-8a17b723.js";
import "../../../chunks/enums-2aac69e1.js";
import "marked";
import "../../../chunks/stores-d5eb43fc.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  if (params.vanity == "servers") {
    return {
      status: 307,
      redirect: "/frostpaw/servers/"
    };
  }
  const url = `/api/v2/code/${params.vanity}`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    let data = await res.json();
    let id = data.redirect;
    let type = data.type;
    const pageUrl = `/api/v2/${type}s/${id}/_sunbeam`;
    const pageRes = await fetchFates(pageUrl, "", fetch);
    if (pageRes.ok) {
      let pageData = await pageRes.json();
      console.log(pageData);
      return {
        props: {
          data: pageData.data,
          cacheVersion: pageData.fl_cache_ver,
          type
        }
      };
    }
    return {
      status: res.status,
      error: new Error(`Invalid Vanity`)
    };
  }
  return {
    status: res.status,
    error: new Error(`Invalid Vanity`)
  };
}
const U5Bvanityu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { type } = $$props;
  if (type == "guild") {
    type = "server";
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `${validate_component(BotServerPage, "BotServerPage").$$render($$result, { data, type }, {}, {})}`;
});
export { U5Bvanityu5D as default, load, prerender };
