import { c as create_ssr_component, j as subscribe, k as escape, r as each } from "../../../chunks/index-36284ca1.js";
import { f as fetchFates } from "../../../chunks/request-b58a31ec.js";
import { s as session } from "../../../chunks/stores-d5eb43fc.js";
async function load({ params, fetch, session: session2, stuff }) {
  const url = `/_sunbeam/dm/help`;
  const res = await fetchFates(url, "", fetch);
  if (res.ok) {
    return { props: { data: await res.json() } };
  } else {
    return {
      status: 500,
      error: new Error(`Sunbeam Troubleshooter could not contact our servers to get required troubleshooting information (${url})`)
    };
  }
}
const Troubleshoot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
export { Troubleshoot as default, load };
