<svelte:head>
	<link href="https://fateslist.xyz/static/assets/prod/material-icons.min.css" rel="stylesheet" defer />
	<!-- SMUI Styles -->	
	<link
  		rel="stylesheet"
  		href="https://fateslist.xyz/static/smui.css?v=4"
  		media="(prefers-color-scheme: light)"
	/>
	<link
  		rel="stylesheet"
  		href="https://fateslist.xyz/static/smui-dark.css?v=4"
  		media="screen and (prefers-color-scheme: dark)"
	/>
	<link rel="canonical" href="https://fateslist.xyz/">
	<meta name="keywords" content="discord bot, discord bot list, fateslist, fates list, bot list, discord list, list of bost, discord bots, fateslist bots, fates list">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</svelte:head>
<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import lozad from 'lozad';
    import { browser } from '$app/env'; 
	if(browser) {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
	}

	export let version: string = "2"
	export let frostpawVersion: string = "0.1.0"
</script>
<style lang="scss" global>
	@import "./../css/base.scss";
	.footer {
		margin-left: 3px;
	}
	pre {
		color: white !important;
	}
	#mdiv {
		height: 70px;
	}
</style>

<Header />
<div id="mdiv"></div>
<main>
	<slot />
</main>

<footer>
	<p>Sunbeam Version: {version}</p>
	<p>Frostpaw Client Version: {frostpawVersion}</p>
	<p>Please visit our <a href="https://fateslist.xyz/server/789934742128558080/invite">support server</a> if you have any queries or concerns or just for fun!</p>
</footer>