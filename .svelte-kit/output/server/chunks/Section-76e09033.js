import { c as create_ssr_component, v as validate_component, k as escape } from "./index-36284ca1.js";
import { I as Icon } from "./Icon-8a17b723.js";
var Section_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-ugthed{font-size:40px;margin:0px}.bot-section-frag.svelte-ugthed{margin-right:10px !important;margin-left:10px !important;display:inline-block}.bot-section.svelte-ugthed{margin-left:10px;margin-right:10px}",
  map: null
};
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { title } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<div class="${"bot-section svelte-ugthed"}">${validate_component(Icon, "Icon").$$render($$result, {
    class: "white bot-section-frag",
    icon,
    inline: true,
    height: "3em"
  }, {}, {})}
    <h2 class="${"bot-section-frag svelte-ugthed"}">${escape(title)}</h2>
    <hr>
</div>`;
});
export { Section as S };
