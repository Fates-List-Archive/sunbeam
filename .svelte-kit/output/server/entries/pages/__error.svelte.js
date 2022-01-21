import { c as create_ssr_component, k as escape } from "../../chunks/index-36284ca1.js";
function load({ error, status }) {
  return { props: { status, error: error.message } };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `<h1 style="${"text-align: center"}">${escape(status)}</h1>
<h2>${escape(error)}</h2>
<p>Please visit our <a href="${"https://fateslist.xyz/server/789934742128558080/invite"}">support server</a> if you have any queries or concerns or just for fun!</p>`;
});
export { _error as default, load };
