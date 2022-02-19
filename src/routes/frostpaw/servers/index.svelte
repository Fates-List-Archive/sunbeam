<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
        import { roll } from '$lib/request'
	export const prerender = true;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/index?target_type=server`;
		const res = await fetchFates(url, "", fetch, false, true);

		if (res.ok) {
			return {
				props: {
					data: await res.json(),
					randomBot: await roll("server")
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
        import RandomBot from "$lib/base/RandomBot.svelte";
	export let data: any;
	export let randomBot: any;
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
<Tag targetType="server" tags={data.tags}></Tag>
<RandomBot type="server" randomBot={randomBot}/>

<Section icon="fa-solid:certificate" title="Certified" id="certified-servers">
<CardContainer>
	{#each data.certified as server}
		<BotCard data={server} type="server" rand={false} />
	{/each}
</CardContainer>
</Section>


<Section icon="fa-solid:sort-amount-up" title="Top Voted" id="top-voted-servers">
<CardContainer>
	{#each data.top_voted as server}
		<BotCard data={server} type="server" rand={false}/>
	{/each}
</CardContainer>
</Section>

<Section icon="fa-solid:plus" title="New Servers" id="new-servers">
<CardContainer>
	{#each data.new as server}
		<BotCard data={server} type="server" rand={false}/>
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
