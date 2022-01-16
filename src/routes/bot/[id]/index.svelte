<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/bots/${params.id}/_sunbeam`;
		
		let auth = ""
        	
		if(session.session.user) {
			auth = `${session.session.user.id}|${session.session.token}`
		}
		
		const res = await fetchFates(url, auth, fetch);

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
	import BotServerPage from '$lib/pages/BotServerPage.svelte';
	export let data: any;
</script>
<BotServerPage data={data} type="bot"></BotServerPage>
