<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ session }) {
        let query = session.query.q
        let targetType = session.query.target_type
        console.log(query)
		const searchUrl = `/api/v2/search?target_type=${targetType}&q=${query}`;
		const res = await fetchFates(searchUrl);

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
