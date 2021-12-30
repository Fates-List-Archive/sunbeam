<script context="module" lang="ts">
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `http://127.0.0.1:9999/api/v2/index?type=0`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					bots: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<script>
	export let bots;
</script>

<svelte:head>
	<title>Home</title>
	<title>Fates List | Discord Bot List</title>
	<meta name="title" content="Fates List | Discord Bot List">
	<meta name="description" content="Find, invite and discover the best Discord bots, now on Fates List.">
	<meta name="language" content="English">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://fateslist.xyz/">
	<meta property="og:title" content="Fates List">
	<meta property="og:description" content="Find, invite and discover the best bots &amp; servers now on FatesList">
	<meta property="og:image" content="https://fateslist.xyz/static/botlisticon.webp">
	<meta property="twitter:card" content="summary">
	<meta property="twitter:url" content="https://fateslist.xyz/">
	<meta property="twitter:title" content="Fates List | Discord Bot List">
	<meta property="twitter:description" content="Find, invite and discover the best bots &amp; servers now on FatesList">
	<meta property="twitter:image" content="https://fateslist.xyz/static/botlisticon.webp">
</svelte:head>

<section>
	<h1>Fates List</h1>
	<h2 class="best-bots">Find the best bots for your servers!</h2>
	<h3>Bots: {JSON.stringify(bots)}</h3>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
