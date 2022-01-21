var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// .svelte-kit/output/server/chunks/index-36284ca1.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks2) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks2);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function listen(node, event, handler, options3) {
  node.addEventListener(event, handler, options3);
  return () => node.removeEventListener(event, handler, options3);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks2 = component.$$.callbacks[type];
    if (callbacks2) {
      const event = custom_event(type, detail);
      callbacks2.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks2 = component.$$.callbacks[event.type];
  if (callbacks2) {
    callbacks2.slice().forEach((fn) => fn.call(this, event));
  }
}
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css47) => css47.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var current_component, globals, boolean_attributes, invalid_attribute_name_character, escaped, missing_component, on_destroy;
var init_index_36284ca1 = __esm({
  ".svelte-kit/output/server/chunks/index-36284ca1.js"() {
    Promise.resolve();
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    boolean_attributes = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options3) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options3 || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options3) {
      var opt = options3 || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// .svelte-kit/output/server/chunks/stores-d5eb43fc.js
var getStores, page, throw_error, session;
var init_stores_d5eb43fc = __esm({
  ".svelte-kit/output/server/chunks/stores-d5eb43fc.js"() {
    init_index_36284ca1();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    throw_error = (verb) => {
      throw new Error(`Can only ${verb} session store in browser`);
    };
    session = {
      subscribe(fn) {
        const store = getStores().session;
        return store.subscribe(fn);
      },
      set: () => throw_error("set"),
      update: () => throw_error("update")
    };
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t[p] = s2[p];
        }
        return t;
      };
      __rest2 = function(s2, e) {
        var t = {};
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
            t[p] = s2[p];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
              t[p[i]] = s2[p[i]];
          }
        return t;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values2 = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error2) {
          e = { error: error2 };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
          s2 += arguments[i].length;
        for (var r = Array(s2), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve2, reject) {
              v = o[n](v), settle(resolve2, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve2, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve2({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// node_modules/tslib/modules/index.js
var import_tslib, __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet;
var init_modules = __esm({
  "node_modules/tslib/modules/index.js"() {
    import_tslib = __toModule(require_tslib());
    ({
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __metadata,
      __awaiter,
      __generator,
      __exportStar,
      __createBinding,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet
    } = import_tslib.default);
  }
});

// .svelte-kit/output/server/chunks/Ripple-a012c9fe.js
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }
  var el = element;
  while (el) {
    if (matches$1(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
function matches$1(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}
function estimateScrollWidth(element) {
  var htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  var clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  var scrollWidth = clone.scrollWidth;
  document.documentElement.removeChild(clone);
  return scrollWidth;
}
function applyPassive$1(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  return supportsPassiveOption(globalObj) ? { passive: true } : false;
}
function supportsPassiveOption(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  var passiveSupported = false;
  try {
    var options3 = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    var handler = function() {
    };
    globalObj.document.addEventListener("test", handler, options3);
    globalObj.document.removeEventListener("test", handler, options3);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
}
function classMap(classObj) {
  return Object.entries(classObj).filter(([name, value]) => name !== "" && value).map(([name]) => name).join(" ");
}
function forwardEventsBuilder(component) {
  let $on;
  let events2 = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events2.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    if (oldModifierMatch && console) {
      console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ', eventType);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options3 = false;
      const oldModifierMatch = eventType.match(oldModifierRegex);
      const newModifierMatch = eventType.match(newModifierRegex);
      const modifierMatch = oldModifierMatch || newModifierMatch;
      if (eventType.match(/^SMUI:\w+:/)) {
        const newEventTypeParts = eventType.split(":");
        let newEventType = "";
        for (let i = 0; i < newEventTypeParts.length; i++) {
          newEventType += i === newEventTypeParts.length - 1 ? ":" + newEventTypeParts[i] : newEventTypeParts[i].split("-").map((value) => value.slice(0, 1).toUpperCase() + value.slice(1)).join("");
        }
        console.warn(`The event ${eventType.split("$")[0]} has been renamed to ${newEventType.split("$")[0]}.`);
        eventType = newEventType;
      }
      if (modifierMatch) {
        const parts = eventType.split(oldModifierMatch ? ":" : "$");
        eventType = parts[0];
        const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (eventOptions.passive) {
          options3 = options3 || {};
          options3.passive = true;
        }
        if (eventOptions.nonpassive) {
          options3 = options3 || {};
          options3.passive = false;
        }
        if (eventOptions.capture) {
          options3 = options3 || {};
          options3.capture = true;
        }
        if (eventOptions.once) {
          options3 = options3 || {};
          options3.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options3);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events2.length; i++) {
      $on(events2[i][0], events2[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (let entry31 of Object.entries(forwardDestructors)) {
          entry31[1]();
        }
      }
    };
  };
}
function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }
  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;
  if (typeof supportsCssVariables_ === "boolean" && !forceRefresh) {
    return supportsCssVariables_;
  }
  var supportsFunctionPresent = CSS && typeof CSS.supports === "function";
  if (!supportsFunctionPresent) {
    return false;
  }
  var explicitlySupportsCssVars = CSS.supports("--css-vars", "yes");
  var weAreFeatureDetectingSafari10plus = CSS.supports("(--css-vars: yes)") && CSS.supports("color", "#00000000");
  supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }
  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return { x: 0, y: 0 };
  }
  var x = pageOffset.x, y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY;
  if (evt.type === "touchstart") {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }
  return { x: normalizedX, y: normalizedY };
}
function Ripple(node, { ripple = true, surface = false, unbounded = false, disabled = false, color, active, rippleElement, eventTarget, activeTarget, addClass = (className) => node.classList.add(className), removeClass = (className) => node.classList.remove(className), addStyle = (name, value) => node.style.setProperty(name, value), initPromise = Promise.resolve() } = {}) {
  let instance;
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let oldActive = active;
  let oldEventTarget = eventTarget;
  let oldActiveTarget = activeTarget;
  function handleProps() {
    if (surface) {
      addClass("mdc-ripple-surface");
      if (color === "primary") {
        addClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      } else if (color === "secondary") {
        removeClass("smui-ripple-surface--primary");
        addClass("smui-ripple-surface--secondary");
      } else {
        removeClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      }
    } else {
      removeClass("mdc-ripple-surface");
      removeClass("smui-ripple-surface--primary");
      removeClass("smui-ripple-surface--secondary");
    }
    if (instance && oldActive !== active) {
      oldActive = active;
      if (active) {
        instance.activate();
      } else if (active === false) {
        instance.deactivate();
      }
    }
    if (ripple && !instance) {
      instance = new MDCRippleFoundation({
        addClass,
        browserSupportsCssVars: () => supportsCssVariables(window),
        computeBoundingRect: () => (rippleElement || node).getBoundingClientRect(),
        containsEventTarget: (target) => node.contains(target),
        deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
        deregisterInteractionHandler: (evtType, handler) => (eventTarget || node).removeEventListener(evtType, handler, applyPassive()),
        deregisterResizeHandler: (handler) => window.removeEventListener("resize", handler),
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        }),
        isSurfaceActive: () => active == null ? matches(activeTarget || node, ":active") : active,
        isSurfaceDisabled: () => !!disabled,
        isUnbounded: () => !!unbounded,
        registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
        registerInteractionHandler: (evtType, handler) => (eventTarget || node).addEventListener(evtType, handler, applyPassive()),
        registerResizeHandler: (handler) => window.addEventListener("resize", handler),
        removeClass,
        updateCssVariable: addStyle
      });
      initPromise.then(() => {
        if (instance) {
          instance.init();
          instance.setUnbounded(unbounded);
        }
      });
    } else if (instance && !ripple) {
      initPromise.then(() => {
        if (instance) {
          instance.destroy();
          instance = void 0;
        }
      });
    }
    if (instance && (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)) {
      oldEventTarget = eventTarget;
      oldActiveTarget = activeTarget;
      instance.destroy();
      requestAnimationFrame(() => {
        if (instance) {
          instance.init();
          instance.setUnbounded(unbounded);
        }
      });
    }
    if (!ripple && unbounded) {
      addClass("mdc-ripple-upgraded--unbounded");
    }
  }
  handleProps();
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  function layout() {
    if (instance) {
      instance.layout();
    }
  }
  return {
    update(props) {
      ({
        ripple,
        surface,
        unbounded,
        disabled,
        color,
        active,
        rippleElement,
        eventTarget,
        activeTarget,
        addClass,
        removeClass,
        addStyle,
        initPromise
      } = Object.assign({ ripple: true, surface: false, unbounded: false, disabled: false, color: void 0, active: void 0, rippleElement: void 0, eventTarget: void 0, activeTarget: void 0, addClass: (className) => node.classList.add(className), removeClass: (className) => node.classList.remove(className), addStyle: (name, value) => node.style.setProperty(name, value), initPromise: Promise.resolve() }, props));
      handleProps();
    },
    destroy() {
      if (instance) {
        instance.destroy();
        instance = void 0;
        removeClass("mdc-ripple-surface");
        removeClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      }
      if (removeLayoutListener) {
        removeLayoutListener();
      }
    }
  };
}
var MDCFoundation, ponyfill, events, oldModifierRegex, newModifierRegex, Div$1, A$1, Button$1, H3$1, H5$1, H6$1, Li$1, Nav$1, Span$1, Ul$1, A, Button, Div, H3, H5, H6, Li, Nav, Span, Ul, supportsCssVariables_, cssClasses, strings, numbers, ACTIVATION_EVENT_TYPES, POINTER_DEACTIVATION_EVENT_TYPES, activatedTargets, MDCRippleFoundation, applyPassive, matches;
var init_Ripple_a012c9fe = __esm({
  ".svelte-kit/output/server/chunks/Ripple-a012c9fe.js"() {
    init_index_36284ca1();
    init_modules();
    MDCFoundation = function() {
      function MDCFoundation2(adapter) {
        if (adapter === void 0) {
          adapter = {};
        }
        this.adapter = adapter;
      }
      Object.defineProperty(MDCFoundation2, "cssClasses", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "strings", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "numbers", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "defaultAdapter", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      MDCFoundation2.prototype.init = function() {
      };
      MDCFoundation2.prototype.destroy = function() {
      };
      return MDCFoundation2;
    }();
    ponyfill = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      closest,
      matches: matches$1,
      estimateScrollWidth
    });
    events = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      applyPassive: applyPassive$1
    });
    oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    Div$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<div${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
    });
    A$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "href", "getElement"]);
      let { use: use2 = [] } = $$props;
      let { href = "javascript:void(0);" } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<a${spread([{ href: escape_attribute_value(href) }, escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</a>`;
    });
    Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<button${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</button>`;
    });
    H3$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<h3${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</h3>`;
    });
    H5$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<h5${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</h5>`;
    });
    H6$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<h6${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</h6>`;
    });
    Li$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<li${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</li>`;
    });
    Nav$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<nav${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</nav>`;
    });
    Span$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<span${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>`;
    });
    Ul$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "getElement"]);
      let { use: use2 = [] } = $$props;
      forwardEventsBuilder(get_current_component());
      let element;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      return `<ul${spread([escape_object($$restProps)])}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</ul>`;
    });
    A = A$1;
    Button = Button$1;
    Div = Div$1;
    H3 = H3$1;
    H5 = H5$1;
    H6 = H6$1;
    Li = Li$1;
    Nav = Nav$1;
    Span = Span$1;
    Ul = Ul$1;
    cssClasses = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded"
    };
    strings = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top"
    };
    numbers = {
      DEACTIVATION_TIMEOUT_MS: 225,
      FG_DEACTIVATION_MS: 150,
      INITIAL_ORIGIN_SCALE: 0.6,
      PADDING: 10,
      TAP_DELAY_MS: 300
    };
    ACTIVATION_EVENT_TYPES = [
      "touchstart",
      "pointerdown",
      "mousedown",
      "keydown"
    ];
    POINTER_DEACTIVATION_EVENT_TYPES = [
      "touchend",
      "pointerup",
      "mouseup",
      "contextmenu"
    ];
    activatedTargets = [];
    MDCRippleFoundation = function(_super) {
      __extends(MDCRippleFoundation2, _super);
      function MDCRippleFoundation2(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation2.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded = false;
        _this.activationTimer = 0;
        _this.fgDeactivationRemovalTimer = 0;
        _this.fgScale = "0";
        _this.frame = { width: 0, height: 0 };
        _this.initialSize = 0;
        _this.layoutFrame = 0;
        _this.maxRadius = 0;
        _this.unboundedCoords = { left: 0, top: 0 };
        _this.activationState = _this.defaultActivationState();
        _this.activationTimerCallback = function() {
          _this.activationAnimationHasEnded = true;
          _this.runDeactivationUXLogicIfReady();
        };
        _this.activateHandler = function(e) {
          _this.activateImpl(e);
        };
        _this.deactivateHandler = function() {
          _this.deactivateImpl();
        };
        _this.focusHandler = function() {
          _this.handleFocus();
        };
        _this.blurHandler = function() {
          _this.handleBlur();
        };
        _this.resizeHandler = function() {
          _this.layout();
        };
        return _this;
      }
      Object.defineProperty(MDCRippleFoundation2, "cssClasses", {
        get: function() {
          return cssClasses;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "strings", {
        get: function() {
          return strings;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "numbers", {
        get: function() {
          return numbers;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "defaultAdapter", {
        get: function() {
          return {
            addClass: function() {
              return void 0;
            },
            browserSupportsCssVars: function() {
              return true;
            },
            computeBoundingRect: function() {
              return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
            },
            containsEventTarget: function() {
              return true;
            },
            deregisterDocumentInteractionHandler: function() {
              return void 0;
            },
            deregisterInteractionHandler: function() {
              return void 0;
            },
            deregisterResizeHandler: function() {
              return void 0;
            },
            getWindowPageOffset: function() {
              return { x: 0, y: 0 };
            },
            isSurfaceActive: function() {
              return true;
            },
            isSurfaceDisabled: function() {
              return true;
            },
            isUnbounded: function() {
              return true;
            },
            registerDocumentInteractionHandler: function() {
              return void 0;
            },
            registerInteractionHandler: function() {
              return void 0;
            },
            registerResizeHandler: function() {
              return void 0;
            },
            removeClass: function() {
              return void 0;
            },
            updateCssVariable: function() {
              return void 0;
            }
          };
        },
        enumerable: false,
        configurable: true
      });
      MDCRippleFoundation2.prototype.init = function() {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple();
        this.registerRootHandlers(supportsPressRipple);
        if (supportsPressRipple) {
          var _a = MDCRippleFoundation2.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
          requestAnimationFrame(function() {
            _this.adapter.addClass(ROOT_1);
            if (_this.adapter.isUnbounded()) {
              _this.adapter.addClass(UNBOUNDED_1);
              _this.layoutInternal();
            }
          });
        }
      };
      MDCRippleFoundation2.prototype.destroy = function() {
        var _this = this;
        if (this.supportsPressRipple()) {
          if (this.activationTimer) {
            clearTimeout(this.activationTimer);
            this.activationTimer = 0;
            this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_ACTIVATION);
          }
          if (this.fgDeactivationRemovalTimer) {
            clearTimeout(this.fgDeactivationRemovalTimer);
            this.fgDeactivationRemovalTimer = 0;
            this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_DEACTIVATION);
          }
          var _a = MDCRippleFoundation2.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
          requestAnimationFrame(function() {
            _this.adapter.removeClass(ROOT_2);
            _this.adapter.removeClass(UNBOUNDED_2);
            _this.removeCssVars();
          });
        }
        this.deregisterRootHandlers();
        this.deregisterDeactivationHandlers();
      };
      MDCRippleFoundation2.prototype.activate = function(evt) {
        this.activateImpl(evt);
      };
      MDCRippleFoundation2.prototype.deactivate = function() {
        this.deactivateImpl();
      };
      MDCRippleFoundation2.prototype.layout = function() {
        var _this = this;
        if (this.layoutFrame) {
          cancelAnimationFrame(this.layoutFrame);
        }
        this.layoutFrame = requestAnimationFrame(function() {
          _this.layoutInternal();
          _this.layoutFrame = 0;
        });
      };
      MDCRippleFoundation2.prototype.setUnbounded = function(unbounded) {
        var UNBOUNDED = MDCRippleFoundation2.cssClasses.UNBOUNDED;
        if (unbounded) {
          this.adapter.addClass(UNBOUNDED);
        } else {
          this.adapter.removeClass(UNBOUNDED);
        }
      };
      MDCRippleFoundation2.prototype.handleFocus = function() {
        var _this = this;
        requestAnimationFrame(function() {
          return _this.adapter.addClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
        });
      };
      MDCRippleFoundation2.prototype.handleBlur = function() {
        var _this = this;
        requestAnimationFrame(function() {
          return _this.adapter.removeClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
        });
      };
      MDCRippleFoundation2.prototype.supportsPressRipple = function() {
        return this.adapter.browserSupportsCssVars();
      };
      MDCRippleFoundation2.prototype.defaultActivationState = function() {
        return {
          activationEvent: void 0,
          hasDeactivationUXRun: false,
          isActivated: false,
          isProgrammatic: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false
        };
      };
      MDCRippleFoundation2.prototype.registerRootHandlers = function(supportsPressRipple) {
        var e_1, _a;
        if (supportsPressRipple) {
          try {
            for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
              var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
              this.adapter.registerInteractionHandler(evtType, this.activateHandler);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return))
                _a.call(ACTIVATION_EVENT_TYPES_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          if (this.adapter.isUnbounded()) {
            this.adapter.registerResizeHandler(this.resizeHandler);
          }
        }
        this.adapter.registerInteractionHandler("focus", this.focusHandler);
        this.adapter.registerInteractionHandler("blur", this.blurHandler);
      };
      MDCRippleFoundation2.prototype.registerDeactivationHandlers = function(evt) {
        var e_2, _a;
        if (evt.type === "keydown") {
          this.adapter.registerInteractionHandler("keyup", this.deactivateHandler);
        } else {
          try {
            for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
              var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
              this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return))
                _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      };
      MDCRippleFoundation2.prototype.deregisterRootHandlers = function() {
        var e_3, _a;
        try {
          for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
            var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
            this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return))
              _a.call(ACTIVATION_EVENT_TYPES_2);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
        this.adapter.deregisterInteractionHandler("focus", this.focusHandler);
        this.adapter.deregisterInteractionHandler("blur", this.blurHandler);
        if (this.adapter.isUnbounded()) {
          this.adapter.deregisterResizeHandler(this.resizeHandler);
        }
      };
      MDCRippleFoundation2.prototype.deregisterDeactivationHandlers = function() {
        var e_4, _a;
        this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler);
        try {
          for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
            var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
            this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return))
              _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
          } finally {
            if (e_4)
              throw e_4.error;
          }
        }
      };
      MDCRippleFoundation2.prototype.removeCssVars = function() {
        var _this = this;
        var rippleStrings = MDCRippleFoundation2.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function(key) {
          if (key.indexOf("VAR_") === 0) {
            _this.adapter.updateCssVariable(rippleStrings[key], null);
          }
        });
      };
      MDCRippleFoundation2.prototype.activateImpl = function(evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) {
          return;
        }
        var activationState = this.activationState;
        if (activationState.isActivated) {
          return;
        }
        var previousActivationEvent = this.previousActivationEvent;
        var isSameInteraction = previousActivationEvent && evt !== void 0 && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
          return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === void 0;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== void 0 && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
        var hasActivatedChild = evt !== void 0 && activatedTargets.length > 0 && activatedTargets.some(function(target) {
          return _this.adapter.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          this.resetActivationState();
          return;
        }
        if (evt !== void 0) {
          activatedTargets.push(evt.target);
          this.registerDeactivationHandlers(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
        if (activationState.wasElementMadeActive) {
          this.animateActivation();
        }
        requestAnimationFrame(function() {
          activatedTargets = [];
          if (!activationState.wasElementMadeActive && evt !== void 0 && (evt.key === " " || evt.keyCode === 32)) {
            activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
            if (activationState.wasElementMadeActive) {
              _this.animateActivation();
            }
          }
          if (!activationState.wasElementMadeActive) {
            _this.activationState = _this.defaultActivationState();
          }
        });
      };
      MDCRippleFoundation2.prototype.checkElementMadeActive = function(evt) {
        return evt !== void 0 && evt.type === "keydown" ? this.adapter.isSurfaceActive() : true;
      };
      MDCRippleFoundation2.prototype.animateActivation = function() {
        var _this = this;
        var _a = MDCRippleFoundation2.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation2.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation2.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var translateStart = "";
        var translateEnd = "";
        if (!this.adapter.isUnbounded()) {
          var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
          translateStart = startPoint.x + "px, " + startPoint.y + "px";
          translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        clearTimeout(this.activationTimer);
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.rmBoundedActivationClasses();
        this.adapter.removeClass(FG_DEACTIVATION);
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer = setTimeout(function() {
          _this.activationTimerCallback();
        }, DEACTIVATION_TIMEOUT_MS);
      };
      MDCRippleFoundation2.prototype.getFgTranslationCoordinates = function() {
        var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame.width / 2,
            y: this.frame.height / 2
          };
        }
        startPoint = {
          x: startPoint.x - this.initialSize / 2,
          y: startPoint.y - this.initialSize / 2
        };
        var endPoint = {
          x: this.frame.width / 2 - this.initialSize / 2,
          y: this.frame.height / 2 - this.initialSize / 2
        };
        return { startPoint, endPoint };
      };
      MDCRippleFoundation2.prototype.runDeactivationUXLogicIfReady = function() {
        var _this = this;
        var FG_DEACTIVATION = MDCRippleFoundation2.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded) {
          this.rmBoundedActivationClasses();
          this.adapter.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer = setTimeout(function() {
            _this.adapter.removeClass(FG_DEACTIVATION);
          }, numbers.FG_DEACTIVATION_MS);
        }
      };
      MDCRippleFoundation2.prototype.rmBoundedActivationClasses = function() {
        var FG_ACTIVATION = MDCRippleFoundation2.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded = false;
        this.adapter.computeBoundingRect();
      };
      MDCRippleFoundation2.prototype.resetActivationState = function() {
        var _this = this;
        this.previousActivationEvent = this.activationState.activationEvent;
        this.activationState = this.defaultActivationState();
        setTimeout(function() {
          return _this.previousActivationEvent = void 0;
        }, MDCRippleFoundation2.numbers.TAP_DELAY_MS);
      };
      MDCRippleFoundation2.prototype.deactivateImpl = function() {
        var _this = this;
        var activationState = this.activationState;
        if (!activationState.isActivated) {
          return;
        }
        var state = __assign({}, activationState);
        if (activationState.isProgrammatic) {
          requestAnimationFrame(function() {
            _this.animateDeactivation(state);
          });
          this.resetActivationState();
        } else {
          this.deregisterDeactivationHandlers();
          requestAnimationFrame(function() {
            _this.activationState.hasDeactivationUXRun = true;
            _this.animateDeactivation(state);
            _this.resetActivationState();
          });
        }
      };
      MDCRippleFoundation2.prototype.animateDeactivation = function(_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady();
        }
      };
      MDCRippleFoundation2.prototype.layoutInternal = function() {
        var _this = this;
        this.frame = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame.height, this.frame.width);
        var getBoundedRadius = function() {
          var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
          return hypotenuse + MDCRippleFoundation2.numbers.PADDING;
        };
        this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        var initialSize = Math.floor(maxDim * MDCRippleFoundation2.numbers.INITIAL_ORIGIN_SCALE);
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
          this.initialSize = initialSize - 1;
        } else {
          this.initialSize = initialSize;
        }
        this.fgScale = "" + this.maxRadius / this.initialSize;
        this.updateLayoutCssVars();
      };
      MDCRippleFoundation2.prototype.updateLayoutCssVars = function() {
        var _a = MDCRippleFoundation2.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
        if (this.adapter.isUnbounded()) {
          this.unboundedCoords = {
            left: Math.round(this.frame.width / 2 - this.initialSize / 2),
            top: Math.round(this.frame.height / 2 - this.initialSize / 2)
          };
          this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
          this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
        }
      };
      return MDCRippleFoundation2;
    }(MDCFoundation);
    ({ applyPassive } = events);
    ({ matches } = ponyfill);
  }
});

