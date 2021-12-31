<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/api/v2/bots/${params.id}/raw`;
		const res = await fetchFates(url);

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
	import Icon from '@iconify/svelte';
	export let data: any;
</script>
<svelte:head>
    <title>{data.user.username}</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://fateslist.xyz/bot/{data.user.id}">
    <meta property="og:title" content="Discover {data.user.username} on FatesList!">
    <meta property="og:description" content="{data.description}">
    <meta property="og:image" content="{data.user.avatar}">
    <meta property="twitter:card" content="summary">
    <meta property="twitter:url" content="https://fateslist.xyz/">
    <meta property="twitter:title" content="Discover {data.user.username} on FatesList!">
    <meta property="twitter:description" content="{data.description}">
    <meta property="twitter:image" content="{data.user.avatar}">        
</svelte:head>
<pre>
{JSON.stringify(data)}
</pre>
{@html data.description}