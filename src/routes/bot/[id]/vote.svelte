<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/bots/${params.id}/_sunbeam`;
		const res = await fetchFates(url, "", fetch);

		if (res.ok) {
            let data = await res.json()
			return {
				props: {
					data: data.data,
                    cacheVersion: data.fl_cache_ver
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Bot Not Found`)
		};
	}
</script>
<script lang="ts">
    import BotServerVotePage from '$lib/pages/BotServerVotePage.svelte';
	export let data: any;
</script>
<BotServerVotePage data={data} type="bot"></BotServerVotePage>