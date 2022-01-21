import { c as create_ssr_component, j as subscribe, v as validate_component, f as add_attribute, k as escape, r as each } from "../../../../chunks/index-36284ca1.js";
import { e as enums, B as Button_1 } from "../../../../chunks/enums-2aac69e1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
import { C as CardContainer, B as BotCard } from "../../../../chunks/CardContainer-4f729b6c.js";
import { s as session } from "../../../../chunks/stores-d5eb43fc.js";
import { B as BristlefrostMeta } from "../../../../chunks/BristlefrostMeta-5512d822.js";
import "../../../../chunks/Ripple-a012c9fe.js";
import "tslib";
import "../../../../chunks/Icon-8a17b723.js";
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".badge-link.svelte-kmqn98{opacity:1 !important}.badges.svelte-kmqn98{margin-left:auto;margin-right:auto;text-align:center}.badge-img.svelte-kmqn98{border-radius:50%;display:inline-block;margin-right:3px;background-color:black}.user-username.svelte-kmqn98,.user-avatar.svelte-kmqn98,.bot-action-log.svelte-kmqn98{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.user-username.svelte-kmqn98{margin-bottom:0px;padding-bottom:0px}.user-avatar.svelte-kmqn98{border-radius:50%;width:120px}#user-description.svelte-kmqn98{font-size:18px;text-align:center;margin:0px;padding:0px}#profiles-center{margin-left:auto;margin-right:auto;display:flex !important;align-items:center;width:150px;padding:3px}",
  map: null
};
const prerender = false;
async function load({ params, fetch, session: session2, stuff }) {
  let url = `/api/v2/users/${params.id}?bot_logs=true`;
  if (session2.query.system_bots == "true") {
    url += "&system_bots=true";
  }
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    let data = await res.json();
    let approvedBots = data.profile.bot_logs.filter((v) => {
      if (v.action == enums.UserBotAction.approve) {
        return true;
      }
      return false;
    });
    let deniedBots = data.profile.bot_logs.filter((v) => {
      if (v.action == enums.UserBotAction.deny) {
        return true;
      }
      return false;
    });
    let certifiedBots = data.profile.bot_logs.filter((v) => {
      if (v.action == enums.UserBotAction.certify) {
        return true;
      }
      return false;
    });
    return {
      props: {
        data,
        systemBots: session2.query.system_bots == "true",
        approvedBots,
        deniedBots,
        certifiedBots
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Profile Not Found`)
  };
}
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let loggedIn = false;
  if ($session.session.user) {
    loggedIn = true;
  }
  let { data } = $$props;
  let { systemBots } = $$props;
  let { approvedBots } = $$props;
  let { deniedBots } = $$props;
  let { certifiedBots } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.systemBots === void 0 && $$bindings.systemBots && systemBots !== void 0)
    $$bindings.systemBots(systemBots);
  if ($$props.approvedBots === void 0 && $$bindings.approvedBots && approvedBots !== void 0)
    $$bindings.approvedBots(approvedBots);
  if ($$props.deniedBots === void 0 && $$bindings.deniedBots && deniedBots !== void 0)
    $$bindings.deniedBots(deniedBots);
  if ($$props.certifiedBots === void 0 && $$bindings.certifiedBots && certifiedBots !== void 0)
    $$bindings.certifiedBots(certifiedBots);
  $$result.css.add(css);
  $$unsubscribe_session();
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/profile/" + data.user.id,
    title: data.user.username,
    description: data.profile.description,
    thumbnail: data.user.avatar
  }, {}, {})}

<img class="${"user-avatar svelte-kmqn98"}" loading="${"lazy"}"${add_attribute("src", data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px"), 0)} id="${"user-avatar"}" alt="${escape(data.user.username) + "'s avatar"}">
<h2 class="${"white user-username svelte-kmqn98"}" id="${"user-name"}">${escape(data.user.username)}</h2>
<p id="${"user-description"}" class="${"svelte-kmqn98"}"><!-- HTML_TAG_START -->${data.profile.description.replace("p>", "span>")}<!-- HTML_TAG_END --></p>

<div class="${"badges svelte-kmqn98"}">${each(data.profile.badges, (badge) => `<a class="${"badge-link svelte-kmqn98"}"${add_attribute("href", "#", 0)}><img class="${"badge-img svelte-kmqn98"}"${add_attribute("src", badge.image, 0)} width="${"50px"}" height="${"50px"}"${add_attribute("alt", badge.description, 0)}>
		</a>`)}</div>

<p class="${"bot-action-log svelte-kmqn98"}">Approved Bots: ${escape(approvedBots.length)}</p>
<ul>${each(approvedBots, (bot) => `<li class="${"white"}">${escape(bot.bot_id)} - ${escape(bot.action_time)}</li>`)}</ul>
<p class="${"bot-action-log svelte-kmqn98"}">Denied Bots: ${escape(deniedBots.length)}</p>
<ul>${each(deniedBots, (bot) => `<li class="${"white"}">${escape(bot.bot_id)} - ${escape(bot.action_time)}</li>`)}</ul>
<p class="${"bot-action-log svelte-kmqn98"}">Certified Bots: ${escape(certifiedBots.length)}</p> 
<ul>${each(certifiedBots, (bot) => `<li class="${"white"}">${escape(bot.bot_id)} - ${escape(bot.action_time)}</li>`)}</ul>

${loggedIn ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: "https://fateslist.xyz/profile/" + data.user.id + "/settings",
    class: "bot-card-actions-link",
    id: "profiles-center",
    touch: true,
    variant: "outlined"
  }, {}, { default: () => `Settings` })}` : ``}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
    default: () => `${each(data.bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
  })}
${!systemBots ? `<p>Click <a href="${"/profile/" + escape(data.user.id) + "?system_bots=true"}">here</a> to show system bots as well!</p>` : ``}`;
});
export { U5Bidu5D as default, load, prerender };
