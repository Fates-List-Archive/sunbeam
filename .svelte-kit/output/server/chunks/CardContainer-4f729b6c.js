import { c as create_ssr_component, f as add_attribute, v as validate_component, k as escape } from "./index-36284ca1.js";
import { I as Icon } from "./Icon-8a17b723.js";
import { e as enums, B as Button_1 } from "./enums-2aac69e1.js";
var BotCard_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "a.svelte-14mj578{opacity:1 !important}.text-center.svelte-14mj578{text-align:center}.d-flex.svelte-14mj578{display:flex}.bot-card.svelte-14mj578:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0);filter:blur;-webkit-filter:blur(0)}.bot-card-username.svelte-14mj578{margin-right:auto;margin-left:auto;margin-top:30px}.bot-card-username-txt.svelte-14mj578{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:21px;margin-top:35px;text-align:center}.bot-card.svelte-14mj578{width:300px;height:520px;background:#111112;-moz-box-shadow:0px 0px 20px 5px #000;-webkit-box-shadow:0px 0px 20px 5px #000;box-shadow:0px 0px 20px 5px #000;border-top-style:none;margin:25px 25px;border-radius:10px 10px 10px 10px}.bot-card-banner.svelte-14mj578{width:100%;height:35%;background:center/cover no-repeat}.bot-card-avatar.svelte-14mj578{border-radius:50%;background-color:black !important;width:100px;min-width:100px;height:100px;min-height:100px;margin:5% auto;margin-top:17%;margin-right:35%;margin-left:35%;margin-bottom:0px}.bot-card-description.svelte-14mj578{color:white;opacity:0.63;width:90%;min-width:90%;max-width:90%;margin:0 5%;height:105px;text-overflow:ellipsis;min-height:105px;max-height:105px}.bot-card-cert{color:#7289DA;position:absoulute;margin-top:-15px;margin-left:90%;z-index:10 !important}.bot-card-footer.svelte-14mj578{width:80%;margin:0 10%;height:10%;margin-top:20px;margin-bottom:20px}.bot-card-footer-stats.svelte-14mj578{height:30px !important;width:55% !important}.bot-card-actions.svelte-14mj578{width:80%;margin:0 15%}.bot-card-actions-link{width:45%;font-weight:bold;border:solid thin !important;outline:none !important;opacity:1 !important;font-size:10px}",
  map: null
};
const BotCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { type } = $$props;
  let { rand } = $$props;
  if (data.id && !data.user) {
    data.user = { "id": data.id };
  }
  data.banner = data.banner || "https://api.fateslist.xyz/static/assets/prod/banner.webp?v=2";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.rand === void 0 && $$bindings.rand && rand !== void 0)
    $$bindings.rand(rand);
  $$result.css.add(css$1);
  return `<section class="${"bot-card svelte-14mj578"}"><div class="${"lozad bot-card-banner svelte-14mj578"}"${add_attribute("data-background-image", data.banner, 0)}>${(type == "bot" || type == "server") && data.state == enums.BotState.certified ? `${validate_component(Icon, "Icon").$$render($$result, {
    class: "bot-card-cert",
    icon: "fa-solid:certificate",
    inline: false,
    height: "3em"
  }, {}, {})}` : ``}
    <a href="${"/" + escape(type) + "/" + escape(data.user.id)}" class="${"bot-card-view-link bot-card-avatar-container svelte-14mj578"}"><img alt="${"Bot Avatar"}" class="${"bot-card-avatar svelte-14mj578"}"${add_attribute("src", data.user.avatar.replace(".png", ".webp"), 0)} loading="${"lazy"}"></a>
    <div><a href="${"/" + escape(type) + "/" + escape(data.user.id)}" class="${"bot-card-view-link svelte-14mj578"}"><div class="${"bot-card-username svelte-14mj578"}"><p class="${"bot-card-username-txt white-bold svelte-14mj578"}">${rand ? `Fetching random bot...` : `${escape(data.user.username)}`}</p></div></a></div>

    <p class="${"bot-card-description svelte-14mj578"}"><span class="${"bot-card-description-txt"}" style="${"overflow-wrap: anywhere;"}">${rand ? `Try out your luck!` : `${escape(data.description)}`}</span></p>

    ${type == "bot" || type == "server" ? `<div class="${"d-flex bot-card-footer svelte-14mj578"}"><div class="${"bot-card-footer-stats svelte-14mj578"}"><p class="${"text-center white-bold svelte-14mj578"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "fa-solid:server", inline: false }, {}, {})}
                <span style="${"margin-left: 3px;"}" class="${"bot-servers"}">${rand ? `N/A` : `${escape(data.guild_count)}`}</span></p></div>
        <div class="${"bot-card-footer-stats svelte-14mj578"}"><p class="${"text-center white-bold svelte-14mj578"}">${validate_component(Icon, "Icon").$$render($$result, {
    icon: "fa-solid:thumbs-up",
    inline: false
  }, {}, {})}
                <span style="${"margin-left: 3px;"}" class="${"bot-votes"}">${rand ? `N/A` : `${escape(data.votes)}`}</span></p></div></div>` : ``}
    <div class="${"bot-card-actions svelte-14mj578"}">${validate_component(Button_1, "Button").$$render($$result, {
    "aria-label": "View",
    href: "/" + type + "/" + data.user.id,
    class: "bot-card-actions-link",
    touch: true,
    variant: "outlined"
  }, {}, { default: () => `View` })}
        ${type != "profile" ? `${validate_component(Button_1, "Button").$$render($$result, {
    "aria-label": "Invite",
    href: "/" + type + "/" + data.user.id + "/invite",
    class: "bot-card-actions-link",
    target: "_blank",
    touch: true,
    variant: "outlined"
  }, {}, { default: () => `Invite` })}` : ``}</div></div>
</section>`;
});
var CardContainer_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1gp4ux9{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding-left:0}slot.svelte-1gp4ux9{list-style:none;flex:0 0 33%;justify-content:center;align-items:center}",
  map: null
};
const CardContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"container svelte-1gp4ux9"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export { BotCard as B, CardContainer as C };
