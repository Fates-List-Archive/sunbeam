<script lang="ts">
    import Icon from '@iconify/svelte';
    export let icon: string;
    export let title: string;
</script>
<div class="bot-section">
    <Icon class="white bot-section-frag" icon={icon} inline={true} height="3em"></Icon>
    <h2 class="bot-section-frag">{title}</h2>
    <hr/>
</div>
<style lang="scss">
	h2 {
		font-size: 40px;
		margin: 0px;
	}

	.bot-section-frag {
        margin-right: 10px !important;
		margin-left: 10px !important;
		display: inline-block;
	}

    .bot-section {
        margin-left: 10px;
        margin-right: 10px;
    }
</style>