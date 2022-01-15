<script context="module" lang="ts">
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
        return {
            props: {
                id: params.id
            }
        }
    }
</script>
<script lang="ts">
	import PageFrame from "$lib/pages/Iframe.svelte"
    export let id: string;
</script>
<PageFrame 
	iframeUrl="https://api.fateslist.xyz/_sunbeam/pub/bot/{id}/settings" 
	title="Add Bot Page" 
	metaTitle="Fates List | Bot Settings"
	metaUrl="https://fateslist.xyz/bot/{id}/settings"
></PageFrame>
