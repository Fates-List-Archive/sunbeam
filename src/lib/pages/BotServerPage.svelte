<script lang="ts">
    //import Icon as IconifyIcon from '@iconify/svelte';
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
    import { enums } from '../enums/enums';
	export let data: any;
    export let type: string;

    let panel1Open = false
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz/{type}/{data.user.id}"
    pageTitle="{data.user.username}"
	title="Discover {data.user.username} on Fates List!"
	description="{data.description}"
	thumbnail="{data.user.avatar}"
></BristlefrostMeta>

{#if data.banner && data.keep_banner_decor}
<style lang="scss">
.banner-decor {
  opacity: 0.7;
  background-color: black; 
  border-radius: 15px 15px 15px 15px;
}
</style>
{/if}
<style lang="scss">
:global(.buttons-all) {
    background-color: black !important;
}
:global(.codehilite) {
    background-color: white;
}

.prefix {
    opacity: 0.65;
}

.bot-page-banner {
    background-size: cover;
    width: 100%;
    height: 100%;
    min-height: 1000px;
    background-repeat: no-repeat;
}

.bot-page {
    display: flex;
    flex-wrap: wrap;
}

.bot-username, .bot-avatar {
    display: flex;
    opacity: 1 !important;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.bot-avatar {
    border-radius: 50%; 
    width: 120px;
}

.bot-page-content {
    display: block; 
    margin: 10px; 
    width: 100%;
}

.accordion-container {
    display: block;
    cursor: text !important;
}

</style>
<div class="lozad bot-page-banner" data-background-image="{data.banner}">
    <img class="bot-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="{type}-avatar" alt="{data.user.username}'s avatar">
    <article class="bot-page" style="{data.css}">
        <a href="/{type}/{data.user.id}/invite" class="banner-decor bot-username">
            <h3 class="text-center white" id="bot-name">{data.user.username} {#if type == "bot"}<span class="prefix">({data.prefix || "/"})</span>{/if}</h3>
        </a>
        <div class="bot-page-content">
            <div class="accordion-container">
                <Accordion multiple>
                    {#if enums.helpers.flagCheck(enums.Flags.system, data.flags) }
                    <Panel color="secondary" open>
                        <Header ripple={false}>
                          System Bot
                        </Header>
                        <Content class="accordian-container">
                            This bot is a system bot and was added as a placeholder to avoid malicious use of your bot. 
                            If you are the bots owner, please either edit your bot setting System to False if available or contact 
                            Fates List Support to claim the bot. To avoid misinformation and false advertising, the actual owner of 
                            the bot is listed in About who may edit their bot if they wish to change anything on it.
                        </Content>
                    </Panel>
                    {/if}
                    {#if data.state == enums.BotState.denied}
                    <Panel color="primary" open>
                        <Header ripple={false}>
                          Bot Denied
                        </Header>
                        <Content class="accordian-container">
                            This bot has been DENIED from this list for being a 
                            low-quality bot. Please do not invite it.
                        </Content>
                    </Panel>
                    {/if}
                </Accordion>
            </div>
        </div>
    </article>
</div>