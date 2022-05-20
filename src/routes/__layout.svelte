<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Alert from '$lib/base/Alert.svelte';
	import lozad from 'lozad';

	import navigationState from '$lib/navigationState';
	import inputstore from '$lib/inputstore';
	import alertStore from '$lib/alertstore';
	import PageLoader from '$lib/base/PageLoader.svelte';

	import { browser } from '$app/env';
	import loadstore from '$lib/loadstore';
	import { apiUrl } from '$lib/config';
	import * as logger from '$lib/logger';

	import { navigating } from '$app/stores';

	if (browser) {
		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();
		localStorage.currentPage = window.location.href;
	}

	import './../css/tailwind.css';

	$: {
		if ($navigating) {
			logger.info('Nav', `isNavigating: ${$navigating.from} -> ${$navigating.to}`);
			if ($navigating.to.host != $navigating.from.host) {
				logger.info('Nav', 'navigating to different host');
				$navigationState = 'loaded';
			} else {
				$inputstore = [];
				$loadstore = 'Loading...';
				$navigationState = 'loading';
			}
		}
		if (!$navigating) {
			$navigationState = 'loaded';
		}
	}
</script>

<svelte:head>
	<link href="{apiUrl}/static/assets/prod/material-icons.min.css" rel="stylesheet" />
	<!-- SMUI Styles -->
	<link rel="stylesheet" href="{apiUrl}/static/smui.css?v=8" />
	<link
		rel="stylesheet"
		href="{apiUrl}/static/smui.css?v=8"
		media="(prefers-color-scheme: light)"
	/>
	<link
		rel="stylesheet"
		href="{apiUrl}/static/smui-dark.css?v=8"
		media="(prefers-color-scheme: dark)"
	/>
	<meta
		name="keywords"
		content="discord bot, discord bot list, fateslist, fates list, bot list, discord list, list of bots, list of bot, bot, discord bots, fateslist bots, fates list"
	/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</svelte:head>

<Header />
<main style="background-color: #1D1E23 !important;">
	<PageLoader>
		<slot />
	</PageLoader>
</main>

{#if $alertStore}
	<Alert
		close={$alertStore.close}
		show={$alertStore.show}
		title={$alertStore.title}
		id={$alertStore.id}>{@html $alertStore.message.replaceAll('\n', '<br/>')}</Alert
	>
{/if}

<style lang="scss" global>
	@import './../css/base.scss';
	@import './../css/tw-patch.scss';
	.footer {
		margin-left: 3px;
	}
	pre {
		color: white !important;
	}
</style>
