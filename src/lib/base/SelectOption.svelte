<script lang="ts">
	export let value: string;
	export let masterValue: string;
</script>

{#if `${masterValue}` == `${value}`}
	<option {value} selected><slot /></option>
{:else}
	<option {value}><slot /></option>
{/if}
