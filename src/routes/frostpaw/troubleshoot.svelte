<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/_sunbeam/dm/help`;
		const res = await fetchFates(url, "", fetch);
		if(res.ok) {
			return {
				props: {
					data: await res.json()
				}
			}
		} else {
			return {
				status: 500,
				error: new Error(`Sunbeam Troubleshooter could not contact our servers to get required troubleshooting information (${url})`)
			}
		}
	}
</script>
<script lang="ts">
	import { session } from '$app/stores';
	import { browser } from "$app/env"
	export let data: any;
	let sessInfo = $session;

	let agent = "Please wait..."
	let msg = "Please wait, fetching needed information..."

	if(browser) {
		agent = navigator.userAgent;
		msg = data.message
	}
</script>
<h1>{msg}</h1>
<ul class="white">
	{#each Object.entries(data.data) as info}
		{#if info[0] == "user"}
			<li>{info[0]} (Logged in user): {JSON.stringify(info[1])}</li>
		{:else}
			<li>{info[0]}: {info[1]}</li>
		{/if}
	{/each}
	<li>real_user_agent: {agent}</li>
	<li>session: {JSON.stringify(sessInfo)}</li>
</ul>
