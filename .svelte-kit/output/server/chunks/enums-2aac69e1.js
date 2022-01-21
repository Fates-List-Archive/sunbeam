import { c as create_ssr_component, a as compute_rest_props, g as get_current_component, h as getContext, s as setContext, v as validate_component, m as missing_component, i as globals } from "./index-36284ca1.js";
import { f as forwardEventsBuilder, R as Ripple, c as classMap, B as Button, A } from "./Ripple-a012c9fe.js";
const { Object: Object_1 } = globals;
const Button_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let actionProp;
  let defaultProp;
  let secondaryProp;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "style",
    "ripple",
    "color",
    "variant",
    "touch",
    "href",
    "action",
    "defaultAction",
    "secondary",
    "component",
    "getElement"
  ]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { ripple = true } = $$props;
  let { color = "primary" } = $$props;
  let { variant = "text" } = $$props;
  let { touch = false } = $$props;
  let { href = void 0 } = $$props;
  let { action = "close" } = $$props;
  let { defaultAction = false } = $$props;
  let { secondary = false } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let context = getContext("SMUI:button:context");
  let { component = href == null ? Button : A } = $$props;
  let previousDisabled = $$restProps.disabled;
  setContext("SMUI:label:context", "button");
  setContext("SMUI:icon:context", "button");
  function addClass(className2) {
    if (!internalClasses[className2]) {
      internalClasses[className2] = true;
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      internalClasses[className2] = false;
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        internalStyles = internalStyles;
      } else {
        internalStyles[name] = value;
      }
    }
  }
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
    $$bindings.ripple(ripple);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.touch === void 0 && $$bindings.touch && touch !== void 0)
    $$bindings.touch(touch);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.defaultAction === void 0 && $$bindings.defaultAction && defaultAction !== void 0)
    $$bindings.defaultAction(defaultAction);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    actionProp = context === "dialog:action" && action != null ? { "data-mdc-dialog-action": action } : { action: $$props.action };
    defaultProp = context === "dialog:action" && defaultAction ? { "data-mdc-dialog-button-default": "" } : { default: $$props.default };
    secondaryProp = context === "banner" ? {} : { secondary: $$props.secondary };
    {
      if (previousDisabled !== $$restProps.disabled) {
        getElement().blur();
        previousDisabled = $$restProps.disabled;
      }
    }
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object_1.assign({
      use: [
        [
          Ripple,
          {
            ripple,
            unbounded: false,
            color,
            disabled: !!$$restProps.disabled,
            addClass,
            removeClass,
            addStyle
          }
        ],
        forwardEvents,
        ...use
      ]
    }, {
      class: classMap({
        [className]: true,
        "mdc-button": true,
        "mdc-button--raised": variant === "raised",
        "mdc-button--unelevated": variant === "unelevated",
        "mdc-button--outlined": variant === "outlined",
        "smui-button--color-secondary": color === "secondary",
        "mdc-button--touch": touch,
        "mdc-card__action": context === "card:action",
        "mdc-card__action--button": context === "card:action",
        "mdc-dialog__button": context === "dialog:action",
        "mdc-top-app-bar__navigation-icon": context === "top-app-bar:navigation",
        "mdc-top-app-bar__action-item": context === "top-app-bar:action",
        "mdc-snackbar__action": context === "snackbar:actions",
        "mdc-banner__secondary-action": context === "banner" && secondary,
        "mdc-banner__primary-action": context === "banner" && !secondary,
        "mdc-tooltip__action": context === "tooltip:rich-actions",
        ...internalClasses
      })
    }, {
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" ")
    }, actionProp, defaultProp, secondaryProp, { href }, $$restProps, { this: element }), {
      this: ($$value) => {
        element = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<div class="${"mdc-button__ripple"}"></div>
  ${slots.default ? slots.default({}) : ``}${touch ? `<div class="${"mdc-button__touch"}"></div>` : ``}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var BotState;
(function(BotState2) {
  BotState2[BotState2["approved"] = 0] = "approved";
  BotState2[BotState2["pending"] = 1] = "pending";
  BotState2[BotState2["denied"] = 2] = "denied";
  BotState2[BotState2["hidden"] = 3] = "hidden";
  BotState2[BotState2["banned"] = 4] = "banned";
  BotState2[BotState2["under_review"] = 5] = "under_review";
  BotState2[BotState2["certified"] = 6] = "certified";
  BotState2[BotState2["archived"] = 7] = "archived";
  BotState2[BotState2["private_viewable"] = 8] = "private_viewable";
  BotState2[BotState2["private_staff_only"] = 9] = "private_staff_only";
})(BotState || (BotState = {}));
var UserBotAction;
(function(UserBotAction2) {
  UserBotAction2[UserBotAction2["approve"] = 0] = "approve";
  UserBotAction2[UserBotAction2["deny"] = 1] = "deny";
  UserBotAction2[UserBotAction2["certify"] = 2] = "certify";
  UserBotAction2[UserBotAction2["ban"] = 3] = "ban";
  UserBotAction2[UserBotAction2["claim"] = 4] = "claim";
  UserBotAction2[UserBotAction2["unclaim"] = 5] = "unclaim";
  UserBotAction2[UserBotAction2["transfer_ownership"] = 6] = "transfer_ownership";
  UserBotAction2[UserBotAction2["edit_bot"] = 7] = "edit_bot";
})(UserBotAction || (UserBotAction = {}));
let enums = {
  BotState,
  UserBotAction,
  Flags: {
    unlocked: 0,
    edit_locked: 1,
    staff_locked: 2,
    stats_locked: 3,
    vote_locked: 4,
    system: 5
  },
  LongDescType: {
    html: 0,
    markdown_pymarkdown: 1,
    markdown_marked: 2
  },
  helpers: {
    flagCheck: function(flags, allFlags) {
      let flagsParsed = [];
      if (typeof flags === "number") {
        flagsParsed.push(flags);
      } else {
        flagsParsed = flags;
      }
      return flagsParsed.some((item) => allFlags.includes(item));
    }
  }
};
export { Button_1 as B, enums as e };