// .svelte-kit/output/server/chunks/classAdderBuilder-d630724f.js
function dispatch(element, eventType, detail, eventInit = { bubbles: true }, duplicateEventForMDC = false) {
  if (typeof Event !== "undefined" && element) {
    const event = new CustomEvent(eventType, Object.assign(Object.assign({}, eventInit), { detail }));
    element === null || element === void 0 ? void 0 : element.dispatchEvent(event);
    if (duplicateEventForMDC && eventType.startsWith("SMUI")) {
      const duplicateEvent = new CustomEvent(eventType.replace(/^SMUI/g, () => "MDC"), Object.assign(Object.assign({}, eventInit), { detail }));
      element === null || element === void 0 ? void 0 : element.dispatchEvent(duplicateEvent);
      if (duplicateEvent.defaultPrevented) {
        event.preventDefault();
      }
    }
    return event;
  }
}
function classAdderBuilder(props) {
  return new Proxy(ClassAdder, {
    construct: function(target, args) {
      Object.assign(internals, defaults, props);
      return new target(...args);
    },
    get: function(target, prop) {
      Object.assign(internals, defaults, props);
      return target[prop];
    }
  });
}
var Object_1, internals, ClassAdder, defaults;
var init_classAdderBuilder_d630724f = __esm({
  ".svelte-kit/output/server/chunks/classAdderBuilder-d630724f.js"() {
    init_index_36284ca1();
    init_Ripple_a012c9fe();
    ({ Object: Object_1 } = globals);
    internals = {
      component: Div$1,
      class: "",
      classMap: {},
      contexts: {},
      props: {}
    };
    ClassAdder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "class", "component", "getElement"]);
      let { use: use2 = [] } = $$props;
      let { class: className = "" } = $$props;
      let element;
      const smuiClass = internals.class;
      const smuiClassMap = {};
      const smuiClassUnsubscribes = [];
      const contexts = internals.contexts;
      const props = internals.props;
      let { component = internals.component } = $$props;
      Object.entries(internals.classMap).forEach(([name, context]) => {
        const store = getContext(context);
        if (store && "subscribe" in store) {
          smuiClassUnsubscribes.push(store.subscribe((value) => {
            smuiClassMap[name] = value;
          }));
        }
      });
      const forwardEvents = forwardEventsBuilder(get_current_component());
      for (let context in contexts) {
        if (contexts.hasOwnProperty(context)) {
          setContext(context, contexts[context]);
        }
      }
      onDestroy(() => {
        for (const unsubscribe of smuiClassUnsubscribes) {
          unsubscribe();
        }
      });
      function getElement() {
        return element.getElement();
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.component === void 0 && $$bindings.component && component !== void 0)
        $$bindings.component(component);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object_1.assign({ use: [forwardEvents, ...use2] }, {
          class: classMap({
            [className]: true,
            [smuiClass]: true,
            ...smuiClassMap
          })
        }, props, $$restProps, { this: element }), {
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
    defaults = Object.assign({}, internals);
  }
});

