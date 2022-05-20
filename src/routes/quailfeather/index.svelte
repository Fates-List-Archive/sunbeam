<script lang="ts" context="module">
	import { fetchFates } from '$lib/request';
	export const prerender = false;
	export async function load({ params, url, fetch, session, stuff }) {
		const res = await fetchFates('/stats', '', fetch, false, true);
		if (res.ok) {
			let id = '0';
			if (session.session.token) {
				id = session.session.user.id;
			}
			let perms = await fetchFates(`/baypaw/perms/${id}`, '', fetch, false, true);
			return {
				props: {
					data: await res.json(),
					perms: await perms.json()
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}
	}
</script>

<script lang="ts">
	import BotCard from '$lib/cards/BotCard.svelte';
	import CardContainer from '$lib/cards/CardContainer.svelte';
	import Section from '$lib/base/Section.svelte';
	import { enums } from '$lib/enums/enums';
	import Button from '@smui/button';
	import { lynxUrl, nextUrl } from '$lib/config';
	import { session } from '$app/stores';
	import alertstore from '$lib/alertstore';
	import { genError } from '$lib/strings';
	import QuailTree from './_helpers/QuailTree.svelte';
import Tip from '$lib/base/Tip.svelte';
	export let data: any;
	export let perms: any;

	let approvedBots = [];
	let bannedBots = [];
	let deniedBots = [];
	let pendingBots = [];
	let certifiedBots = [];
	let underReviewBots = [];

	for (let i = data.bots.length; i--; i >= 0) {
		let bot = data.bots[i];
		switch (bot.state) {
			case enums.BotState.denied:
				deniedBots.push(bot);
				break;
			case enums.BotState.banned:
				bannedBots.push(bot);
				break;
			case enums.BotState.certified:
				certifiedBots.push(bot);
				break;
			case enums.BotState.pending:
				pendingBots.push(bot);
				break;
			case enums.BotState.under_review:
				underReviewBots.push(bot);
				break;
			case enums.BotState.approved:
				approvedBots.push(bot);
				break;
		}
	}

	let cache = {
		approved: approvedBots,
		banned: bannedBots,
		denied: deniedBots,
		pending: pendingBots,
		certified: certifiedBots,
		underReview: underReviewBots
	};

	// Ensure browsers dont crash trying to render 500 bots
	const MAX_RENDER = 25;

	deniedBots = deniedBots.slice(0, MAX_RENDER);
	bannedBots = bannedBots.slice(0, MAX_RENDER);
	pendingBots = pendingBots.slice(0, MAX_RENDER);
	approvedBots = approvedBots.slice(0, MAX_RENDER);
	underReviewBots = underReviewBots.slice(0, MAX_RENDER);
	certifiedBots = certifiedBots.slice(0, MAX_RENDER);

	const searchSection = (e, dataSource) => {
		let search = e.target.value.toLowerCase();
		if(!search) {
			return dataSource.slice(0, MAX_RENDER)
		}
		let filtered = [];
		for (let i = dataSource.length; i--; i >= 0) {
			let bot = dataSource[i];
			if (bot.user.username.toLowerCase().includes(search) || bot.user.id.includes(search)) {
				filtered.push(bot);
			}
		}
		return filtered.slice(0, MAX_RENDER);
	}

	const secondsToDhms = (seconds) => {
		seconds = Number(seconds);
		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor((seconds % (3600 * 24)) / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.floor(seconds % 60);

		const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
		const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
		const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
		const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
		return `${dDisplay} ${hDisplay} ${mDisplay} ${sDisplay}`;
	};

	const claimBot = async (id: string) => {
		handler(id, 'STUB_REASON', 'claim');
	};

	const unclaimBot = async (id: string) => {
		$alertstore = {
			title: 'Reason',
			id: 'feedback-msg',
			message: 'Please always unclaim when you can\'t review them',
			show: true,
			input: {
				label: "Reason",
				placeholder: "Reason for unclaim",
				multiline: false,
				function: (value) => {
					handler(id, value, 'unclaim')
				}
			},
		};
	};

	const approveBot = async (id: string) => {
		$alertstore = {
			title: 'Feedback',
			id: 'feedback-msg',
			message: 'Please carefully review bots before approving them',
			show: true,
			input: {
				label: "Feedback",
				placeholder: "Why is this bot being approved",
				multiline: false,
				function: (value) => {
					handler(id, value, 'approve')
				}
			},
		};
	};

	const denyBot = async (id: string) => {
		$alertstore = {
			title: 'Reason',
			id: 'reason-msg',
			message: 'Please do not deny for spurious reasons',
			show: true,
			input: {
				label: "Reason",
				placeholder: "Why is this bot being denied",
				multiline: false,
				function: (value) => {
					handler(id, value, 'deny')
				}
			},
		};
	};

	const unbanBot = async (id: string) => {
		$alertstore = {
			title: 'Reason',
			id: 'reason-msg',
			message: 'Please do not unban for spurious reasons',
			show: true,
			input: {
				label: "Reason",
				placeholder: "Why is this bot being unbanned?",
				multiline: false,
				function: (value) => {
					handler(id, value, 'unban')
				}
			},
		};
	}

	const requeueBot = async (id: string) => {
		$alertstore = {
			title: 'Reason',
			id: 'reason-msg',
			message: 'Please do not requeue for spurious reasons',
			show: true,
			input: {
				label: "Reason",
				placeholder: "Why is this bot being requeued?",
				multiline: false,
				function: (value) => {
					handler(id, value, 'requeue')
				}
			},
		};
	}

	const uncertifyBot = async (id: string) => {
		$alertstore = {
			title: 'Reason',
			id: 'reason-msg',
			message: 'Please do not uncertify for spurious reasons',
			show: true,
			input: {
				label: "Reason",
				placeholder: "Why is this bot being uncertified?",
				multiline: false,
				function: (value) => {
					handler(id, value, 'uncertify')
				}
			},
		};
	};

	const handler = async (id: string, reason: string, action: string) => {
		if (!reason) {
			return;
		}

		let res = await fetch(`${lynxUrl}/kitty`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: $session.session.token
			},
			body: JSON.stringify({
				id: id,
				reason: reason,
				action: action,
				user_id: $session.session.user.id
			})
		});

		if (res.ok) {
			$alertstore = {
				title: 'Success',
				id: 'success-msg',
				message: genError(await res.json()),
				show: true
			};
		} else {
			$alertstore = {
				title: 'Error',
				id: 'error-msg',
				message: genError(await res.json()),
				show: true
			};
		}
	};

	enum permData {
		USER = 1,
		BOT_REVIEWER = 2,
		MODERATOR = 3,
		ADMIN = 4,
		DEVELOPER = 5,
		HEAD_ADMIN = 6,
		OVERSEER = 7
	}

	const minPerm = (perm: permData) => {
		return `${perm} (${permData[perm]})`;
	};
</script>

<QuailTree>
	<h1>Admin Statistics</h1>
	<ul class="white" style="font-size: 24px">
		<li>Server Uptime: {secondsToDhms(data.uptime)} ({data.uptime})</li>
		<li>Queue Length: {cache.pending.length}</li>
		<li>Under Review Length: {cache.underReview.length}</li>
		<li>Total Bot Length: {data.total_bots}</li>
		<li>Approved or Certified Bot Length: {cache.approved.length + cache.certified.length}</li>
		<li>Certified Bots Length: {cache.certified.length}</li>
		<li>Banned Bots Length: {cache.banned.length}</li>
		<li>Denied Bots Length: {cache.denied.length}</li>
	</ul>

	<Tip>
		The list of bots rendered is currently limited to {MAX_RENDER} (to protect).<br/><br/>

		You can use the Search bar to look for a bot based on its ID or name. This works even if it is not rendered

		<br/><br/><br/>
		Support for server rendering is coming soon (TM)
	</Tip>

	<Section icon="fa-solid:plus" title="Queue" id="queue">
		<div class="search-flex">
			<input class="search-bots" placeholder="Search..." on:input={(e) => {
				pendingBots = searchSection(e, cache.pending)
			}} />
		</div>
		<CardContainer>
			{#each pendingBots as bot}
				<BotCard data={bot} type="bot" rand={false}>
					{#if perms.perm > permData.BOT_REVIEWER}
						<div class="flex justify-center">
							<Button
								on:click={() => claimBot(bot.user.id)}
								variant="outlined"
								class="button self-center">Claim</Button
							>
						</div>
					{/if}
				</BotCard>
			{/each}
		</CardContainer>
	</Section>

	<Section icon="fluent:thinking-24-regular" title="Under Review" id="under-review">
		<div class="search-flex">
			<input class="search-bots" placeholder="Search..." on:input={(e) => {
				underReviewBots = searchSection(e, cache.underReview)
			}} />
		</div>
		<CardContainer>
			{#each underReviewBots as bot}
				<BotCard data={bot} type="bot" rand={false}>
					{#if perms.perm > permData.BOT_REVIEWER}
						<div class="flex justify-center">
							<Button
								on:click={() => unclaimBot(bot.user.id)}
								variant="outlined"
								class="button self-center lb">Unclaim</Button
							>
							<Button
								on:click={() => approveBot(bot.user.id)}
								variant="outlined"
								class="button self-center lb">Approve</Button
							>
							<Button
								on:click={() => denyBot(bot.user.id)}
								variant="outlined"
								class="button self-center lb">Deny</Button
							>
						</div>
					{/if}
				</BotCard>
			{/each}
		</CardContainer>
	</Section>

	<Section icon="fa-solid:certificate" title="Certified" id="certified">
		<div class="search-flex">
			<input class="search-bots" placeholder="Search..." on:input={(e) => {
				certifiedBots = searchSection(e, cache.certified)
			}} />
		</div>
		<CardContainer>
			{#each certifiedBots as bot}
				<BotCard data={bot} type="bot" rand={false}>
					{#if perms.perm >= permData.HEAD_ADMIN}
						<div class="flex justify-center">
							<Button
								on:click={() => uncertifyBot(bot.user.id)}
								variant="outlined"
								class="button self-center">Uncertify</Button
							>
						</div>
					{/if}
				</BotCard>
			{/each}
		</CardContainer>
	</Section>

	<Section icon="bi:hammer" title="Banned Bots" id="banned">
		<div class="search-flex">
			<input class="search-bots" placeholder="Search..." on:input={(e) => {
				bannedBots = searchSection(e, cache.banned)
			}} />
		</div>
		<CardContainer>
			{#each bannedBots as bot}
				<BotCard data={bot} type="bot" rand={false}>
						<div class="flex justify-center">
							{#if perms.perm >= permData.ADMIN}
							<Button
								on:click={() => unbanBot(bot.user.id)}
								variant="outlined"
								class="button self-center">Unban</Button
							>
							{/if}

							{#if perms.perm >= permData.MODERATOR}
								<Button
									on:click={() => requeueBot(bot.user.id)}
									variant="outlined"
									class="button self-center">Requeue</Button
								>
							{/if}
						</div>
				</BotCard>
			{/each}
		</CardContainer>
	</Section>	

	<Section icon="akar-icons:cross" title="Denied Bots" id="denied">
		<div class="search-flex">
			<input class="search-bots" placeholder="Search..." on:input={(e) => {
				deniedBots = searchSection(e, cache.denied)
			}} />
		</div>
		<CardContainer>
			{#each deniedBots as bot}
				<BotCard data={bot} type="bot" rand={false}>
					{#if perms.perm >= permData.MODERATOR}
						<div class="flex justify-center">
							<Button
								on:click={() => requeueBot(bot.user.id)}
								variant="outlined"
								class="button self-center">Requeue</Button
							>
						</div>
					{/if}
				</BotCard>
			{/each}
		</CardContainer>
	</Section>	

	<Section icon="fa-solid:robot" title="Definitions" id="definitions">
		<h2>How to use</h2>
		<ol>
			<li>Find the initial state of the item you wish to handle</li>
			<li>
				From the initial state, trace out a route from said initial state to the final desired state
			</li>
			<li>???</li>
			<li>Profit!</li>
		</ol>
		<h2>Bot Actions</h2>
		<ul class="ba-defs">
			<li>
				Claim (claim): pending => under_review<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.BOT_REVIEWER)}</li>
				</ul>
			</li>
			<li>
				Unclaim (unclaim): under_review => pending<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.BOT_REVIEWER)}</li>
				</ul>
			</li>
			<li>
				Approve (approve): under_review => approved<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.BOT_REVIEWER)}</li>
				</ul>
			</li>
			<li>
				Deny (deny): under_review => denied<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.BOT_REVIEWER)}</li>
				</ul>
			</li>
			<li>
				Ban (ban): approved => banned<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.ADMIN)}</li>
				</ul>
			</li>
			<li>
				Unban (unban): banned => approved<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.ADMIN)}</li>
				</ul>
			</li>
			<li>
				Certify (certify): approved => certified<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.DEVELOPER)}</li>
				</ul>
			</li>
			<li>
				Uncertify (uncertify): certified => approved<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.DEVELOPER)}</li>
				</ul>
			</li>
			<li>
				Unverify (unverify): approved => under_review<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.MODERATOR)}</li>
				</ul>
			</li>
			<li>
				Requeue (requeue): denied | banned => under_review<br />
				<!--Impl-->
				<ul>
					<li>Minimum Perm: {minPerm(permData.MODERATOR)}</li>
				</ul>
			</li>
			<li>
				Reset Votes (reset-votes): votes => 0<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.MODERATOR)}</li>
				</ul>
			</li>
			<li>
				Reset All Votes (reset-all-votes): votes => 0 %all%<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.DEVELOPER)}</li>
				</ul>
			</li>
			<li>
				Set/Unset Bot Flag (setflag): flag => flags.intersection(flag)<br />
				<ul>
					<li>Minimum Perm: {minPerm(permData.MODERATOR)}</li>
				</ul>
			</li>
		</ul>
	</Section>
</QuailTree>

<style>
	:global(.lb) {
		margin-left: 2px;
	}

	ul,
	li {
		color: white !important;
	}

	.ba-defs > li {
		margin-bottom: 10px;
	}

	.search-flex {
		display: flex;
		flex-wrap: wrap;
	}

	.search-bots {
		background: #444;
		padding: 0 20px;
		border: none;
		border-radius: 4px;
		color: #ffffff;
		height: 30px;
		margin: 0 !important;
		width: 100% !important;
		overflow-x: hidden !important;
	}
</style>
