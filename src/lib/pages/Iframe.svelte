<!--<a class="render-msg" href={iframeUrl}>Click here if this page does not render</a>-->
{#if token}
	<iframe frameborder="0" title={title} src={iframeUrl} width="100%"></iframe>
{:else}
	<p>Logging you in, please wait...</p>
{/if}

<BristlefrostMeta 
	url={metaUrl}
	title={metaTitle}
	description="Find, invite and discover the best bots &amp; servers now on Fates List"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>

<style>
	.render-msg {
		font-size: 10px !important;
	}

	iframe {
		border-width: 0px;
		border: none;
		height: 100vh;
		margin: 0px;
		padding: 0px;
	} 

	::-webkit-scrollbar {
    	display: none;
	}

	:global(html) {
		overflow-y: hidden;
	}
</style>
<script lang="ts">
    export let iframeUrl: string;
    export let title: string;
    export let metaTitle: string;
    export let metaUrl: string;
	import { loginUser } from "$lib/request"
	import { session } from '$app/stores';
	import { browser } from "$app/env"
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	let token = $session.session.token;
	if(!token) {
		if(browser) {
			localStorage.reloadIgnore = window.location.href
			localStorage.reloadPage = "1"
			loginUser(false)
		}
	}
	if(browser) {
		localStorage.reloadIgnore = window.location.href
		localStorage.reloadPage = "1"
	}
</script>
