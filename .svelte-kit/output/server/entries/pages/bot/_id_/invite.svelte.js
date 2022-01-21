import { c as create_ssr_component } from "../../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../../chunks/request-b58a31ec.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  let inviteUrl = await fetchFates(`/api/v2/bots/${params.id}/_sunbeam/invite`, "", fetch);
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
const Invite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
export { Invite as default, load, prerender };
