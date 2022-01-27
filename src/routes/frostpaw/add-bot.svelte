<script lang="ts" context="module">
	import { fetchFates } from "$lib/request";
		/** @type {import('@sveltejs/kit@next').Load} */
		export async function load({params, fetch, session, stuff}) {
			if(!session.session.token) {
				return {
					props: {
						context: {}
					}
				}
			}
			let tagsRes = await fetch(`https://api.fateslist.xyz/api/v2/_sunbeam/add-bot?user_id=${session.session.user.id}`)
			if(!tagsRes.ok) {
				return {
					status: tagsRes.status,
					error: new Error("Could not fetch tags and features") 
				}
			}
			let data = await tagsRes.json()
			return {
				props: {
					context: data
				}
			}
		}
</script>
<script lang="ts">
	import { browser } from "$app/env"
	import BotSettings from "$lib/pages/BotSettings.svelte";
	import { loginUser } from "$lib/request"
	import { session } from "$app/stores"
	export let context: any;
	let user = {
		username: "Fates List",
		avatar: "https://api.fateslist.xyz/static/botlisticon.webp"
	}
	let data = {
		user: user
	}
	if(!$session.session.token) {
		if(browser) {
			loginUser(false)
		}
	}
</script>
{#if $session.session.token}
	<BotSettings mode="add" data={data} context={context}></BotSettings>
{:else}
	<p>Logging you in, please wait...</p>
{/if}