// node_modules/lozad/dist/lozad.min.js
var require_lozad_min = __commonJS({
  "node_modules/lozad/dist/lozad.min.js"(exports, module) {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : t.lozad = e();
    }(exports, function() {
      "use strict";
      var g = typeof document != "undefined" && document.documentMode, f = { rootMargin: "0px", threshold: 0, load: function(t) {
        if (t.nodeName.toLowerCase() === "picture") {
          var e = t.querySelector("img"), r = false;
          e === null && (e = document.createElement("img"), r = true), g && t.getAttribute("data-iesrc") && (e.src = t.getAttribute("data-iesrc")), t.getAttribute("data-alt") && (e.alt = t.getAttribute("data-alt")), r && t.append(e);
        }
        if (t.nodeName.toLowerCase() === "video" && !t.getAttribute("data-src") && t.children) {
          for (var a = t.children, o = void 0, i = 0; i <= a.length - 1; i++)
            (o = a[i].getAttribute("data-src")) && (a[i].src = o);
          t.load();
        }
        t.getAttribute("data-poster") && (t.poster = t.getAttribute("data-poster")), t.getAttribute("data-src") && (t.src = t.getAttribute("data-src")), t.getAttribute("data-srcset") && t.setAttribute("srcset", t.getAttribute("data-srcset"));
        var n = ",";
        if (t.getAttribute("data-background-delimiter") && (n = t.getAttribute("data-background-delimiter")), t.getAttribute("data-background-image"))
          t.style.backgroundImage = "url('" + t.getAttribute("data-background-image").split(n).join("'),url('") + "')";
        else if (t.getAttribute("data-background-image-set")) {
          var d = t.getAttribute("data-background-image-set").split(n), u = d[0].substr(0, d[0].indexOf(" ")) || d[0];
          u = u.indexOf("url(") === -1 ? "url(" + u + ")" : u, d.length === 1 ? t.style.backgroundImage = u : t.setAttribute("style", (t.getAttribute("style") || "") + "background-image: " + u + "; background-image: -webkit-image-set(" + d + "); background-image: image-set(" + d + ")");
        }
        t.getAttribute("data-toggle-class") && t.classList.toggle(t.getAttribute("data-toggle-class"));
      }, loaded: function() {
      } };
      function A2(t) {
        t.setAttribute("data-loaded", true);
      }
      var m = function(t) {
        return t.getAttribute("data-loaded") === "true";
      }, v = function(t) {
        var e = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : document;
        return t instanceof Element ? [t] : t instanceof NodeList ? t : e.querySelectorAll(t);
      };
      return function() {
        var r, a, o = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : ".lozad", t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}, e = Object.assign({}, f, t), i = e.root, n = e.rootMargin, d = e.threshold, u = e.load, g2 = e.loaded, s2 = void 0;
        typeof window != "undefined" && window.IntersectionObserver && (s2 = new IntersectionObserver((r = u, a = g2, function(t2, e2) {
          t2.forEach(function(t3) {
            (0 < t3.intersectionRatio || t3.isIntersecting) && (e2.unobserve(t3.target), m(t3.target) || (r(t3.target), A2(t3.target), a(t3.target)));
          });
        }), { root: i, rootMargin: n, threshold: d }));
        for (var c, l = v(o, i), b = 0; b < l.length; b++)
          (c = l[b]).getAttribute("data-placeholder-background") && (c.style.background = c.getAttribute("data-placeholder-background"));
        return { observe: function() {
          for (var t2 = v(o, i), e2 = 0; e2 < t2.length; e2++)
            m(t2[e2]) || (s2 ? s2.observe(t2[e2]) : (u(t2[e2]), A2(t2[e2]), g2(t2[e2])));
        }, triggerLoad: function(t2) {
          m(t2) || (u(t2), A2(t2), g2(t2));
        }, observer: s2 };
      };
    });
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var import_lozad, MenuSurface, Menu, List, Object_12, counter, Item$1, Text, Graphic$1, Item, Graphic, css$1, Header, css2, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_36284ca1();
    init_stores_d5eb43fc();
    init_Ripple_a012c9fe();
    init_classAdderBuilder_d630724f();
    import_lozad = __toModule(require_lozad_min());
    init_modules();
    MenuSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
    Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
        usePass = [forwardEvents, ...use2];
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
    List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
        $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({ use: [forwardEvents, ...use2] }, {
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
    ({ Object: Object_12 } = globals);
    counter = 0;
    Item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
        $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object_12.assign({
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
            ...use2
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
    Text = classAdderBuilder({
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
    Graphic$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "class", "getElement"]);
      forwardEventsBuilder(get_current_component());
      let { use: use2 = [] } = $$props;
      let { class: className = "" } = $$props;
      let element;
      let menuSelectionGroup = getContext("SMUI:list:graphic:menu-selection-group");
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
    Item = Item$1;
    Graphic = Graphic$1;
    classAdderBuilder({
      class: "mdc-menu__selection-group-icon",
      component: Graphic
    });
    css$1 = {
      code: 'header.svelte-baocm8.svelte-baocm8{display:flex;position:fixed;width:100%;margin:0px;padding:3px;z-index:1;background-color:black;box-shadow:1px 1px 1px black}.corner.svelte-baocm8.svelte-baocm8{width:3em;height:3em}.corner-two.svelte-baocm8.svelte-baocm8{display:flex;flex-direction:row-reverse !important;width:auto;margin-left:auto;margin-right:5px;justify-content:flex-end !important}.corner-two.svelte-baocm8 a.svelte-baocm8{display:flex;height:100%;align-items:center;padding:0 1em;font-size:0.8rem;transition:color 0.2s linear}.corner-nav{margin-top:3em;width:100%}.corner.svelte-baocm8 a.svelte-baocm8{display:flex;width:100%;height:100%}.corner.svelte-baocm8 img.svelte-baocm8{width:2em;height:2em;object-fit:contain}nav.svelte-baocm8.svelte-baocm8{display:flex}ul.svelte-baocm8.svelte-baocm8{position:relative;padding:0;margin:0;height:3em;display:flex;list-style:none !important;background-size:contain}li.svelte-baocm8.svelte-baocm8{position:relative;height:100%}li.active.svelte-baocm8.svelte-baocm8::before{--size:6px;content:"";width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}@media screen and (max-width: 767px){.nav1.svelte-baocm8.svelte-baocm8{display:none !important}}.nav1.svelte-baocm8 a.svelte-baocm8{display:flex;height:100%;align-items:center;padding:0 1em;font-size:0.75rem;transition:color 0.2s linear}',
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
              default: () => `${validate_component(Text, "Text").$$render($$result, {}, {}, { default: () => `Stats` })}`
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
    css2 = {
      code: '@font-face{font-family:"Lexend Deca";font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/lexenddeca/v13/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48M1ArA.ttf) format("truetype")}html,body{overflow-x:hidden !important;background-color:#1D1E23;margin:0px;padding:0px}h1,h2,h3,h4,h5,h6,p,nav,.fform,a,ol,.tab{overflow:hidden;color:white !important;font-family:"Lexend Deca"}ul,body,html{font-family:"Lexend Deca"}textarea,input{font-size:18px}h1{font-size:35px;margin:0px}.fform-white::placeholder{color:grey !important}.fform::placeholder{color:rgba(255, 255, 255, 0.75)}.fform{transition:transform 0.2s;background:black !important;color:white !important;border:white !important;border-style:solid !important;border-width:thin !important;margin-top:7px !important;margin-bottom:30px !important;margin:auto;max-width:94%;border-radius:4px 4px 4px 4px}.fform-white{color:black !important}.fform-select,.select-pure-fl{transition:transform 0.2s;--background-color:black !important;--color:white !important;--hover-background-color:rgba(100, 100, 100, 0.63) !important;--hover-color:white !important;--selected-background-color:grey !important;--selected-color:white !important}.select-pure-fl:hover{--color:white !important}.fform-white{background:white !important}.fform:hover:not(.fform-select),.fform:focus:not(.fform-select){border-color:grey !important;transform:scale(1.025)}.btn_s{display:inline !important}label{color:white !important;font-weight:bold !important;font-size:16px !important;text-align:left !important;width:94%;max-width:94%}.tip{width:94%;max-width:94%}.tip-blue{background:#259db0 !important}.tip-red{background:#EE4B2B !important}textarea{max-width:94%;min-height:20px !important;height:300px !important;resize:none !important}.profile-card:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0)}.btn{border-radius:4px 4px 4px 4px !important}label{font-size:14px}::selection{background:#ffb7b7 !important}::-moz-selection{background:#ffb7b7 !important}a{color:white !important;opacity:0.63 !important;font-size:20px !important;text-decoration:none !important}@media screen and (min-width: 768px){.index-fl{justify-content:center;text-align:center}.content-mobileonly{display:none !important}}.content-nomobile{display:none !important}@media(min-width: 600px){.content-nomobile{display:block !important}}.select-fl{text-decoration:none !important;background:white !important;padding:8px;border-radius:4px 4px 4px 4px !important}@media screen and (max-width: 768px){.index-fl{justify-content:center;text-align:center}.content-nomobile{display:none !important}}.form{display:inline-block;background-color:white;padding:15px;border-radius:50px 50px 50px 50px !important;text-align:center;justify-content:center}.select_tags,input,.wtype{border-radius:4px 4px 4px 4px !important;padding:10px !important}textarea{border-radius:4px 4px 4px 4px !important;padding:10px !important;height:500px}.highlight{background-color:black;font-weight:bold}.desc-info{background-color:blue}.white-bold{color:white;font-weight:bold}.invite-link{margin-left:6.5%}.hr-is{font-size:20px;border-top-width:1px;border-top-color:#eee;width:90%}.title-is{color:rgba(255, 255, 255, 0.87);margin-left:15px;font-size:32px}.div-is{width:90%;margin:30px 5%}.white{color:white !important}.bold{font-weight:bold}pre{white-space:pre-wrap}.footer{margin-left:3px}pre{color:white !important}#mdiv{height:70px}',
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `${$$result.head += `<link href="${"https://api.fateslist.xyz/static/assets/prod/material-icons.min.css"}" rel="${"stylesheet"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui.css?v=8"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui.css?v=8"}" media="${"(prefers-color-scheme: light)"}" data-svelte="svelte-6nl562"><link rel="${"stylesheet"}" href="${"https://api.fateslist.xyz/static/smui-dark.css?v=8"}" media="${"(prefers-color-scheme: dark)"}" data-svelte="svelte-6nl562"><meta name="${"keywords"}" content="${"discord bot, discord bot list, fateslist, fates list, bot list, discord list, list of bost, discord bots, fateslist bots, fates list"}" data-svelte="svelte-6nl562"><meta http-equiv="${"Content-Type"}" content="${"text/html; charset=utf-8"}" data-svelte="svelte-6nl562">`, ""}



${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<div id="${"mdiv"}"></div>
<main>${slots.default ? slots.default({}) : ``}</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css3,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css3;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-53c24e5b.js";
    js = ["pages/__layout.svelte-53c24e5b.js", "chunks/vendor-22677977.js", "chunks/stores-56fb81e3.js", "chunks/request-2d5483df.js"];
    css3 = ["assets/pages/__layout.svelte-8c4b10b0.css"];
  }
});

// .svelte-kit/output/server/entries/pages/__error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => _error,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { status, error: error2.message } };
}
var _error;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__error.svelte.js"() {
    init_index_36284ca1();
    _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1 style="${"text-align: center"}">${escape(status)}</h1>
<h2>${escape(error2)}</h2>
<p>Please visit our <a href="${"https://fateslist.xyz/server/789934742128558080/invite"}">support server</a> if you have any queries or concerns or just for fun!</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css4,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css4;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "pages/__error.svelte-f660afac.js";
    js2 = ["pages/__error.svelte-f660afac.js", "chunks/vendor-22677977.js"];
    css4 = [];
  }
});

// .svelte-kit/output/server/chunks/request-b58a31ec.js
async function fetchFates(url, auth, fetch2) {
  let headers = { "Frostpaw": "0.1" };
  if (auth) {
    headers["Frostpaw-Auth"] = auth;
  }
  return await fetch2("https://api.fateslist.xyz" + url, { headers });
}
async function roll(type) {
  const url = `https://api.fateslist.xyz/api/${type}s/0/random`;
  const res = await fetch(url);
  const roll2 = await res.json();
  console.log(roll2);
  return roll2;
}
var init_request_b58a31ec = __esm({
  ".svelte-kit/output/server/chunks/request-b58a31ec.js"() {
  }
});

// .svelte-kit/output/server/chunks/Icon-8a17b723.js
function fullIcon(data) {
  return { ...iconDefaults, ...data };
}
function mergeIconData(icon, alias) {
  const result = { ...icon };
  for (const key in iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}
function getIconData$1(data, name, full = false) {
  function getIcon(name2, iteration) {
    var _a, _b, _c, _d;
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    if (((_a = data.aliases) == null ? void 0 : _a[name2]) !== void 0) {
      const item = (_b = data.aliases) == null ? void 0 : _b[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    if (iteration === 0 && ((_c = data.chars) == null ? void 0 : _c[name2]) !== void 0) {
      return getIcon((_d = data.chars) == null ? void 0 : _d[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}
function validateIconProps(item, fix) {
  for (const key in item) {
    const attr = key;
    const value = item[attr];
    const type = typeof value;
    if (type === "undefined") {
      delete item[attr];
      continue;
    }
    switch (key) {
      case "body":
      case "parent":
        if (type !== "string") {
          return key;
        }
        break;
      case "hFlip":
      case "vFlip":
      case "hidden":
        if (type !== "boolean") {
          if (fix) {
            delete item[attr];
          } else {
            return key;
          }
        }
        break;
      case "width":
      case "height":
      case "left":
      case "top":
      case "rotate":
      case "inlineHeight":
      case "inlineTop":
      case "verticalAlign":
        if (type !== "number") {
          if (fix) {
            delete item[attr];
          } else {
            return key;
          }
        }
        break;
      default:
        if (type === "object") {
          if (fix) {
            delete item[attr];
          } else {
            return key;
          }
        }
    }
  }
  return null;
}
function validateIconSet(obj, options3) {
  const fix = !!(options3 == null ? void 0 : options3.fix);
  if (typeof obj !== "object" || obj === null || typeof obj.icons !== "object" || !obj.icons) {
    throw new Error("Bad icon set");
  }
  const data = obj;
  if (typeof (options3 == null ? void 0 : options3.prefix) === "string") {
    data.prefix = options3.prefix;
  } else if (typeof data.prefix !== "string" || !data.prefix.match(matchName)) {
    throw new Error("Invalid prefix");
  }
  if (typeof (options3 == null ? void 0 : options3.provider) === "string") {
    data.provider = options3.provider;
  } else if (data.provider !== void 0) {
    const value = data.provider;
    if (typeof value !== "string" || value !== "" && !value.match(matchName)) {
      if (fix) {
        delete data.provider;
      } else {
        throw new Error("Invalid provider");
      }
    }
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    if (!name.match(matchName)) {
      if (fix) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid icon name: "${name}"`);
    }
    const item = icons[name];
    if (typeof item !== "object" || item === null || typeof item.body !== "string") {
      if (fix) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid icon: "${name}"`);
    }
    const key = typeof item.parent === "string" ? "parent" : validateIconProps(item, fix);
    if (key !== null) {
      if (fix) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid property "${key}" in icon "${name}"`);
    }
  });
  if (!Object.keys(data.icons).length) {
    throw new Error("Icon set is empty");
  }
  if (data.aliases !== void 0) {
    if (typeof data.aliases !== "object" || data.aliases === null) {
      if (fix) {
        delete data.aliases;
      } else {
        throw new Error("Invalid aliases list");
      }
    }
  }
  if (typeof data.aliases === "object") {
    let validateAlias = function(name, iteration) {
      if (validatedAliases.has(name)) {
        return !failedAliases.has(name);
      }
      const item = aliases[name];
      if (iteration > 5 || typeof item !== "object" || item === null || typeof item.parent !== "string" || !name.match(matchName)) {
        if (fix) {
          delete aliases[name];
          failedAliases.add(name);
          return false;
        }
        throw new Error(`Invalid icon alias: "${name}"`);
      }
      const parent = item.parent;
      if (data.icons[parent] === void 0) {
        if (aliases[parent] === void 0 || !validateAlias(parent, iteration + 1)) {
          if (fix) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(`Missing parent icon for alias "${name}`);
        }
      }
      if (fix && item.body !== void 0) {
        delete item.body;
      }
      const key = item.body !== void 0 ? "body" : validateIconProps(item, fix);
      if (key !== null) {
        if (fix) {
          delete aliases[name];
          failedAliases.add(name);
          return false;
        }
        throw new Error(`Invalid property "${key}" in alias "${name}"`);
      }
      validatedAliases.add(name);
      return true;
    };
    const aliases = data.aliases;
    const validatedAliases = new Set();
    const failedAliases = new Set();
    Object.keys(aliases).forEach((name) => {
      validateAlias(name, 0);
    });
    if (fix && !Object.keys(data.aliases).length) {
      delete data.aliases;
    }
  }
  Object.keys(iconDefaults).forEach((prop) => {
    const expectedType = typeof iconDefaults[prop];
    const actualType = typeof data[prop];
    if (actualType !== "undefined" && actualType !== expectedType) {
      throw new Error(`Invalid value type for "${prop}"`);
    }
  });
  if (data.chars !== void 0) {
    if (typeof data.chars !== "object" || data.chars === null) {
      if (fix) {
        delete data.chars;
      } else {
        throw new Error("Invalid characters map");
      }
    }
  }
  if (typeof data.chars === "object") {
    const chars2 = data.chars;
    Object.keys(chars2).forEach((char) => {
      var _a;
      if (!char.match(matchChar) || typeof chars2[char] !== "string") {
        if (fix) {
          delete chars2[char];
          return;
        }
        throw new Error(`Invalid character "${char}"`);
      }
      const target = chars2[char];
      if (data.icons[target] === void 0 && ((_a = data.aliases) == null ? void 0 : _a[target]) === void 0) {
        if (fix) {
          delete chars2[char];
          return;
        }
        throw new Error(`Character "${char}" points to missing icon "${target}"`);
      }
    });
    if (fix && !Object.keys(data.chars).length) {
      delete data.chars;
    }
  }
  return data;
}
function isVariation(item) {
  for (const key in iconDefaults) {
    if (item[key] !== void 0) {
      return true;
    }
  }
  return false;
}
function parseIconSet(data, callback, options3) {
  options3 = options3 || {};
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  const validate = options3.validate;
  if (validate !== false) {
    try {
      validateIconSet(data, typeof validate === "object" ? validate : { fix: true });
    } catch (err) {
      return names;
    }
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    const iconData = getIconData$1(data, name, true);
    if (iconData) {
      callback(name, iconData);
      names.push(name);
    }
  });
  const parseAliases = options3.aliases || "all";
  if (parseAliases !== "none" && typeof data.aliases === "object") {
    const aliases = data.aliases;
    Object.keys(aliases).forEach((name) => {
      if (parseAliases === "variations" && isVariation(aliases[name])) {
        return;
      }
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
  }
  return names;
}
function newStorage(provider, prefix2) {
  return {
    provider,
    prefix: prefix2,
    icons: Object.create(null),
    missing: Object.create(null)
  };
}
function getStorage(provider, prefix2) {
  if (storage$1[provider] === void 0) {
    storage$1[provider] = Object.create(null);
  }
  const providerStorage = storage$1[provider];
  if (providerStorage[prefix2] === void 0) {
    providerStorage[prefix2] = newStorage(provider, prefix2);
  }
  return providerStorage[prefix2];
}
function addIconSet(storage2, data) {
  const t = Date.now();
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing[name] = t;
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = Object.freeze(fullIcon(icon));
      return true;
    }
  } catch (err) {
  }
  return false;
}
function getIconFromStorage(storage2, name) {
  const value = storage2.icons[name];
  return value === void 0 ? null : value;
}
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = typeof data.provider === "string" ? data.provider : "";
  }
  if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
    let added = false;
    parseIconSet(data, (name, icon) => {
      if (icon && addIcon(name, icon)) {
        added = true;
      }
    }, {
      validate: {
        fix: true,
        prefix: ""
      }
    });
    return added;
  }
  if (typeof data.prefix !== "string" || !validateIcon({
    provider,
    prefix: data.prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, data.prefix);
  return !!addIconSet(storage2, data);
}
function mergeCustomisations(defaults22, item) {
  const result = {};
  for (const key in defaults22) {
    const attr = key;
    result[attr] = defaults22[attr];
    if (item[attr] === void 0) {
      continue;
    }
    const value = item[attr];
    switch (attr) {
      case "inline":
      case "slice":
        if (typeof value === "boolean") {
          result[attr] = value;
        }
        break;
      case "hFlip":
      case "vFlip":
        if (value === true) {
          result[attr] = !result[attr];
        }
        break;
      case "hAlign":
      case "vAlign":
        if (typeof value === "string" && value !== "") {
          result[attr] = value;
        }
        break;
      case "width":
      case "height":
        if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
          result[attr] = value;
        }
        break;
      case "rotate":
        if (typeof value === "number") {
          result[attr] += value;
        }
        break;
    }
  }
  return result;
}
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left) + " " + (0 - box.top) + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left) + " " + (box.height + box.top) + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue + " " + tempValue + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left) + " " + (box.height / 2 + box.top) + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue + " " + tempValue + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width + "";
  height = typeof height === "string" ? height : height + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left + " " + box.top + " " + box.width + " " + box.height
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}
function replaceIDs(body, prefix2 = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix2 === "function" ? prefix2(id) : prefix2 + counter2++;
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path === void 0 ? "/" : source.path,
    maxURL: source.maxURL ? source.maxURL : 500,
    rotate: source.rotate ? source.rotate : 750,
    timeout: source.timeout ? source.timeout : 5e3,
    random: source.random === true,
    index: source.index ? source.index : 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
function addAPIProvider(provider, customConfig) {
  const config2 = createAPIConfig(customConfig);
  if (config2 === null) {
    return false;
  }
  configStorage[provider] = config2;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function calculateMaxLength(provider, prefix2) {
  const config2 = getAPIConfig(provider);
  if (!config2) {
    return 0;
  }
  let result;
  if (!config2.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config2.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = mergeParams(prefix2 + ".json", {
      icons: ""
    });
    result = config2.maxURL - maxHostLength - config2.path.length - url.length;
  }
  const cacheKey = provider + ":" + prefix2;
  pathCache[provider] = config2.path;
  maxLengthCache[cacheKey] = result;
  return result;
}
function getPath(provider) {
  if (typeof provider === "string") {
    if (pathCache[provider] === void 0) {
      const config2 = getAPIConfig(provider);
      if (!config2) {
        return "/";
      }
      pathCache[provider] = config2.path;
    }
    return pathCache[provider];
  }
  return "/";
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix2 = icon.prefix;
    const name = icon.name;
    if (storage2[provider] === void 0) {
      storage2[provider] = Object.create(null);
    }
    const providerStorage = storage2[provider];
    if (providerStorage[prefix2] === void 0) {
      providerStorage[prefix2] = getStorage(provider, prefix2);
    }
    const localStorage = providerStorage[prefix2];
    let list;
    if (localStorage.icons[name] !== void 0) {
      list = result.loaded;
    } else if (prefix2 === "" || localStorage.missing[name] !== void 0) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix: prefix2,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(sources, id) {
  sources.forEach((source) => {
    const provider = source.provider;
    if (callbacks[provider] === void 0) {
      return;
    }
    const providerCallbacks = callbacks[provider];
    const prefix2 = source.prefix;
    const items = providerCallbacks[prefix2];
    if (items) {
      providerCallbacks[prefix2] = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(provider, prefix2) {
  if (pendingUpdates[provider] === void 0) {
    pendingUpdates[provider] = Object.create(null);
  }
  const providerPendingUpdates = pendingUpdates[provider];
  if (!providerPendingUpdates[prefix2]) {
    providerPendingUpdates[prefix2] = true;
    setTimeout(() => {
      providerPendingUpdates[prefix2] = false;
      if (callbacks[provider] === void 0 || callbacks[provider][prefix2] === void 0) {
        return;
      }
      const items = callbacks[provider][prefix2].slice(0);
      if (!items.length) {
        return;
      }
      const storage2 = getStorage(provider, prefix2);
      let hasPending = false;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix2) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name] !== void 0) {
            icons.loaded.push({
              provider,
              prefix: prefix2,
              name
            });
          } else if (storage2.missing[name] !== void 0) {
            icons.missing.push({
              provider,
              prefix: prefix2,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([
              {
                provider,
                prefix: prefix2
              }
            ], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((source) => {
    const provider = source.provider;
    const prefix2 = source.prefix;
    if (callbacks[provider] === void 0) {
      callbacks[provider] = Object.create(null);
    }
    const providerCallbacks = callbacks[provider];
    if (providerCallbacks[prefix2] === void 0) {
      providerCallbacks[prefix2] = [];
    }
    providerCallbacks[prefix2].push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames2) : item;
    if (!validate || validateIcon(icon, simpleNames2)) {
      result.push({
        provider: icon.provider,
        prefix: icon.prefix,
        name: icon.name
      });
    }
  });
  return result;
}
function sendQuery(config2, payload, query, done, success) {
  const resourcesCount = config2.resources.length;
  const startIndex = config2.random ? Math.floor(Math.random() * resourcesCount) : config2.index;
  let resources;
  if (config2.random) {
    let list = config2.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config2.resources.slice(startIndex).concat(config2.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError = void 0;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.abort) {
        item.abort();
      }
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe2(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe: subscribe2,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue = queue.filter((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
      if (item.abort) {
        item.abort();
      }
      return false;
    });
  }
  function moduleResponse(item, data, error2) {
    const isError = data === void 0;
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config2.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (isError) {
      if (error2 !== void 0) {
        lastError = error2;
      }
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (success && !config2.random) {
      const index = config2.resources.indexOf(item.resource);
      if (index !== -1 && index !== config2.index) {
        success(index);
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        const timeout2 = typeof config2.timeout === "function" ? config2.timeout(startTime) : config2.timeout;
        if (timeout2) {
          timer = setTimeout(() => {
            resetTimer();
            if (status === "pending") {
              clearQueue();
              failQuery();
            }
          }, timeout2);
          return;
        }
      }
      failQuery();
      return;
    }
    const item = {
      getQueryStatus,
      status: "pending",
      resource,
      done: (data, error2) => {
        moduleResponse(item, data, error2);
      }
    };
    queue.push(item);
    queriesSent++;
    const timeout = typeof config2.rotate === "function" ? config2.rotate(queriesSent, startTime) : config2.rotate;
    timer = setTimeout(execNext, timeout);
    query(resource, payload, item);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function setConfig(config2) {
  if (typeof config2 !== "object" || typeof config2.resources !== "object" || !(config2.resources instanceof Array) || !config2.resources.length) {
    throw new Error("Invalid Reduncancy configuration");
  }
  const newConfig = Object.create(null);
  let key;
  for (key in defaultConfig) {
    if (config2[key] !== void 0) {
      newConfig[key] = config2[key];
    } else {
      newConfig[key] = defaultConfig[key];
    }
  }
  return newConfig;
}
function initRedundancy(cfg) {
  const config2 = setConfig(cfg);
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config2, payload, queryCallback, (data, error2) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error2);
      }
    }, (newIndex) => {
      config2.index = newIndex;
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    const result = queries.find((value) => {
      return callback(value);
    });
    return result !== void 0 ? result : null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config2.index = index;
    },
    getIndex: () => config2.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
function getRedundancyCache(provider) {
  if (redundancyCache[provider] === void 0) {
    const config2 = getAPIConfig(provider);
    if (!config2) {
      return;
    }
    const redundancy = initRedundancy(config2);
    const cachedReundancy = {
      config: config2,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config2 = createAPIConfig(target);
    if (config2) {
      redundancy = initRedundancy(config2);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(provider, prefix2) {
  if (loaderFlags[provider] === void 0) {
    loaderFlags[provider] = Object.create(null);
  }
  const providerLoaderFlags = loaderFlags[provider];
  if (!providerLoaderFlags[prefix2]) {
    providerLoaderFlags[prefix2] = true;
    setTimeout(() => {
      providerLoaderFlags[prefix2] = false;
      updateCallbacks(provider, prefix2);
    });
  }
}
function loadNewIcons(provider, prefix2, icons) {
  function err() {
    const key = (provider === "" ? "" : "@" + provider + ":") + prefix2;
    const time = Math.floor(Date.now() / 6e4);
    if (errorsCache[key] < time) {
      errorsCache[key] = time;
      console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
    }
  }
  if (iconsToLoad[provider] === void 0) {
    iconsToLoad[provider] = Object.create(null);
  }
  const providerIconsToLoad = iconsToLoad[provider];
  if (queueFlags[provider] === void 0) {
    queueFlags[provider] = Object.create(null);
  }
  const providerQueueFlags = queueFlags[provider];
  if (pendingIcons[provider] === void 0) {
    pendingIcons[provider] = Object.create(null);
  }
  const providerPendingIcons = pendingIcons[provider];
  if (providerIconsToLoad[prefix2] === void 0) {
    providerIconsToLoad[prefix2] = icons;
  } else {
    providerIconsToLoad[prefix2] = providerIconsToLoad[prefix2].concat(icons).sort();
  }
  if (!providerQueueFlags[prefix2]) {
    providerQueueFlags[prefix2] = true;
    setTimeout(() => {
      providerQueueFlags[prefix2] = false;
      const icons2 = providerIconsToLoad[prefix2];
      delete providerIconsToLoad[prefix2];
      const api = getAPIModule(provider);
      if (!api) {
        err();
        return;
      }
      const params = api.prepare(provider, prefix2, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error2) => {
          const storage2 = getStorage(provider, prefix2);
          if (typeof data !== "object") {
            if (error2 !== 404) {
              return;
            }
            const t = Date.now();
            item.icons.forEach((name) => {
              storage2.missing[name] = t;
            });
          } else {
            try {
              const parsed = addIconSet(storage2, data);
              if (!parsed.length) {
                return;
              }
              const pending = providerPendingIcons[prefix2];
              parsed.forEach((name) => {
                delete pending[name];
              });
              if (cache.store) {
                cache.store(provider, data);
              }
            } catch (err2) {
              console.error(err2);
            }
          }
          loadedNewIcons(provider, prefix2);
        });
      });
    });
  }
}
function getGlobal(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  config[key] = false;
  return null;
}
function setCount(storage2, key, value) {
  try {
    storage2.setItem(countKey, value + "");
    count[key] = value;
    return true;
  } catch (err) {
    return false;
  }
}
function getCount(storage2) {
  const count2 = storage2.getItem(countKey);
  if (count2) {
    const total = parseInt(count2);
    return total ? total : 0;
  }
  return 0;
}
function initCache(storage2, key) {
  try {
    storage2.setItem(versionKey, cacheVersion);
  } catch (err) {
  }
  setCount(storage2, key, 0);
}
function destroyCache(storage2) {
  try {
    const total = getCount(storage2);
    for (let i = 0; i < total; i++) {
      storage2.removeItem(cachePrefix + i);
    }
  } catch (err) {
  }
}
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function alignmentFromString(custom, align) {
  align.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "left":
      case "center":
      case "right":
        custom.hAlign = value;
        break;
      case "top":
      case "middle":
      case "bottom":
        custom.vAlign = value;
        break;
      case "slice":
      case "crop":
        custom.slice = true;
        break;
      case "meet":
        custom.slice = false;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaults2, props);
  const componentProps = { ...svgDefaults };
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "align":
        if (typeof value === "string") {
          alignmentFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaults2[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  for (let key in item.attributes) {
    componentProps[key] = item.attributes[key];
  }
  if (item.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (style !== "") {
    componentProps.style = style;
  }
  let localCounter = 0;
  const id = props.id;
  return {
    attributes: componentProps,
    body: replaceIDs(item.body, id ? () => id + "-" + localCounter++ : "iconify-svelte-")
  };
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: fullIcon(icon) };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (data === null) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render(icon, props) : null;
}
var matchName, iconDefaults, stringToIcon, validateIcon, matchChar, storage$1, simpleNames, defaults2, unitsSplit, unitsTest, regex, randomPrefix, counter2, storage, configStorage, fallBackAPISources, fallBackAPI, mergeParams, maxLengthCache, pathCache, detectFetch, fetchModule, prepare, send, fetchAPIModule, callbacks, pendingUpdates, idCounter, defaultConfig, redundancyCache, cache, pendingIcons, iconsToLoad, loaderFlags, queueFlags, errorsCache, loadIcons, cacheVersion, cachePrefix, countKey, versionKey, hour, cacheExpiration, config, loaded, count, emptyList, _window, loadCache, storeCache, separator, svgDefaults, Icon;
var init_Icon_8a17b723 = __esm({
  ".svelte-kit/output/server/chunks/Icon-8a17b723.js"() {
    init_index_36284ca1();
    matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    iconDefaults = Object.freeze({
      left: 0,
      top: 0,
      width: 16,
      height: 16,
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    stringToIcon = (value, validate, allowSimpleName, provider = "") => {
      const colonSeparated = value.split(":");
      if (value.slice(0, 1) === "@") {
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
          return null;
        }
        provider = colonSeparated.shift().slice(1);
      }
      if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
      }
      if (colonSeparated.length > 1) {
        const name2 = colonSeparated.pop();
        const prefix2 = colonSeparated.pop();
        const result = {
          provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
          prefix: prefix2,
          name: name2
        };
        return validate && !validateIcon(result) ? null : result;
      }
      const name = colonSeparated[0];
      const dashSeparated = name.split("-");
      if (dashSeparated.length > 1) {
        const result = {
          provider,
          prefix: dashSeparated.shift(),
          name: dashSeparated.join("-")
        };
        return validate && !validateIcon(result) ? null : result;
      }
      if (allowSimpleName && provider === "") {
        const result = {
          provider,
          prefix: "",
          name
        };
        return validate && !validateIcon(result, allowSimpleName) ? null : result;
      }
      return null;
    };
    validateIcon = (icon, allowSimpleName) => {
      if (!icon) {
        return false;
      }
      return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
    };
    matchChar = /^[a-f0-9]+(-[a-f0-9]+)*$/;
    storage$1 = Object.create(null);
    simpleNames = false;
    defaults2 = Object.freeze({
      inline: false,
      width: null,
      height: null,
      hAlign: "center",
      vAlign: "middle",
      slice: false,
      hFlip: false,
      vFlip: false,
      rotate: 0
    });
    unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    regex = /\sid="(\S+)"/g;
    randomPrefix = "IconifyId-" + Date.now().toString(16) + "-" + (Math.random() * 16777216 | 0).toString(16) + "-";
    counter2 = 0;
    storage = Object.create(null);
    configStorage = Object.create(null);
    fallBackAPISources = [
      "https://api.simplesvg.com",
      "https://api.unisvg.com"
    ];
    fallBackAPI = [];
    while (fallBackAPISources.length > 0) {
      if (fallBackAPISources.length === 1) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        if (Math.random() > 0.5) {
          fallBackAPI.push(fallBackAPISources.shift());
        } else {
          fallBackAPI.push(fallBackAPISources.pop());
        }
      }
    }
    configStorage[""] = createAPIConfig({
      resources: ["https://api.iconify.design"].concat(fallBackAPI)
    });
    mergeParams = (base2, params) => {
      let result = base2, hasParams = result.indexOf("?") !== -1;
      function paramToString(value) {
        switch (typeof value) {
          case "boolean":
            return value ? "true" : "false";
          case "number":
            return encodeURIComponent(value);
          case "string":
            return encodeURIComponent(value);
          default:
            throw new Error("Invalid parameter");
        }
      }
      Object.keys(params).forEach((key) => {
        let value;
        try {
          value = paramToString(params[key]);
        } catch (err) {
          return;
        }
        result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
        hasParams = true;
      });
      return result;
    };
    maxLengthCache = Object.create(null);
    pathCache = Object.create(null);
    detectFetch = () => {
      let callback;
      try {
        callback = fetch;
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
      try {
        const chunk = String.fromCharCode(114) + String.fromCharCode(101);
        const req = global[chunk + "qui" + chunk];
        callback = req("cross-fetch");
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
      return null;
    };
    fetchModule = detectFetch();
    prepare = (provider, prefix2, icons) => {
      const results = [];
      let maxLength = maxLengthCache[prefix2];
      if (maxLength === void 0) {
        maxLength = calculateMaxLength(provider, prefix2);
      }
      const type = "icons";
      let item = {
        type,
        provider,
        prefix: prefix2,
        icons: []
      };
      let length = 0;
      icons.forEach((name, index) => {
        length += name.length + 1;
        if (length >= maxLength && index > 0) {
          results.push(item);
          item = {
            type,
            provider,
            prefix: prefix2,
            icons: []
          };
          length = name.length;
        }
        item.icons.push(name);
      });
      results.push(item);
      return results;
    };
    send = (host, params, status) => {
      if (!fetchModule) {
        status.done(void 0, 424);
        return;
      }
      let path = getPath(params.provider);
      switch (params.type) {
        case "icons": {
          const prefix2 = params.prefix;
          const icons = params.icons;
          const iconsList = icons.join(",");
          path += mergeParams(prefix2 + ".json", {
            icons: iconsList
          });
          break;
        }
        case "custom": {
          const uri = params.uri;
          path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
          break;
        }
        default:
          status.done(void 0, 400);
          return;
      }
      let defaultError = 503;
      fetchModule(host + path).then((response) => {
        if (response.status !== 200) {
          setTimeout(() => {
            status.done(void 0, response.status);
          });
          return;
        }
        defaultError = 501;
        return response.json();
      }).then((data) => {
        if (typeof data !== "object" || data === null) {
          setTimeout(() => {
            status.done(void 0, defaultError);
          });
          return;
        }
        setTimeout(() => {
          status.done(data);
        });
      }).catch(() => {
        status.done(void 0, defaultError);
      });
    };
    fetchAPIModule = {
      prepare,
      send
    };
    callbacks = Object.create(null);
    pendingUpdates = Object.create(null);
    idCounter = 0;
    defaultConfig = {
      resources: [],
      index: 0,
      timeout: 2e3,
      rotate: 750,
      random: false,
      dataAfterTimeout: false
    };
    redundancyCache = Object.create(null);
    cache = {};
    pendingIcons = Object.create(null);
    iconsToLoad = Object.create(null);
    loaderFlags = Object.create(null);
    queueFlags = Object.create(null);
    errorsCache = Object.create(null);
    loadIcons = (icons, callback) => {
      const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
      const sortedIcons = sortIcons(cleanedIcons);
      if (!sortedIcons.pending.length) {
        let callCallback = true;
        if (callback) {
          setTimeout(() => {
            if (callCallback) {
              callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
            }
          });
        }
        return () => {
          callCallback = false;
        };
      }
      const newIcons = Object.create(null);
      const sources = [];
      let lastProvider, lastPrefix;
      sortedIcons.pending.forEach((icon) => {
        const provider = icon.provider;
        const prefix2 = icon.prefix;
        if (prefix2 === lastPrefix && provider === lastProvider) {
          return;
        }
        lastProvider = provider;
        lastPrefix = prefix2;
        sources.push({
          provider,
          prefix: prefix2
        });
        if (pendingIcons[provider] === void 0) {
          pendingIcons[provider] = Object.create(null);
        }
        const providerPendingIcons = pendingIcons[provider];
        if (providerPendingIcons[prefix2] === void 0) {
          providerPendingIcons[prefix2] = Object.create(null);
        }
        if (newIcons[provider] === void 0) {
          newIcons[provider] = Object.create(null);
        }
        const providerNewIcons = newIcons[provider];
        if (providerNewIcons[prefix2] === void 0) {
          providerNewIcons[prefix2] = [];
        }
      });
      const time = Date.now();
      sortedIcons.pending.forEach((icon) => {
        const provider = icon.provider;
        const prefix2 = icon.prefix;
        const name = icon.name;
        const pendingQueue = pendingIcons[provider][prefix2];
        if (pendingQueue[name] === void 0) {
          pendingQueue[name] = time;
          newIcons[provider][prefix2].push(name);
        }
      });
      sources.forEach((source) => {
        const provider = source.provider;
        const prefix2 = source.prefix;
        if (newIcons[provider][prefix2].length) {
          loadNewIcons(provider, prefix2, newIcons[provider][prefix2]);
        }
      });
      return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
    };
    cacheVersion = "iconify2";
    cachePrefix = "iconify";
    countKey = cachePrefix + "-count";
    versionKey = cachePrefix + "-version";
    hour = 36e5;
    cacheExpiration = 168;
    config = {
      local: true,
      session: true
    };
    loaded = false;
    count = {
      local: 0,
      session: 0
    };
    emptyList = {
      local: [],
      session: []
    };
    _window = typeof window === "undefined" ? {} : window;
    loadCache = () => {
      if (loaded) {
        return;
      }
      loaded = true;
      const minTime = Math.floor(Date.now() / hour) - cacheExpiration;
      function load24(key) {
        const func = getGlobal(key);
        if (!func) {
          return;
        }
        const getItem = (index) => {
          const name = cachePrefix + index;
          const item = func.getItem(name);
          if (typeof item !== "string") {
            return false;
          }
          let valid = true;
          try {
            const data = JSON.parse(item);
            if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
              valid = false;
            } else {
              const provider = data.provider;
              const prefix2 = data.data.prefix;
              const storage2 = getStorage(provider, prefix2);
              valid = addIconSet(storage2, data.data).length > 0;
            }
          } catch (err) {
            valid = false;
          }
          if (!valid) {
            func.removeItem(name);
          }
          return valid;
        };
        try {
          const version = func.getItem(versionKey);
          if (version !== cacheVersion) {
            if (version) {
              destroyCache(func);
            }
            initCache(func, key);
            return;
          }
          let total = getCount(func);
          for (let i = total - 1; i >= 0; i--) {
            if (!getItem(i)) {
              if (i === total - 1) {
                total--;
              } else {
                emptyList[key].push(i);
              }
            }
          }
          setCount(func, key, total);
        } catch (err) {
        }
      }
      for (const key in config) {
        load24(key);
      }
    };
    storeCache = (provider, data) => {
      if (!loaded) {
        loadCache();
      }
      function store(key) {
        if (!config[key]) {
          return false;
        }
        const func = getGlobal(key);
        if (!func) {
          return false;
        }
        let index = emptyList[key].shift();
        if (index === void 0) {
          index = count[key];
          if (!setCount(func, key, index + 1)) {
            return false;
          }
        }
        try {
          const item = {
            cached: Math.floor(Date.now() / hour),
            provider,
            data
          };
          func.setItem(cachePrefix + index, JSON.stringify(item));
        } catch (err) {
          return false;
        }
        return true;
      }
      if (!store("local")) {
        store("session");
      }
    };
    separator = /[\s,]+/;
    svgDefaults = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "aria-hidden": true,
      "role": "img"
    };
    allowSimpleNames(true);
    setAPIModule("", fetchAPIModule);
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      cache.store = storeCache;
      loadCache();
      const _window2 = window;
      if (_window2.IconifyPreload !== void 0) {
        const preload = _window2.IconifyPreload;
        const err = "Invalid IconifyPreload syntax.";
        if (typeof preload === "object" && preload !== null) {
          (preload instanceof Array ? preload : [preload]).forEach((item) => {
            try {
              if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          });
        }
      }
      if (_window2.IconifyProviders !== void 0) {
        const providers = _window2.IconifyProviders;
        if (typeof providers === "object" && providers !== null) {
          for (let key in providers) {
            const err = "IconifyProviders[" + key + "] is invalid.";
            try {
              const value = providers[key];
              if (typeof value !== "object" || !value || value.resources === void 0) {
                continue;
              }
              if (!addAPIProvider(key, value)) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          }
        }
      }
    }
    Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const state = {
        name: "",
        loading: null,
        destroyed: false
      };
      let mounted = false;
      let data;
      const onLoad = (icon) => {
        if (typeof $$props.onLoad === "function") {
          $$props.onLoad(icon);
        }
        const dispatch2 = createEventDispatcher();
        dispatch2("load", { icon });
      };
      function loaded2() {
      }
      onDestroy(() => {
        state.destroyed = true;
        if (state.loading) {
          state.loading.abort();
          state.loading = null;
        }
      });
      {
        {
          const iconData = checkIconState($$props.icon, state, mounted, loaded2, onLoad);
          data = iconData ? generateIcon(iconData.data, $$props) : null;
          if (data && iconData.classes) {
            data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
          }
        }
      }
      return `${data !== null ? `<svg${spread([escape_object(data.attributes)])}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/enums-2aac69e1.js
var Object_13, Button_1, BotState, UserBotAction, enums;
var init_enums_2aac69e1 = __esm({
  ".svelte-kit/output/server/chunks/enums-2aac69e1.js"() {
    init_index_36284ca1();
    init_Ripple_a012c9fe();
    ({ Object: Object_13 } = globals);
    Button_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
        $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object_13.assign({
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
            ...use2
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
    enums = {
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
  }
});

// .svelte-kit/output/server/chunks/Tag-f7b294e7.js
var css$12, SearchBar, css5, Tag;
var init_Tag_f7b294e7 = __esm({
  ".svelte-kit/output/server/chunks/Tag-f7b294e7.js"() {
    init_index_36284ca1();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    css$12 = {
      code: ".search.svelte-tfzrt2{display:block;width:37%;font-size:20px;padding:12px !important;margin-top:50px !important;margin-bottom:20px !important}",
      map: null
    };
    SearchBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type } = $$props;
      let { query } = $$props;
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.query === void 0 && $$bindings.query && query !== void 0)
        $$bindings.query(query);
      $$result.css.add(css$12);
      return `<form method="${"GET"}" action="${"/frostpaw/search"}"><input type="${"hidden"}" name="${"target_type"}"${add_attribute("value", type, 0)}>
	<input type="${"text"}" class="${"form-control fform search svelte-tfzrt2"}" placeholder="${"Search for " + escape(type) + "s (ENTER to search)"}" name="${"q"}"${add_attribute("value", query, 0)} aria-label="${"Search for something.."}" style="${"width: 90%"}">
</form>`;
    });
    css5 = {
      code: ".tag-icon{font-size:15px;margin-right:5px}span.svelte-np5dmd{font-size:13px}.tag-item{opacity:1 !important;color:white !important;border:solid thin !important;outline:none !important;word-wrap:break-word;text-overflow:ellipsis;margin-left:10px;margin-right:10px;cursor:pointer;min-width:180px}.tag-container.svelte-np5dmd{height:100%;width:90%;margin-left:auto;margin-right:auto;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;line-height:13px;margin-top:5px}",
      map: null
    };
    Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { tags } = $$props;
      let { targetType } = $$props;
      if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
        $$bindings.tags(tags);
      if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
        $$bindings.targetType(targetType);
      $$result.css.add(css5);
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
  }
});

// .svelte-kit/output/server/chunks/CardContainer-4f729b6c.js
var css$13, BotCard, css6, CardContainer;
var init_CardContainer_4f729b6c = __esm({
  ".svelte-kit/output/server/chunks/CardContainer-4f729b6c.js"() {
    init_index_36284ca1();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    css$13 = {
      code: "a.svelte-14mj578{opacity:1 !important}.text-center.svelte-14mj578{text-align:center}.d-flex.svelte-14mj578{display:flex}.bot-card.svelte-14mj578:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0);filter:blur;-webkit-filter:blur(0)}.bot-card-username.svelte-14mj578{margin-right:auto;margin-left:auto;margin-top:30px}.bot-card-username-txt.svelte-14mj578{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:21px;margin-top:35px;text-align:center}.bot-card.svelte-14mj578{width:300px;height:520px;background:#111112;-moz-box-shadow:0px 0px 20px 5px #000;-webkit-box-shadow:0px 0px 20px 5px #000;box-shadow:0px 0px 20px 5px #000;border-top-style:none;margin:25px 25px;border-radius:10px 10px 10px 10px}.bot-card-banner.svelte-14mj578{width:100%;height:35%;background:center/cover no-repeat}.bot-card-avatar.svelte-14mj578{border-radius:50%;background-color:black !important;width:100px;min-width:100px;height:100px;min-height:100px;margin:5% auto;margin-top:17%;margin-right:35%;margin-left:35%;margin-bottom:0px}.bot-card-description.svelte-14mj578{color:white;opacity:0.63;width:90%;min-width:90%;max-width:90%;margin:0 5%;height:105px;text-overflow:ellipsis;min-height:105px;max-height:105px}.bot-card-cert{color:#7289DA;position:absoulute;margin-top:-15px;margin-left:90%;z-index:10 !important}.bot-card-footer.svelte-14mj578{width:80%;margin:0 10%;height:10%;margin-top:20px;margin-bottom:20px}.bot-card-footer-stats.svelte-14mj578{height:30px !important;width:55% !important}.bot-card-actions.svelte-14mj578{width:80%;margin:0 15%}.bot-card-actions-link{width:45%;font-weight:bold;border:solid thin !important;outline:none !important;opacity:1 !important;font-size:10px}",
      map: null
    };
    BotCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      $$result.css.add(css$13);
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
    css6 = {
      code: ".container.svelte-1gp4ux9{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding-left:0}slot.svelte-1gp4ux9{list-style:none;flex:0 0 33%;justify-content:center;align-items:center}",
      map: null
    };
    CardContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<div class="${"container svelte-1gp4ux9"}">${slots.default ? slots.default({}) : ``}
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/BristlefrostMeta-5512d822.js
var BristlefrostMeta;
var init_BristlefrostMeta_5512d822 = __esm({
  ".svelte-kit/output/server/chunks/BristlefrostMeta-5512d822.js"() {
    init_index_36284ca1();
    BristlefrostMeta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title: title3 } = $$props;
      let { description } = $$props;
      let { thumbnail } = $$props;
      let { url } = $$props;
      let { pageTitle = title3 } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title3 !== void 0)
        $$bindings.title(title3);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      if ($$props.thumbnail === void 0 && $$bindings.thumbnail && thumbnail !== void 0)
        $$bindings.thumbnail(thumbnail);
      if ($$props.url === void 0 && $$bindings.url && url !== void 0)
        $$bindings.url(url);
      if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
        $$bindings.pageTitle(pageTitle);
      return `${$$result.head += `${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<meta name="${"title"}"${add_attribute("content", title3, 0)} data-svelte="svelte-1hha9kl"><meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta name="${"language"}" content="${"English"}" data-svelte="svelte-1hha9kl"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-1hha9kl"><meta property="${"og:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:title"}"${add_attribute("content", title3, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta property="${"og:image"}"${add_attribute("content", thumbnail, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:card"}" content="${"summary"}" data-svelte="svelte-1hha9kl"><meta property="${"twitter:url"}"${add_attribute("content", url, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:title"}"${add_attribute("content", title3, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1hha9kl"><meta property="${"twitter:image"}"${add_attribute("content", thumbnail, 0)} data-svelte="svelte-1hha9kl"><link rel="${"canonical"}"${add_attribute("href", url || "https://fateslist.xyz/", 0)} data-svelte="svelte-1hha9kl">`, ""}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Section-76e09033.js
var css7, Section;
var init_Section_76e09033 = __esm({
  ".svelte-kit/output/server/chunks/Section-76e09033.js"() {
    init_index_36284ca1();
    init_Icon_8a17b723();
    css7 = {
      code: "h2.svelte-ugthed{font-size:40px;margin:0px}.bot-section-frag.svelte-ugthed{margin-right:10px !important;margin-left:10px !important;display:inline-block}.bot-section.svelte-ugthed{margin-left:10px;margin-right:10px}",
      map: null
    };
    Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { icon } = $$props;
      let { title: title3 } = $$props;
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.title === void 0 && $$bindings.title && title3 !== void 0)
        $$bindings.title(title3);
      $$result.css.add(css7);
      return `<div class="${"bot-section svelte-ugthed"}">${validate_component(Icon, "Icon").$$render($$result, {
        class: "white bot-section-frag",
        icon,
        inline: true,
        height: "3em"
      }, {}, {})}
    <h2 class="${"bot-section-frag svelte-ugthed"}">${escape(title3)}</h2>
    <hr>
</div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes,
  load: () => load2,
  prerender: () => prerender
});
async function load2({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/index?type=0`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    return {
      props: {
        data: await res.json(),
        randomBot: await roll("bot")
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
var css$14, RandomBot, css8, prerender, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_Tag_f7b294e7();
    init_CardContainer_4f729b6c();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_BristlefrostMeta_5512d822();
    init_Section_76e09033();
    init_Ripple_a012c9fe();
    init_modules();
    css$14 = {
      code: ".spacer.svelte-1she08m{margin-bottom:10px}.flex.svelte-1she08m{margin-left:auto;margin-right:auto;display:flex;align-items:center;justify-content:center;flex-direction:column}.random-button{display:flex !important;border:solid thin !important;outline:none !important}",
      map: null
    };
    RandomBot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type } = $$props;
      let { randomBot } = $$props;
      console.log(randomBot);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.randomBot === void 0 && $$bindings.randomBot && randomBot !== void 0)
        $$bindings.randomBot(randomBot);
      $$result.css.add(css$14);
      return `<div class="${"flex svelte-1she08m"}">${validate_component(BotCard, "BotCard").$$render($$result, { type, rand: false, data: randomBot }, {}, {})}
    ${validate_component(Button_1, "Button").$$render($$result, {
        class: "random-button white",
        touch: true,
        variant: "outlined"
      }, {}, { default: () => `Roll` })}</div>
<div class="${"spacer svelte-1she08m"}"></div>`;
    });
    css8 = {
      code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
      map: null
    };
    prerender = true;
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { randomBot } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.randomBot === void 0 && $$bindings.randomBot && randomBot !== void 0)
        $$bindings.randomBot(randomBot);
      $$result.css.add(css8);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz",
        title: "Fates List | Discord Bot List",
        description: "Find, invite and discover the best bots & servers now on Fates List",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>

${validate_component(SearchBar, "SearchBar").$$render($$result, { type: "bot", query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType: "bot", tags: data.tags_fixed }, {}, {})}
${validate_component(RandomBot, "RandomBot").$$render($$result, { type: "bot", randomBot }, {}, {})}

${validate_component(Section, "Section").$$render($$result, {
        icon: "fa-solid:certificate",
        title: "Certified"
      }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.certified_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
      })}

${validate_component(Section, "Section").$$render($$result, {
        icon: "fa-solid:sort-amount-up",
        title: "Top Voted"
      }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.top_voted, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
      })}

${validate_component(Section, "Section").$$render($$result, { icon: "fa-solid:plus", title: "New Bots" }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.new_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "bot", rand: false }, {}, {})}`)}`
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css9,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css9;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-dc4fd296.js";
    js3 = ["pages/index.svelte-dc4fd296.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/Tag-6f90ee50.js", "chunks/CardContainer-fe7298a5.js", "chunks/enums-06152dee.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/Section-04b3bd4d.js"];
    css9 = ["assets/pages/index.svelte-ad309913.css", "assets/Tag-3c419aa8.css", "assets/CardContainer-6f3614cc.css", "assets/Section-0b0cfa5e.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => Frostpaw,
  load: () => load3,
  prerender: () => prerender2
});
async function load3({ params, fetch: fetch2, session: session2, stuff }) {
  return { status: 307, redirect: "/" };
}
var prerender2, Frostpaw;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/index.svelte.js"() {
    init_index_36284ca1();
    prerender2 = false;
    Frostpaw = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css10,
  entry: () => entry4,
  js: () => js4,
  module: () => index_svelte_exports2
});
var entry4, js4, css10;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_index_svelte2();
    entry4 = "pages/frostpaw/index.svelte-da5359c5.js";
    js4 = ["pages/frostpaw/index.svelte-da5359c5.js", "chunks/vendor-22677977.js"];
    css10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/troubleshoot.svelte.js
var troubleshoot_svelte_exports = {};
__export(troubleshoot_svelte_exports, {
  default: () => Troubleshoot,
  load: () => load4
});
async function load4({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/_sunbeam/dm/help`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    return { props: { data: await res.json() } };
  } else {
    return {
      status: 500,
      error: new Error(`Sunbeam Troubleshooter could not contact our servers to get required troubleshooting information (${url})`)
    };
  }
}
var Troubleshoot;
var init_troubleshoot_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/troubleshoot.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_stores_d5eb43fc();
    Troubleshoot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $session, $$unsubscribe_session;
      $$unsubscribe_session = subscribe(session, (value) => $session = value);
      let { data } = $$props;
      let sessInfo = $session;
      let agent = "Please wait...";
      let msg = "Please wait, fetching needed information...";
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$unsubscribe_session();
      return `<h1>${escape(msg)}</h1>
<ul class="${"white"}">${each(Object.entries(data.data), (info) => `${info[0] == "user" ? `<li style="${"word-wrap: break-word;"}">${escape(info[0])} (Logged in user): ${escape(JSON.stringify(info[1]))}</li>` : `<li>${escape(info[0])}: ${escape(info[1])}</li>`}`)}
	<li>real_user_agent: ${escape(agent)}</li>
	<li>session: ${escape(JSON.stringify(sessInfo))}</li></ul>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css11,
  entry: () => entry5,
  js: () => js5,
  module: () => troubleshoot_svelte_exports
});
var entry5, js5, css11;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_troubleshoot_svelte();
    entry5 = "pages/frostpaw/troubleshoot.svelte-ec71af69.js";
    js5 = ["pages/frostpaw/troubleshoot.svelte-ec71af69.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/stores-56fb81e3.js"];
    css11 = [];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/add-server.svelte.js
var add_server_svelte_exports = {};
__export(add_server_svelte_exports, {
  default: () => Add_server
});
var css12, serverBotInvite, Add_server;
var init_add_server_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/add-server.svelte.js"() {
    init_index_36284ca1();
    init_BristlefrostMeta_5512d822();
    css12 = {
      code: "ul.svelte-1byxlz9{color:white}",
      map: null
    };
    serverBotInvite = "https://discord.com/api/oauth2/authorize?client_id=811073947382579200&permissions=67649&scope=bot%20applications.commands";
    Add_server = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css12);
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
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  css: () => css13,
  entry: () => entry6,
  js: () => js6,
  module: () => add_server_svelte_exports
});
var entry6, js6, css13;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_add_server_svelte();
    entry6 = "pages/frostpaw/add-server.svelte-c8d3e5d9.js";
    js6 = ["pages/frostpaw/add-server.svelte-c8d3e5d9.js", "chunks/vendor-22677977.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css13 = ["assets/pages/frostpaw/add-server.svelte-78a60692.css"];
  }
});

// .svelte-kit/output/server/chunks/Iframe-4e66cd3b.js
var css14, Iframe;
var init_Iframe_4e66cd3b = __esm({
  ".svelte-kit/output/server/chunks/Iframe-4e66cd3b.js"() {
    init_index_36284ca1();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    css14 = {
      code: "iframe.svelte-1tt8qda{border-width:0px;border:none;height:100vh;margin:0px;padding:0px}.svelte-1tt8qda::-webkit-scrollbar{display:none}html{overflow-y:hidden}",
      map: null
    };
    Iframe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $session, $$unsubscribe_session;
      $$unsubscribe_session = subscribe(session, (value) => $session = value);
      let { iframeUrl } = $$props;
      let { title: title3 } = $$props;
      let { metaTitle } = $$props;
      let { metaUrl } = $$props;
      let token = $session.session.token;
      if ($$props.iframeUrl === void 0 && $$bindings.iframeUrl && iframeUrl !== void 0)
        $$bindings.iframeUrl(iframeUrl);
      if ($$props.title === void 0 && $$bindings.title && title3 !== void 0)
        $$bindings.title(title3);
      if ($$props.metaTitle === void 0 && $$bindings.metaTitle && metaTitle !== void 0)
        $$bindings.metaTitle(metaTitle);
      if ($$props.metaUrl === void 0 && $$bindings.metaUrl && metaUrl !== void 0)
        $$bindings.metaUrl(metaUrl);
      $$result.css.add(css14);
      $$unsubscribe_session();
      return `
${token ? `<iframe frameborder="${"0"}"${add_attribute("title", title3, 0)}${add_attribute("src", iframeUrl, 0)} width="${"100%"}" class="${"svelte-1tt8qda"}"></iframe>` : `<p class="${"svelte-1tt8qda"}">Logging you in, please wait...</p>`}

${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: metaUrl,
        title: metaTitle,
        description: "Find, invite and discover the best bots & servers now on Fates List",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/add-bot.svelte.js
var add_bot_svelte_exports = {};
__export(add_bot_svelte_exports, {
  default: () => Add_bot
});
var Add_bot;
var init_add_bot_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/add-bot.svelte.js"() {
    init_index_36284ca1();
    init_Iframe_4e66cd3b();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    Add_bot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Iframe, "PageFrame").$$render($$result, {
        iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/add-bot",
        title: "Add Bot Page",
        metaTitle: "Fates List | Add Bot",
        metaUrl: "https://fateslist.xyz/frostpaw/add-bot"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  css: () => css15,
  entry: () => entry7,
  js: () => js7,
  module: () => add_bot_svelte_exports
});
var entry7, js7, css15;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_add_bot_svelte();
    entry7 = "pages/frostpaw/add-bot.svelte-579b876e.js";
    js7 = ["pages/frostpaw/add-bot.svelte-579b876e.js", "chunks/vendor-22677977.js", "chunks/Iframe-6317140e.js", "chunks/request-2d5483df.js", "chunks/stores-56fb81e3.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css15 = ["assets/Iframe-600b88fc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/servers/index.svelte.js
var index_svelte_exports3 = {};
__export(index_svelte_exports3, {
  default: () => Servers,
  load: () => load5,
  prerender: () => prerender3
});
async function load5({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/index?type=1`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    return { props: { data: await res.json() } };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
var css16, prerender3, Servers;
var init_index_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/servers/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_Tag_f7b294e7();
    init_CardContainer_4f729b6c();
    init_Section_76e09033();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_Ripple_a012c9fe();
    init_modules();
    css16 = {
      code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
      map: null
    };
    prerender3 = true;
    Servers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css16);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz",
        title: "Fates List | Discord Bot List",
        description: "Find, discover and join the best servers only on Fates List",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}


<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: "server", query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, {
        targetType: "server",
        tags: data.tags_fixed
      }, {}, {})}

${validate_component(Section, "Section").$$render($$result, {
        icon: "fa-solid:certificate",
        title: "Certified"
      }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.certified_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
      })}

${validate_component(Section, "Section").$$render($$result, {
        icon: "fa-solid:sort-amount-up",
        title: "Top Voted"
      }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.top_voted, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
      })}

${validate_component(Section, "Section").$$render($$result, {
        icon: "fa-solid:plus",
        title: "New Servers"
      }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.new_bots, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: "server", rand: false }, {}, {})}`)}`
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  css: () => css17,
  entry: () => entry8,
  js: () => js8,
  module: () => index_svelte_exports3
});
var entry8, js8, css17;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_index_svelte3();
    entry8 = "pages/frostpaw/servers/index.svelte-9613f6a6.js";
    js8 = ["pages/frostpaw/servers/index.svelte-9613f6a6.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/Tag-6f90ee50.js", "chunks/CardContainer-fe7298a5.js", "chunks/enums-06152dee.js", "chunks/Section-04b3bd4d.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css17 = ["assets/pages/frostpaw/servers/index.svelte-e799d5c6.css", "assets/Tag-3c419aa8.css", "assets/CardContainer-6f3614cc.css", "assets/Section-0b0cfa5e.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/search/index.svelte.js
var index_svelte_exports4 = {};
__export(index_svelte_exports4, {
  default: () => Search,
  load: () => load6,
  prerender: () => prerender4
});
async function load6({ session: session2, fetch: fetch2 }) {
  let query = session2.query.q;
  let targetType = session2.query.target_type;
  console.log(query);
  const searchUrl = `/api/v2/search?target_type=${targetType}&q=${query}`;
  const res = await fetchFates(searchUrl, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    return { props: { data, targetType, query } };
  }
  return {
    status: res.status,
    error: new Error(`Search Error`)
  };
}
var css18, prerender4, Search;
var init_index_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/search/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_CardContainer_4f729b6c();
    init_Tag_f7b294e7();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_Ripple_a012c9fe();
    init_modules();
    css18 = {
      code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
      map: null
    };
    prerender4 = false;
    Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { targetType } = $$props;
      let { query } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
        $$bindings.targetType(targetType);
      if ($$props.query === void 0 && $$bindings.query && query !== void 0)
        $$bindings.query(query);
      $$result.css.add(css18);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz/frostpaw/search?q=" + query + "&target_type=" + targetType,
        title: "Search results for " + targetType + "s matching " + query,
        description: "Find, invite and discover the best " + targetType + "s matching " + query,
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: targetType, query }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType, tags: data.tags_fixed }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.search_res, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: targetType, rand: false }, {}, {})}`)}`
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  css: () => css19,
  entry: () => entry9,
  js: () => js9,
  module: () => index_svelte_exports4
});
var entry9, js9, css19;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_index_svelte4();
    entry9 = "pages/frostpaw/search/index.svelte-dae91e0a.js";
    js9 = ["pages/frostpaw/search/index.svelte-dae91e0a.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/CardContainer-fe7298a5.js", "chunks/enums-06152dee.js", "chunks/Tag-6f90ee50.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css19 = ["assets/pages/frostpaw/servers/index.svelte-e799d5c6.css", "assets/CardContainer-6f3614cc.css", "assets/Tag-3c419aa8.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/search/tags.svelte.js
var tags_svelte_exports = {};
__export(tags_svelte_exports, {
  default: () => Tags,
  load: () => load7,
  prerender: () => prerender5
});
async function load7({ url, session: session2, fetch: fetch2 }) {
  console.log("url is:", session2);
  let tag = session2.query.tag;
  let targetType = session2.query.target_type;
  console.log(tag);
  const searchUrl = `/api/v2/search/tags?target_type=${targetType}&tag=${tag}`;
  const res = await fetchFates(searchUrl, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    return { props: { data, targetType, tag } };
  }
  return {
    status: res.status,
    error: new Error(`Tag Search Error`)
  };
}
var css20, prerender5, Tags;
var init_tags_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/search/tags.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_CardContainer_4f729b6c();
    init_Tag_f7b294e7();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_Ripple_a012c9fe();
    init_modules();
    css20 = {
      code: "h1.svelte-vvwszp{font-size:50px;margin:0px}h2.svelte-vvwszp{font-size:40px;margin:0px}.best-bots.svelte-vvwszp{opacity:0.6}section.svelte-vvwszp{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;overflow:hidden}",
      map: null
    };
    prerender5 = false;
    Tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { targetType } = $$props;
      let { tag } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.targetType === void 0 && $$bindings.targetType && targetType !== void 0)
        $$bindings.targetType(targetType);
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      $$result.css.add(css20);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz/frostpaw/search/tags?q=" + tag + "&target_type=" + targetType,
        title: "Search results for " + targetType + "s tagged with " + tag,
        description: "Find, invite and discover the best " + tag + " " + targetType + "s",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}

<section class="${"svelte-vvwszp"}"><h1 class="${"svelte-vvwszp"}">Fates List</h1>
	<h2 class="${"best-bots svelte-vvwszp"}">Find the best bots for your servers!</h2></section>
${validate_component(SearchBar, "SearchBar").$$render($$result, { type: targetType, query: "" }, {}, {})}
${validate_component(Tag, "Tag").$$render($$result, { targetType, tags: data.tags_fixed }, {}, {})}
${validate_component(CardContainer, "CardContainer").$$render($$result, {}, {}, {
        default: () => `${each(data.search_res, (bot) => `${validate_component(BotCard, "BotCard").$$render($$result, { data: bot, type: targetType, rand: false }, {}, {})}`)}`
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  css: () => css21,
  entry: () => entry10,
  js: () => js10,
  module: () => tags_svelte_exports
});
var entry10, js10, css21;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_tags_svelte();
    entry10 = "pages/frostpaw/search/tags.svelte-654631f4.js";
    js10 = ["pages/frostpaw/search/tags.svelte-654631f4.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/CardContainer-fe7298a5.js", "chunks/enums-06152dee.js", "chunks/Tag-6f90ee50.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css21 = ["assets/pages/frostpaw/servers/index.svelte-e799d5c6.css", "assets/CardContainer-6f3614cc.css", "assets/Tag-3c419aa8.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/about.svelte.js
var about_svelte_exports = {};
__export(about_svelte_exports, {
  default: () => About
});
var About;
var init_about_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/about.svelte.js"() {
    init_index_36284ca1();
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { version = "4" } = $$props;
      let { frostpawVersion = "0.1.0" } = $$props;
      if ($$props.version === void 0 && $$bindings.version && version !== void 0)
        $$bindings.version(version);
      if ($$props.frostpawVersion === void 0 && $$bindings.frostpawVersion && frostpawVersion !== void 0)
        $$bindings.frostpawVersion(frostpawVersion);
      return `<h1>About Sunbeam</h1>
<p>Sunbeam Version: ${escape(version)}</p>
<p>Frostpaw Client Version: ${escape(frostpawVersion)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  css: () => css22,
  entry: () => entry11,
  js: () => js11,
  module: () => about_svelte_exports
});
var entry11, js11, css22;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_about_svelte();
    entry11 = "pages/frostpaw/about.svelte-e39bef43.js";
    js11 = ["pages/frostpaw/about.svelte-e39bef43.js", "chunks/vendor-22677977.js"];
    css22 = [];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/login.svelte.js
var login_svelte_exports = {};
__export(login_svelte_exports, {
  default: () => Login,
  prerender: () => prerender6
});
var prerender6, Login;
var init_login_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/login.svelte.js"() {
    init_index_36284ca1();
    prerender6 = false;
    Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let frostpawMsg = "Please wait...";
      return `<p style="${"font-size: bold;"}"><!-- HTML_TAG_START -->${frostpawMsg}<!-- HTML_TAG_END --></p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  css: () => css23,
  entry: () => entry12,
  js: () => js12,
  module: () => login_svelte_exports
});
var entry12, js12, css23;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_login_svelte();
    entry12 = "pages/frostpaw/login.svelte-2298c9df.js";
    js12 = ["pages/frostpaw/login.svelte-2298c9df.js", "chunks/vendor-22677977.js"];
    css23 = [];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/stats.svelte.js
var stats_svelte_exports = {};
__export(stats_svelte_exports, {
  default: () => Stats
});
var Stats;
var init_stats_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/stats.svelte.js"() {
    init_index_36284ca1();
    init_Iframe_4e66cd3b();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    Stats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Iframe, "PageFrame").$$render($$result, {
        iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/stats",
        title: "Add Bot Page",
        metaTitle: "Fates List | Stats",
        metaUrl: "https://fateslist.xyz/frostpaw/stats"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  css: () => css24,
  entry: () => entry13,
  js: () => js13,
  module: () => stats_svelte_exports
});
var entry13, js13, css24;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_stats_svelte();
    entry13 = "pages/frostpaw/stats.svelte-a589673e.js";
    js13 = ["pages/frostpaw/stats.svelte-a589673e.js", "chunks/vendor-22677977.js", "chunks/Iframe-6317140e.js", "chunks/request-2d5483df.js", "chunks/stores-56fb81e3.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css24 = ["assets/Iframe-600b88fc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/herb.svelte.js
var herb_svelte_exports = {};
__export(herb_svelte_exports, {
  default: () => Herb
});
var Herb;
var init_herb_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/herb.svelte.js"() {
    init_index_36284ca1();
    Herb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let msg = "Please wait...";
      return `<p>${escape(msg)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  css: () => css25,
  entry: () => entry14,
  js: () => js14,
  module: () => herb_svelte_exports
});
var entry14, js14, css25;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_herb_svelte();
    entry14 = "pages/frostpaw/herb.svelte-04c79b93.js";
    js14 = ["pages/frostpaw/herb.svelte-04c79b93.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js"];
    css25 = [];
  }
});

// .svelte-kit/output/server/entries/pages/frostpaw/tos.svelte.js
var tos_svelte_exports = {};
__export(tos_svelte_exports, {
  default: () => Tos,
  load: () => load8,
  prerender: () => prerender7
});
function title(str) {
  return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
async function load8({ params, fetch: fetch2, session: session2, stuff }) {
  let url = "/api/v2/policies/all";
  let res = await fetchFates(url, "", fetch2);
  if (!res.ok) {
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
  let policy = await res.json();
  return {
    props: {
      rules: policy.rules,
      privacyPolicy: policy.privacy_policy
    }
  };
}
var css26, Policy, prerender7, Tos;
var init_tos_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/frostpaw/tos.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BristlefrostMeta_5512d822();
    css26 = {
      code: "p.svelte-1iwql91{margin-left:3px}",
      map: null
    };
    Policy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(str, newStr) {
          if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
            return this.replace(str, newStr);
          }
          return this.replace(new RegExp(str, "g"), newStr);
        };
      }
      let { policy } = $$props;
      if ($$props.policy === void 0 && $$bindings.policy && policy !== void 0)
        $$bindings.policy(policy);
      $$result.css.add(css26);
      return `
${each(Object.entries(policy), (section) => `<h1>${escape(title(section[0]))}</h1>
    ${Array.isArray(section[1]) ? `<ol>${each(section[1], (sectionData) => `<li>${escape(sectionData)}</li>`)}
        </ol>` : `${each(Object.entries(section[1]), (sectionData) => `<h2>${escape(title(sectionData[0]))}</h2>
            ${Array.isArray(sectionData[1]) ? `<ol>${each(sectionData[1], (policy2) => `<li>${escape(policy2)}</li>`)}
                </ol>` : `<p class="${"svelte-1iwql91"}">${escape(sectionData[1])}</p>`}`)}`}`)}`;
    });
    prerender7 = false;
    Tos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { rules } = $$props;
      let { privacyPolicy } = $$props;
      if ($$props.rules === void 0 && $$bindings.rules && rules !== void 0)
        $$bindings.rules(rules);
      if ($$props.privacyPolicy === void 0 && $$bindings.privacyPolicy && privacyPolicy !== void 0)
        $$bindings.privacyPolicy(privacyPolicy);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz",
        title: "Fates List | Terms Of Service",
        description: "Find, invite and discover the best bots & servers now on Fates List",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}

${validate_component(Policy, "Policy").$$render($$result, { policy: rules }, {}, {})}
${validate_component(Policy, "Policy").$$render($$result, { policy: privacyPolicy }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  css: () => css27,
  entry: () => entry15,
  js: () => js15,
  module: () => tos_svelte_exports
});
var entry15, js15, css27;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_tos_svelte();
    entry15 = "pages/frostpaw/tos.svelte-5cc6cc75.js";
    js15 = ["pages/frostpaw/tos.svelte-5cc6cc75.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css27 = ["assets/pages/frostpaw/tos.svelte-64e5f360.css"];
  }
});

// .svelte-kit/output/server/entries/pages/partners.svelte.js
var partners_svelte_exports = {};
__export(partners_svelte_exports, {
  default: () => Partners,
  load: () => load9,
  prerender: () => prerender8
});
function title2(str) {
  return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
async function load9({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/partners`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    return { props: { partners: await res.json() } };
  }
  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  };
}
var css$15, Partner, css28, prerender8, Partners;
var init_partners_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/partners.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_Icon_8a17b723();
    init_BristlefrostMeta_5512d822();
    css$15 = {
      code: ".partner.svelte-11f22ai{border:solid thin white;width:90%;margin-left:auto;margin-right:auto;margin-bottom:10px;padding:3px}.partner.svelte-11f22ai:hover{transform:scale(1.025, 1.025) perspective(1px) translateZ(0)}.partner-img.svelte-11f22ai{border-radius:50%;background-color:black;max-width:100px;max-height:100px;display:inline-block;vertical-align:top}.partner-content.svelte-11f22ai{display:inline-block}",
      map: null
    };
    Partner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { partner } = $$props;
      let { icons } = $$props;
      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(str, newStr) {
          if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
            return this.replace(str, newStr);
          }
          return this.replace(new RegExp(str, "g"), newStr);
        };
      }
      if ($$props.partner === void 0 && $$bindings.partner && partner !== void 0)
        $$bindings.partner(partner);
      if ($$props.icons === void 0 && $$bindings.icons && icons !== void 0)
        $$bindings.icons(icons);
      $$result.css.add(css$15);
      return `<div${add_attribute("id", partner.id, 0)}><a${add_attribute("href", partner.links.website, 0)}><div class="${"partner svelte-11f22ai"}"><img class="${"partner-img svelte-11f22ai"}"${add_attribute("src", partner.image, 0)} alt="${escape(partner.name) + " image"}" width="${"100px"}" height="${"100px"}">
            <div class="${"partner-content svelte-11f22ai"}"><h2>${escape(partner.name)}</h2>
                <p>${escape(partner.description)}</p>
                ${each(Object.entries(partner.links), (link) => `<a${add_attribute("href", link[1], 0)}>${validate_component(Icon, "Icon").$$render($$result, { icon: icons[link[0]] }, {}, {})} ${escape(title2(link[0]))}
                    </a>`)}</div></div></a>
</div>`;
    });
    css28 = {
      code: ".content.svelte-cf77e8{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}",
      map: null
    };
    prerender8 = true;
    Partners = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { partners } = $$props;
      if ($$props.partners === void 0 && $$bindings.partners && partners !== void 0)
        $$bindings.partners(partners);
      $$result.css.add(css28);
      return `${validate_component(BristlefrostMeta, "BristlefrostMeta").$$render($$result, {
        url: "https://fateslist.xyz/partners",
        title: "Fates List | Our Partners",
        description: "See our partners and supporters!",
        thumbnail: "https://fateslist.xyz/static/botlisticon.webp"
      }, {}, {})}

<div class="${"content svelte-cf77e8"}"><h1>Our Partners</h1>

	<p>Note that Fates List is not responsible for any activities taking
		place on the below servers!
	</p></div>

${each(partners.partners, (partner) => `${validate_component(Partner, "Partner").$$render($$result, { partner, icons: partners.icons }, {}, {})}`)}`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  css: () => css29,
  entry: () => entry16,
  js: () => js16,
  module: () => partners_svelte_exports
});
var entry16, js16, css29;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_partners_svelte();
    entry16 = "pages/partners.svelte-10c5cd0d.js";
    js16 = ["pages/partners.svelte-10c5cd0d.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css29 = ["assets/pages/partners.svelte-50ac2665.css"];
  }
});

// .svelte-kit/output/server/entries/pages/profile/_id_/index.svelte.js
var index_svelte_exports5 = {};
__export(index_svelte_exports5, {
  default: () => U5Bidu5D,
  load: () => load10,
  prerender: () => prerender9
});
async function load10({ params, fetch: fetch2, session: session2, stuff }) {
  let url = `/api/v2/users/${params.id}?bot_logs=true`;
  if (session2.query.system_bots == "true") {
    url += "&system_bots=true";
  }
  const res = await fetchFates(url, "", fetch2);
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
var css30, prerender9, U5Bidu5D;
var init_index_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/profile/_id_/index.svelte.js"() {
    init_index_36284ca1();
    init_enums_2aac69e1();
    init_request_b58a31ec();
    init_CardContainer_4f729b6c();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    init_Ripple_a012c9fe();
    init_modules();
    init_Icon_8a17b723();
    css30 = {
      code: ".badge-link.svelte-kmqn98{opacity:1 !important}.badges.svelte-kmqn98{margin-left:auto;margin-right:auto;text-align:center}.badge-img.svelte-kmqn98{border-radius:50%;display:inline-block;margin-right:3px;background-color:black}.user-username.svelte-kmqn98,.user-avatar.svelte-kmqn98,.bot-action-log.svelte-kmqn98{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.user-username.svelte-kmqn98{margin-bottom:0px;padding-bottom:0px}.user-avatar.svelte-kmqn98{border-radius:50%;width:120px}#user-description.svelte-kmqn98{font-size:18px;text-align:center;margin:0px;padding:0px}#profiles-center{margin-left:auto;margin-right:auto;display:flex !important;align-items:center;width:150px;padding:3px}",
      map: null
    };
    prerender9 = false;
    U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      $$result.css.add(css30);
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
        href: "https://api.fateslist.xyz/profile/" + data.user.id + "/edit",
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
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  css: () => css31,
  entry: () => entry17,
  js: () => js17,
  module: () => index_svelte_exports5
});
var entry17, js17, css31;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    init_index_svelte5();
    entry17 = "pages/profile/_id_/index.svelte-3298c952.js";
    js17 = ["pages/profile/_id_/index.svelte-3298c952.js", "chunks/vendor-22677977.js", "chunks/enums-06152dee.js", "chunks/request-2d5483df.js", "chunks/CardContainer-fe7298a5.js", "chunks/stores-56fb81e3.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css31 = ["assets/pages/profile/_id_/index.svelte-08627ff2.css", "assets/CardContainer-6f3614cc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/profile/_id_/settings.svelte.js
var settings_svelte_exports = {};
__export(settings_svelte_exports, {
  default: () => Settings,
  load: () => load11,
  prerender: () => prerender10
});
async function load11({ params, fetch: fetch2, session: session2, stuff }) {
  return { props: { id: params.id } };
}
var prerender10, Settings;
var init_settings_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/profile/_id_/settings.svelte.js"() {
    init_index_36284ca1();
    init_Iframe_4e66cd3b();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    prerender10 = false;
    Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { id } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      return `${validate_component(Iframe, "PageFrame").$$render($$result, {
        iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/profile/" + id + "/settings",
        title: "Add Bot Page",
        metaTitle: "Fates List | Profile Edit",
        metaUrl: "https://fateslist.xyz/profile/" + id + "/settings"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  css: () => css32,
  entry: () => entry18,
  js: () => js18,
  module: () => settings_svelte_exports
});
var entry18, js18, css32;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    init_settings_svelte();
    entry18 = "pages/profile/_id_/settings.svelte-ac97b197.js";
    js18 = ["pages/profile/_id_/settings.svelte-ac97b197.js", "chunks/vendor-22677977.js", "chunks/Iframe-6317140e.js", "chunks/request-2d5483df.js", "chunks/stores-56fb81e3.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css32 = ["assets/Iframe-600b88fc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/servers/_id_/_...route_.svelte.js
var route_svelte_exports = {};
__export(route_svelte_exports, {
  default: () => U5B_routeu5D,
  load: () => load12,
  prerender: () => prerender11
});
async function load12({ params, fetch: fetch2, session: session2, stuff }) {
  return {
    status: 307,
    redirect: `/server/${params.id}/${params.route}`
  };
}
var prerender11, U5B_routeu5D;
var init_route_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/servers/_id_/_...route_.svelte.js"() {
    init_index_36284ca1();
    prerender11 = false;
    U5B_routeu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  css: () => css33,
  entry: () => entry19,
  js: () => js19,
  module: () => route_svelte_exports
});
var entry19, js19, css33;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    init_route_svelte();
    entry19 = "pages/servers/_id_/_...route_.svelte-564c8b57.js";
    js19 = ["pages/servers/_id_/_...route_.svelte-564c8b57.js", "chunks/vendor-22677977.js"];
    css33 = [];
  }
});

// .svelte-kit/output/server/chunks/index-f2488d65.js
function writable2(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
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
var subscriber_queue2, Accordion, Paper, Content, Panel$1, Header$1, Panel, Header2;
var init_index_f2488d65 = __esm({
  ".svelte-kit/output/server/chunks/index-f2488d65.js"() {
    init_index_36284ca1();
    init_Ripple_a012c9fe();
    init_classAdderBuilder_d630724f();
    subscriber_queue2 = [];
    Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "class", "multiple", "getElement"]);
      forwardEventsBuilder(get_current_component());
      let { use: use2 = [] } = $$props;
      let { class: className = "" } = $$props;
      let { multiple = false } = $$props;
      let element;
      let withOpenDialog = false;
      function getElement() {
        return element;
      }
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
    Paper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "class", "variant", "square", "color", "elevation", "transition", "getElement"]);
      forwardEventsBuilder(get_current_component());
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
    Content = classAdderBuilder({
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
    Panel$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      let { use: use2 = [] } = $$props;
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
      const disabledStore = writable2(disabled);
      $$unsubscribe_disabledStore = subscribe(disabledStore, (value) => $disabledStore = value);
      setContext("SMUI:accordion:panel:disabled", disabledStore);
      const nonInteractiveStore = writable2(nonInteractive);
      $$unsubscribe_nonInteractiveStore = subscribe(nonInteractiveStore, (value) => $nonInteractiveStore = value);
      setContext("SMUI:accordion:panel:nonInteractive", nonInteractiveStore);
      const openStore = writable2(open);
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
        usePass = [forwardEvents, ...use2];
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
    Header$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["use", "class", "style", "ripple", "getElement"]);
      let $$slots = compute_slots(slots);
      let $nonInteractive, $$unsubscribe_nonInteractive;
      let $$unsubscribe_disabled;
      let $open, $$unsubscribe_open;
      forwardEventsBuilder(get_current_component());
      let { use: use2 = [] } = $$props;
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
      if ($$props.use === void 0 && $$bindings.use && use2 !== void 0)
        $$bindings.use(use2);
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
    Panel = Panel$1;
    Header2 = Header$1;
  }
});

// node_modules/marked/lib/marked.esm.js
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
function changeDefaults(newDefaults) {
  defaults3 = newDefaults;
}
function escape3(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
function unescape(html) {
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
function edit(regex2, opt) {
  regex2 = regex2.source || regex2;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex2 = regex2.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex2, opt);
    }
  };
  return obj;
}
function cleanUrl(sanitize, base2, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base2 && !originIndependentUrl.test(href)) {
    href = resolveUrl(base2, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
function resolveUrl(base2, href) {
  if (!baseUrls[" " + base2]) {
    if (justDomain.test(base2)) {
      baseUrls[" " + base2] = base2 + "/";
    } else {
      baseUrls[" " + base2] = rtrim(base2, "/", true);
    }
  }
  base2 = baseUrls[" " + base2];
  const relativeBase = base2.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base2.replace(domain, "$1") + href;
  } else {
    return base2 + href;
  }
}
function merge(obj) {
  let i = 1, target, key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells(tableRow, count2) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped3 = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped3 = !escaped3;
    if (escaped3) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (!cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count2) {
    cells.splice(count2);
  } else {
    while (cells.length < count2)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.substr(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count2) {
  if (count2 < 1) {
    return "";
  }
  let result = "";
  while (count2 > 1) {
    if (count2 & 1) {
      result += pattern;
    }
    count2 >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer2) {
  const href = link.href;
  const title3 = link.title ? escape3(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title: title3,
      text,
      tokens: lexer2.inlineTokens(text, [])
    };
    lexer2.state.inLink = false;
    return token;
  } else {
    return {
      type: "image",
      raw,
      href,
      title: title3,
      text: escape3(text)
    };
  }
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
function marked(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
      }
      opt.highlight = highlight;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape3(e.message + "", true) + "</pre>";
    }
    throw e;
  }
}
var defaults3, escapeTest, escapeReplace, escapeTestNoEncode, escapeReplaceNoEncode, escapeReplacements, getEscapeReplacement, unescapeTest, caret, nonWordAndColonTest, originIndependentUrl, baseUrls, justDomain, protocol, domain, noopTest, Tokenizer, block, inline, Lexer, Renderer, TextRenderer, Slugger, Parser, options, setOptions, use, walkTokens, parseInline, parser, lexer;
var init_marked_esm = __esm({
  "node_modules/marked/lib/marked.esm.js"() {
    defaults3 = getDefaults();
    escapeTest = /[&<>"']/;
    escapeReplace = /[&<>"']/g;
    escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    escapeReplacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    getEscapeReplacement = (ch) => escapeReplacements[ch];
    unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
    caret = /(^|[^\[])\^/g;
    nonWordAndColonTest = /[^\w:]/g;
    originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    baseUrls = {};
    justDomain = /^[^:]+:\/*[^/]*$/;
    protocol = /^([^:]+:)[\s\S]*$/;
    domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    noopTest = { exec: function noopTest2() {
    } };
    Tokenizer = class {
      constructor(options3) {
        this.options = options3 || defaults3;
      }
      space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
          return {
            type: "space",
            raw: cap[0]
          };
        }
      }
      code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ {1,4}/gm, "");
          return {
            type: "code",
            raw: cap[0],
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim(text, "\n") : text
          };
        }
      }
      fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
          const raw = cap[0];
          const text = indentCodeCompensation(raw, cap[3] || "");
          return {
            type: "code",
            raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text
          };
        }
      }
      heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
          let text = cap[2].trim();
          if (/#$/.test(text)) {
            const trimmed = rtrim(text, "#");
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              text = trimmed.trim();
            }
          }
          const token = {
            type: "heading",
            raw: cap[0],
            depth: cap[1].length,
            text,
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }
      hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: "hr",
            raw: cap[0]
          };
        }
      }
      blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ *> ?/gm, "");
          return {
            type: "blockquote",
            raw: cap[0],
            tokens: this.lexer.blockTokens(text, []),
            text
          };
        }
      }
      list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
          let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
          let bull = cap[1].trim();
          const isordered = bull.length > 1;
          const list = {
            type: "list",
            raw: "",
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : "",
            loose: false,
            items: []
          };
          bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
          if (this.options.pedantic) {
            bull = isordered ? bull : "[*+-]";
          }
          const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*)?(?:\\n|$))`);
          while (src) {
            endEarly = false;
            if (!(cap = itemRegex.exec(src))) {
              break;
            }
            if (this.rules.block.hr.test(src)) {
              break;
            }
            raw = cap[0];
            src = src.substring(raw.length);
            line = cap[2].split("\n", 1)[0];
            nextLine = src.split("\n", 1)[0];
            if (this.options.pedantic) {
              indent = 2;
              itemContents = line.trimLeft();
            } else {
              indent = cap[2].search(/[^ ]/);
              indent = indent > 4 ? 1 : indent;
              itemContents = line.slice(indent);
              indent += cap[1].length;
            }
            blankLine = false;
            if (!line && /^ *$/.test(nextLine)) {
              raw += nextLine + "\n";
              src = src.substring(nextLine.length + 1);
              endEarly = true;
            }
            if (!endEarly) {
              const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);
              while (src) {
                rawLine = src.split("\n", 1)[0];
                line = rawLine;
                if (this.options.pedantic) {
                  line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                }
                if (nextBulletRegex.test(line)) {
                  break;
                }
                if (line.search(/[^ ]/) >= indent || !line.trim()) {
                  itemContents += "\n" + line.slice(indent);
                } else if (!blankLine) {
                  itemContents += "\n" + line;
                } else {
                  break;
                }
                if (!blankLine && !line.trim()) {
                  blankLine = true;
                }
                raw += rawLine + "\n";
                src = src.substring(rawLine.length + 1);
              }
            }
            if (!list.loose) {
              if (endsWithBlankLine) {
                list.loose = true;
              } else if (/\n *\n *$/.test(raw)) {
                endsWithBlankLine = true;
              }
            }
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.exec(itemContents);
              if (istask) {
                ischecked = istask[0] !== "[ ] ";
                itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
              }
            }
            list.items.push({
              type: "list_item",
              raw,
              task: !!istask,
              checked: ischecked,
              loose: false,
              text: itemContents
            });
            list.raw += raw;
          }
          list.items[list.items.length - 1].raw = raw.trimRight();
          list.items[list.items.length - 1].text = itemContents.trimRight();
          list.raw = list.raw.trimRight();
          const l = list.items.length;
          for (i = 0; i < l; i++) {
            this.lexer.state.top = false;
            list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
            const spacers = list.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.every((t) => {
              const chars2 = t.raw.split("");
              let lineBreaks = 0;
              for (const char of chars2) {
                if (char === "\n") {
                  lineBreaks += 1;
                }
                if (lineBreaks > 1) {
                  return true;
                }
              }
              return false;
            });
            if (!list.loose && spacers.length && hasMultipleLineBreaks) {
              list.loose = true;
              list.items[i].loose = true;
            }
          }
          return list;
        }
      }
      html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
          const token = {
            type: "html",
            raw: cap[0],
            pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
            text: cap[0]
          };
          if (this.options.sanitize) {
            token.type = "paragraph";
            token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]);
            token.tokens = [];
            this.lexer.inline(token.text, token.tokens);
          }
          return token;
        }
      }
      def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
          if (cap[3])
            cap[3] = cap[3].substring(1, cap[3].length - 1);
          const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
          return {
            type: "def",
            tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      }
      table(src) {
        const cap = this.rules.block.table.exec(src);
        if (cap) {
          const item = {
            type: "table",
            header: splitCells(cap[1]).map((c) => {
              return { text: c };
            }),
            align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            rows: cap[3] ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
          };
          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            let l = item.align.length;
            let i, j, k, row;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            l = item.rows.length;
            for (i = 0; i < l; i++) {
              item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
                return { text: c };
              });
            }
            l = item.header.length;
            for (j = 0; j < l; j++) {
              item.header[j].tokens = [];
              this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
            }
            l = item.rows.length;
            for (j = 0; j < l; j++) {
              row = item.rows[j];
              for (k = 0; k < row.length; k++) {
                row[k].tokens = [];
                this.lexer.inlineTokens(row[k].text, row[k].tokens);
              }
            }
            return item;
          }
        }
      }
      lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
          const token = {
            type: "heading",
            raw: cap[0],
            depth: cap[2].charAt(0) === "=" ? 1 : 2,
            text: cap[1],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }
      paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          const token = {
            type: "paragraph",
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }
      text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
          const token = {
            type: "text",
            raw: cap[0],
            text: cap[0],
            tokens: []
          };
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      }
      escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: "escape",
            raw: cap[0],
            text: escape3(cap[1])
          };
        }
      }
      tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
            this.lexer.state.inLink = true;
          } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
            this.lexer.state.inLink = false;
          }
          if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = true;
          } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            this.lexer.state.inRawBlock = false;
          }
          return {
            type: this.options.sanitize ? "text" : "html",
            raw: cap[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]) : cap[0]
          };
        }
      }
      link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
          const trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            if (!/>$/.test(trimmedUrl)) {
              return;
            }
            const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            const lastParenIndex = findClosingBracket(cap[2], "()");
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf("!") === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = "";
            }
          }
          let href = cap[2];
          let title3 = "";
          if (this.options.pedantic) {
            const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
            if (link) {
              href = link[1];
              title3 = link[3];
            }
          } else {
            title3 = cap[3] ? cap[3].slice(1, -1) : "";
          }
          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
            title: title3 ? title3.replace(this.rules.inline._escapes, "$1") : title3
          }, cap[0], this.lexer);
        }
      }
      reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
          link = links[link.toLowerCase()];
          if (!link || !link.href) {
            const text = cap[0].charAt(0);
            return {
              type: "text",
              raw: text,
              text
            };
          }
          return outputLink(cap, link, cap[0], this.lexer);
        }
      }
      emStrong(src, maskedSrc, prevChar = "") {
        let match = this.rules.inline.emStrong.lDelim.exec(src);
        if (!match)
          return;
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
          return;
        const nextChar = match[1] || match[2] || "";
        if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
          const lLength = match[0].length - 1;
          let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
          const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
          endReg.lastIndex = 0;
          maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
          while ((match = endReg.exec(maskedSrc)) != null) {
            rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
            if (!rDelim)
              continue;
            rLength = rDelim.length;
            if (match[3] || match[4]) {
              delimTotal += rLength;
              continue;
            } else if (match[5] || match[6]) {
              if (lLength % 3 && !((lLength + rLength) % 3)) {
                midDelimTotal += rLength;
                continue;
              }
            }
            delimTotal -= rLength;
            if (delimTotal > 0)
              continue;
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
            if (Math.min(lLength, rLength) % 2) {
              const text2 = src.slice(1, lLength + match.index + rLength);
              return {
                type: "em",
                raw: src.slice(0, lLength + match.index + rLength + 1),
                text: text2,
                tokens: this.lexer.inlineTokens(text2, [])
              };
            }
            const text = src.slice(2, lLength + match.index + rLength - 1);
            return {
              type: "strong",
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text,
              tokens: this.lexer.inlineTokens(text, [])
            };
          }
        }
      }
      codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
          let text = cap[2].replace(/\n/g, " ");
          const hasNonSpaceChars = /[^ ]/.test(text);
          const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = escape3(text, true);
          return {
            type: "codespan",
            raw: cap[0],
            text
          };
        }
      }
      br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: "br",
            raw: cap[0]
          };
        }
      }
      del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: "del",
            raw: cap[0],
            text: cap[2],
            tokens: this.lexer.inlineTokens(cap[2], [])
          };
        }
      }
      autolink(src, mangle2) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          let text, href;
          if (cap[2] === "@") {
            text = escape3(this.options.mangle ? mangle2(cap[1]) : cap[1]);
            href = "mailto:" + text;
          } else {
            text = escape3(cap[1]);
            href = text;
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: "text",
                raw: text,
                text
              }
            ]
          };
        }
      }
      url(src, mangle2) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
          let text, href;
          if (cap[2] === "@") {
            text = escape3(this.options.mangle ? mangle2(cap[0]) : cap[0]);
            href = "mailto:" + text;
          } else {
            let prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text = escape3(cap[0]);
            if (cap[1] === "www.") {
              href = "http://" + text;
            } else {
              href = text;
            }
          }
          return {
            type: "link",
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: "text",
                raw: text,
                text
              }
            ]
          };
        }
      }
      inlineText(src, smartypants2) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
          let text;
          if (this.lexer.state.inRawBlock) {
            text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]) : cap[0];
          } else {
            text = escape3(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
          }
          return {
            type: "text",
            raw: cap[0],
            text
          };
        }
      }
    };
    block = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
      html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      table: noopTest,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
      text: /^[^\n]+/
    };
    block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
    block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
    block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
    block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
    block.normal = merge({}, block);
    block.gfm = merge({}, block.normal, {
      table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    });
    block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
    block.pedantic = merge({}, block.normal, {
      html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest,
      paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest,
      tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
      nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
      reflinkSearch: "reflink|nolink(?!\\()",
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\spunctuation])/
    };
    inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
    inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
    inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
    inline.escapedEmSt = /\\\*|\\_/g;
    inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
    inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
    inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
    inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
    inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
    inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
    inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
    inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
    inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
    inline.normal = merge({}, inline);
    inline.pedantic = merge({}, inline.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
      reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
    });
    inline.gfm = merge({}, inline.normal, {
      escape: edit(inline.escape).replace("])", "~|])").getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    });
    inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
    inline.breaks = merge({}, inline.gfm, {
      br: edit(inline.br).replace("{2,}", "*").getRegex(),
      text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    Lexer = class {
      constructor(options3) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options3 || defaults3;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
          inLink: false,
          inRawBlock: false,
          top: true
        };
        const rules = {
          block: block.normal,
          inline: inline.normal
        };
        if (this.options.pedantic) {
          rules.block = block.pedantic;
          rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
          rules.block = block.gfm;
          if (this.options.breaks) {
            rules.inline = inline.breaks;
          } else {
            rules.inline = inline.gfm;
          }
        }
        this.tokenizer.rules = rules;
      }
      static get rules() {
        return {
          block,
          inline
        };
      }
      static lex(src, options3) {
        const lexer2 = new Lexer(options3);
        return lexer2.lex(src);
      }
      static lexInline(src, options3) {
        const lexer2 = new Lexer(options3);
        return lexer2.inlineTokens(src);
      }
      lex(src) {
        src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
        this.blockTokens(src, this.tokens);
        let next;
        while (next = this.inlineQueue.shift()) {
          this.inlineTokens(next.src, next.tokens);
        }
        return this.tokens;
      }
      blockTokens(src, tokens = []) {
        if (this.options.pedantic) {
          src = src.replace(/^ +$/gm, "");
        }
        let token, lastToken, cutSrc, lastParagraphClipped;
        while (src) {
          if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.raw.length === 1 && tokens.length > 0) {
              tokens[tokens.length - 1].raw += "\n";
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.code(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.def(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.raw;
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startBlock) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startBlock.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
            lastToken = tokens[tokens.length - 1];
            if (lastParagraphClipped && lastToken.type === "paragraph") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            lastParagraphClipped = cutSrc.length !== src.length;
            src = src.substring(token.raw.length);
            continue;
          }
          if (token = this.tokenizer.text(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += "\n" + token.raw;
              lastToken.text += "\n" + token.text;
              this.inlineQueue.pop();
              this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        this.state.top = true;
        return tokens;
      }
      inline(src, tokens) {
        this.inlineQueue.push({ src, tokens });
      }
      inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        if (this.tokens.links) {
          const links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        }
        while (src) {
          if (!keepPrevChar) {
            prevChar = "";
          }
          keepPrevChar = false;
          if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
            if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              return true;
            }
            return false;
          })) {
            continue;
          }
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.tag(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === "text" && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startInline) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startInline.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call({ lexer: this }, tempSrc);
              if (typeof tempStart === "number" && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
            src = src.substring(token.raw.length);
            if (token.raw.slice(-1) !== "_") {
              prevChar = token.raw.slice(-1);
            }
            keepPrevChar = true;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === "text") {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }
          if (src) {
            const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      }
    };
    Renderer = class {
      constructor(options3) {
        this.options = options3 || defaults3;
      }
      code(code, infostring, escaped3) {
        const lang = (infostring || "").match(/\S*/)[0];
        if (this.options.highlight) {
          const out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped3 = true;
            code = out;
          }
        }
        code = code.replace(/\n$/, "") + "\n";
        if (!lang) {
          return "<pre><code>" + (escaped3 ? code : escape3(code, true)) + "</code></pre>\n";
        }
        return '<pre><code class="' + this.options.langPrefix + escape3(lang, true) + '">' + (escaped3 ? code : escape3(code, true)) + "</code></pre>\n";
      }
      blockquote(quote) {
        return "<blockquote>\n" + quote + "</blockquote>\n";
      }
      html(html) {
        return html;
      }
      heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
        }
        return "<h" + level + ">" + text + "</h" + level + ">\n";
      }
      hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
      }
      list(body, ordered, start) {
        const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
      }
      listitem(text) {
        return "<li>" + text + "</li>\n";
      }
      checkbox(checked) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      }
      paragraph(text) {
        return "<p>" + text + "</p>\n";
      }
      table(header, body) {
        if (body)
          body = "<tbody>" + body + "</tbody>";
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      }
      tablerow(content) {
        return "<tr>\n" + content + "</tr>\n";
      }
      tablecell(content, flags) {
        const type = flags.header ? "th" : "td";
        const tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
        return tag + content + "</" + type + ">\n";
      }
      strong(text) {
        return "<strong>" + text + "</strong>";
      }
      em(text) {
        return "<em>" + text + "</em>";
      }
      codespan(text) {
        return "<code>" + text + "</code>";
      }
      br() {
        return this.options.xhtml ? "<br/>" : "<br>";
      }
      del(text) {
        return "<del>" + text + "</del>";
      }
      link(href, title3, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        let out = '<a href="' + escape3(href) + '"';
        if (title3) {
          out += ' title="' + title3 + '"';
        }
        out += ">" + text + "</a>";
        return out;
      }
      image(href, title3, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title3) {
          out += ' title="' + title3 + '"';
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
      }
      text(text) {
        return text;
      }
    };
    TextRenderer = class {
      strong(text) {
        return text;
      }
      em(text) {
        return text;
      }
      codespan(text) {
        return text;
      }
      del(text) {
        return text;
      }
      html(text) {
        return text;
      }
      text(text) {
        return text;
      }
      link(href, title3, text) {
        return "" + text;
      }
      image(href, title3, text) {
        return "" + text;
      }
      br() {
        return "";
      }
    };
    Slugger = class {
      constructor() {
        this.seen = {};
      }
      serialize(value) {
        return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
      }
      getNextSafeSlug(originalSlug, isDryRun) {
        let slug = originalSlug;
        let occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + "-" + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      }
      slug(value, options3 = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options3.dryrun);
      }
    };
    Parser = class {
      constructor(options3) {
        this.options = options3 || defaults3;
        this.options.renderer = this.options.renderer || new Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer();
        this.slugger = new Slugger();
      }
      static parse(tokens, options3) {
        const parser2 = new Parser(options3);
        return parser2.parse(tokens);
      }
      static parseInline(tokens, options3) {
        const parser2 = new Parser(options3);
        return parser2.parseInline(tokens);
      }
      parse(tokens, top = true) {
        let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
              out += ret || "";
              continue;
            }
          }
          switch (token.type) {
            case "space": {
              continue;
            }
            case "hr": {
              out += this.renderer.hr();
              continue;
            }
            case "heading": {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }
            case "code": {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }
            case "table": {
              header = "";
              cell = "";
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
              }
              header += this.renderer.tablerow(cell);
              body = "";
              l2 = token.rows.length;
              for (j = 0; j < l2; j++) {
                row = token.rows[j];
                cell = "";
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
                }
                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
            case "blockquote": {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
            case "list": {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = "";
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = "";
                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);
                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                      item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                        item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: "text",
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }
                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }
              out += this.renderer.list(body, ordered, start);
              continue;
            }
            case "html": {
              out += this.renderer.html(token.text);
              continue;
            }
            case "paragraph": {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
            case "text": {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === "text") {
                token = tokens[++i];
                body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = "", i, token, ret;
        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
            if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
              out += ret || "";
              continue;
            }
          }
          switch (token.type) {
            case "escape": {
              out += renderer.text(token.text);
              break;
            }
            case "html": {
              out += renderer.html(token.text);
              break;
            }
            case "link": {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
            case "image": {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
            case "strong": {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
            case "em": {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
            case "codespan": {
              out += renderer.codespan(token.text);
              break;
            }
            case "br": {
              out += renderer.br();
              break;
            }
            case "del": {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
            case "text": {
              out += renderer.text(token.text);
              break;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
    };
    marked.options = marked.setOptions = function(opt) {
      merge(marked.defaults, opt);
      changeDefaults(marked.defaults);
      return marked;
    };
    marked.getDefaults = getDefaults;
    marked.defaults = defaults3;
    marked.use = function(...args) {
      const opts = merge({}, ...args);
      const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
      let hasExtensions;
      args.forEach((pack) => {
        if (pack.extensions) {
          hasExtensions = true;
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if (ext.renderer) {
              const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if (ext.tokenizer) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              if (extensions[ext.level]) {
                extensions[ext.level].unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if (ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
        }
        if (pack.renderer) {
          const renderer = marked.defaults.renderer || new Renderer();
          for (const prop in pack.renderer) {
            const prevRenderer = renderer[prop];
            renderer[prop] = (...args2) => {
              let ret = pack.renderer[prop].apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret;
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = marked.defaults.tokenizer || new Tokenizer();
          for (const prop in pack.tokenizer) {
            const prevTokenizer = tokenizer[prop];
            tokenizer[prop] = (...args2) => {
              let ret = pack.tokenizer[prop].apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.walkTokens) {
          const walkTokens2 = marked.defaults.walkTokens;
          opts.walkTokens = function(token) {
            pack.walkTokens.call(this, token);
            if (walkTokens2) {
              walkTokens2.call(this, token);
            }
          };
        }
        if (hasExtensions) {
          opts.extensions = extensions;
        }
        marked.setOptions(opts);
      });
    };
    marked.walkTokens = function(tokens, callback) {
      for (const token of tokens) {
        callback.call(marked, token);
        switch (token.type) {
          case "table": {
            for (const cell of token.header) {
              marked.walkTokens(cell.tokens, callback);
            }
            for (const row of token.rows) {
              for (const cell of row) {
                marked.walkTokens(cell.tokens, callback);
              }
            }
            break;
          }
          case "list": {
            marked.walkTokens(token.items, callback);
            break;
          }
          default: {
            if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
              marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                marked.walkTokens(token[childTokens], callback);
              });
            } else if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
        }
      }
    };
    marked.parseInline = function(src, opt) {
      if (typeof src === "undefined" || src === null) {
        throw new Error("marked.parseInline(): input parameter is undefined or null");
      }
      if (typeof src !== "string") {
        throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
      }
      opt = merge({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);
      try {
        const tokens = Lexer.lexInline(src, opt);
        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }
        return Parser.parseInline(tokens, opt);
      } catch (e) {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (opt.silent) {
          return "<p>An error occurred:</p><pre>" + escape3(e.message + "", true) + "</pre>";
        }
        throw e;
      }
    };
    marked.Parser = Parser;
    marked.parser = Parser.parse;
    marked.Renderer = Renderer;
    marked.TextRenderer = TextRenderer;
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    marked.Tokenizer = Tokenizer;
    marked.Slugger = Slugger;
    marked.parse = marked;
    options = marked.options;
    setOptions = marked.setOptions;
    use = marked.use;
    walkTokens = marked.walkTokens;
    parseInline = marked.parseInline;
    parser = Parser.parse;
    lexer = Lexer.lex;
  }
});

// .svelte-kit/output/server/chunks/BotServerPage-0f5308d5.js
var css$16, Tab, css34, BotServerPage;
var init_BotServerPage_0f5308d5 = __esm({
  ".svelte-kit/output/server/chunks/BotServerPage-0f5308d5.js"() {
    init_index_36284ca1();
    init_index_f2488d65();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_marked_esm();
    init_stores_d5eb43fc();
    css$16 = {
      code: ".slider{-webkit-appearance:none;width:20%;height:5px;border-radius:5px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:0.2s;transition:opacity 0.2s}.tab.svelte-1eqkww1.svelte-1eqkww1{text-align:center;color:white !important;border:none}.tab.svelte-1eqkww1 button.svelte-1eqkww1{background-color:black;color:white;border:none;outline:none;cursor:pointer;padding:14px 16px;transition:0.3s}.tab.svelte-1eqkww1 button.svelte-1eqkww1:hover{background-color:#2e3033}.tab button.active{border-bottom:solid !important;color:white !important}.tabcontent{display:none}.tabdesign{color:white !important;text-align:left !important;margin-left:5%;margin-right:5%;margin-top:13px;border:none !important}.blackbar.svelte-1eqkww1.svelte-1eqkww1{background:black;border:hidden;margin-top:5px;min-height:700px;padding:5px;margin-bottom:0px}#switcher.svelte-1eqkww1.svelte-1eqkww1{border-radius:13px;margin-left:1.1%;margin-right:1.1%}",
      map: null
    };
    Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { tabs } = $$props;
      let { defaultTabButton } = $$props;
      if ($$props.tabs === void 0 && $$bindings.tabs && tabs !== void 0)
        $$bindings.tabs(tabs);
      if ($$props.defaultTabButton === void 0 && $$bindings.defaultTabButton && defaultTabButton !== void 0)
        $$bindings.defaultTabButton(defaultTabButton);
      $$result.css.add(css$16);
      return `<div id="${"switcher"}" style="${"margin-bottom: 3px;"}" class="${"blackbar svelte-1eqkww1"}"><div class="${"tab svelte-1eqkww1"}">${each(tabs, (tab) => `<button id="${escape(tab.id) + "-tab-button"}" class="${"tablinks svelte-1eqkww1"}">${escape(tab.name)}</button>`)}</div>
	${slots.default ? slots.default({}) : ``}
</div>`;
    });
    css34 = {
      code: "#review-add{opacity:1 !important;border:solid thin;width:250px;max-width:250px;margin-bottom:10px}.buttons-all{background-color:black !important;margin-right:10px}.codehilite{background-color:white}.prefix.svelte-1uyxte0{opacity:0.65}.bot-page-banner.svelte-1uyxte0{background-size:cover;width:100%;height:100%;min-height:1000px;background-repeat:no-repeat}.bot-page.svelte-1uyxte0{display:flex;flex-wrap:wrap}.bot-username.svelte-1uyxte0,.bot-avatar.svelte-1uyxte0{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.bot-username.svelte-1uyxte0,span.svelte-1uyxte0{margin-bottom:0px;padding-bottom:0px}.bot-avatar.svelte-1uyxte0{border-radius:50%;width:120px}.bot-page-content.svelte-1uyxte0{display:block;margin:10px;width:100%}.accordion-container.svelte-1uyxte0{display:block;cursor:text !important}#bot-description.svelte-1uyxte0{font-size:18px;text-align:center;margin:0px;padding:0px}.buttons-all{color:white !important;border:solid thin !important;opacity:1 !important;word-wrap:break-word !important;font-size:15px !important}.buttons.svelte-1uyxte0{display:flex;flex-flow:column-wrap;justify-content:center;align-items:center;width:93%;height:53px;margin:0 auto}@media screen and (max-width: 768px){.buttons.svelte-1uyxte0{margin-left:3px !important;width:100% !important}}@media screen and (max-width: 992px){.buttons.svelte-1uyxte0{overflow-x:scroll;overflow-y:hidden}}.buttons.svelte-1uyxte0{word-wrap:break-word;text-overflow:ellipsis}.buttons.svelte-1uyxte0{margin-bottom:40px}.disabled{opacity:0.63 !important}.review-user{opacity:1;margin-top:5px;padding-left:3px;box-sizing:border-box;margin-bottom:2px}.review-left{display:inline-block}.page-item{display:inline-block;margin-right:5px !important;list-style:none}.bot-username-link.svelte-1uyxte0,#bot-name.svelte-1uyxte0{margin-top:0px !important;margin-bottom:1px !important}",
      map: null
    };
    BotServerPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      $$result.css.add(css34);
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
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
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
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
            default: () => `Bot Denied
                        `
          })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
            default: () => `This bot has been DENIED from this list for being a 
                            low-quality bot. Please do not invite it.
                        `
          })}`
        })}` : `${data.state == enums.BotState.banned ? `${validate_component(Panel, "Panel").$$render($$result, { color: "primary", open: true }, {}, {
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
            default: () => `Bot Banned
                        `
          })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
            default: () => `This bot has been BANNED from this bot list for violating our rules or being a low-quality bot. 
                            Please do not invite it until further notice!
                        `
          })}`
        })}` : `${data.state == enums.BotState.pending ? `${validate_component(Panel, "Panel").$$render($$result, { color: "secondary", open: true }, {}, {
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
            default: () => `Bot Pending Review
		  	`
          })}
			${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
            default: () => `This bot has not yet been tested and may be low quality or malicious. Please do not invite it yet
			`
          })}`
        })}` : `${data.state == enums.BotState.under_review ? `${validate_component(Panel, "Panel").$$render($$result, { color: "secondary", open: true }, {}, {
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
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
  }
});

