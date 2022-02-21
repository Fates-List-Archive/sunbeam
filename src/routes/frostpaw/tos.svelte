<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
        let url = "/policies"
        let res = await fetchFates(url, "", fetch, false, true)
        if(!res.ok) {
            return {
                status: res.status,
                error: new Error(`Could not load ${url}`)
            }
        }
        let policy = await res.json()
        return {
            props: {
                rules: policy.rules,
                privacyPolicy: policy.privacy_policy
            }
        }
    }
</script>
<script lang="ts">
    import Policy from "$lib/base/Policy.svelte";
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";

    export let rules: any;
    export let privacyPolicy: any;
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz"
	title="Fates List | Terms Of Service"
	description="Find, invite and discover the best bots &amp; servers now on Fates List"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>

<Policy policy={rules}></Policy>
<Policy policy={privacyPolicy}></Policy>
