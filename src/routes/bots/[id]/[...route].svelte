<script context="module" lang="ts">
	export const prerender = false;
	import { fetchFates } from "$lib/request"
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {

        console.log(params, "Bot redirector")

        return {
            status: 307,
            redirect: `/bot/${params.id}/${params.route}`
        }
    }
</script>