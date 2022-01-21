import { u as noop, w as safe_not_equal, c as create_ssr_component, a as compute_rest_props, g as get_current_component, b as spread, e as escape_attribute_value, d as escape_object, f as add_attribute, j as subscribe, s as setContext, x as set_store_value, v as validate_component, y as compute_slots, h as getContext } from "./index-36284ca1.js";
import { f as forwardEventsBuilder, c as classMap, D as Div, b as H5, d as H6 } from "./Ripple-a012c9fe.js";
import { c as classAdderBuilder, d as dispatch } from "./classAdderBuilder-d630724f.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "multiple", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { multiple = false } = $$props;
  let element;
  let withOpenDialog = false;
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<div${spread([
    {
      class: escape_attribute_value(classMap({
        [className]: true,
        "smui-accordion": true,
        "smui-accordion--multiple": multiple,
        "smui-accordion--with-open-dialog": withOpenDialog
      }))
    },
    escape_object($$restProps)
  ])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const Paper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "variant", "square", "color", "elevation", "transition", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = "raised" } = $$props;
  let { square = false } = $$props;
  let { color = "default" } = $$props;
  let { elevation = 1 } = $$props;
  let { transition = false } = $$props;
  let element;
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.square === void 0 && $$bindings.square && square !== void 0)
    $$bindings.square(square);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.elevation === void 0 && $$bindings.elevation && elevation !== void 0)
    $$bindings.elevation(elevation);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<div${spread([
    {
      class: escape_attribute_value(classMap({
        [className]: true,
        "smui-paper": true,
        "smui-paper--raised": variant === "raised",
        "smui-paper--unelevated": variant === "unelevated",
        "smui-paper--outlined": variant === "outlined",
        ["smui-paper--elevation-z" + elevation]: elevation !== 0 && variant === "raised",
        "smui-paper--rounded": !square,
        ["smui-paper--color-" + color]: color !== "default",
        "smui-paper-transition": transition
      }))
    },
    escape_object($$restProps)
  ])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
var Content = classAdderBuilder({
  class: "smui-paper__content",
  component: Div
});
classAdderBuilder({
  class: "smui-paper__title",
  component: H5
});
classAdderBuilder({
  class: "smui-paper__subtitle",
  component: H6
});
const Panel$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let usePass;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "variant",
    "color",
    "elevation",
    "open",
    "disabled",
    "nonInteractive",
    "extend",
    "extendedElevation",
    "isOpen",
    "setOpen",
    "getElement"
  ]);
  let $openStore, $$unsubscribe_openStore;
  let $nonInteractiveStore, $$unsubscribe_nonInteractiveStore;
  let $disabledStore, $$unsubscribe_disabledStore;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = "raised" } = $$props;
  let { color = "default" } = $$props;
  let { elevation = 1 } = $$props;
  let { open = false } = $$props;
  let { disabled = false } = $$props;
  let { nonInteractive = false } = $$props;
  let { extend = false } = $$props;
  let { extendedElevation = 3 } = $$props;
  let element;
  let accessor;
  let opened = open;
  const disabledStore = writable(disabled);
  $$unsubscribe_disabledStore = subscribe(disabledStore, (value) => $disabledStore = value);
  setContext("SMUI:accordion:panel:disabled", disabledStore);
  const nonInteractiveStore = writable(nonInteractive);
  $$unsubscribe_nonInteractiveStore = subscribe(nonInteractiveStore, (value) => $nonInteractiveStore = value);
  setContext("SMUI:accordion:panel:nonInteractive", nonInteractiveStore);
  const openStore = writable(open);
  $$unsubscribe_openStore = subscribe(openStore, (value) => $openStore = value);
  setContext("SMUI:accordion:panel:open", openStore);
  let previousOpen = open;
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    open = value;
  }
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.elevation === void 0 && $$bindings.elevation && elevation !== void 0)
    $$bindings.elevation(elevation);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.nonInteractive === void 0 && $$bindings.nonInteractive && nonInteractive !== void 0)
    $$bindings.nonInteractive(nonInteractive);
  if ($$props.extend === void 0 && $$bindings.extend && extend !== void 0)
    $$bindings.extend(extend);
  if ($$props.extendedElevation === void 0 && $$bindings.extendedElevation && extendedElevation !== void 0)
    $$bindings.extendedElevation(extendedElevation);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
    $$bindings.setOpen(setOpen);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    usePass = [forwardEvents, ...use];
    set_store_value(disabledStore, $disabledStore = disabled, $disabledStore);
    set_store_value(nonInteractiveStore, $nonInteractiveStore = nonInteractive, $nonInteractiveStore);
    set_store_value(openStore, $openStore = open, $openStore);
    {
      if (previousOpen !== open) {
        previousOpen = open;
        Array.from(getElement().children).forEach((child) => {
          if (child.classList.contains("smui-paper__content")) {
            const content = child;
            if (open) {
              content.classList.add("smui-accordion__content--no-transition");
              content.classList.add("smui-accordion__content--force-open");
              const { height } = content.getBoundingClientRect();
              content.classList.remove("smui-accordion__content--force-open");
              content.getBoundingClientRect();
              content.classList.remove("smui-accordion__content--no-transition");
              content.style.height = height + "px";
              content.addEventListener("transitionend", () => {
                if (content) {
                  content.style.height = "";
                }
                opened = true;
                dispatch(getElement(), "SMUIAccordionPanel:opened", { accessor });
              }, { once: true });
            } else {
              content.style.height = content.getBoundingClientRect().height + "px";
              content.getBoundingClientRect();
              requestAnimationFrame(() => {
                if (content) {
                  content.style.height = "";
                }
                dispatch(getElement(), "SMUIAccordionPanel:closed", { accessor });
              });
              opened = false;
            }
            content.setAttribute("aria-hidden", open ? "false" : "true");
          }
        });
        dispatch(getElement(), open ? "SMUIAccordionPanel:opening" : "SMUIAccordionPanel:closing", { accessor });
      }
    }
    $$rendered = `${validate_component(Paper, "Paper").$$render($$result, Object.assign({ use: usePass }, {
      class: classMap({
        [className]: true,
        "smui-accordion__panel": true,
        "smui-accordion__panel--open": open,
        "smui-accordion__panel--opened": opened,
        "smui-accordion__panel--disabled": disabled,
        "smui-accordion__panel--non-interactive": nonInteractive,
        "smui-accordion__panel--raised": variant === "raised",
        "smui-accordion__panel--extend": extend,
        ["smui-accordion__panel--elevation-z" + (extend && open ? extendedElevation : elevation)]: elevation !== 0 && variant === "raised" || extendedElevation !== 0 && variant === "raised" && extend && open
      })
    }, { color }, {
      variant: variant === "raised" ? "unelevated" : variant
    }, $$restProps, { this: element }), {
      this: ($$value) => {
        element = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_openStore();
  $$unsubscribe_nonInteractiveStore();
  $$unsubscribe_disabledStore();
  return $$rendered;
});
const Header$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "style", "ripple", "getElement"]);
  let $$slots = compute_slots(slots);
  let $nonInteractive, $$unsubscribe_nonInteractive;
  let $$unsubscribe_disabled;
  let $open, $$unsubscribe_open;
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { ripple = true } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  const disabled = getContext("SMUI:accordion:panel:disabled");
  $$unsubscribe_disabled = subscribe(disabled, (value) => value);
  const nonInteractive = getContext("SMUI:accordion:panel:nonInteractive");
  $$unsubscribe_nonInteractive = subscribe(nonInteractive, (value) => $nonInteractive = value);
  const open = getContext("SMUI:accordion:panel:open");
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
    $$bindings.ripple(ripple);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  $$unsubscribe_nonInteractive();
  $$unsubscribe_disabled();
  $$unsubscribe_open();
  return `<div${spread([
    {
      class: escape_attribute_value(classMap({
        [className]: true,
        "smui-accordion__header": true,
        ...internalClasses
      }))
    },
    {
      style: escape_attribute_value(Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "))
    },
    { role: "button" },
    {
      tabindex: escape_attribute_value($nonInteractive ? -1 : 0)
    },
    {
      "aria-expanded": escape_attribute_value($open ? "true" : "false")
    },
    escape_object($$restProps)
  ])}${add_attribute("this", element, 0)}>${ripple ? `<div class="${"smui-accordion__header__ripple"}"></div>` : ``}
  <div${add_attribute("class", classMap({
    "smui-accordion__header__title": true,
    "smui-accordion__header__title--with-description": $$slots.description
  }), 0)}>${slots.default ? slots.default({}) : ``}</div>
  ${$$slots.description ? `<div class="${"smui-accordion__header__description"}">${slots.description ? slots.description({}) : ``}</div>` : ``}
  ${$$slots.icon ? `<div class="${"smui-accordion__header__icon"}">${slots.icon ? slots.icon({}) : ``}</div>` : ``}
</div>`;
});
const Panel = Panel$1;
const Header = Header$1;
export { Accordion as A, Content as C, Header as H, Panel as P };
