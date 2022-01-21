import { c as create_ssr_component, r as each, k as escape, j as subscribe, v as validate_component, f as add_attribute } from "./index-36284ca1.js";
import { A as Accordion, P as Panel, H as Header, C as Content } from "./index-f2488d65.js";
import { B as BristlefrostMeta } from "./BristlefrostMeta-5512d822.js";
import { I as Icon } from "./Icon-8a17b723.js";
import { e as enums, B as Button_1 } from "./enums-2aac69e1.js";
import { marked } from "marked";
import { s as session } from "./stores-d5eb43fc.js";
var Tab_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".slider{-webkit-appearance:none;width:20%;height:5px;border-radius:5px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:0.2s;transition:opacity 0.2s}.tab.svelte-1eqkww1.svelte-1eqkww1{text-align:center;color:white !important;border:none}.tab.svelte-1eqkww1 button.svelte-1eqkww1{background-color:black;color:white;border:none;outline:none;cursor:pointer;padding:14px 16px;transition:0.3s}.tab.svelte-1eqkww1 button.svelte-1eqkww1:hover{background-color:#2e3033}.tab button.active{border-bottom:solid !important;color:white !important}.tabcontent{display:none}.tabdesign{color:white !important;text-align:left !important;margin-left:5%;margin-right:5%;margin-top:13px;border:none !important}.blackbar.svelte-1eqkww1.svelte-1eqkww1{background:black;border:hidden;margin-top:5px;min-height:700px;padding:5px;margin-bottom:0px}#switcher.svelte-1eqkww1.svelte-1eqkww1{border-radius:13px;margin-left:1.1%;margin-right:1.1%}",
  map: null
};
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tabs } = $$props;
  let { defaultTabButton } = $$props;
  if ($$props.tabs === void 0 && $$bindings.tabs && tabs !== void 0)
    $$bindings.tabs(tabs);
  if ($$props.defaultTabButton === void 0 && $$bindings.defaultTabButton && defaultTabButton !== void 0)
    $$bindings.defaultTabButton(defaultTabButton);
  $$result.css.add(css$1);
  return `<div id="${"switcher"}" style="${"margin-bottom: 3px;"}" class="${"blackbar svelte-1eqkww1"}"><div class="${"tab svelte-1eqkww1"}">${each(tabs, (tab) => `<button id="${escape(tab.id) + "-tab-button"}" class="${"tablinks svelte-1eqkww1"}">${escape(tab.name)}</button>`)}</div>
	${slots.default ? slots.default({}) : ``}
</div>`;
});
var BotServerPage_svelte_svelte_type_style_lang = "";
const css = {
  code: "#review-add{opacity:1 !important;border:solid thin;width:250px;max-width:250px;margin-bottom:10px}.buttons-all{background-color:black !important;margin-right:10px}.codehilite{background-color:white}.prefix.svelte-1uyxte0{opacity:0.65}.bot-page-banner.svelte-1uyxte0{background-size:cover;width:100%;height:100%;min-height:1000px;background-repeat:no-repeat}.bot-page.svelte-1uyxte0{display:flex;flex-wrap:wrap}.bot-username.svelte-1uyxte0,.bot-avatar.svelte-1uyxte0{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.bot-username.svelte-1uyxte0,span.svelte-1uyxte0{margin-bottom:0px;padding-bottom:0px}.bot-avatar.svelte-1uyxte0{border-radius:50%;width:120px}.bot-page-content.svelte-1uyxte0{display:block;margin:10px;width:100%}.accordion-container.svelte-1uyxte0{display:block;cursor:text !important}#bot-description.svelte-1uyxte0{font-size:18px;text-align:center;margin:0px;padding:0px}.buttons-all{color:white !important;border:solid thin !important;opacity:1 !important;word-wrap:break-word !important;font-size:15px !important}.buttons.svelte-1uyxte0{display:flex;flex-flow:column-wrap;justify-content:center;align-items:center;width:93%;height:53px;margin:0 auto}@media screen and (max-width: 768px){.buttons.svelte-1uyxte0{margin-left:3px !important;width:100% !important}}@media screen and (max-width: 992px){.buttons.svelte-1uyxte0{overflow-x:scroll;overflow-y:hidden}}.buttons.svelte-1uyxte0{word-wrap:break-word;text-overflow:ellipsis}.buttons.svelte-1uyxte0{margin-bottom:40px}.disabled{opacity:0.63 !important}.review-user{opacity:1;margin-top:5px;padding-left:3px;box-sizing:border-box;margin-bottom:2px}.review-left{display:inline-block}.page-item{display:inline-block;margin-right:5px !important;list-style:none}.bot-username-link.svelte-1uyxte0,#bot-name.svelte-1uyxte0{margin-top:0px !important;margin-bottom:1px !important}",
  map: null
};
const BotServerPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  let { data } = $$props;
  let { type } = $$props;
  let tabs = [
    {
      "name": "Description",
      "id": "long-description"
    },
    { "name": "About", "id": "about" },
    { "name": "Resources", "id": "resources" },
    { "name": "Reviews", "id": "reviews" }
  ];
  if (data.shards !== void 0 && data.shards.length < 1) {
    data.shards = [
      "No shards set. Try checking it's website or support server (if it has one)!"
    ];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  $$unsubscribe_session();
  return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
    url: "https://fateslist.xyz/" + type + "/" + data.user.id,
    pageTitle: data.user.username,
    title: "Discover " + data.user.username + " on Fates List!",
    description: data.description,
    thumbnail: data.user.avatar
  }, {}, {})}

