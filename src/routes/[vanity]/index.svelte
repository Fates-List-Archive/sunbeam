<script context="module" lang="ts">
	export const prerender = false;
	import { fetchFates } from "$lib/request"
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		if(params.vanity == "servers") {
			return {
				status: 307,
				redirect: "/frostpaw/servers/"
			}
		}
		const url = `/api/v2/code/${params.vanity}`;
		const res = await fetchFates(url, "", fetch);

		if (res.ok) {
            let data = await res.json()
			let id: string = data.redirect
			let type: string = data.type

			const pageUrl = `/api/v2/${type}s/${id}`;
			const pageRes = await fetchFates(pageUrl, "", fetch);
			if (pageRes.ok) {
				let pageData = await pageRes.json()
				console.log(pageData)
				return {
					props: {
						data: pageData,
						type: type
					}
				};
			}

			return {
				status: res.status,
				error: new Error(`Invalid Vanity`)
			};

		}

		return {
			status: res.status,
			error: new Error(`Invalid Vanity`)
		};
	}

</script>
<script lang="ts">
	import BotServerPage from '$lib/pages/BotServerPage.svelte';
	import BotServerPageTabs from '$lib/pages/BotServerPageTabs.svelte';
	import { enums } from "$lib/enums/enums";
	export let data: any;
	export let type: string;

	if(type == "guild") {
		type = "server"
	}
</script>
{#if data.page_style == enums.PageStyle.tabs}
	<BotServerPageTabs data={data} type={type}></BotServerPageTabs>
{:else}
	<BotServerPage data={data} type={type}></BotServerPage>
{/if}
