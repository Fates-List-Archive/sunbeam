<BristlefrostMeta 
	url="https://fateslist.xyz/{type}/{data.user.id}"
    pageTitle="{data.user.username}"
	title="Vote For {data.user.username} on Fates List!"
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

.bot-username, span {
    margin-bottom: 0px;
    padding-bottom: 0px;
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

#bot-description {
    font-size: 18px;
    text-align: center;
    margin: 0px;
    padding: 0px;
}

:global(.buttons-all) {
    color: white !important;
    border: solid thin !important;
    opacity: 1 !important;
    margin-right: 10px;
}

.buttons {
    margin-left: auto;
    text-align: center;
}

:global(.disabled) {
    opacity: 0.63 !important;
}

:global(.review-user) {
    opacity: 1;
	margin-top: 5px;
	padding-left: 3px;
	box-sizing: border-box;
	/*border-left: 1px solid white !important; */ 
	margin-bottom: 2px;
}
:global(.review-left) {
	display: inline-block;
}

:global(.page-item) {
    display: inline-block;
    margin-right: 5px !important;
    list-style: none;
}

.bot-username-link, #bot-name {
    margin-top: 0px !important;
    margin-bottom: 1px !important;
}

.red {
    color: red;
}
#vote-warning {
    text-align: center;
}
</style>

{@html data.css}

<div class="lozad bot-page-banner" data-background-image="{data.banner}">
    <img class="bot-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="bot-avatar" alt="{data.user.username}'s avatar">
    <article class="bot-page">
        <a href="/{type}/{data.user.id}/invite" class="banner-decor bot-username bot-username-link">
            <h2 class="white" id="bot-name">Vote for {data.user.username}! {#if type == "bot"}<span class="prefix">({data.prefix || "/"})</span>{/if}</h2>
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

			    <em>System gots cannot be voted for until claimed</em>
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
                    {:else if data.state == enums.BotState.banned}
                    <Panel color="primary" open>
                        <Header ripple={false}>
                          Bot Banned
                        </Header>
                        <Content class="accordian-container">
                            This bot has been BANNED from this bot list for violating our rules or being a low-quality bot. 
                            Please do not invite it until further notice!
                        </Content>
                    </Panel>
                    {/if}
                </Accordion>
            </div>
            <p class="banner-decor white" id="bot-description">{@html data.description.replace("p>", "span>") }</p>
            <div class="buttons">
			    <Button on:click={() => voteBot()} class="buttons-all" id="buttons-vote" touch variant="outlined">
				    <Icon icon="fa-solid:thumbs-up" inline={false}/>
				    <span style="margin-left: 3px;">{data.votes}</span>
			    </Button>
			    <Button href="/{type}/{data.user.id}/invite" class="buttons-all" id="buttons-vote" touch variant="outlined">
				    <span>Invite</span>
			    </Button>
            </div>
            <p id="vote-warning"><span class="red">Warning:</span> You can only vote for one bot every 8 hours, so vote wisely</p>
        </div>
    </article>
</div>

<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
    import Icon from '@iconify/svelte';
    import Button from '@smui/button';
    import { enums } from '../enums/enums';
    import { voteHandler } from '$lib/request'
    import { session } from '$app/stores';
	export let data: any;
    export let type: string;

    async function voteBot() {
        let token = $session.session.token
        let userID = ""
        if(token) {
            userID = $session.session.user.id
        }
        return await voteHandler(userID, token, data.user.id, false)
    }
</script>
