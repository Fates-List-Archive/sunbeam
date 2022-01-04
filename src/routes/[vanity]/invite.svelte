<script context="module" lang="ts">
	import { fetchFates } from "$lib/request"
	export const prerender = false;
    export async function load({ params, fetch, session, stuff }) {
		const codeUrl = `/api/v2/code/${params.vanity}`;
		const codeRes = await fetchFates(codeUrl);

		if (codeRes.ok) {
            let data = await codeRes.json()
			let id: string = data.redirect
			let type: string = data.type

            if(type == "bot") {
                return {
                    status: 307,
                    redirect: `/bot/${id}/invite`
                }
            } else {
                return {
                    status: 307,
                    redirect: `/server/${id}/invite`
                }
            }
        }
    }
</script>