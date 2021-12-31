<script context="module">
    export async function load({ params, fetch, session, stuff }) {
        return {
            status: 302,
            redirect: `https://fateslist.xyz/api/v2/bots/${params.id}/page/invite`
        };
    }
</script>