import { c as create_ssr_component, f as add_attribute, k as escape, r as each, v as validate_component } from "./index-36284ca1.js";
import { I as Icon } from "./Icon-8a17b723.js";
import { B as Button_1 } from "./enums-2aac69e1.js";
var SearchBar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".search.svelte-tfzrt2{display:block;width:37%;font-size:20px;padding:12px !important;margin-top:50px !important;margin-bottom:20px !important}",
  map: null
};
const SearchBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { query } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  $$result.css.add(css$1);
  return `<form method="${"GET"}" action="${"/frostpaw/search"}"><input type="${"hidden"}" name="${"target_type"}"${add_attribute("value", type, 0)}>
	<input type="${"text"}" class="${"form-control fform search svelte-tfzrt2"}" placeholder="${"Search for " + escape(type) + "s (ENTER to search)"}" name="${"q"}"${add_attribute("value", query, 0)} aria-label="${"Search for something.."}" style="${"width: 90%"}">
</form>`;
});
var Tag_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tag-icon{font-size:15px;margin-right:5px}span.svelte-np5dmd{font-size:13px}.tag-item{opacity:1 !important;color:white !important;border:solid thin !important;outline:none !important;word-wrap:break-word;text-overflow:ellipsis;margin-left:10px;margin-right:10px;cursor:pointer;min-width:180px}.tag-container.svelte-np5dmd{height:100%;width:90%;margin-left:auto;margin-right:auto;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;line-height:13px;margin-top:5px}",
  map: null
};
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tags } = $$props;
  let { targetType } = $$props;
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
    $$bindings.targetType(targetType);
  $$result.css.add(css);
  return `<div class="${"tag-container svelte-np5dmd"}">${each(tags, (tag) => `<span class="${"svelte-np5dmd"}">${validate_component(Button_1, "Button").$$render($$result, {
    id: "tags-" + tag.id,
    class: "tag-item",
    href: "/frostpaw/search/tags?tag=" + tag.id + "&target_type=" + targetType,
    title: tag.name,
    touch: true,
    variant: "outlined",
    rel: "external"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      class: "white tag-icon",
      icon: tag.iconify_data,
      inline: false,
      "aria-hidden": "true"
    }, {}, {})}
                <strong>${escape(tag.name)}</strong>
            `
  })}
        </span>`)}
</div>`;
});
export { SearchBar as S, Tag as T };
