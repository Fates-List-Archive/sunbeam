<script lang="ts">
	import { loginUser } from '$lib/request';
	import { browser } from '$app/env';
	let msg = 'Please wait...';
	function riverLogin() {
		if (!browser) {
			return;
		}
		const urlParams = new URLSearchParams(window.location.search);
		let redirect = urlParams.get('redirect');
		if (redirect && redirect.startsWith('/')) {
			redirect = 'https://fateslist.xyz' + redirect;
		}
		if (!redirect || !redirect.startsWith('https://lynx.fateslist.xyz')) {
			msg = 'Invalid redirect';
			return;
		}
		localStorage.sunbeamLogin = redirect;
		loginUser(true);
	}
	riverLogin();
</script>

<p>{msg}</p>
