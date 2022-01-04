<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
                status: status,
                error: error.message
			}
		};
	}
</script>
<script>
	export let status;
    export let error;
</script>

<h1 style="text-align: center">{status}</h1>
<h2>{error}</h2>
