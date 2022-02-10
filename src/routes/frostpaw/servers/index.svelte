<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = true;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/index?type=1`;
		const res = await fetchFates(url, "", fetch);

		if (res.ok) {
			return {
				props: {
					data: await res.json()
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
	import BotCard from "$lib/cards/BotCard.svelte"
	import CardContainer from "$lib/cards/CardContainer.svelte"
	import Section from "$lib/base/Section.svelte"
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte"
	export let data: any;
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz"
	title="Fates List | Discord Bot List"
	description="Find, discover and join the best servers only on Fates List"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>


<section>
	<h1>Fates List</h1>
	<h2 class="best-bots">Find the best servers to join!</h2>
</section>
<SearchBar type="server" query=""></SearchBar>
<Tag targetType="server" tags={data.tags_fixed}></Tag>

<Section icon="fa-solid:certificate" title="Certified" id="certified-servers">
<CardContainer>
	{#each data.certified_bots as bot}
		<BotCard data={bot} type="server" rand={false} />
	{/each}
</CardContainer>
</Section>


<Section icon="fa-solid:sort-amount-up" title="Top Voted" id="top-voted-servers">
<CardContainer>
	{#each data.top_voted as bot}
		<BotCard data={bot} type="server" rand={false}/>
	{/each}
</CardContainer>
</Section>

<Section icon="fa-solid:plus" title="New Servers" id="new-servers">
<CardContainer>
	{#each data.new_bots as bot}
		<BotCard data={bot} type="server" rand={false}/>
	{/each}
</CardContainer>
</Section>

<style>
	h1 {
		font-size: 50px;
		margin: 0px;
	}

	h2 {
		font-size: 40px;
		margin: 0px;
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
