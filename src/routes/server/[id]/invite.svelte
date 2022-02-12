<script context="module">
import { apiUrl } from "$lib/config";


    export const prerender = false;
    export async function load({ params, fetch, session, stuff }) {
        let auth = ""
        if(session.session.user) {
            auth = `${session.session.user.id}|${session.session.token}`
        }
        let inviteUrl = await fetch(`${apiUrl}/api/v2/guilds/${params.id}/_sunbeam/invite`, {
            method: "GET",
            headers: {
                "Frostpaw": "0.1.0",
                "Frostpaw-Auth": auth
            }
        })

        let inviteJson = await inviteUrl.json()

        if(!inviteUrl.ok) {
            return {
                status: 400,
                error: new Error(inviteJson.reason)
            }
        }
        
        // JS and URLS do not go well together
        return {
            status: 307,
            redirect: inviteJson.invite
        };
    }
</script>
