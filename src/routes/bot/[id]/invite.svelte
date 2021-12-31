<script context="module">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
    export async function load({ params, fetch, session, stuff }) {
        let inviteUrl = await fetchFates(`/api/v2/bots/${params.id}/_sunbeam/invite`)
        let inviteJson = await inviteUrl.json()
        
        // JS and URLS do not go well together
        console.log(inviteJson, decodeURIComponent(inviteJson.invite))
        return {
            status: 307,
            redirect: decodeURIComponent(inviteJson.invite)
            //redirect: `https://fateslist.xyz/api/v2/_sunbeam/redirect?id=${inviteJson.fallback}`
        };
    }
</script>