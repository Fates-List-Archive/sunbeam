<script lang="ts" context="module">
	import { fetchFates } from "$lib/request"
	export const prerender = false
	export async function load({ params, fetch, session, stuff }) {
		const full = session.query.full == "true"
		const url = `/api/blstats-full?api=true&full=${full}` // This will change
		const res = await fetchFates(url, "", fetch);
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
</script>
<h1>Statistics</h1>
<ul class="white" style="font-size: 24px">
	<li>Queue Length: {data.queue.length}</li>
	<li>Under Review Length: {data.under_review.length}</li>
	<li>Total Bot Length: {data.bot_amount}</li>
	<li>Certified Bots Length: {data.certified.length}</li>
	<li>Banned Bots Length: {data.banned_amount}</li>
	<li>Denied Bots Length: {data.denied_amount}</li>
</ul>
<Section icon="fa-solid:plus" title="Queue"></Section>
<CardContainer>
	{#each data.queue as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>
<Section icon="fluent:thinking-24-regular" title="Under Review"></Section>
<CardContainer>
	{#each data.under_review as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>
<Section icon="fa-solid:certificate" title="Certified"></Section>
<CardContainer>
	{#each data.certified as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>

{#if full}
	<Section icon="akar-icons:cross" title="Denied Bots"></Section>
	<CardContainer>
		{#each data.denied as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
	<Section icon="bi:hammer" title="Banned Bots"></Section>
	<CardContainer>
		{#each data.banned as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
{:else}
	<a href="/frostpaw/stats?full=true">Click here to view banned and denied bots. Note that this request may timeout</a>
{/if}