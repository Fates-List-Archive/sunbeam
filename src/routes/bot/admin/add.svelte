<script context="module" lang="ts">
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
        return {
            status: 307,
            redirect: "https://api.fateslist.xyz/bot/admin/add"
        }
    }
</script>