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

{#if status == 408}
	<h3>Don't worry, this won't take too long!</h3>
{/if}
<p>Please visit our <a href="https://fateslist.xyz/server/789934742128558080/invite">support server</a> if you have any queries or concerns or just for fun!</p>
