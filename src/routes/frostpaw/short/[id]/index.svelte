<script lang="ts" context="module">
	import { fetchFates } from "$lib/request";
		/** @type {import('@sveltejs/kit@next').Load} */
		export async function load({params, fetch, session, stuff}) {
			let res = await fetch(`${apiUrl}/api/v2/short/${params.id}`)
			if(!res.ok) {
				return {
					status: res.status,
					error: new Error("Could not fetch long url") 
				}
			}
			let data = await res.json()
			return {
				props: {
                    url: data.url,
				}
			}
		}
</script>
<script lang="ts">
import { browser } from "$app/env";
export let url: string
import { apiUrl } from "$lib/config";

    if(browser) {
        window.location.href = url
    }
</script>