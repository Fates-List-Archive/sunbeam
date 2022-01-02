<script lang="ts">
    import Icon from '@iconify/svelte';
    import Button from "@smui/button";
    import type { TagInterface } from "$lib/types"
    export let tags: TagInterface[];
    export let targetType: string;
    </script>
    <div class="tag-container">
        {#each tags as tag}
            <span>
                <Button id="tags-{tag.id}" class="tag-item" href="/frostpaw/search/tags?tag={tag.id}&target_type={targetType}" title="{tag.name}" touch variant="outlined" rel="external">
                    <Icon class="white tag-icon" icon="{tag.iconify_data}" inline={false} aria-hidden="true"></Icon>
                    <strong>{tag.name}</strong>
                </Button>
            </span>
        {/each}
    </div>
    
    <style lang="scss">
        :global(.tag-icon) {
            font-size: 15px;
            margin-right: 5px;
        }

        span {
            font-size: 13px;
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
            height: 100%;
            width: 90%;
            margin-left: auto;
            margin-right: auto;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            line-height: 13px;
            margin-top: 5px;
        }
    
    </style>