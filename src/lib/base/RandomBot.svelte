<script lang="ts">
    import Button from '@smui/button';
    import BotCard from '$lib/cards/BotCard.svelte'
    import { roll } from '$lib/request'
    export let type: string;

    export let randomBot: any;

    console.log(randomBot)

</script>
<div class="flex">
    <BotCard type={type} rand={false} data={randomBot}></BotCard>
    <!--<Button class="random-button white" on:load={roll(type)} on:click={roll(type)} touch variant="outlined">Roll</Button>-->
</div>
<div class="spacer"></div>
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