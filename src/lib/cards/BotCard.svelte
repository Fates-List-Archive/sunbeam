<script lang="ts">
    import LazyImage from 'svelte-lazy-image';
    import Icon from '@iconify/svelte';
    import Button from '@smui/button';
    import { enums } from '../enums/enums'
    export let data: any;
    export let type: string;
    export let rand: boolean;

    // Do some processing
    if(data.id && !data.user) {
        data.user = {"id": data.id}
    }
</script>

  
<section class="bot-card">
    <!--<LazyImage class="bot-card-banner" src="{data.banner || '/static/assets/prod/banner.webp?v=1'}" sizes="(max-width: 33%)"></LazyImage>-->
        {#if (type == 'bot' || type == 'server') && (data.state == enums.BotState.certified) }
            <Icon class="bot-card-cert" icon="fa-solid:certificate" inline="false" height="3em"></Icon>
        {/if}
        <a href="/{type}/{data.user.id}" class="bot-card-view-link">
            <img alt="Bot Avatar" class="bot-card-avatar" src="{data.user.avatar.replace('.png', '.webp')}" width="30%" height="20%" loading="lazy"/>
        </a>
    <div>
        <a href="/{type}/{data.user.id}" class="bot-card-view-link">
            <div class="bot-card-username">
                <p class="bot-card-username-txt white-bold">{#if rand}Fetching random bot{:else}{data.user.username}{/if}</p>
            </div>
        </a>
    </div>

    <p class="bot-card-description">
        <strong class="bot-card-description-txt" style="overflow-wrap: anywhere;">{data.description}</strong>
    </p>

    {#if type == 'bot' || type == 'server'}
    <div class="d-flex bot-card-footer">
        <div class="bot-card-footer-stats">
            <p class="text-center white-bold">
                <Icon icon="fa-solid:server" inline="false"></Icon>
                <span style="margin-left: 3px;" class="bot-servers">{#if rand}N/A{:else}{data.guild_count}{/if}</span>
            </p>
        </div>
        <div class="bot-card-footer-stats">
            <p class="text-center white-bold">
                <Icon icon="fa-solid:thumbs-up" inline="false"></Icon>
                <span style="margin-left: 3px;" class="bot-votes">{#if rand}N/A{:else}{data.votes}{/if}</span>
            </p>
        </div>
    </div>
    {/if}
    <div class="bot-card-actions">
        <Button aria-label="View" href="/{type}/{data.user.id}" class="bot-card-actions-link bot-card-view-link" touch variant="outlined">View</Button>
        {#if type != 'profile'}
            <Button aria-label="Invite" href="/{type}/{data.user.id}/invite" class="bot-card-actions-link invite-link" target="_blank" touch variant="outlined">Invite</Button>
        {/if}
    </div>
</section>

<style>
    .text-center {
        text-align: center;
    }
    .d-flex {
        display: flex;
    }
</style>