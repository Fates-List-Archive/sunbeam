<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	import { enums } from "$lib/enums/enums";
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, url, fetch, session, stuff }) {
		let reqUrl = `/profiles/${params.id}`;

        const res = await fetchFates(reqUrl, "", fetch, false, true);

		if (res.ok) {
            let data = await res.json()

			return {
				props: {
					data: data,
                    systemBots: url.searchParams.get("system_bots") == "true",
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
	import alertstore from "$lib/alertstore";
	import navigationState from "$lib/navigationState";
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	import BotPack from "$lib/base/BotPack.svelte";

	function alert(msg: string, title="Error") {
        $alertstore = {
            title: title,
            message: msg,
            show: true,
            id: "error"
        }
        $navigationState = "loaded" // An alert = page loaded
    }

	let loggedIn = false;
    	if($session.session.user) {
		loggedIn = true;
	}

    export let data: any;
    export let systemBots: any;
    let type = "profile"

data.badges = [];

if(enums.helpers.flagCheck(enums.UserFlags.Staff, data.flags)) {
	data.badges.push({
		"id": "staff",
		"name": "Official Staff Member",
		"description": "Official Staff Member Alert!",
		"icon": "https://api.fateslist.xyz/static/assets/prod/staff.webp"
	})
}

if(enums.helpers.flagCheck(enums.UserFlags.AvidVoter, data.flags)) {
	data.badges.push({
		"id": "avid-voter",
		"name": "Avid Voter",
		"description": "Whoa! Actively voting for bots and servers?",
		"icon": "https://api.fateslist.xyz/static/assets/prod/avidvoter.webp"
	})
}
</script>
<BristlefrostMeta 
	url="https://fateslist.xyz/profile/{data.user.id}"
	title="{data.user.username}"
	description="{data.description}"
	thumbnail="{data.user.avatar}"
></BristlefrostMeta>

<img class="user-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="user-avatar" alt="{data.user.username}'s avatar">
<h2 class="white user-username" id="user-name">{data.user.username}</h2>
<p id="user-description">{@html data.description.replace("p>", "span>") }</p>

<div class="badges">
	{#if data.badges}
		{#each data.badges as badge}
			<a class="badge-link" href={"#"} on:click={() => alert(badge.description)}>
				<img class="badge-img" src={badge.image} width="50px" height="50px" alt={badge.description}>
			</a>
		{/each}
	{/if}
</div>

{#if loggedIn}
	<Button href="/profile/{data.user.id}/settings" class="bot-card-actions-link" id="profiles-center" touch variant="outlined">Settings</Button>
{/if}
<CardContainer>
	{#each data.bots as bot}
		{#if systemBots || (!systemBots && !enums.helpers.flagCheck(enums.Flags.system, bot.flags)) }
			<BotCard data={bot} type="bot" rand={false}/>
		{/if}
	{/each}
</CardContainer>

{#each data.packs as pack}
	<BotPack pack={pack}></BotPack>
{/each}

{#if !systemBots}
<p>Click <a href="/profile/{data.user.id}?system_bots=true">here</a> to show system bots as well!</p>
{/if}
<style lang="scss" global>
.badge-link {
	opacity: 1 !important;
}

.badges {
	margin-left: auto;
	margin-right: auto;
	text-align: center;
}

.badge-img {
	border-radius: 50%;
	display: inline-block;
	margin-right: 3px;
	background-color: black;
}

.user-username, .user-avatar, .bot-action-log {
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

.opaque {
	opacity: 0.7 !important;
}

#profiles-center {
	margin-left: auto;
	margin-right: auto;
	display: flex !important;
	align-items: center;
	width: 150px;
	padding: 3px;
}
</style>
