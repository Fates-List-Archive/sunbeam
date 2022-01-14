<a class="render-msg" href="https://api.fateslist.xyz/bot/admin/add">Click here if this page does not render</a>
<iframe frameborder="0" title="Add Bot Page" src="https://api.fateslist.xyz/bot/admin/add?iframe=true" width="100%"></iframe>

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
	let token = $session.session.token;
	if(!token) {
		if(browser) {
			loginUser()
		}
	}
</script>