// .svelte-kit/output/server/entries/pages/server/_id_/index.svelte.js
var index_svelte_exports6 = {};
__export(index_svelte_exports6, {
  default: () => U5Bidu5D2,
  load: () => load13,
  prerender: () => prerender12
});
async function load13({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/guilds/${params.id}/_sunbeam`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    return {
      props: {
        data: data.data,
        cacheVersion: data.fl_cache_ver
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Server Not Found`)
  };
}
var prerender12, U5Bidu5D2;
var init_index_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/server/_id_/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BotServerPage_0f5308d5();
    init_index_f2488d65();
    init_Ripple_a012c9fe();
    init_modules();
    init_classAdderBuilder_d630724f();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_marked_esm();
    init_stores_d5eb43fc();
    prerender12 = false;
    U5Bidu5D2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${validate_component(BotServerPage, "BotServerPage").$$render($$result, { data, type: "server" }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports20 = {};
__export(__exports20, {
  css: () => css35,
  entry: () => entry20,
  js: () => js20,
  module: () => index_svelte_exports6
});
var entry20, js20, css35;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    init_index_svelte6();
    entry20 = "pages/server/_id_/index.svelte-c3788215.js";
    js20 = ["pages/server/_id_/index.svelte-c3788215.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BotServerPage-4b9fe93b.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/enums-06152dee.js", "chunks/stores-56fb81e3.js"];
    css35 = ["assets/BotServerPage-3465167f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/server/_id_/invite.svelte.js
var invite_svelte_exports = {};
__export(invite_svelte_exports, {
  default: () => Invite,
  load: () => load14,
  prerender: () => prerender13
});
async function load14({ params, fetch: fetch2, session: session2, stuff }) {
  let auth = "";
  if (session2.session.user) {
    auth = `${session2.session.user.id}|${session2.session.token}`;
  }
  let inviteUrl = await fetch2(`https://api.fateslist.xyz/api/v2/guilds/${params.id}/_sunbeam/invite`, {
    method: "GET",
    headers: {
      "Frostpaw": "0.1.0",
      "Frostpaw-Auth": auth
    }
  });
  let inviteJson = await inviteUrl.json();
  if (!inviteUrl.ok) {
    return {
      status: 400,
      error: new Error(inviteJson.reason)
    };
  }
  return { status: 307, redirect: inviteJson.invite };
}
var prerender13, Invite;
var init_invite_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/server/_id_/invite.svelte.js"() {
    init_index_36284ca1();
    prerender13 = false;
    Invite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/20.js
var __exports21 = {};
__export(__exports21, {
  css: () => css36,
  entry: () => entry21,
  js: () => js21,
  module: () => invite_svelte_exports
});
var entry21, js21, css36;
var init__21 = __esm({
  ".svelte-kit/output/server/nodes/20.js"() {
    init_invite_svelte();
    entry21 = "pages/server/_id_/invite.svelte-81102412.js";
    js21 = ["pages/server/_id_/invite.svelte-81102412.js", "chunks/vendor-22677977.js"];
    css36 = [];
  }
});

// .svelte-kit/output/server/entries/pages/bots/_id_/_...route_.svelte.js
var route_svelte_exports2 = {};
__export(route_svelte_exports2, {
  default: () => U5B_routeu5D2,
  load: () => load15,
  prerender: () => prerender14
});
async function load15({ params, fetch: fetch2, session: session2, stuff }) {
  console.log(params, "Bot redirector");
  return {
    status: 307,
    redirect: `/bot/${params.id}/${params.route}`
  };
}
var prerender14, U5B_routeu5D2;
var init_route_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/bots/_id_/_...route_.svelte.js"() {
    init_index_36284ca1();
    prerender14 = false;
    U5B_routeu5D2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/21.js
var __exports22 = {};
__export(__exports22, {
  css: () => css37,
  entry: () => entry22,
  js: () => js22,
  module: () => route_svelte_exports2
});
var entry22, js22, css37;
var init__22 = __esm({
  ".svelte-kit/output/server/nodes/21.js"() {
    init_route_svelte2();
    entry22 = "pages/bots/_id_/_...route_.svelte-f3ff95f8.js";
    js22 = ["pages/bots/_id_/_...route_.svelte-f3ff95f8.js", "chunks/vendor-22677977.js"];
    css37 = [];
  }
});

// .svelte-kit/output/server/entries/pages/bot/admin/add.svelte.js
var add_svelte_exports = {};
__export(add_svelte_exports, {
  default: () => Add,
  load: () => load16,
  prerender: () => prerender15
});
async function load16({ params, fetch: fetch2, session: session2, stuff }) {
  return {
    status: 307,
    redirect: "https://fateslist.xyz/frostpaw/add-bot"
  };
}
var prerender15, Add;
var init_add_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/bot/admin/add.svelte.js"() {
    init_index_36284ca1();
    prerender15 = false;
    Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/22.js
var __exports23 = {};
__export(__exports23, {
  css: () => css38,
  entry: () => entry23,
  js: () => js23,
  module: () => add_svelte_exports
});
var entry23, js23, css38;
var init__23 = __esm({
  ".svelte-kit/output/server/nodes/22.js"() {
    init_add_svelte();
    entry23 = "pages/bot/admin/add.svelte-4ad27746.js";
    js23 = ["pages/bot/admin/add.svelte-4ad27746.js", "chunks/vendor-22677977.js"];
    css38 = [];
  }
});

// .svelte-kit/output/server/entries/pages/bot/_id_/index.svelte.js
var index_svelte_exports7 = {};
__export(index_svelte_exports7, {
  default: () => U5Bidu5D3,
  load: () => load17,
  prerender: () => prerender16
});
async function load17({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/bots/${params.id}/_sunbeam`;
  let auth = "";
  if (session2.session.user) {
    auth = `${session2.session.user.id}|${session2.session.token}`;
  }
  const res = await fetchFates(url, auth, fetch2);
  if (res.ok) {
    let data = await res.json();
    return {
      props: {
        data: data.data,
        cacheVersion: data.fl_cache_ver
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Bot Not Found`)
  };
}
var prerender16, U5Bidu5D3;
var init_index_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/bot/_id_/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BotServerPage_0f5308d5();
    init_index_f2488d65();
    init_Ripple_a012c9fe();
    init_modules();
    init_classAdderBuilder_d630724f();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_marked_esm();
    init_stores_d5eb43fc();
    prerender16 = false;
    U5Bidu5D3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${validate_component(BotServerPage, "BotServerPage").$$render($$result, { data, type: "bot" }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/23.js
var __exports24 = {};
__export(__exports24, {
  css: () => css39,
  entry: () => entry24,
  js: () => js24,
  module: () => index_svelte_exports7
});
var entry24, js24, css39;
var init__24 = __esm({
  ".svelte-kit/output/server/nodes/23.js"() {
    init_index_svelte7();
    entry24 = "pages/bot/_id_/index.svelte-ef5c5e08.js";
    js24 = ["pages/bot/_id_/index.svelte-ef5c5e08.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BotServerPage-4b9fe93b.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/enums-06152dee.js", "chunks/stores-56fb81e3.js"];
    css39 = ["assets/BotServerPage-3465167f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/bot/_id_/settings.svelte.js
var settings_svelte_exports2 = {};
__export(settings_svelte_exports2, {
  default: () => Settings2,
  load: () => load18,
  prerender: () => prerender17
});
async function load18({ params, fetch: fetch2, session: session2, stuff }) {
  return { props: { id: params.id } };
}
var prerender17, Settings2;
var init_settings_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/bot/_id_/settings.svelte.js"() {
    init_index_36284ca1();
    init_Iframe_4e66cd3b();
    init_stores_d5eb43fc();
    init_BristlefrostMeta_5512d822();
    prerender17 = false;
    Settings2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { id } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      return `${validate_component(Iframe, "PageFrame").$$render($$result, {
        iframeUrl: "https://api.fateslist.xyz/_sunbeam/pub/bot/" + id + "/settings",
        title: "Add Bot Page",
        metaTitle: "Fates List | Bot Settings",
        metaUrl: "https://fateslist.xyz/bot/" + id + "/settings"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/24.js
var __exports25 = {};
__export(__exports25, {
  css: () => css40,
  entry: () => entry25,
  js: () => js25,
  module: () => settings_svelte_exports2
});
var entry25, js25, css40;
var init__25 = __esm({
  ".svelte-kit/output/server/nodes/24.js"() {
    init_settings_svelte2();
    entry25 = "pages/bot/_id_/settings.svelte-48c32087.js";
    js25 = ["pages/bot/_id_/settings.svelte-48c32087.js", "chunks/vendor-22677977.js", "chunks/Iframe-6317140e.js", "chunks/request-2d5483df.js", "chunks/stores-56fb81e3.js", "chunks/BristlefrostMeta-4b5eefb5.js"];
    css40 = ["assets/Iframe-600b88fc.css"];
  }
});

// .svelte-kit/output/server/entries/pages/bot/_id_/invite.svelte.js
var invite_svelte_exports2 = {};
__export(invite_svelte_exports2, {
  default: () => Invite2,
  load: () => load19,
  prerender: () => prerender18
});
async function load19({ params, fetch: fetch2, session: session2, stuff }) {
  let inviteUrl = await fetchFates(`/api/v2/bots/${params.id}/_sunbeam/invite`, "", fetch2);
  let inviteJson = await inviteUrl.json();
  if (!inviteUrl.ok) {
    return {
      status: 400,
      error: new Error(`${inviteUrl.reason}`)
    };
  }
  console.log(inviteJson, decodeURIComponent(inviteJson.invite));
  return {
    status: 307,
    redirect: decodeURIComponent(inviteJson.invite)
  };
}
var prerender18, Invite2;
var init_invite_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/bot/_id_/invite.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    prerender18 = false;
    Invite2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/25.js
var __exports26 = {};
__export(__exports26, {
  css: () => css41,
  entry: () => entry26,
  js: () => js26,
  module: () => invite_svelte_exports2
});
var entry26, js26, css41;
var init__26 = __esm({
  ".svelte-kit/output/server/nodes/25.js"() {
    init_invite_svelte2();
    entry26 = "pages/bot/_id_/invite.svelte-0b15868f.js";
    js26 = ["pages/bot/_id_/invite.svelte-0b15868f.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js"];
    css41 = [];
  }
});

// .svelte-kit/output/server/chunks/BotServerVotePage-788b5671.js
var css42, BotServerVotePage;
var init_BotServerVotePage_788b5671 = __esm({
  ".svelte-kit/output/server/chunks/BotServerVotePage-788b5671.js"() {
    init_index_36284ca1();
    init_index_f2488d65();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_stores_d5eb43fc();
    css42 = {
      code: ".buttons-all{background-color:black !important}.codehilite{background-color:white}.prefix.svelte-1t3l1wv{opacity:0.65}.bot-page-banner.svelte-1t3l1wv{background-size:cover;width:100%;height:100%;min-height:1000px;background-repeat:no-repeat}.bot-page.svelte-1t3l1wv{display:flex;flex-wrap:wrap}.bot-username.svelte-1t3l1wv,.bot-avatar.svelte-1t3l1wv{display:flex;opacity:1 !important;justify-content:center;align-items:center;margin:0 auto}.bot-username.svelte-1t3l1wv,span.svelte-1t3l1wv{margin-bottom:0px;padding-bottom:0px}.bot-avatar.svelte-1t3l1wv{border-radius:50%;width:120px}.bot-page-content.svelte-1t3l1wv{display:block;margin:10px;width:100%}.accordion-container.svelte-1t3l1wv{display:block;cursor:text !important}#bot-description.svelte-1t3l1wv{font-size:18px;text-align:center;margin:0px;padding:0px}.buttons-all{color:white !important;border:solid thin !important;opacity:1 !important;margin-right:10px}.buttons.svelte-1t3l1wv{margin-left:auto;text-align:center}.disabled{opacity:0.63 !important}.review-user{opacity:1;margin-top:5px;padding-left:3px;box-sizing:border-box;margin-bottom:2px}.review-left{display:inline-block}.page-item{display:inline-block;margin-right:5px !important;list-style:none}.bot-username-link.svelte-1t3l1wv,#bot-name.svelte-1t3l1wv{margin-top:0px !important;margin-bottom:1px !important}.red.svelte-1t3l1wv{color:red}#vote-warning.svelte-1t3l1wv{text-align:center}",
      map: null
    };
    BotServerVotePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_session;
      $$unsubscribe_session = subscribe(session, (value) => value);
      let { data } = $$props;
      let { type } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      $$result.css.add(css42);
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
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
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
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
            default: () => `Bot Denied
                        `
          })}
                        ${validate_component(Content, "Content").$$render($$result, { class: "accordian-container" }, {}, {
            default: () => `This bot has been DENIED from this list for being a 
                            low-quality bot. Please do not invite it.
                        `
          })}`
        })}` : `${data.state == enums.BotState.banned ? `${validate_component(Panel, "Panel").$$render($$result, { color: "primary", open: true }, {}, {
          default: () => `${validate_component(Header2, "Header").$$render($$result, { ripple: false }, {}, {
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
  }
});

// .svelte-kit/output/server/entries/pages/bot/_id_/vote.svelte.js
var vote_svelte_exports = {};
__export(vote_svelte_exports, {
  default: () => Vote,
  load: () => load20,
  prerender: () => prerender19
});
async function load20({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/bots/${params.id}/_sunbeam`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    return {
      props: {
        data: data.data,
        cacheVersion: data.fl_cache_ver
      }
    };
  }
  return {
    status: res.status,
    error: new Error(`Bot Not Found`)
  };
}
var prerender19, Vote;
var init_vote_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/bot/_id_/vote.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BotServerVotePage_788b5671();
    init_index_f2488d65();
    init_Ripple_a012c9fe();
    init_modules();
    init_classAdderBuilder_d630724f();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_stores_d5eb43fc();
    prerender19 = false;
    Vote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${validate_component(BotServerVotePage, "BotServerVotePage").$$render($$result, { data, type: "bot" }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/26.js
var __exports27 = {};
__export(__exports27, {
  css: () => css43,
  entry: () => entry27,
  js: () => js27,
  module: () => vote_svelte_exports
});
var entry27, js27, css43;
var init__27 = __esm({
  ".svelte-kit/output/server/nodes/26.js"() {
    init_vote_svelte();
    entry27 = "pages/bot/_id_/vote.svelte-8d26469f.js";
    js27 = ["pages/bot/_id_/vote.svelte-8d26469f.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BotServerVotePage-4f993575.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/enums-06152dee.js", "chunks/stores-56fb81e3.js"];
    css43 = ["assets/BotServerVotePage-bb1d3a69.css"];
  }
});

// .svelte-kit/output/server/entries/pages/_vanity_/index.svelte.js
var index_svelte_exports8 = {};
__export(index_svelte_exports8, {
  default: () => U5Bvanityu5D,
  load: () => load21,
  prerender: () => prerender20
});
async function load21({ params, fetch: fetch2, session: session2, stuff }) {
  if (params.vanity == "servers") {
    return {
      status: 307,
      redirect: "/frostpaw/servers/"
    };
  }
  const url = `/api/v2/code/${params.vanity}`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    let id = data.redirect;
    let type = data.type;
    const pageUrl = `/api/v2/${type}s/${id}/_sunbeam`;
    const pageRes = await fetchFates(pageUrl, "", fetch2);
    if (pageRes.ok) {
      let pageData = await pageRes.json();
      console.log(pageData);
      return {
        props: {
          data: pageData.data,
          cacheVersion: pageData.fl_cache_ver,
          type
        }
      };
    }
    return {
      status: res.status,
      error: new Error(`Invalid Vanity`)
    };
  }
  return {
    status: res.status,
    error: new Error(`Invalid Vanity`)
  };
}
var prerender20, U5Bvanityu5D;
var init_index_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/_vanity_/index.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BotServerPage_0f5308d5();
    init_index_f2488d65();
    init_Ripple_a012c9fe();
    init_modules();
    init_classAdderBuilder_d630724f();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_marked_esm();
    init_stores_d5eb43fc();
    prerender20 = false;
    U5Bvanityu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { type } = $$props;
      if (type == "guild") {
        type = "server";
      }
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      return `${validate_component(BotServerPage, "BotServerPage").$$render($$result, { data, type }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/27.js
var __exports28 = {};
__export(__exports28, {
  css: () => css44,
  entry: () => entry28,
  js: () => js28,
  module: () => index_svelte_exports8
});
var entry28, js28, css44;
var init__28 = __esm({
  ".svelte-kit/output/server/nodes/27.js"() {
    init_index_svelte8();
    entry28 = "pages/_vanity_/index.svelte-d010fb9f.js";
    js28 = ["pages/_vanity_/index.svelte-d010fb9f.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BotServerPage-4b9fe93b.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/enums-06152dee.js", "chunks/stores-56fb81e3.js"];
    css44 = ["assets/BotServerPage-3465167f.css"];
  }
});

// .svelte-kit/output/server/entries/pages/_vanity_/invite.svelte.js
var invite_svelte_exports3 = {};
__export(invite_svelte_exports3, {
  default: () => Invite3,
  load: () => load22,
  prerender: () => prerender21
});
async function load22({ params, fetch: fetch2, session: session2, stuff }) {
  const codeUrl = `/api/v2/code/${params.vanity}`;
  const codeRes = await fetchFates(codeUrl, "", fetch2);
  if (codeRes.ok) {
    let data = await codeRes.json();
    let id = data.redirect;
    let type = data.type;
    if (type == "bot") {
      return {
        status: 307,
        redirect: `/bot/${id}/invite`
      };
    } else {
      return {
        status: 307,
        redirect: `/server/${id}/invite`
      };
    }
  }
}
var prerender21, Invite3;
var init_invite_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/_vanity_/invite.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    prerender21 = false;
    Invite3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/28.js
var __exports29 = {};
__export(__exports29, {
  css: () => css45,
  entry: () => entry29,
  js: () => js29,
  module: () => invite_svelte_exports3
});
var entry29, js29, css45;
var init__29 = __esm({
  ".svelte-kit/output/server/nodes/28.js"() {
    init_invite_svelte3();
    entry29 = "pages/_vanity_/invite.svelte-fe7bba1e.js";
    js29 = ["pages/_vanity_/invite.svelte-fe7bba1e.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js"];
    css45 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_vanity_/vote.svelte.js
var vote_svelte_exports2 = {};
__export(vote_svelte_exports2, {
  default: () => Vote2,
  load: () => load23,
  prerender: () => prerender22
});
async function load23({ params, fetch: fetch2, session: session2, stuff }) {
  const url = `/api/v2/code/${params.vanity}`;
  const res = await fetchFates(url, "", fetch2);
  if (res.ok) {
    let data = await res.json();
    let id = data.redirect;
    let type = data.type;
    const pageUrl = `/api/v2/${type}s/${id}/_sunbeam`;
    const pageRes = await fetchFates(pageUrl, "", fetch2);
    if (pageRes.ok) {
      let pageData = await pageRes.json();
      console.log(pageData);
      return {
        props: {
          data: pageData.data,
          cacheVersion: pageData.fl_cache_ver,
          type
        }
      };
    }
    return {
      status: res.status,
      error: new Error(`Invalid Vanity`)
    };
  }
  return {
    status: res.status,
    error: new Error(`Invalid Vanity`)
  };
}
var prerender22, Vote2;
var init_vote_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/_vanity_/vote.svelte.js"() {
    init_index_36284ca1();
    init_request_b58a31ec();
    init_BotServerVotePage_788b5671();
    init_index_f2488d65();
    init_Ripple_a012c9fe();
    init_modules();
    init_classAdderBuilder_d630724f();
    init_BristlefrostMeta_5512d822();
    init_Icon_8a17b723();
    init_enums_2aac69e1();
    init_stores_d5eb43fc();
    prerender22 = false;
    Vote2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let { type } = $$props;
      if (type == "guild") {
        type = "server";
      }
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      return `${validate_component(BotServerVotePage, "BotServerVotePage").$$render($$result, { data, type }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/29.js
var __exports30 = {};
__export(__exports30, {
  css: () => css46,
  entry: () => entry30,
  js: () => js30,
  module: () => vote_svelte_exports2
});
var entry30, js30, css46;
var init__30 = __esm({
  ".svelte-kit/output/server/nodes/29.js"() {
    init_vote_svelte2();
    entry30 = "pages/_vanity_/vote.svelte-b45138b3.js";
    js30 = ["pages/_vanity_/vote.svelte-b45138b3.js", "chunks/vendor-22677977.js", "chunks/request-2d5483df.js", "chunks/BotServerVotePage-4f993575.js", "chunks/BristlefrostMeta-4b5eefb5.js", "chunks/enums-06152dee.js", "chunks/stores-56fb81e3.js"];
    css46 = ["assets/BotServerVotePage-bb1d3a69.css"];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/_...request_.ts.js
var request_ts_exports = {};
__export(request_ts_exports, {
  del: () => del,
  get: () => get,
  head: () => head,
  options: () => options2,
  patch: () => patch,
  post: () => post,
  put: () => put
});
async function proxy(request, method) {
  let proxiedURL = request.url.href.replace("sunbeam.fateslist.xyz", "fateslist.xyz").replace("sunbeam-cf.fateslist.xyz", "fateslist.xyz").replace("fateslist.xyz", "api.fateslist.xyz");
  let response = {
    status: 307,
    headers: { "Location": proxiedURL }
  };
  return response;
}
async function get(request) {
  return await proxy(request);
}
async function post(request) {
  return await proxy(request);
}
async function put(request) {
  return await proxy(request);
}
async function patch(request) {
  return await proxy(request);
}
async function del(request) {
  return await proxy(request);
}
async function options2(request) {
  return await proxy(request);
}
async function head(request) {
  return await proxy(request);
}
var init_request_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/_...request_.ts.js"() {
  }
});

// .svelte-kit/output/server/app.js
init_index_36284ca1();
var import_cookie = __toModule(require_cookie());
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  request.params = route.params ? decode_params(route.params(match)) : {};
  const response = await handler(request);
  const preface = `Invalid response from route ${request.url.pathname}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry31) {
    return entry31[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry31, i) {
    names.set(entry31[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
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
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
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
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s = JSON.stringify;
async function render_response({
  branch,
  options: options3,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params
}) {
  const css210 = new Set(options3.manifest._.entry.css);
  const js31 = new Set(options3.manifest._.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options3.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded: loaded2, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => css210.add(url2));
      if (node.js)
        node.js.forEach((url2) => js31.add(url2));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded2.maxage;
    });
    const session2 = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: session2
      },
      page: { url, params, status, error: error2 },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session2.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options3.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js31.clear();
  const links = options3.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(css210).map((dep) => `<link rel="stylesheet" href="${options3.prefix}${dep}">`),
    ...Array.from(js31).map((dep) => `<link rel="modulepreload" href="${options3.prefix}${dep}">`)
  ].join("\n		");
  let init = "";
  if (options3.amp) {
    init = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    init += options3.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>' : "";
  } else if (include_js) {
    init = `<script type="module">
			import { start } from ${s(options3.prefix + options3.manifest._.entry.file)};
			start({
				target: ${options3.target ? `document.querySelector(${s(options3.target)})` : "document.body"},
				paths: ${s(options3.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s(options3.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s(options3.prefix + node.entry)})`).join(",\n						")}
					],
					url: new URL(${s(url.href)}),
					params: ${devalue(params)}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options3.service_worker && !options3.amp) {
    init += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options3.service_worker}');
			}
		<\/script>`;
  }
  const head2 = [
    rendered.head,
    styles.size && !options3.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init
  ].join("\n\n		");
  let body = rendered.html;
  if (options3.amp) {
    if (options3.service_worker) {
      body += `<amp-install-serviceworker src="${options3.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    body += serialized_data.map(({ url: url2, body: body2, json }) => {
      let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
      if (body2)
        attributes += ` data-body="${hash(body2)}"`;
      return `<script ${attributes}>${json}<\/script>`;
    }).join("\n\n	");
  }
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options3.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options3.template({ head: head2, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded2) {
  const has_error_status = loaded2.status && loaded2.status >= 400 && loaded2.status <= 599 && !loaded2.redirect;
  if (loaded2.error || has_error_status) {
    const status = loaded2.status;
    if (!loaded2.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded2.error === "string" ? new Error(loaded2.error) : loaded2.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded2.redirect) {
    if (!loaded2.status || Math.floor(loaded2.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded2.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded2.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded2;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix2 = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix2}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  request,
  options: options3,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded2;
  const url_proxy = new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prerender_enabled && (prop === "search" || prop === "searchParams")) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      url: url_proxy,
      params,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        opts.headers = new Headers(opts.headers);
        const resolved = resolve(request.url.pathname, requested.split("?")[0]);
        let response;
        const prefix2 = options3.paths.assets || options3.paths.base;
        const filename = (resolved.startsWith(prefix2) ? resolved.slice(prefix2.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options3.manifest.assets.has(filename);
        const is_asset_html = options3.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options3.read) {
            const type = is_asset ? options3.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options3.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            if (request.headers.cookie) {
              opts.headers.set("cookie", request.headers.cookie);
            }
            if (request.headers.authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", request.headers.authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const rendered = await respond({
            url: new URL(requested, request.url),
            method: opts.method || "GET",
            headers: Object.fromEntries(opts.headers),
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body)
          }, options3, {
            fetched: requested,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          } else {
            return fetch(new URL(requested, request.url).href, {
              method: opts.method || "GET",
              headers: opts.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${request.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            opts.headers.set("cookie", request.headers.cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options3.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy2 = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: requested,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy2;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (options3.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded2 = await module.load.call(null, load_input);
  } else {
    loaded2 = {};
  }
  if (!loaded2 && is_leaf && !is_error)
    return;
  if (!loaded2) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded2),
    stuff: loaded2.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({ request, options: options3, state, $session, status, error: error2 }) {
  const default_layout = await options3.manifest._.nodes[0]();
  const default_error = await options3.manifest._.nodes[1]();
  const params = {};
  const loaded2 = await load_node({
    request,
    options: options3,
    state,
    route: null,
    url: request.url,
    params,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options3, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded2,
    await load_node({
      request,
      options: options3,
      state,
      route: null,
      url: request.url,
      params,
      node: default_error,
      $session,
      stuff: loaded2 ? loaded2.stuff : {},
      prerender_enabled: is_prerender_enabled(options3, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options3,
      $session,
      page_config: {
        hydrate: options3.hydrate,
        router: options3.router,
        ssr: options3.ssr
      },
      status,
      error: error2,
      branch,
      url: request.url,
      params
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options3.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options3, node, state) {
  return options3.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options3, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((n) => options3.manifest._.nodes[n] && options3.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options3.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options3,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options3);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded2;
        if (node) {
          try {
            loaded2 = await load_node({
              ...opts,
              url: request.url,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options3, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded2)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded2.set_cookie_headers);
            if (loaded2.loaded.redirect) {
              return with_cookies({
                status: loaded2.loaded.status,
                headers: {
                  location: encodeURI(loaded2.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded2.loaded.error) {
              ({ status, error: error2 } = loaded2.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options3.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded2 && !error2) {
            branch.push(loaded2);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options3.manifest._.nodes[route.b[i]]();
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    url: request.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options3, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options3);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options3.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options3,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded2 && loaded2.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded2.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      url: request.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options3.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options3) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options3.ssr,
    router: "router" in leaf ? !!leaf.router : options3.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options3.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options3, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.url.pathname}`
    };
  }
  const params = route.params ? decode_params(route.params(match)) : {};
  const $session = await options3.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options3,
    state,
    $session,
    route,
    params
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options3, state = {}) {
  if (incoming.url.pathname !== "/" && options3.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.url.pathname.endsWith("/");
    if (has_trailing_slash && options3.trailing_slash === "never" || !has_trailing_slash && options3.trailing_slash === "always" && !(incoming.url.pathname.split("/").pop() || "").includes(".")) {
      incoming.url.pathname = has_trailing_slash ? incoming.url.pathname.slice(0, -1) : incoming.url.pathname + "/";
      if (incoming.url.search === "?")
        incoming.url.search = "";
      return {
        status: 301,
        headers: {
          location: incoming.url.pathname + incoming.url.search
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  const print_error = (property, replacement) => {
    Object.defineProperty(request, property, {
      get: () => {
        throw new Error(`request.${property} has been replaced by request.url.${replacement}`);
      }
    });
  };
  print_error("origin", "origin");
  print_error("path", "pathname");
  print_error("query", "searchParams");
  try {
    return await options3.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: request2.url,
            params: request2.params,
            options: options3,
            $session: await options3.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.url.pathname).replace(options3.paths.base, "");
        for (const route of options3.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options3, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value?.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        if (!state.initiator) {
          const $session = await options3.hooks.getSession(request2);
          return await respond_with_error({
            request: request2,
            options: options3,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${request2.url.pathname}`)
          });
        }
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options3.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options3.dev ? e.stack : e.message
    };
  }
}
function afterUpdate() {
}
var css = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: null
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`
    })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var handle = async ({ request, resolve: resolve2 }) => {
  import_cookie.default.parse(request.headers.cookie || "");
  const method = request.url.searchParams.get("_method");
  if (method) {
    request.method = method.toUpperCase();
  }
  console.log(request.url);
  console.log(request.params);
  const response = await resolve2(request);
  return response;
};
async function getSession(request) {
  console.log("getSession called");
  let query = {};
  request.url.searchParams.forEach((v, k) => {
    query[k] = v;
  });
  const cookies = import_cookie.default.parse(request.headers.cookie || "");
  let sessionData = {};
  if (cookies["sunbeam-session"]) {
    let jwt = cookies["sunbeam-session"];
    let sessionRes = await fetch(`https://api.fateslist.xyz/api/v2/jwtparse/_sunbeam?jwt=${jwt}`);
    try {
      sessionData = await sessionRes.json();
    } catch (err) {
      sessionData = {};
    }
  }
  try {
    return {
      "url": request.url.toJSON(),
      "query": query,
      "session": sessionData
    };
  } catch (err) {
    return {
      "url": "https://fateslist.xyz",
      "query": {},
      "session": {}
    };
  }
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle,
  getSession
});
var template = ({ head: head2, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<meta name="description" content="Find the best bots for your servers." />\n		<link rel="icon" href="/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head2 + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var default_protocol = "https";
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, request) => {
        hooks.handleError({ error: error2, request });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: false,
      read,
      root: Root,
      service_worker: null,
      router: true,
      ssr: true,
      target: "#svelte",
      template,
      trailing_slash: "never"
    };
  }
  render(request, {
    prerender: prerender23
  } = {}) {
    if (Object.keys(request).sort().join() !== "headers,method,rawBody,url") {
      throw new Error("Adapters should call app.render({ url, method, headers, rawBody })");
    }
    const host = request.headers["X-Forwarded-Host"];
    const protocol2 = request.headers["X-Forwarded-Proto"] || default_protocol;
    return respond({ ...request, url: new URL(request.url, protocol2 + "://" + host) }, this.options, { prerender: prerender23 });
  }
};

// .svelte-kit/cloudflare-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["botlisticon.webp", "favicon.ico", "robots.txt", "sitemap.xml", "smui-dark.css", "smui.css"]),
  _: {
    mime: { ".webp": "image/webp", ".ico": "image/vnd.microsoft.icon", ".txt": "text/plain", ".xml": "application/xml", ".css": "text/css" },
    entry: { "file": "start-7ae755a1.js", "js": ["start-7ae755a1.js", "chunks/vendor-22677977.js"], "css": ["assets/start-61d1577b.css"] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15)),
      () => Promise.resolve().then(() => (init__16(), __exports16)),
      () => Promise.resolve().then(() => (init__17(), __exports17)),
      () => Promise.resolve().then(() => (init__18(), __exports18)),
      () => Promise.resolve().then(() => (init__19(), __exports19)),
      () => Promise.resolve().then(() => (init__20(), __exports20)),
      () => Promise.resolve().then(() => (init__21(), __exports21)),
      () => Promise.resolve().then(() => (init__22(), __exports22)),
      () => Promise.resolve().then(() => (init__23(), __exports23)),
      () => Promise.resolve().then(() => (init__24(), __exports24)),
      () => Promise.resolve().then(() => (init__25(), __exports25)),
      () => Promise.resolve().then(() => (init__26(), __exports26)),
      () => Promise.resolve().then(() => (init__27(), __exports27)),
      () => Promise.resolve().then(() => (init__28(), __exports28)),
      () => Promise.resolve().then(() => (init__29(), __exports29)),
      () => Promise.resolve().then(() => (init__30(), __exports30))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/?$/,
        params: null,
        path: "/frostpaw",
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/troubleshoot\/?$/,
        params: null,
        path: "/frostpaw/troubleshoot",
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/add-server\/?$/,
        params: null,
        path: "/frostpaw/add-server",
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/add-bot\/?$/,
        params: null,
        path: "/frostpaw/add-bot",
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/servers\/?$/,
        params: null,
        path: "/frostpaw/servers",
        a: [0, 7],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/search\/?$/,
        params: null,
        path: "/frostpaw/search",
        a: [0, 8],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/search\/tags\/?$/,
        params: null,
        path: "/frostpaw/search/tags",
        a: [0, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/about\/?$/,
        params: null,
        path: "/frostpaw/about",
        a: [0, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/login\/?$/,
        params: null,
        path: "/frostpaw/login",
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/stats\/?$/,
        params: null,
        path: "/frostpaw/stats",
        a: [0, 12],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/herb\/?$/,
        params: null,
        path: "/frostpaw/herb",
        a: [0, 13],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/frostpaw\/tos\/?$/,
        params: null,
        path: "/frostpaw/tos",
        a: [0, 14],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/partners\/?$/,
        params: null,
        path: "/partners",
        a: [0, 15],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/profile\/([^/]+?)\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 16],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/profile\/([^/]+?)\/settings\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 17],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/servers\/([^/]+?)(?:\/(.*))?\/?$/,
        params: (m) => ({ id: m[1], route: m[2] || "" }),
        path: null,
        a: [0, 18],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/server\/([^/]+?)\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 19],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/server\/([^/]+?)\/invite\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 20],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/bots\/([^/]+?)(?:\/(.*))?\/?$/,
        params: (m) => ({ id: m[1], route: m[2] || "" }),
        path: null,
        a: [0, 21],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/api(?:\/(.*))?$/,
        params: (m) => ({ request: m[1] || "" }),
        load: () => Promise.resolve().then(() => (init_request_ts(), request_ts_exports))
      },
      {
        type: "page",
        pattern: /^\/bot\/admin\/add\/?$/,
        params: null,
        path: "/bot/admin/add",
        a: [0, 22],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/bot\/([^/]+?)\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 23],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/bot\/([^/]+?)\/settings\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 24],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/bot\/([^/]+?)\/invite\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 25],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/bot\/([^/]+?)\/vote\/?$/,
        params: (m) => ({ id: m[1] }),
        path: null,
        a: [0, 26],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/([^/]+?)\/?$/,
        params: (m) => ({ vanity: m[1] }),
        path: null,
        a: [0, 27],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/([^/]+?)\/invite\/?$/,
        params: (m) => ({ vanity: m[1] }),
        path: null,
        a: [0, 28],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/([^/]+?)\/vote\/?$/,
        params: (m) => ({ vanity: m[1] }),
        path: null,
        a: [0, 29],
        b: [1]
      }
    ]
  }
};
var prerendered = new Set([]);

// .svelte-kit/cloudflare-tmp/_worker.js
var app = new App(manifest);
var prefix = `/${manifest.appDir}/`;
var worker_default = {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname.startsWith(prefix))
      return env.ASSETS.fetch(req);
    const pathname = url.pathname.replace(/\/$/, "");
    let file = pathname.substring(1);
    try {
      file = decodeURIComponent(file);
    } catch (err) {
    }
    if (manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/")) {
      return env.ASSETS.fetch(req);
    }
    try {
      const rendered = await app.render({
        url,
        rawBody: new Uint8Array(await req.arrayBuffer()),
        headers: Object.fromEntries(req.headers),
        method: req.method
      });
      if (rendered) {
        return new Response(rendered.body, {
          status: rendered.status,
          headers: make_headers(rendered.headers)
        });
      }
    } catch (e) {
      return new Response("Error rendering route: " + (e.message || e.toString()), { status: 500 });
    }
    return new Response({
      status: 404,
      statusText: "Not Found"
    });
  }
};
function make_headers(headers) {
  const result = new Headers();
  for (const header in headers) {
    const value = headers[header];
    if (typeof value === "string") {
      result.set(header, value);
      continue;
    }
    for (const sub of value) {
      result.append(header, sub);
    }
  }
  return result;
}
export {
  worker_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! lozad.js - v1.16.0 - 2020-09-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
