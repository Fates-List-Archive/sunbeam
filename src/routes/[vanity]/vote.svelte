<script context="module" lang="ts">
	export const prerender = false;
	import { fetchFates } from "$lib/request"
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/code/${params.vanity}`;
		const res = await fetchFates(url, "", fetch);

		if (res.ok) {
            let data = await res.json()
			let id: string = data.redirect
			let type: string = data.type

			const pageUrl = `/api/v2/${type}s/${id}`;
			const pageRes = await fetchFates(pageUrl, "", fetch, true);
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
	import BotServerVotePage from '$lib/pages/BotServerVotePage.svelte';
	export let data: any;
	export let type: string;

	if(type == "guild") {
		type = "server"
	}
</script>
<BotServerVotePage data={data} type="{type}"></BotServerVotePage>
