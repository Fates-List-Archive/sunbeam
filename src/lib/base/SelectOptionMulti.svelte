<script lang="ts">
	export let value: string;
	export let valueList: string[];
	export let alwaysOff = false;
	let inList = false;
	try {
		valueList.forEach((k) => {
			if (k == value) {
				inList = true;
			}
		});
	} catch (err) {
		inList = false;
	}

	if (alwaysOff) {
		inList = false;
	}
</script>

{#if inList}
	<option {value} selected><slot /></option>
{:else}
	<option {value}><slot /></option>
{/if}
