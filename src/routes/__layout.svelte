<svelte:head>
	<link href="https://fateslist.xyz/static/assets/prod/material-icons.min.css" rel="stylesheet" defer />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/svelte-material-ui/bare.min.css"
  	/>
	<link rel="canonical" href="https://fateslist.xyz/">
	<meta name="keywords" content="discord bot, discord bot list, fateslist, fates list, bot list, discord list, list of bost, discord bots, fateslist bots, fates list">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</svelte:head>
<script lang="ts">
	import Header from '$lib/header/Header.svelte';
</script>
<style lang="scss" global>
	@import "./../css/base.scss";
</style>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Please visit our <a href="https://fateslist.xyz/server/789934742128558080/invite">support server</a> if you have any queries or concerns or just for fun!</p>
</footer>