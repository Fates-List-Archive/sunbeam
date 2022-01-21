import { c as create_ssr_component, a as compute_rest_props, g as get_current_component, s as setContext, o as onDestroy, b as spread, e as escape_attribute_value, d as escape_object, f as add_attribute, v as validate_component, h as getContext, m as missing_component, i as globals, j as subscribe, k as escape } from "../../chunks/index-36284ca1.js";
import { s as session, p as page } from "../../chunks/stores-d5eb43fc.js";
import { f as forwardEventsBuilder, c as classMap, N as Nav, U as Ul, R as Ripple, A, S as Span, L as Li, D as Div, H as H3 } from "../../chunks/Ripple-a012c9fe.js";
import { d as dispatch, c as classAdderBuilder } from "../../chunks/classAdderBuilder-d630724f.js";
import "lozad";
import "tslib";
const MenuSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "style",
    "static",
    "anchor",
    "fixed",
    "open",
    "managed",
    "fullWidth",
    "quickOpen",
    "anchorElement",
    "anchorCorner",
    "anchorMargin",
    "maxHeight",
    "horizontallyCenteredOnViewport",
    "isOpen",
    "setOpen",
    "setAbsolutePosition",
    "setIsHoisted",
    "isFixed",
    "getElement"
  ]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { static: isStatic = false } = $$props;
  let { anchor = true } = $$props;
  let { fixed = false } = $$props;
  let { open = isStatic } = $$props;
  let { managed = false } = $$props;
  let { fullWidth = false } = $$props;
  let { quickOpen = false } = $$props;
  let { anchorElement = void 0 } = $$props;
  let { anchorCorner = void 0 } = $$props;
  let { anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 } } = $$props;
  let { maxHeight = 0 } = $$props;
  let { horizontallyCenteredOnViewport = false } = $$props;
  let element;
  let instance;
  let internalClasses = {};
  let internalStyles = {};
  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");
  onDestroy(() => {
  });
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    open = value;
  }
  function setAbsolutePosition(x, y) {
    return instance.setAbsolutePosition(x, y);
  }
  function setIsHoisted(isHoisted) {
    return instance.setIsHoisted(isHoisted);
  }
  function isFixed() {
    return instance.isFixed();
  }
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.static === void 0 && $$bindings.static && isStatic !== void 0)
    $$bindings.static(isStatic);
  if ($$props.anchor === void 0 && $$bindings.anchor && anchor !== void 0)
    $$bindings.anchor(anchor);
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.managed === void 0 && $$bindings.managed && managed !== void 0)
    $$bindings.managed(managed);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
    $$bindings.fullWidth(fullWidth);
  if ($$props.quickOpen === void 0 && $$bindings.quickOpen && quickOpen !== void 0)
    $$bindings.quickOpen(quickOpen);
  if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
    $$bindings.anchorElement(anchorElement);
  if ($$props.anchorCorner === void 0 && $$bindings.anchorCorner && anchorCorner !== void 0)
    $$bindings.anchorCorner(anchorCorner);
  if ($$props.anchorMargin === void 0 && $$bindings.anchorMargin && anchorMargin !== void 0)
    $$bindings.anchorMargin(anchorMargin);
  if ($$props.maxHeight === void 0 && $$bindings.maxHeight && maxHeight !== void 0)
    $$bindings.maxHeight(maxHeight);
  if ($$props.horizontallyCenteredOnViewport === void 0 && $$bindings.horizontallyCenteredOnViewport && horizontallyCenteredOnViewport !== void 0)
    $$bindings.horizontallyCenteredOnViewport(horizontallyCenteredOnViewport);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
    $$bindings.setOpen(setOpen);
  if ($$props.setAbsolutePosition === void 0 && $$bindings.setAbsolutePosition && setAbsolutePosition !== void 0)
    $$bindings.setAbsolutePosition(setAbsolutePosition);
  if ($$props.setIsHoisted === void 0 && $$bindings.setIsHoisted && setIsHoisted !== void 0)
    $$bindings.setIsHoisted(setIsHoisted);
  if ($$props.isFixed === void 0 && $$bindings.isFixed && isFixed !== void 0)
    $$bindings.isFixed(isFixed);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `

<div${spread([
    {
      class: escape_attribute_value(classMap({
        [className]: true,
        "mdc-menu-surface": true,
        "mdc-menu-surface--fixed": fixed,
        "mdc-menu-surface--open": isStatic,
        "smui-menu-surface--static": isStatic,
        "mdc-menu-surface--fullwidth": fullWidth,
        ...internalClasses
      }))
    },
    {
      style: escape_attribute_value(Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "))
    },
    escape_object($$restProps)
  ])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let usePass;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "open",
    "isOpen",
    "setOpen",
    "setDefaultFocusState",
    "getSelectedIndex",
    "getElement"
  ]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { open = false } = $$props;
  let element;
  let instance;
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    open = value;
  }
  function setDefaultFocusState(focusState) {
    instance.setDefaultFocusState(focusState);
  }
  function getSelectedIndex() {
    return instance.getSelectedIndex();
  }
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
    $$bindings.setOpen(setOpen);
  if ($$props.setDefaultFocusState === void 0 && $$bindings.setDefaultFocusState && setDefaultFocusState !== void 0)
    $$bindings.setDefaultFocusState(setDefaultFocusState);
  if ($$props.getSelectedIndex === void 0 && $$bindings.getSelectedIndex && getSelectedIndex !== void 0)
    $$bindings.getSelectedIndex(getSelectedIndex);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    usePass = [forwardEvents, ...use];
    $$rendered = `${validate_component(MenuSurface, "MenuSurface").$$render($$result, Object.assign({ use: usePass }, {
      class: classMap({ [className]: true, "mdc-menu": true })
    }, $$restProps, { this: element }, { open }), {
      this: ($$value) => {
        element = $$value;
        $$settled = false;
      },
      open: ($$value) => {
        open = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "nonInteractive",
    "dense",
    "textualList",
    "avatarList",
    "iconList",
    "imageList",
    "thumbnailList",
    "videoList",
    "twoLine",
    "threeLine",
    "vertical",
    "wrapFocus",
    "singleSelection",
    "selectedIndex",
    "radioList",
    "checkList",
    "hasTypeahead",
    "component",
    "layout",
    "setEnabled",
    "getTypeaheadInProgress",
    "getSelectedIndex",
    "getFocusedItemIndex",
    "getElement"
  ]);
  var _a;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { nonInteractive = false } = $$props;
  let { dense = false } = $$props;
  let { textualList = false } = $$props;
  let { avatarList = false } = $$props;
  let { iconList = false } = $$props;
  let { imageList = false } = $$props;
  let { thumbnailList = false } = $$props;
  let { videoList = false } = $$props;
  let { twoLine = false } = $$props;
  let { threeLine = false } = $$props;
  let { vertical = true } = $$props;
  let { wrapFocus = (_a = getContext("SMUI:list:wrapFocus")) !== null && _a !== void 0 ? _a : false } = $$props;
  let { singleSelection = false } = $$props;
  let { selectedIndex = -1 } = $$props;
  let { radioList = false } = $$props;
  let { checkList = false } = $$props;
  let { hasTypeahead = false } = $$props;
  let element;
  let instance;
  let role = getContext("SMUI:list:role");
  let nav = getContext("SMUI:list:nav");
  let selectionDialog = getContext("SMUI:dialog:selection");
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let { component = nav ? Nav : Ul } = $$props;
  setContext("SMUI:list:nonInteractive", nonInteractive);
  setContext("SMUI:separator:context", "list");
  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radioList) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checkList) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", void 0);
    }
  }
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function layout() {
    return instance.layout();
  }
  function setEnabled(itemIndex, isEnabled) {
    return instance.setEnabled(itemIndex, isEnabled);
  }
  function getTypeaheadInProgress() {
    return instance.isTypeaheadInProgress();
  }
  function getSelectedIndex() {
    return instance.getSelectedIndex();
  }
  function getFocusedItemIndex() {
    return instance.getFocusedItemIndex();
  }
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.nonInteractive === void 0 && $$bindings.nonInteractive && nonInteractive !== void 0)
    $$bindings.nonInteractive(nonInteractive);
  if ($$props.dense === void 0 && $$bindings.dense && dense !== void 0)
    $$bindings.dense(dense);
  if ($$props.textualList === void 0 && $$bindings.textualList && textualList !== void 0)
    $$bindings.textualList(textualList);
  if ($$props.avatarList === void 0 && $$bindings.avatarList && avatarList !== void 0)
    $$bindings.avatarList(avatarList);
  if ($$props.iconList === void 0 && $$bindings.iconList && iconList !== void 0)
    $$bindings.iconList(iconList);
  if ($$props.imageList === void 0 && $$bindings.imageList && imageList !== void 0)
    $$bindings.imageList(imageList);
  if ($$props.thumbnailList === void 0 && $$bindings.thumbnailList && thumbnailList !== void 0)
    $$bindings.thumbnailList(thumbnailList);
  if ($$props.videoList === void 0 && $$bindings.videoList && videoList !== void 0)
    $$bindings.videoList(videoList);
  if ($$props.twoLine === void 0 && $$bindings.twoLine && twoLine !== void 0)
    $$bindings.twoLine(twoLine);
  if ($$props.threeLine === void 0 && $$bindings.threeLine && threeLine !== void 0)
    $$bindings.threeLine(threeLine);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
    $$bindings.vertical(vertical);
  if ($$props.wrapFocus === void 0 && $$bindings.wrapFocus && wrapFocus !== void 0)
    $$bindings.wrapFocus(wrapFocus);
  if ($$props.singleSelection === void 0 && $$bindings.singleSelection && singleSelection !== void 0)
    $$bindings.singleSelection(singleSelection);
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.radioList === void 0 && $$bindings.radioList && radioList !== void 0)
    $$bindings.radioList(radioList);
  if ($$props.checkList === void 0 && $$bindings.checkList && checkList !== void 0)
    $$bindings.checkList(checkList);
  if ($$props.hasTypeahead === void 0 && $$bindings.hasTypeahead && hasTypeahead !== void 0)
    $$bindings.hasTypeahead(hasTypeahead);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.setEnabled === void 0 && $$bindings.setEnabled && setEnabled !== void 0)
    $$bindings.setEnabled(setEnabled);
  if ($$props.getTypeaheadInProgress === void 0 && $$bindings.getTypeaheadInProgress && getTypeaheadInProgress !== void 0)
    $$bindings.getTypeaheadInProgress(getTypeaheadInProgress);
  if ($$props.getSelectedIndex === void 0 && $$bindings.getSelectedIndex && getSelectedIndex !== void 0)
    $$bindings.getSelectedIndex(getSelectedIndex);
  if ($$props.getFocusedItemIndex === void 0 && $$bindings.getFocusedItemIndex && getFocusedItemIndex !== void 0)
    $$bindings.getFocusedItemIndex(getFocusedItemIndex);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({ use: [forwardEvents, ...use] }, {
      class: classMap({
        [className]: true,
        "mdc-deprecated-list": true,
        "mdc-deprecated-list--non-interactive": nonInteractive,
        "mdc-deprecated-list--dense": dense,
        "mdc-deprecated-list--textual-list": textualList,
        "mdc-deprecated-list--avatar-list": avatarList || selectionDialog,
        "mdc-deprecated-list--icon-list": iconList,
        "mdc-deprecated-list--image-list": imageList,
        "mdc-deprecated-list--thumbnail-list": thumbnailList,
        "mdc-deprecated-list--video-list": videoList,
        "mdc-deprecated-list--two-line": twoLine,
        "smui-list--three-line": threeLine && !twoLine
      })
    }, { role }, $$restProps, { this: element }), {
      this: ($$value) => {
        element = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const { Object: Object_1 } = globals;
let counter = 0;
const Item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tabindex;
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "style",
    "color",
    "nonInteractive",
    "ripple",
    "activated",
    "role",
    "selected",
    "disabled",
    "skipRestoreFocus",
    "tabindex",
    "inputId",
    "href",
    "component",
    "action",
    "getPrimaryText",
    "getElement"
  ]);
  var _a;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { color = void 0 } = $$props;
  let { nonInteractive = (_a = getContext("SMUI:list:nonInteractive")) !== null && _a !== void 0 ? _a : false } = $$props;
  setContext("SMUI:list:nonInteractive", void 0);
  let { ripple = !nonInteractive } = $$props;
  let { activated = false } = $$props;
  let { role = getContext("SMUI:list:item:role") } = $$props;
  setContext("SMUI:list:item:role", void 0);
  let { selected = false } = $$props;
  let { disabled = false } = $$props;
  let { skipRestoreFocus = false } = $$props;
  let { tabindex: tabindexProp = uninitializedValue } = $$props;
  let { inputId = "SMUI-form-field-list-" + counter++ } = $$props;
  let { href = void 0 } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let input;
  let nav = getContext("SMUI:list:item:nav");
  let { component = nav ? href ? A : Span : Li } = $$props;
  setContext("SMUI:generic:input:props", { id: inputId });
  setContext("SMUI:separator:context", void 0);
  onDestroy(() => {
  });
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
  function action(e) {
    if (!disabled) {
      dispatch(getElement(), "SMUI:action", e);
    }
  }
  function getPrimaryText() {
    var _a2, _b, _c;
    const element2 = getElement();
    const primaryText = element2.querySelector(".mdc-deprecated-list-item__primary-text");
    if (primaryText) {
      return (_a2 = primaryText.textContent) !== null && _a2 !== void 0 ? _a2 : "";
    }
    const text = element2.querySelector(".mdc-deprecated-list-item__text");
    if (text) {
      return (_b = text.textContent) !== null && _b !== void 0 ? _b : "";
    }
    return (_c = element2.textContent) !== null && _c !== void 0 ? _c : "";
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
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.nonInteractive === void 0 && $$bindings.nonInteractive && nonInteractive !== void 0)
    $$bindings.nonInteractive(nonInteractive);
  if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
    $$bindings.ripple(ripple);
  if ($$props.activated === void 0 && $$bindings.activated && activated !== void 0)
    $$bindings.activated(activated);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.skipRestoreFocus === void 0 && $$bindings.skipRestoreFocus && skipRestoreFocus !== void 0)
    $$bindings.skipRestoreFocus(skipRestoreFocus);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindexProp !== void 0)
    $$bindings.tabindex(tabindexProp);
  if ($$props.inputId === void 0 && $$bindings.inputId && inputId !== void 0)
    $$bindings.inputId(inputId);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.getPrimaryText === void 0 && $$bindings.getPrimaryText && getPrimaryText !== void 0)
    $$bindings.getPrimaryText(getPrimaryText);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    tabindex = isUninitializedValue(tabindexProp) ? !nonInteractive && !disabled && (selected || input) ? 0 : -1 : tabindexProp;
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object_1.assign({
      use: [
        ...nonInteractive ? [] : [
          [
            Ripple,
            {
              ripple: !input,
              unbounded: false,
              color: (activated || selected) && color == null ? "primary" : color,
              disabled,
              addClass,
              removeClass,
              addStyle
            }
          ]
        ],
        forwardEvents,
        ...use
      ]
    }, {
      class: classMap({
        [className]: true,
        "mdc-deprecated-list-item": true,
        "mdc-deprecated-list-item--activated": activated,
        "mdc-deprecated-list-item--selected": selected,
        "mdc-deprecated-list-item--disabled": disabled,
        "mdc-menu-item--selected": !nav && role === "menuitem" && selected,
        "smui-menu-item--non-interactive": nonInteractive,
        ...internalClasses
      })
    }, {
      style: Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" ")
    }, nav && activated ? { "aria-current": "page" } : {}, !nav ? { role } : {}, !nav && role === "option" ? {
      "aria-selected": selected ? "true" : "false"
    } : {}, !nav && (role === "radio" || role === "checkbox") ? {
      "aria-checked": "false"
    } : {}, !nav ? {
      "aria-disabled": disabled ? "true" : "false"
    } : {}, {
      "data-menu-item-skip-restore-focus": skipRestoreFocus || void 0
    }, { tabindex }, { href }, internalAttrs, $$restProps, { this: element }), {
      this: ($$value) => {
        element = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${ripple ? `<span class="${"mdc-deprecated-list-item__ripple"}"></span>` : ``}${slots.default ? slots.default({}) : ``}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var Text = classAdderBuilder({
  class: "mdc-deprecated-list-item__text",
  component: Span
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__primary-text",
  component: Span
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__secondary-text",
  component: Span
});
const Graphic$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element;
  let menuSelectionGroup = getContext("SMUI:list:graphic:menu-selection-group");
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<span${spread([
    {
      class: escape_attribute_value(classMap({
        [className]: true,
        "mdc-deprecated-list-item__graphic": true,
        "mdc-menu__selection-group-icon": menuSelectionGroup
      }))
    },
    escape_object($$restProps)
  ])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>`;
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__meta",
  component: Span
});
classAdderBuilder({
  class: "mdc-deprecated-list-group",
  component: Div
});
classAdderBuilder({
  class: "mdc-deprecated-list-group__subheader",
  component: H3
});
const Item = Item$1;
const Graphic = Graphic$1;
classAdderBuilder({
  class: "mdc-menu__selection-group-icon",
  component: Graphic
});
var Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: 'header.svelte-baocm8.svelte-baocm8{display:flex;position:fixed;width:100%;margin:0px;padding:3px;z-index:1;background-color:black;box-shadow:1px 1px 1px black}.corner.svelte-baocm8.svelte-baocm8{width:3em;height:3em}.corner-two.svelte-baocm8.svelte-baocm8{display:flex;flex-direction:row-reverse !important;width:auto;margin-left:auto;margin-right:5px;justify-content:flex-end !important}.corner-two.svelte-baocm8 a.svelte-baocm8{display:flex;height:100%;align-items:center;padding:0 1em;font-size:0.8rem;transition:color 0.2s linear}.corner-nav{margin-top:3em;width:100%}.corner.svelte-baocm8 a.svelte-baocm8{display:flex;width:100%;height:100%}.corner.svelte-baocm8 img.svelte-baocm8{width:2em;height:2em;object-fit:contain}nav.svelte-baocm8.svelte-baocm8{display:flex}ul.svelte-baocm8.svelte-baocm8{position:relative;padding:0;margin:0;height:3em;display:flex;list-style:none !important;background-size:contain}li.svelte-baocm8.svelte-baocm8{position:relative;height:100%}li.active.svelte-baocm8.svelte-baocm8::before{--size:6px;content:"";width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}@media screen and (max-width: 767px){.nav1.svelte-baocm8.svelte-baocm8{display:none !important}}.nav1.svelte-baocm8 a.svelte-baocm8{display:flex;height:100%;align-items:center;padding:0 1em;font-size:0.75rem;transition:color 0.2s linear}',
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  console.log($session, "Session From Header");
  let username = null;
  let menu;
  if ($session.session.user) {
    username = $session.session.user.username;
    $session.session.user.id;
  }
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<header class="${"svelte-baocm8"}"><div class="${"corner svelte-baocm8"}"><a href="${"/"}" class="${"svelte-baocm8"}"><img src="${"https://api.fateslist.xyz/static/botlisticon.webp"}" alt="${"Fates List Logo"}" class="${"svelte-baocm8"}"></a></div>

	<nav class="${"nav1 svelte-baocm8"}"><ul class="${"svelte-baocm8"}"><li class="${["svelte-baocm8", $page.url.pathname === "/partners" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/partners"}" class="${"svelte-baocm8"}">Partners</a></li>
			<li class="${["svelte-baocm8", $page.url.pathname === "/servers" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/servers"}" class="${"svelte-baocm8"}">Servers</a></li>
			<li sveltekit:prefetch class="${["svelte-baocm8", $page.url.pathname === "/" ? "active" : ""].join(" ").trim()}"><a href="${"/"}" class="${"svelte-baocm8"}">Bots</a></li>
			<li class="${"svelte-baocm8"}"><a href="${"/bot/admin/add"}" class="${"svelte-baocm8"}">Add Bot</a></li>
			<li class="${"svelte-baocm8"}"><a href="${"/frostpaw/add-server"}" sveltekit:prefetch class="${"svelte-baocm8"}">Add Server</a></li></ul></nav>
	<nav class="${"corner-two svelte-baocm8"}"><div><a${add_attribute("href", "#", 0)} class="${"svelte-baocm8"}">${escape(username || "Not logged in")}</a></div>
		${validate_component(Menu, "Menu").$$render($$result, { class: "corner-nav", this: menu }, {
      this: ($$value) => {
        menu = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${validate_component(List, "List").$$render($$result, {}, {}, {
        default: () => `${username ? `${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Logout` })}`
        })}

				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Profile` })}`
        })}` : `${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Login` })}`
        })}`}
				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Servers` })}`
        })}
				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `About` })}`
        })}

				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Add Bot` })}`
        })}
				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Add Server` })}`
        })}
				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `API Docs` })}`
        })}

				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Terms Of Service` })}`
        })}
				${validate_component(Item, "Item").$$render($$result, {}, {}, {
          default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Support` })}`
        })}`
      })}`
    })}</nav>
