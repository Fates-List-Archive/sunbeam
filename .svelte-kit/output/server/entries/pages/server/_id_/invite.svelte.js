import { c as create_ssr_component } from "../../../../chunks/index-36284ca1.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  let auth = "";
  if (session.session.user) {
    auth = `${session.session.user.id}|${session.session.token}`;
  }
  let inviteUrl = await fetch(`https://api.fateslist.xyz/api/v2/guilds/${params.id}/_sunbeam/invite`, {
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
const Invite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
export { Invite as default, load, prerender };
