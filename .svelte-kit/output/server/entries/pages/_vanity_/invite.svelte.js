import { c as create_ssr_component } from "../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../chunks/request-b58a31ec.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  const codeUrl = `/api/v2/code/${params.vanity}`;
  const codeRes = await fetchFates(codeUrl, "", fetch);
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
const Invite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
export { Invite as default, load, prerender };
