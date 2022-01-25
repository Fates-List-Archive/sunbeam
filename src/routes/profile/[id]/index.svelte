<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	import { enums } from "$lib/enums/enums";
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, url, fetch, session, stuff }) {
		let reqUrl = `/api/v2/users/${params.id}?bot_logs=true`;

        if(url.searchParams.get("system_bots") == "true") {
            reqUrl += "&system_bots=true"
        }

        const res = await fetchFates(reqUrl, "", fetch);

		if (res.ok) {
            let data = await res.json()

			let approvedBots = data.profile.bot_logs.filter(v => {
				if(v.action == enums.UserBotAction.approve) {
					return true
				}
				return false
			})
			let deniedBots = data.profile.bot_logs.filter(v => {
				if(v.action == enums.UserBotAction.deny) {
					return true
				}
				return false
			})
			let certifiedBots = data.profile.bot_logs.filter(v => {
				if(v.action == enums.UserBotAction.certify) {
					return true
				}
				return false
			})


			return {
				props: {
					data: data,
                    systemBots: url.searchParams.get("system_bots") == "true",
					approvedBots: approvedBots,
					deniedBots: deniedBots,
					certifiedBots: certifiedBots
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
	export let approvedBots: any;
	export let deniedBots: any;
	export let certifiedBots: any;
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

<div class="badges">
	{#each data.profile.badges as badge}
		<a class="badge-link" href={"#"} on:click={() => alert(badge.description)}>
			<img class="badge-img" src={badge.image} width="50px" height="50px" alt={badge.description}>
		</a>
	{/each}
</div>

<p class="bot-action-log">Approved Bots: {approvedBots.length}</p>
<ul>
	{#each approvedBots as bot}
		<li class="white">{bot.bot_id} - {bot.action_time}</li>
	{/each}
</ul>
<p class="bot-action-log">Denied Bots: {deniedBots.length}</p>
<ul>
	{#each deniedBots as bot}
		<li class="white">{bot.bot_id} - {bot.action_time}</li>
	{/each}
</ul>
<p class="bot-action-log">Certified Bots: {certifiedBots.length}</p> 
<ul>
	{#each certifiedBots as bot}
		<li class="white">{bot.bot_id} - {bot.action_time}</li>
	{/each}
</ul>

{#if loggedIn}
	<Button href="https://fateslist.xyz/profile/{data.user.id}/settings" class="bot-card-actions-link" id="profiles-center" touch variant="outlined">Settings</Button>
{/if}
<CardContainer>
	{#each data.bots as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>
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

#profiles-center {
	margin-left: auto;
	margin-right: auto;
	display: flex !important;
	align-items: center;
	width: 150px;
	padding: 3px;
}
</style>
