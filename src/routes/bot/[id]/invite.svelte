<script context="module">
    export const prerender = false;
	import { fetchFates } from "$lib/request"
    export async function load({ params, fetch, session, stuff }) {
        let inviteUrl = await fetchFates(`/api/v2/bots/${params.id}/_sunbeam/invite`, "", fetch)
        let inviteJson = await inviteUrl.json()

        if(!inviteUrl.ok) {
            return {
                status: 400,
                error: new Error(`${inviteUrl.reason}`)
            }
        }
        
        // JS and URLS do not go well together
        console.log(inviteJson, decodeURIComponent(inviteJson.invite))
        return {
            status: 307,
            redirect: decodeURIComponent(inviteJson.invite)
        };
    }
</script>