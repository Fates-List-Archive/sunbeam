<script lang="ts">
import Icon from '@iconify/svelte';
import Button from "@smui/button";
import type { TagInterface } from "$lib/types"
export let tags: TagInterface[];
export let targetType: string;
</script>
<div class="tag-container">
    {#each tags as tag}
        <Button id="tags-{tag.id}" class="tag-item" href="/frostpaw/search/tags?tag={tag.id}&target_type={targetType}" title="{tag.name}" touch variant="outlined" rel="external">
            <Icon class="white" icon="{tag.iconify_data}" inline={false} aria-hidden="true"></Icon>
            <span>
                <strong>{tag.name}</strong>
            </span>
        </Button>
    {/each}
</div>

<style lang="scss">
    span {
        font-size: 13px;
    }

    :global(.tag-item) {
        opacity: 1 !important;
	    font-weight: bold; 
	    border: solid thin !important; 
	    outline: none !important; 
        color: white !important;
        font-size: 18px;
	    display: inline-block;
	    margin: 10px;
	    //width: 170px;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
	    cursor: pointer;
    }
    .tag-container {
	    height: 100%;
	    width: 85%;
	    margin-left: auto;
	    margin-right: auto;
	    overflow-x: scroll;
	    overflow-y: hidden;
	    white-space: nowrap;
	    line-height: 13px;
	    margin-top: 5px;
    }

</style>