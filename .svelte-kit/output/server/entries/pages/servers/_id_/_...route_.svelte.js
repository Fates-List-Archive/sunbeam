import { c as create_ssr_component } from "../../../../chunks/index-36284ca1.js";
const prerender = false;
async function load({ params, fetch, session, stuff }) {
  return {
    status: 307,
    redirect: `/server/${params.id}/${params.route}`
  };
}
const U5B_routeu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
export { U5B_routeu5D as default, load, prerender };
