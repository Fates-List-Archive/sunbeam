import { c as create_ssr_component, r as each, k as escape, v as validate_component } from "../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../chunks/request-b58a31ec.js";
import { B as BristlefrostMeta } from "../../../chunks/BristlefrostMeta-5512d822.js";
var Policy_svelte_svelte_type_style_lang = "";
const css = {
  code: "p.svelte-1iwql91{margin-left:3px}",
  map: null
};
function title(str) {
  return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
const Policy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
      if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
        return this.replace(str, newStr);
      }
      return this.replace(new RegExp(str, "g"), newStr);
    };
  }
  let { policy } = $$props;
  if ($$props.policy === void 0 && $$bindings.policy && policy !== void 0)
    $$bindings.policy(policy);
  $$result.css.add(css);
  return `
${each(Object.entries(policy), (section) => `<h1>${escape(title(section[0]))}</h1>
    ${Array.isArray(section[1]) ? `<ol>${each(section[1], (sectionData) => `<li>${escape(sectionData)}</li>`)}
        </ol>` : `${each(Object.entries(section[1]), (sectionData) => `<h2>${escape(title(sectionData[0]))}</h2>
            ${Array.isArray(sectionData[1]) ? `<ol>${each(sectionData[1], (policy2) => `<li>${escape(policy2)}</li>`)}
                </ol>` : `<p class="${"svelte-1iwql91"}">${escape(sectionData[1])}</p>`}`)}`}`)}`;
});
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  let url = "/api/v2/policies/all";
  let res = await fetchFates(url, "", fetch);
  if (!res.ok) {
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
  let policy = await res.json();
  return {
    props: {
      rules: policy.rules,
      privacyPolicy: policy.privacy_policy
    }
  };
}
const Tos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { rules } = $$props;
  let { privacyPolicy } = $$props;
  if ($$props.rules === void 0 && $$bindings.rules && rules !== void 0)
    $$bindings.rules(rules);
  if ($$props.privacyPolicy === void 0 && $$bindings.privacyPolicy && privacyPolicy !== void 0)
    $$bindings.privacyPolicy(privacyPolicy);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz",
    title: "Fates List | Terms Of Service",
    description: "Find, invite and discover the best bots & servers now on Fates List",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}

${validate_component(Policy, "Policy").$$render($$result, { policy: rules }, {}, {})}
${validate_component(Policy, "Policy").$$render($$result, { policy: privacyPolicy }, {}, {})}`;
});
export { Tos as default, load, prerender };
