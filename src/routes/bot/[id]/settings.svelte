<script lang="ts" context="module">
	import { fetchFates } from "$lib/request";
		/** @type {import('@sveltejs/kit@next').Load} */
		export async function load({params, fetch, session, stuff}) {
			if(!session.session.token) {
				return {
					props: {
						failed: true,
						html: "Logging you in, please wait..."
					}
				}
			}
			let url = `/api/v2/_sunbeam/bots/${params.id}/settings?user_id=${session.session.user.id}`
			let res = await fetchFates(url, "User " + session.session.token, fetch)
			if(!res.ok) {
				let json = await res.json()
				return {
					status: res.status,
					error: new Error(`${JSON.stringify(json)}`)
				}
			}
			let json = await res.json()
			return {
				props: {
					failed: false,
					html: json.html
				}
			}
		}
</script>
<script lang="ts">
	import { browser } from "$app/env"
	import { loginUser } from "$lib/request"
	export let failed: boolean;
	export let html: string;
	if(failed) {
		if(browser) {
			loginUser(false)
		}
	}
</script>
{@html html}