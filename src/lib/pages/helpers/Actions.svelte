<style lang="scss" global>
    .buttons-all {
        background-color: black !important;
        margin-right: 10px;
        color: white !important;
        opacity: 1 !important;
        //min-width: 130px;
        //max-width: 150px;
        word-wrap: break-word !important;
        font-size: 15px !important;
		border: solid 0.1px !important;
    }

    .disabled {
	    opacity: 0.63 !important;
    }

    @media screen and (max-width: 992px) {
        .buttons {
            overflow-x: scroll;
            overflow-y: hidden;
            overflow-wrap: break-word !important;
            font-size: 12px !important;
        }
    }

    .buttons {
        word-wrap: break-word;
        text-overflow: ellipsis;
    }

    .buttons {
        margin-bottom: 40px;
    }

    .buttons {
        display: flex;
        flex-flow: column-wrap;
        justify-content: center;
        align-items: center;
        min-width: 93%;
        height: 53px;
        margin: 0 auto;
        /*white-space: nowrap;*/
    }

    @media screen and (max-width: 768px) {
        .buttons {
            margin-left: 10px !important;
            width: 100% !important;
            overflow-wrap: break-word !important;
        }
        .auxillary {
            display: none;
        }
        .mobile-small {
            font-size: 11px !important;
        }
    }
</style>
<span class="auxillary"></span>
<div class="buttons">
<Button on:click={() => voteBot()} class="buttons-all" id="buttons-vote" touch variant="outlined">
    <Icon icon="fa-solid:thumbs-up" inline={false}/>
    <span style="margin-left: 3px;">{data.votes}</span>
</Button>
<Button href="/{type}/{data.user.id}/invite" class="buttons-all" id="buttons-invite" touch variant="outlined" rel="external">
    <span>{#if type == "server"}Join{:else}Invite{/if}</span>
</Button>
{#if type == "bot"}
    {#if data.support}
    <Button href="{data.support}" id="buttons-support" class="buttons-all" touch variant="outlined">
        <span>Support</span>
    </Button>
    {:else}
    <Button class="buttons-all disabled" id="buttons-support" touch variant="outlined" disabled>
        <span>Support</span>
    </Button>
    {/if}
{/if}
{#if data.website}
<Button href="{data.website}" id="buttons-website" class="buttons-all auxillary" touch variant="outlined">
    <span>Website</span>
</Button>
{:else}
<Button class="buttons-all disabled auxillary" id="buttons-website auxillary" touch variant="outlined" disabled>
    <span>Website</span>
</Button>
{/if}
{#if data.privacy_policy}
<Button href="{data.privacy_policy}" id="buttons-privacy" class="buttons-all auxillary" touch variant="outlined">
    <span class="mobile-small">Privacy</span>
</Button>
{:else}
<Button class="buttons-all disabled auxillary" id="buttons-privacy" touch variant="outlined" disabled>
    <span>Privacy</span>
</Button>
{/if}
{#if data.donate}
<Button href="{data.donate}" id="buttons-donate" class="buttons-all auxillary" touch variant="outlined">
    <span>Donate</span>
</Button>
{:else}
<Button class="buttons-all disabled auxillary" id="buttons-donate" touch variant="outlined" disabled>
    <span>Donate</span>
</Button>
{/if}
{#if $session.session.token && $session.session.user_experiments.includes(enums.UserExperiments.BotReport)}
    <Button on:click={() => {
        $alertstore = reportView($session.session.user.id, $session.session.token, data.user.id, type)
    }} id="buttons-report" class="buttons-all" touch variant="outlined">
    <span>Report</span>
</Button>
{/if}
{#if type == "bot"}
    <Button href='/bot/{data.user.id}/settings' id="buttons-settings" class="buttons-all auxillary" touch variant="outlined">
        <span>Settings</span>
    </Button>
{:else}
    <Button class="buttons-all disabled auxillary" id="buttons-settings" touch variant="outlined" disabled>
        <span>Settings</span>
    </Button>
{/if}
</div>

<script lang="ts">
import { session } from "$app/stores";
import alertstore from "$lib/alertstore";

    import { enums } from "$lib/enums/enums";
import loadstore from "$lib/loadstore";
import navigationState from "$lib/navigationState";
import { reportView, voteHandler } from "$lib/request";
import Icon from "@iconify/svelte";
import Button from "@smui/button";

    export let data: any;
    export let type: string;

    async function voteBot() {
        let token = $session.session.token
        let userID = ""
        if(token) {
            userID = $session.session.user.id
        }
        $loadstore = "Voting..."
        $navigationState = 'loading';
        let res = await voteHandler(userID, token, data.user.id, false, type)
        let jsonDat = await res.json()
        if(res.ok) {
            $alertstore = {
                show: true,
                title: "Successful Vote",
		message: `
Successfully voted for this ${type}!

<em>Pro Tip</em>: You can vote for ${type} directly on your server using Fates List Helper. Fates List Helper also supports vote reminders as well!

You can invite Fates List Helper to your server by <a style="color: blue !important" href="https://discord.com/api/oauth2/authorize?client_id=811073947382579200&permissions=2048&scope=bot%20applications.commands">clicking here</a>!

If you have previously invited Squirrelflight, please remove and add Fates List Helper instead.
`,
                id: "alert"
            }
        } else {
            $alertstore = {
                show: true,
                title: "Oops :(",
                message: jsonDat.reason,
                id: "alert"
            }		
        }
        $navigationState = "loaded"
    }
</script>
