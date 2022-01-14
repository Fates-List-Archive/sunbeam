<a class="render-msg" href="https://api.fateslist.xyz/bot/admin/add?iframe=true">Click here if this page does not render</a>
<iframe frameborder="0" title="Add Bot Page" src="https://api.fateslist.xyz/bot/admin/add?iframe=true" width="100%"></iframe>

<BristlefrostMeta 
	url="https://fateslist.xyz/frostpaw/add-server"
	title="Fates List | Add Bot"
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
	import { loginUser } from "$lib/request"
	import { session } from '$app/stores';
	import { browser } from "$app/env"
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	let token = $session.session.token;
	if(!token) {
		if(browser) {
			loginUser(false)
		}
	}
</script>
