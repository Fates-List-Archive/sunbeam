<script lang="ts" context="module">
	import { fetchFates } from "$lib/request"
	export const prerender = false
	export async function load({ params, url, fetch, session, stuff }) {
		const full = url.searchParams.get("full") == "true"
		const blUrl = `/api/blstats-full` // This will change
		const res = await fetchFates(blUrl, "", fetch);
		if(res.ok) {
			return {
				props: {
					data: await res.json(),
					full: full
				}
			}
		}
		else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			}
		}
	}
</script>
<script lang="ts">
	import BotCard from "$lib/cards/BotCard.svelte";
	import CardContainer from "$lib/cards/CardContainer.svelte";
	import Section from "$lib/base/Section.svelte";
	export let data: any
	export let full: boolean

	function secondsToDhms(seconds) {
		seconds = Number(seconds);
		var d = Math.floor(seconds / (3600*24));
		var h = Math.floor(seconds % (3600*24) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 60);

		var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
		var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	}
</script>
<h1>Statistics</h1>
<ul class="white" style="font-size: 24px">
	<li>Current Worker PID: {data.pid}</li>
	<li>Worker List: {data.workers.join(" | ")}</li>
	<li>Worker Uptime: {data.uptime}</li>
	<li>Worker UP: {data.up}</li>
	<li>Server Uptime (Formatted): {secondsToDhms(data.server_uptime)}</li>
	<li>Server Uptime (Raw): {data.server_uptime}</li>
	<li>Queue Length: {data.queue.length}</li>
	<li>Under Review Length: {data.under_review.length}</li>
	<li>Total Bot Length: {data.bot_amount_total}</li>
	<li>Approved or Certified Bot Length: {data.bot_amount}</li>
	<li>Certified Bots Length: {data.certified.length}</li>
	<li>Banned Bots Length: {data.banned_amount}</li>
	<li>Denied Bots Length: {data.denied_amount}</li>
</ul>
<Section icon="fa-solid:plus" title="Queue" id="queue">
	<CardContainer>
		{#each data.queue as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
</Section>

<Section icon="fluent:thinking-24-regular" title="Under Review" id="under-review">
	<CardContainer>
		{#each data.under_review as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
</Section>

<Section icon="fa-solid:certificate" title="Certified" id="certified">
	<CardContainer>
		{#each data.certified as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
</Section>

{#if full}
	<Section icon="akar-icons:cross" title="Denied Bots" id="denied">
		<CardContainer>
			{#each data.denied as bot}
				<BotCard data={bot} type="bot" rand={false}/>
			{/each}
		</CardContainer>
	</Section>

	<Section icon="bi:hammer" title="Banned Bots" id="banned">
		<CardContainer>
			{#each data.banned as bot}
				<BotCard data={bot} type="bot" rand={false}/>
			{/each}
		</CardContainer>
	</Section>
{:else}
	<a href="/frostpaw/stats?full=true">Click here to view banned and denied bots. Note that this request may timeout</a>
{/if}