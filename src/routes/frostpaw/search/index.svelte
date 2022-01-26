<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ url, session, fetch }) {
        let query = url.searchParams.get("q")
        let targetType = url.searchParams.get("target_type")
		const searchUrl = `/api/v2/search?target_type=${targetType}&q=${query}`;
		const res = await fetchFates(searchUrl, "", fetch);

		if (res.ok) {
            let data = await res.json()
			return {
				props: {
					data: data,
                    targetType: targetType,
                    query: query
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Search Error`)
		};
	}
</script>
<script lang="ts">
    import CardContainer from "$lib/cards/CardContainer.svelte"
    import BotCard from "$lib/cards/BotCard.svelte"
    import SearchBar from "$lib/base/SearchBar.svelte"
    import Tag from "$lib/base/Tag.svelte";
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
import Section from "$lib/base/Section.svelte";
import BotPack from "$lib/base/BotPack.svelte";
    export let data: any;
    export let targetType: string;
    export let query: string;
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz/frostpaw/search?q={query}&target_type={targetType}"
	title="Search results for {targetType}s matching {query}"
	description="Find, invite and discover the best {targetType}s matching {query}"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>

<section>
	<h1>Fates List</h1>
	<h2 class="best-bots">Find the best bots for your servers!</h2>
</section>

<SearchBar type={targetType} query={query}></SearchBar>
<Tag targetType={targetType} tags={data.tags_fixed}></Tag>
<CardContainer>
	{#each data.search_res as bot}
		<BotCard data={bot} type={targetType} rand={false}/>
	{/each}
</CardContainer>

{#if targetType == "bot"}
	<Section title="Bot Packs" icon="bx:bx-package"></Section>
	{#each data.extra as pack}
		<BotPack pack={pack}></BotPack>
	{/each}
{/if}

<style lang="scss">
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
