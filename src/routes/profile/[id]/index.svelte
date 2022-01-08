<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		let url = `/api/v2/users/${params.id}`;

        if(session.query.system_bots == "true") {
            url += "?system_bots=true"
        }

        const res = await fetchFates(url);

		if (res.ok) {
            let data = await res.json()
			return {
				props: {
					data: data,
                    systemBots: session.query.system_bots == "true"
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Profile Not Found`)
		};
	}
</script>
<script lang="ts">
	import BotCard from "$lib/cards/BotCard.svelte";
	import Button from '@smui/button';
	import CardContainer from "$lib/cards/CardContainer.svelte";
	import { page, session } from '$app/stores';
	let loggedIn = false;
    	if($session.session.user) {
		loggedIn = true;
	}

    export let data: any;
    export let systemBots: any;
    let type = "profile"
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
</script>
<BristlefrostMeta 
	url="https://fateslist.xyz/profile/{data.user.id}"
	title="{data.user.username}"
	description="{data.profile.description}"
	thumbnail="{data.user.avatar}"
></BristlefrostMeta>

<img class="user-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="user-avatar" alt="{data.user.username}'s avatar">
<h2 class="white user-username" id="user-name">{data.user.username}</h2>
<p id="user-description">{@html data.profile.description.replace("p>", "span>") }</p>
{#if loggedIn}
	<Button href="https://api.fateslist.xyz/profile/{data.user.id}/edit" class="bot-card-actions-link" id="profiles-center" touch variant="outlined">Settings</Button>
{/if}
<CardContainer>
	{#each data.bots as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>
{#if !systemBots}
<p>Click <a href="/profile/{data.user.id}?system_bots=true">here</a> to show system bots as well!</p>
{/if}
<style>
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

#user-description {
    font-size: 18px;
    text-align: center;
    margin: 0px;
    padding: 0px;
}

:global(#profiles-center) {
	margin-left: auto;
	margin-right: auto;
	display: flex !important;
	align-items: center;
	width: 150px;
	padding: 3px;
}
</style>
