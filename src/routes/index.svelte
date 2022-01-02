<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	import { roll } from '$lib/request'
	export const prerender = true;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/index?type=0`;
		const res = await fetchFates(url);

		if (res.ok) {
			return {
				props: {
					data: await res.json(),
					randomBot: await roll("bot")
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import SearchBar from "$lib/base/SearchBar.svelte";
	import Tag from "$lib/base/Tag.svelte";
	import BotCard from "$lib/cards/BotCard.svelte";
	import CardContainer from "$lib/cards/CardContainer.svelte";
	import Icon from '@iconify/svelte';
	import RandomBot from "$lib/base/RandomBot.svelte";
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	export let data: any;
	export let randomBot: any;
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz"
	title="Fates List | Discord Bot List"
	description="Find, invite and discover the best bots &amp; servers now on Fates List"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>

<section>
	<h1>Fates List</h1>
	<h2 class="best-bots">Find the best bots for your servers!</h2>
</section>
<SearchBar type="bot" query=""></SearchBar>
<Tag targetType="bot" tags={data.tags_fixed}></Tag>
<RandomBot type="bot" randomBot={randomBot}/>

<Icon class="white" icon="fa-solid:certificate" inline={true} height="3em"></Icon>
<h2 class="bot-section">Certified</h2>
<CardContainer>
	{#each data.certified_bots as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>

<Icon class="white" icon="fa-solid:sort-amount-up" inline={true} height="3em"></Icon>
<h2 class="bot-section">Top Voted</h2>
<CardContainer>
	{#each data.top_voted as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>

<Icon class="white" icon="fa-solid:plus" inline={true} height="3em"></Icon>
<h2 class="bot-section">New Bots</h2>
<CardContainer>
	{#each data.new_bots as bot}
		<BotCard data={bot} type="bot" rand={false}/>
	{/each}
</CardContainer>


<style>
	h1 {
		font-size: 50px;
		margin: 0px;
	}

	h2 {
		font-size: 40px;
		margin: 0px;
	}

	.bot-section {
		margin-left: 10px;
		display: inline-block;
	}
	.best-bots {
		opacity: 0.6;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		overflow: hidden;
	}
</style>
