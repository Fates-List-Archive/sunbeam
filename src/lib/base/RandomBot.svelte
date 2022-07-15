<script lang="ts">
	import Button from '@smui/button';
	import BotCard from '$lib/cards/BotCard.svelte';
	import { roll } from '$lib/request';
	export let type: string;

	export let randomBot: any;

	async function roller() {
		randomBot = await roll(type, fetch);
	}
</script>

<div class="flex">
	<BotCard {type} rand={false} data={randomBot} />
	<Button
		class="random-button white button"
		on:click={() => {
			roller();
		}}
		touch
		variant="outlined">Roll</Button
	>
</div>
<div class="spacer" />

<style>
	.spacer {
		margin-bottom: 10px;
	}
	.flex {
		margin-left: auto;
		margin-right: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	:global(.random-button) {
		display: flex !important;
		border: solid thin !important;
		outline: none !important;
	}
</style>
