<script context="module">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
    export async function load({ params, fetch, session, stuff }) {
        let inviteUrl = await fetchFates(`/api/v2/bots/${params.id}/_sunbeam/invite`)
        let inviteJson = await inviteUrl.json()
        return {
            status: 302,
            redirect: inviteJson.invite
        };
    }
</script>