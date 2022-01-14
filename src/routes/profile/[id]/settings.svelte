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
	iframeUrl="https://api.fateslist.xyz/profile/{id}/edit?iframe=true" 
	title="Add Bot Page" 
	metaTitle="Fates List | Profile Edit"
	metaUrl="https://fateslist.xyz/profile/{id}/settings"
></PageFrame>