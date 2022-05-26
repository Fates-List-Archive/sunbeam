<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';

	export async function load({ session }) {
		let id = '0';
		if (session.session.token) {
			id = session.session.user.id;
		}
		let perms = await fetch(`${apiUrl}/baypaw/perms/${id}`);

		perms = await perms.json()

		if (perms.perm < 2) {
			return {
				status: 401,
				error: new Error('You are not a staff member.')
			};
		}

		let staffApps = await fetch(`${lynxUrl}/staff-apps?user_id=${id}`, {
			headers: {
				Authorization: session.session.token,
				'Content-Type': 'application/json'
			}
		});

		let json = await staffApps.json();

		if (!staffApps.ok) {
			return {
				status: 401,
				error: new Error(JSON.stringify(json))
			};
		}

		return {
			props: {
				perms: await perms.json(),
				apps: json
			}
		};
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';

	import Button from '@smui/button';
	import QuailTree from './_helpers/QuailTree.svelte';

	export let perms;
	export let apps;
</script>

<QuailTree perms={perms.perm}>
	{#each apps as app}
		{JSON.stringify(app.questions)}
	{/each}
</QuailTree>
