import { c as create_ssr_component, k as escape } from "../../../chunks/index-36284ca1.js";
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
export { About as default };
