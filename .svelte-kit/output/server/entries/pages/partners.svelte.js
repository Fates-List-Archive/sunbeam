import { c as create_ssr_component, f as add_attribute, k as escape, r as each, v as validate_component } from "../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../chunks/request-b58a31ec.js";
import { I as Icon } from "../../chunks/Icon-8a17b723.js";
import { B as BristlefrostMeta } from "../../chunks/BristlefrostMeta-5512d822.js";
var Partner_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".partner.svelte-11f22ai{border:solid thin white;width:90%;margin-left:auto;margin-right:auto;margin-bottom:10px;padding:3px}.partner.svelte-11f22ai:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0)}.partner-img.svelte-11f22ai{border-radius:50%;background-color:black;max-width:100px;max-height:100px;display:inline-block;vertical-align:top}.partner-content.svelte-11f22ai{display:inline-block}",
  map: null
};
function title(str) {
  return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
const Partner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { partner } = $$props;
  let { icons } = $$props;
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
      if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
        return this.replace(str, newStr);
      }
      return this.replace(new RegExp(str, "g"), newStr);
    };
  }
  if ($$props.partner === void 0 && $$bindings.partner && partner !== void 0)
    $$bindings.partner(partner);
  if ($$props.icons === void 0 && $$bindings.icons && icons !== void 0)
    $$bindings.icons(icons);
  $$result.css.add(css$1);
  return `<div${add_attribute("id", partner.id, 0)}><a${add_attribute("href", partner.links.website, 0)}><div class="${"partner svelte-11f22ai"}"><img class="${"partner-img svelte-11f22ai"}"${add_attribute("src", partner.image, 0)} alt="${escape(partner.name) + " image"}" width="${"100px"}" height="${"100px"}">
            <div class="${"partner-content svelte-11f22ai"}"><h2>${escape(partner.name)}</h2>
                <p>${escape(partner.description)}</p>
                ${each(Object.entries(partner.links), (link) => `<a${add_attribute("href", link[1], 0)}>${validate_component(Icon, "Icon").$$render($$result, { icon: icons[link[0]] }, {}, {})} ${escape(title(link[0]))}
                    </a>`)}</div></div></a>
</div>`;
});
var partners_svelte_svelte_type_style_lang = "";
const css = {
  code: ".content.svelte-cf77e8{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}",
  map: null
};
const prerender = true;
async function load({ params, fetch, session, stuff }) {
  const url = `/api/v2/partners`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    return { props: { partners: await res.json() } };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
const Partners = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { partners } = $$props;
  if ($$props.partners === void 0 && $$bindings.partners && partners !== void 0)
    $$bindings.partners(partners);
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/partners",
    title: "Fates List | Our Partners",
    description: "See our partners and supporters!",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
  }, {}, {})}

<div class="${"content svelte-cf77e8"}"><h1>Our Partners</h1>

	<p>Note that Fates List is not responsible for any activities taking
		place on the below servers!
	</p></div>

${each(partners.partners, (partner) => `${validate_component(Partner, "Partner").$$render($$result, { partner, icons: partners.icons }, {}, {})}`)}`;
});
export { Partners as default, load, prerender };