</header>`;
  } while (!$$settled);
  $$unsubscribe_session();
  $$unsubscribe_page();
  return $$rendered;
});
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '@font-face{font-family:"Lexend Deca";font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/lexenddeca/v13/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48M1ArA.ttf) format("truetype")}html,body{overflow-x:hidden !important;background-color:#1D1E23;margin:0px;padding:0px}h1,h2,h3,h4,h5,h6,p,nav,.fform,a,ol,.tab{overflow:hidden;color:white !important;font-family:"Lexend Deca"}ul,body,html{font-family:"Lexend Deca"}textarea,input{font-size:18px}h1{font-size:35px;margin:0px}.fform-white::placeholder{color:grey !important}.fform::placeholder{color:rgba(255, 255, 255, 0.75)}.fform{transition:transform 0.2s;background:black !important;color:white !important;border:white !important;border-style:solid !important;border-width:thin !important;margin-top:7px !important;margin-bottom:30px !important;margin:auto;max-width:94%;border-radius:4px 4px 4px 4px}.fform-white{color:black !important}.fform-select,.select-pure-fl{transition:transform 0.2s;--background-color:black !important;--color:white !important;--hover-background-color:rgba(100, 100, 100, 0.63) !important;--hover-color:white !important;--selected-background-color:grey !important;--selected-color:white !important}.select-pure-fl:hover{--color:white !important}.fform-white{background:white !important}.fform:hover:not(.fform-select),.fform:focus:not(.fform-select){border-color:grey !important;transform:scale(1.025)}.btn_s{display:inline !important}label{color:white !important;font-weight:bold !important;font-size:16px !important;text-align:left !important;width:94%;max-width:94%}.tip{width:94%;max-width:94%}.tip-blue{background:#259db0 !important}.tip-red{background:#EE4B2B !important}textarea{max-width:94%;min-height:20px !important;height:300px !important;resize:none !important}.profile-card:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0)}.btn{border-radius:4px 4px 4px 4px !important}label{font-size:14px}::selection{background:#ffb7b7 !important}::-moz-selection{background:#ffb7b7 !important}a{color:white !important;opacity:0.63 !important;font-size:20px !important;text-decoration:none !important}@media screen and (min-width: 768px){.index-fl{justify-content:center;text-align:center}.content-mobileonly{display:none !important}}.content-nomobile{display:none !important}@media(min-width: 600px){.content-nomobile{display:block !important}}.select-fl{text-decoration:none !important;background:white !important;padding:8px;border-radius:4px 4px 4px 4px !important}@media screen and (max-width: 768px){.index-fl{justify-content:center;text-align:center}.content-nomobile{display:none !important}}.form{display:inline-block;background-color:white;padding:15px;border-radius:50px 50px 50px 50px !important;text-align:center;justify-content:center}.select_tags,input,.wtype{border-radius:4px 4px 4px 4px !important;padding:10px !important}textarea{border-radius:4px 4px 4px 4px !important;padding:10px !important;height:500px}.highlight{background-color:black;font-weight:bold}.desc-info{background-color:blue}.white-bold{color:white;font-weight:bold}.invite-link{margin-left:6.5%}.hr-is{font-size:20px;border-top-width:1px;border-top-color:#eee;width:90%}.title-is{color:rgba(255, 255, 255, 0.87);margin-left:15px;font-size:32px}.div-is{width:90%;margin:30px 5%}.white{color:white !important}.bold{font-weight:bold}pre{white-space:pre-wrap}.footer{margin-left:3px}pre{color:white !important}#mdiv{height:70px}',
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<link href="${"https://api.fateslist.xyz/static/assets/prod/material-icons.min.css"}" rel="${"stylesheet"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui.css?v=8"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui.css?v=8"}" media="${"(prefers-color-scheme: light)"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui-dark.css?v=8"}" media="${"(prefers-color-scheme: dark)"}" data-svelte="svelte-6nl562"><meta name="${"keywords"}" content="${"discord bot, discord bot list, fateslist, fates list, bot list, discord list, list of bost, discord bots, fateslist bots, fates list"}" data-svelte="svelte-6nl562"><meta http-equiv="${"Content-Type"}" content="${"text/html; charset=utf-8"}" data-svelte="svelte-6nl562">`, ""}



${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<div id="${"mdiv"}"></div>
<main>${slots.default ? slots.default({}) : ``}</main>`;
});
export { _layout as default };
