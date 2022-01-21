import { c as create_ssr_component, j as subscribe, v as validate_component, f as add_attribute, k as escape } from "./index-36284ca1.js";
import { A as Accordion, P as Panel, H as Header, C as Content } from "./index-f2488d65.js";
import { B as BristlefrostMeta } from "./BristlefrostMeta-5512d822.js";
import { I as Icon } from "./Icon-8a17b723.js";
import { e as enums, B as Button_1 } from "./enums-2aac69e1.js";
import { s as session } from "./stores-d5eb43fc.js";
var BotServerVotePage_svelte_svelte_type_style_lang = "";
const css = {
  code: ".buttons-all{background-color:black !important}.codehilite{background-color:white}.prefix.svelte-1t3l1wv{opacity:0.65}.bot-page-banner.svelte-1t3l1wv{background-size:cover;width:100%;height:100%;min-height:1000px;background-repeat:no-repeat}.bot-page.svelte-1t3l1wv{display:flex;flex-wrap:wrap}.bot-username.svelte-1t3l1wv,.bot-avatar.svelte-1t3l1wv{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.bot-username.svelte-1t3l1wv,span.svelte-1t3l1wv{margin-bottom:0px;padding-bottom:0px}.bot-avatar.svelte-1t3l1wv{border-radius:50%;width:120px}.bot-page-content.svelte-1t3l1wv{display:block;margin:10px;width:100%}.accordion-container.svelte-1t3l1wv{display:block;cursor:text !important}#bot-description.svelte-1t3l1wv{font-size:18px;text-align:center;margin:0px;padding:0px}.buttons-all{color:white !important;border:solid thin !important;opacity:1 !important;margin-right:10px}.buttons.svelte-1t3l1wv{margin-left:auto;text-align:center}.disabled{opacity:0.63 !important}.review-user{opacity:1;margin-top:5px;padding-left:3px;box-sizing:border-box;margin-bottom:2px}.review-left{display:inline-block}.page-item{display:inline-block;margin-right:5px !important;list-style:none}.bot-username-link.svelte-1t3l1wv,#bot-name.svelte-1t3l1wv{margin-top:0px !important;margin-bottom:1px !important}.red.svelte-1t3l1wv{color:red}#vote-warning.svelte-1t3l1wv{text-align:center}",
  map: null
};
const BotServerVotePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  let { data } = $$props;
  let { type } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  $$unsubscribe_session();
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/" + type + "/" + data.user.id,
    pageTitle: data.user.username,
    title: "Vote For " + data.user.username + " on Fates List!",
    description: data.description,
    thumbnail: data.user.avatar
  }, {}, {})}

${data.banner && data.keep_banner_decor ? `<style lang="${"scss"}">.banner-decor {
  opacity: 0.7;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
}</style>` : ``}


<!-- HTML_TAG_START -->${data.css}<!-- HTML_TAG_END -->

<div class="${"lozad bot-page-banner svelte-1t3l1wv"}"${add_attribute("data-background-image", data.banner, 0)}><img class="${"bot-avatar svelte-1t3l1wv"}" loading="${"lazy"}"${add_attribute("src", data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px"), 0)} id="${"bot-avatar"}" alt="${escape(data.user.username) + "'s avatar"}">
    <article class="${"bot-page svelte-1t3l1wv"}"><a href="${"/" + escape(type) + "/" + escape(data.user.id) + "/invite"}" class="${"banner-decor bot-username bot-username-link svelte-1t3l1wv"}"><h2 class="${"white svelte-1t3l1wv"}" id="${"bot-name"}">Vote for ${escape(data.user.username)}! ${type == "bot" ? `<span class="${"prefix svelte-1t3l1wv"}">(${escape(data.prefix || "/")})</span>` : ``}</h2></a>
        <div class="${"bot-page-content svelte-1t3l1wv"}"><div class="${"accordion-container svelte-1t3l1wv"}">${validate_component(Accordion, "Accordion").$$render($$result, { multiple: true }, {}, {
    default: () => `${enums.helpers.flagCheck(enums.Flags.system, data.flags) ? `${validate_component(Panel, "Panel").$$render($$result, { color: "secondary", open: true }, {}, {
      default: () => `${validate_component(Header, "Header").$$render($$result, { ripple: false }, {}, {
        default: () => `System Bot
                        `
      })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
        default: () => `This bot is a system bot and was added as a placeholder to avoid malicious use of your bot. 
                            If you are the bots owner, please either edit your bot setting System to False if available or contact 
                            Fates List Support to claim the bot. To avoid misinformation and false advertising, the actual owner of 
                            the bot is listed in About who may edit their bot if they wish to change anything on it.

			    <em>System gots cannot be voted for until claimed</em>`
      })}`
    })}` : ``}
                    ${data.state == enums.BotState.denied ? `${validate_component(Panel, "Panel").$$render($$result, { color: "primary", open: true }, {}, {
      default: () => `${validate_component(Header, "Header").$$render($$result, { ripple: false }, {}, {
        default: () => `Bot Denied
                        `
      })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
        default: () => `This bot has been DENIED from this list for being a 
                            low-quality bot. Please do not invite it.
                        `
      })}`
    })}` : `${data.state == enums.BotState.banned ? `${validate_component(Panel, "Panel").$$render($$result, { color: "primary", open: true }, {}, {
      default: () => `${validate_component(Header, "Header").$$render($$result, { ripple: false }, {}, {
        default: () => `Bot Banned
                        `
      })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
        default: () => `This bot has been BANNED from this bot list for violating our rules or being a low-quality bot. 
                            Please do not invite it until further notice!
                        `
      })}`
    })}` : ``}`}`
  })}</div>
            <p class="${"banner-decor white svelte-1t3l1wv"}" id="${"bot-description"}"><!-- HTML_TAG_START -->${data.description.replace("p>", "span>")}<!-- HTML_TAG_END --></p>
            <div class="${"buttons svelte-1t3l1wv"}">${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all",
    id: "buttons-vote",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      icon: "fa-solid:thumbs-up",
      inline: false
    }, {}, {})}
				    <span style="${"margin-left: 3px;"}" class="${"svelte-1t3l1wv"}">${escape(data.votes)}</span>`
  })}
			    ${validate_component(Button_1, "Button").$$render($$result, {
    href: "/" + type + "/" + data.user.id + "/invite",
    class: "buttons-all",
    id: "buttons-vote",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1t3l1wv"}">Invite</span>`
  })}</div>
            <p id="${"vote-warning"}" class="${"svelte-1t3l1wv"}"><span class="${"red svelte-1t3l1wv"}">Warning:</span> You can only vote for one bot every 8 hours, so vote wisely</p></div></article>
</div>`;
});
export { BotServerVotePage as B };
