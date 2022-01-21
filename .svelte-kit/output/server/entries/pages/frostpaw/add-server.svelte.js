import { c as create_ssr_component, v as validate_component, f as add_attribute } from "../../../chunks/index-36284ca1.js";
import { B as BristlefrostMeta } from "../../../chunks/BristlefrostMeta-5512d822.js";
var addServer_svelte_svelte_type_style_lang = "";
const css = {
  code: "ul.svelte-1byxlz9{color:white}",
  map: null
};
let serverBotInvite = "https://discord.com/api/oauth2/authorize?client_id=811073947382579200&permissions=67649&scope=bot%20applications.commands";
const Add_server = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    title: "Add your servers on Fates List!",
    description: "Fates List server listing is a great way to get active members for your server",
    thumbnail: "https://fateslist.xyz/static/botlisticon.webp",
    url: "https://fateslist.xyz/frostpaw/add-server"
  }, {}, {})}
<h1>Add Server</h1>
<h2>To add your server, add <a${add_attribute("href", serverBotInvite, 0)}>our bot</a> to your server.</h2>
<h3>Next steps</h3>
<ul class="${"svelte-1byxlz9"}"><li>Set a description (and a long description) otherwise it will be randomly generated!</li>
</ul>`;
});
export { Add_server as default };
