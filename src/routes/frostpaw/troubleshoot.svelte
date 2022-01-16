<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `/_sunbeam/dm/help`;
		const res = await fetchFates(url, "");
		if(res.ok) {
			return {
				props: {
					data: await res.json()
				}
			}
		} else {
			return {
				status: 500,
				error: new Error(`Sunbeam Troubleshooter could not contact our servers to get required troubleshooting information (${url})`)
			}
		}
	}
</script>
<script lang="ts">
	import { session } from '$app/stores';
	export let data: any;
	let sessInfo = $session;
</script>
<h1>{data.message}</h1>
<ul class="white">
	{#each Object.entries(data.data) as info}
		<li>{info[0]}: {info[1]}</li>
	{/each}
	<li>session: {JSON.stringify(sessInfo)}</li>
</ul>
