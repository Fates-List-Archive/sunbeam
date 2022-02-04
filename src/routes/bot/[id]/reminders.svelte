<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/bots/${params.id}`;
		
		const res = await fetchFates(url, "", fetch);

        if(!session.session.token) {
            return {
                status: 404,
                error: "You must be logged in to view this page."
            }
        }

		if (res.ok) {
            	    let data = await res.json()
			return {
				props: {
					data: data,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Bot Not Found`)
		};
	}
</script>
<script lang="ts">
    export let data: any;
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
    import Button from '@smui/button';
import { session } from "$app/stores";

    async function toggleReminders(mode: number) {
        let headers = {"Content-Type": "application/json", "Authorization": $session.session.token}
        let payload = {"mode": mode, "bot_id": data.user.id}
        console.log(payload)
        let res = await fetch(`https://api.fateslist.xyz/users/${$session.session.user.id}/vote-reminders`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload)
        })
        if(res.ok) {
            alert("Enabled")
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }
</script>
<BristlefrostMeta 
	url="https://fateslist.xyz/bots/{data.user.id}/reminders"
	title="{data.user.username}"
    description="{data.user.username}'s Reminders"
	thumbnail="{data.user.avatar}"
></BristlefrostMeta>

<img class="user-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="user-avatar" alt="{data.user.username}'s avatar">
<h2 class="white user-username" id="user-name">Reminders for {data.user.username}</h2>

<Button href={"#"} on:click={() => toggleReminders(1)} class="bot-card-actions-link" id="profiles-center" touch variant="outlined">Enable Vote Reminders</Button>
<Button href={"#"} on:click={() => toggleReminders(0)} class="bot-card-actions-link" id="profiles-center" touch variant="outlined">Disable Vote Reminders</Button>


<style lang="scss">
    .user-username, .user-avatar {
    display: flex;
    opacity: 1 !important;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

    .user-username {
        margin-bottom: 0px;
        padding-bottom: 0px;
    }

    .user-avatar {
        border-radius: 50%; 
        width: 120px;
    }

</style>