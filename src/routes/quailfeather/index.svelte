<script lang="ts" context="module">
	import { fetchFates } from "$lib/request"
	export const prerender = false
	export async function load({ params, url, fetch, session, stuff }) {
		const res = await fetchFates("/stats", "", fetch, false, true);
		if(res.ok) {
            let id = "0";
            if(session.session.token) {
                id = session.session.user.id
            }
            let perms = await fetchFates(`/baypaw/perms/${id}`, "", fetch, false, true)
			return {
				props: {
					data: await res.json(),
                    perms: await perms.json()
				}
			}
		}
		else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			}
		}
	}
</script>
<script lang="ts">
	import BotCard from "$lib/cards/BotCard.svelte";
	import CardContainer from "$lib/cards/CardContainer.svelte";
	import Section from "$lib/base/Section.svelte";
	import {enums} from "$lib/enums/enums"
import Button from "@smui/button";
import { nextUrl } from "$lib/config";
import { session } from "$app/stores";
import alertstore from "$lib/alertstore";
import { genError } from "$lib/strings";
	export let data: any;
    export let perms: any;

	let approvedBots = []
	let bannedBots = []
	let deniedBots = []
	let pendingBots = []
	let certifiedBots = []
	let underReviewBots = []
	
	for(let i = data.bots.length; i--; i >= 0) {	
		let bot = data.bots[i]
		switch(bot.state) {
			case enums.BotState.denied:
				deniedBots.push(bot)
				break;
			case enums.BotState.banned:
				bannedBots.push(bot)
				break;
			case enums.BotState.certified:
				certifiedBots.push(bot)
				break;
			case enums.BotState.pending:
				pendingBots.push(bot)
				break;
			case enums.BotState.under_review:
				underReviewBots.push(bot)
				break;
			case enums.BotState.approved:
				approvedBots.push(bot)
				break;
		}
	}

	function secondsToDhms(seconds) {
		seconds = Number(seconds);
		var d = Math.floor(seconds / (3600*24));
		var h = Math.floor(seconds % (3600*24) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 60);

		var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
		var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	}

    async function claimBot(id: string) {
        let res = await fetch(`${nextUrl}/quailfeather/claim`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": $session.session.token
            },
            body: JSON.stringify({
                id: id
            })
        })

        if(res.ok) {
            $alertstore = {
                title: "Success",
                id: "success-msg",
                message: "Bot claimed successfully",
                show: true
            }
        } else {
            $alertstore = {
                title: "Error",
                id: "error-msg",
                message: genError(await res.json()),
                show: true
            }
        }
    }
</script>
<h1>Admin Statistics</h1>
<ul class="white" style="font-size: 24px">
	<li>Server Uptime: {secondsToDhms(data.uptime)}</li>
	<li>Server Uptime (Raw): {data.uptime}</li>
	<li>Queue Length: {pendingBots.length}</li>
	<li>Under Review Length: {underReviewBots.length}</li>
	<li>Total Bot Length: {data.total_bots}</li>
	<li>Approved or Certified Bot Length: {approvedBots.length + certifiedBots.length}</li>
	<li>Certified Bots Length: {certifiedBots.length}</li>
	<li>Banned Bots Length: {bannedBots.length}</li>
	<li>Denied Bots Length: {deniedBots.length}</li>
</ul>
<Section icon="fa-solid:plus" title="Queue" id="queue">
	<CardContainer>
		{#each pendingBots as bot}
			<BotCard data={bot} type="bot" rand={false}>
                {#if perms.perm > 2}
                    <div class="flex justify-center">
                        <Button on:click={() => claimBot(bot.user.id)} variant="outlined" class="button self-center">Claim</Button>
                    </div>
                {/if}
            </BotCard>
        {/each}
	</CardContainer>
</Section>

<Section icon="fluent:thinking-24-regular" title="Under Review" id="under-review">
	<CardContainer>
		{#each underReviewBots as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
</Section>

<Section icon="fa-solid:certificate" title="Certified" id="certified">
	<CardContainer>
		{#each certifiedBots as bot}
			<BotCard data={bot} type="bot" rand={false}/>
		{/each}
	</CardContainer>
</Section>