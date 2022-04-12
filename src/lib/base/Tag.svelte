<script lang="ts">
    import Icon from '@iconify/svelte';
    import Button from "@smui/button";
    import type { FLTags } from "$lib/apiTypes"
    export let tags: FLTags;
    export let targetType: string;
    export let modWidth: boolean = true; // Whether to set width to 90% or not, needed in bot pages to make showing tags look decent

    // Add first maxTags to initial render view
    let maxTags = 5

    let tagsToDisplay = tags.slice(0, maxTags)

    let showingAllTags = false

    function showAllTags() {
        if(showingAllTags) {
            showingAllTags = false
            tagsToDisplay = tags.slice(0, maxTags)
        } else {
            showingAllTags = true;
            tagsToDisplay = tags
        }
    }

    let classList = "tag-container";

    if(modWidth) {
        classList += " width-90"
    }

</script>
<div class={classList}>
    {#each tagsToDisplay as tag}
        <span>
            <Button id="tags-{tag.id}" class="tag-item" href="/frostpaw/search/tags?tag={tag.id}&target_type={targetType}" title="{tag.name}" touch variant="outlined">
                <Icon class="white tag-icon" icon="{tag.iconify_data}" inline={false} aria-hidden="true"></Icon>
                <strong>{tag.name}</strong>
            </Button>
        </span>
    {/each}
    {#if !showingAllTags}
        <Button class="show-all" on:click={showAllTags} touch variant="outlined">+ {tags.length - maxTags}</Button>
    {:else}
        <Button class="show-all" on:click={showAllTags} touch variant="outlined">hide</Button>
    {/if}
</div>

<style lang="scss">
    :global(.tag-icon) {
        font-size: 15px;
        margin-right: 5px;
    }

    span {
        font-size: 13px;
    }

    .width-90 {
        width: 90%;
    }

    :global(.tag-item) {
        opacity: 1 !important;
        color: white !important;
        border: solid thin !important; 
        outline: none !important; 
        word-wrap: break-word;
        text-overflow: ellipsis;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        min-width: 180px;
    }

    .tag-container {
        margin-left: auto;
        margin-right: auto;
        line-height: 13px;
        margin-top: 5px;
    }

    :global(.show-all) {
        border: none !important;
        background-color: white !important;
        color: black !important
    }

</style>
