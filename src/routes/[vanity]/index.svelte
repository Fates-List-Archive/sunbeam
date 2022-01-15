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
		const res = await fetchFates(url);

		if (res.ok) {
            let data = await res.json()
			let id: string = data.redirect
			let type: string = data.type

			const pageUrl = `/api/v2/${type}s/${id}/_sunbeam`;
			const pageRes = await fetchFates(pageUrl);
			if (pageRes.ok) {
				let pageData = await pageRes.json()
				console.log(pageData)
				return {
					props: {
						data: pageData.data,
            	        cacheVersion: pageData.fl_cache_ver,
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
	export let data: any;
	export let type: string;

	if(type == "guild") {
		type = "server"
	}
</script>
<BotServerPage data={data} type="{type}"></BotServerPage>