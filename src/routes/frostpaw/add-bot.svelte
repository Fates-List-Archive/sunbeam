<iframe src="https://api.fateslist.xyz/bot/admin/add?iframe=true" width="100%"></iframe>
<style>
	iframe {
		border: none;
		height: 100vh;
	}
</style>
<script lang="ts">
	import { loginUser } from "$lib/request"
	import { session } from '$app/stores';
	let token = $session.session.token;
	if(!token) {
		loginUser()
	}
</script>