${data.banner && data.keep_banner_decor ? `<style lang="${"scss"}">.banner-decor {
  opacity: 0.7;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
}</style>` : ``}


<!-- HTML_TAG_START -->${data.css}<!-- HTML_TAG_END -->

<div class="${"lozad bot-page-banner svelte-1uyxte0"}"${add_attribute("data-background-image", data.banner, 0)}><img class="${"bot-avatar svelte-1uyxte0"}"${add_attribute("src", data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px"), 0)} id="${"bot-avatar"}" alt="${escape(data.user.username) + "'s avatar"}">
    <article class="${"bot-page svelte-1uyxte0"}"><a href="${"/" + escape(type) + "/" + escape(data.user.id) + "/invite"}" class="${"banner-decor bot-username bot-username-link svelte-1uyxte0"}"><h2 class="${"white svelte-1uyxte0"}" id="${"bot-name"}">${escape(data.user.username)} ${type == "bot" ? `<span class="${"prefix svelte-1uyxte0"}">(${escape(data.prefix || "/")})</span>` : ``}</h2></a>
        <div class="${"bot-page-content svelte-1uyxte0"}"><div class="${"accordion-container svelte-1uyxte0"}">${validate_component(Accordion, "Accordion").$$render($$result, { multiple: true }, {}, {
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
                        `
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
    })}` : `${data.state == enums.BotState.pending ? `${validate_component(Panel, "Panel").$$render($$result, { color: "secondary", open: true }, {}, {
      default: () => `${validate_component(Header, "Header").$$render($$result, { ripple: false }, {}, {
        default: () => `Bot Pending Review
		  	`
      })}
			${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
        default: () => `This bot has not yet been tested and may be low quality or malicious. Please do not invite it yet
			`
      })}`
    })}` : `${data.state == enums.BotState.under_review ? `${validate_component(Panel, "Panel").$$render($$result, { color: "secondary", open: true }, {}, {
      default: () => `${validate_component(Header, "Header").$$render($$result, { ripple: false }, {}, {
        default: () => `Bot Under Review
			`
      })}
			${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
        default: () => `This bot is currently being tested, Expect to hear from us soon!
			`
      })}`
    })}` : ``}`}`}`}`
  })}</div>
            <p class="${"banner-decor white svelte-1uyxte0"}" id="${"bot-description"}"><!-- HTML_TAG_START -->${data.description.replace("p>", "span>")}<!-- HTML_TAG_END --></p>
            <div class="${"buttons svelte-1uyxte0"}">${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all",
    id: "buttons-vote",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      icon: "fa-solid:thumbs-up",
      inline: false
    }, {}, {})}
				    <span style="${"margin-left: 3px;"}" class="${"svelte-1uyxte0"}">${escape(data.votes)}</span>`
  })}
			    ${validate_component(Button_1, "Button").$$render($$result, {
    href: "/" + type + "/" + data.user.id + "/invite",
    class: "buttons-all",
    touch: true,
    variant: "outlined",
    rel: "external"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Invite</span>`
  })}
                ${data.support ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: data.support,
    class: "buttons-all",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Support</span>`
  })}` : `${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all disabled",
    touch: true,
    variant: "outlined",
    disabled: true
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Support</span>`
  })}`}
                ${data.website ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: data.website,
    class: "buttons-all",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Website</span>`
  })}` : `${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all disabled",
    touch: true,
    variant: "outlined",
    disabled: true
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Website</span>`
  })}`}
                ${data.privacy_policy ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: data.privacy_policy,
    class: "buttons-all",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Privacy Policy</span>`
  })}` : `${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all disabled",
    touch: true,
    variant: "outlined",
    disabled: true
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Privacy Policy</span>`
  })}`}
                ${data.github ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: data.github,
    class: "buttons-all",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Github</span>`
  })}` : `${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all disabled",
    touch: true,
    variant: "outlined",
    disabled: true
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Github</span>`
  })}`}
		${type == "bot" ? `${validate_component(Button_1, "Button").$$render($$result, {
    href: "/bot/" + data.user.id + "/settings",
    class: "buttons-all",
    touch: true,
    variant: "outlined"
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Settings</span>`
  })}` : `${validate_component(Button_1, "Button").$$render($$result, {
    class: "buttons-all",
    touch: true,
    variant: "outlined",
    disabled: true
  }, {}, {
    default: () => `<span class="${"svelte-1uyxte0"}">Settings</span>`
  })}`}</div>
            ${validate_component(Tab, "Tab").$$render($$result, {
    tabs,
    defaultTabButton: "long-description-tab-button"
  }, {}, {
    default: () => `<section id="${"long-description-tab"}" class="${"tabcontent tabdesign"}"><div id="${"long-description"}">${data.long_description_type == enums.LongDescType.markdown_marked ? `<!-- HTML_TAG_START -->${marked.parse(data.long_description)}<!-- HTML_TAG_END -->` : `<!-- HTML_TAG_START -->${data.long_description}<!-- HTML_TAG_END -->`}</div></section>
		<section id="${"resources-tab"}" class="${"tabcontent tabdesign"}">${!data.resources && data.resources.length < 0 ? `<h2>This ${escape(type)} does not have any resources set!</h2>` : `${each(data.resources, (resource) => `<a${add_attribute("href", resource.resource_link, 0)}>${escape(resource.resource_title)}</a>
					<p>${escape(resource.resource_description)}</p>`)}`}</section>
                <section id="${"reviews-tab"}" class="${"tabcontent tabdesign"}"><label for="${"rating"}">On a scale of 1 to 10, how much did you like this ${escape(type)}?</label><br>
		   <input class="${"slider range-slider"}" type="${"range"}" id="${"star-rating"}" min="${"0.1"}" max="${"10"}" style="${"width: 100%"}" value="${"5"}" step="${"0.1"}" output="${"rating-desc"}">
		   <p id="${"rating-desc"}" style="${"color: white;"}"></p>
		   <label for="${"review-text"}">Enter your review here</label><br>
		   <textarea class="${"form-control fform text-input"}" id="${"review-text"}" placeholder="${"Write your review here. This must be at least 7 characters!"}" minlength="${"9"}" style="${"width: 100%"}" required></textarea>
		     ${validate_component(Button_1, "Button").$$render($$result, { href: "#", id: "review-add" }, {}, { default: () => `Add Review` })}
                    <div id="${"reviews"}">Loading reviews... <a${add_attribute("href", "#", 0)}>Retry</a></div></section>
                <section id="${"about-tab"}" class="${"tabcontent tabdesign"}">
                    ${type == "bot" ? `<h2>Owners</h2>
                        ${validate_component(Icon, "Icon").$$render($$result, {
      icon: "mdi-crown",
      inline: false,
      height: "1.2em",
      style: "margin-right: 1px"
    }, {}, {})}
			<!-- HTML_TAG_START -->${data.owners_html}<!-- HTML_TAG_END -->
			<h2>Uptime</h2>
			<p>Uptime Checks (Total): ${escape(data.uptime_checks_total)}</p>
			<p>Uptime Checks (Failed): ${escape(data.uptime_checks_failed)}</p>
			<p>Uptime Checks (Success): ${escape(data.uptime_checks_total - data.uptime_checks_failed)}</p>	
			<p>Uptime Checks (Score): 
			${data.uptime_checks_total ? `${escape((data.uptime_checks_total - data.uptime_checks_failed) / data.uptime_checks_total)}` : `Not Available`}</p>
                        <h2>Statistics</h2>
                        <p>Guild Count: ${escape(data.guild_count)}</p>
                        <p>User Count (according to bot): ${escape(data.user_count)}</p>
                        <p>Shard Count: ${escape(data.shard_count)}</p>
                        <p>Shards: 
                            ${each(data.shards, (shard) => `<span class="${"white svelte-1uyxte0"}">${escape(shard)}</span>,`)}</p>
                        <h2>Nerdville</h2>
                        <p>Last posted statistics on: ${escape(data.last_stats_post)}</p>
                        <p>Added to the list on: ${escape(data.created_at)}</p>
                        <p>Bot Flags: ${escape(data.flags)}</p>
                        <p>Bot Features: ${escape(data.features)}</p>
			<h4>User Audit Logs</h4>
			${each(data.action_logs, (log) => `${escape(JSON.stringify(log))}`)}` : `<h2>Servers do not support this feature <em>yet</em> :(</h2>`}</section>`
  })}</div></article></div>

<span class="${"svelte-1uyxte0"}"></span>`;
});
export { BotServerPage as B };
