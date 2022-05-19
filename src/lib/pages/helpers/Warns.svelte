<script lang="ts">
	export let data: any;
	import { enums } from '$lib/enums/enums';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
</script>

<div class="accordion-container">
	<Accordion multiple>
		{#if enums.helpers.flagCheck(enums.Flags.system, data.flags)}
			<Panel color="secondary" open>
				<Header ripple={false}>System Bot</Header>
				<Content class="accordian-container">
					This bot is a system bot and was added as a placeholder to avoid malicious use of your
					bot. If you are the bots owner, please either edit your bot setting System to False if
					available or contact Fates List Support to claim the bot. To avoid misinformation and
					false advertising, the actual owner of the bot is listed in About who may edit their bot
					if they wish to change anything on it.

					<em>System gots cannot be voted for until claimed</em>
				</Content>
			</Panel>
		{/if}
		{#if data.state == enums.BotState.denied}
			<Panel color="primary" open>
				<Header ripple={false}>Bot Denied</Header>
				<Content class="accordian-container">
					This bot has been DENIED from this list for being a low-quality bot. Please do not invite
					it.
				</Content>
			</Panel>
		{:else if data.state == enums.BotState.banned}
			<Panel color="primary" open>
				<Header ripple={false}>Bot Banned</Header>
				<Content class="accordian-container">
					This bot has been BANNED from this bot list for violating our rules or being a low-quality
					bot. Please do not invite it until further notice!
				</Content>
			</Panel>
		{:else if data.state == enums.BotState.pending}
			<Panel color="secondary" open>
				<Header ripple={false}>Bot Pending Review</Header>
				<Content class="accordian-container">
					This bot has not yet been tested and may be low quality or malicious. Please do not invite
					it yet
				</Content>
			</Panel>
		{:else if data.state == enums.BotState.under_review}
			<Panel color="secondary" open>
				<Header ripple={false}>Bot Under Review</Header>
				<Content class="accordian-container">
					This bot is currently being tested, Expect to hear from us soon!
				</Content>
			</Panel>
		{/if}
	</Accordion>
</div>
