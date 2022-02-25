<BristlefrostMeta 
	url="https://fateslist.xyz/{type}/{data.user.id}"
    pageTitle="{data.user.username}"
	title="{data.user.username}"
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
<style lang="scss" global>
#reviews-tab {
	overflow: visible !important;
} 
#review-add {
	opacity: 1 !important; 
	border: solid thin; 
	width: 250px; 
	max-width: 250px;
	margin-bottom: 10px;
}
:global(.buttons-all) {
    background-color: black !important;
    margin-right: 10px;
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
    //min-width: 130px;
    //max-width: 150px;
	word-wrap: break-word !important;
	font-size: 15px !important;
}
.buttons {
    display: flex;
    flex-flow: column-wrap;
    justify-content: center;
    align-items: center;
    min-width: 93%;
    height: 53px;
    margin: 0 auto;
    //white-space: nowrap;
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
#long-description img {
	max-width: 100% !important;
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
.commands-table, .commands-item, .commands-header {
	padding: 1rem;
}
.command-group-list {
	padding: 0;
	list-style-position: inside;
}
.cmd-group-header {
	cursor: pointer;
}
.opaque {
    opacity: 0.7;
}
</style>

{@html data.css}

<div id="long-description" class="lozad bot-page-banner" data-background-image="{data.banner}">
    <img class="bot-avatar" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="bot-avatar" alt="{data.user.username}'s avatar">
    <article class="bot-page">
        <a href="/{type}/{data.user.id}/invite" class="banner-decor bot-username bot-username-link">
            <h2 class="white" id="bot-name">{data.user.username} {#if type == "bot"}<span class="prefix">({data.prefix || "/"})</span>{/if}</h2>
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
		    {:else if data.state == enums.BotState.pending}
		    <Panel color="secondary" open>
		    	<Header ripple={false}>
                    Bot Pending Review
		  		</Header>
			<Content class="accordian-container">
			    This bot has not yet been tested and may be low quality or malicious. Please do not invite it yet
			</Content>
		    </Panel>
		    {:else if data.state == enums.BotState.under_review}
		    <Panel color="secondary" open>
			<Header ripple={false}>
			  Bot Under Review
			</Header>
			<Content class="accordian-container">
			    This bot is currently being tested, Expect to hear from us soon!
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
				    <span class="mobile-small">Privacy Policy</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled auxillary" id="buttons-privacy" touch variant="outlined" disabled>
				    <span>Privacy Policy</span>
			    </Button>
                {/if}
                {#if data.github}
			    <Button href="{data.github}" id="buttons-github" class="buttons-all auxillary" touch variant="outlined">
				    <span>Github</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled auxillary" id="buttons-github" touch variant="outlined" disabled>
				    <span>Github</span>
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
		{#if type == "bot"}
			<Button href='/bot/{data.user.id}/settings' id="buttons-settings" class="buttons-all" touch variant="outlined">
			    	     <span>Settings</span>
			    </Button>
		{:else}
			    <Button class="buttons-all disabled" id="buttons-settings" touch variant="outlined" disabled>
				    <span>Settings</span>
			    </Button>
		{/if}
    </div>
    <Tab>
		<section id="long-description-real" class='tabs-v2'>
			{#if data.long_description_type == enums.LongDescType.markdown_marked}
				{@html marked.parse(data.long_description)}
			{:else}
				{@html data.long_description}
			{/if}
		</section>
		<section id="commands-tab" class="tabs-v2">
			<h2>Commands</h2>
			{#if type == "bot"}
				{#if Object.keys(data.commands).length == 0}
					<h3>This bot does not have any commands</h3>
					{#if !data.prefix}
						<h4>This bot uses slash commands, try typing / to see a list of commands</h4>
					{/if}
				{/if}
				{#each Object.entries(data.commands) as cmd_group}
					{#if cmd_group[0] == "default"}
						<h2 class="cmd-group-header" on:click={() => showHideCommandGroup(cmd_group[0])}>Uncategorized</h2>
					{:else}
						<h2 class="cmd-group-header" on:click={() => showHideCommandGroup(cmd_group[0])}>{title(cmd_group[0])}</h2>
					{/if}

					<table id="{cmd_group[0]}-table" class="commands-table" rules="all">
						<tr>
							<th class="commands-header">Name</th>
							<th class="commands-header">Type</th>
							<th class="commands-header">Args</th>
							<th class="commands-header">Description</th>
							<th class="commands-header">Notes</th>
							<th class="commands-header">Groups</th>
						</tr>
						{#each cmd_group[1] as cmd}
							<tr>
								<td class="commands-item">{cmd["cmd_name"]}</td>
								<td class="commands-item">{enums.CommandType[cmd["cmd_type"]]}</td>
								<td class="commands-item">{cmd["args"]}</td>
								<td class="commands-item">{cmd["description"]}</td>
								<td class="commands-item">
									<ul class="command-group-list">
										{#if cmd["vote_locked"]}
											<li>Requires Voting (vote-locked)</li>
										{/if}
										{#if cmd["premium_only"]}
											<li>Premium Only</li>
										{/if}
										{#each cmd["notes"] as note}
											<li>{note}</li>
										{/each}
									</ul>
								</td>
								<td class="commands-item">
									<ul class="command-group-list">
										{#each cmd["cmd_groups"] as group}
											{#if group == "default"}
												<li>Uncategorized</li>
											{:else}
												<li>{title(group)}</li>
											{/if}
										{/each}
									</ul>
								</td>
							</tr>
						{/each}	
					</table>
				{/each}
			{:else}
				<span>Servers do not have commands</span>
			{/if}
		</section>
		<section id="resources-tab" class="tabs-v2">
			<h2>Some cool resources!</h2>
			<h3>Basics</h3>
			<a href="/bot/{data.user.id}/invite">Invite</a><br/>
			{#each ["website", "support", "privacy_policy", "donate", "github"] as link}
				{#if data[link]}
					<a href={data[link]}>{title(link)}</a><br/>
				{/if}
			{/each}
			<br/>
			<h3>Community Resources</h3>
			{#if !data.resources || data.resources.length <= 0}
				<h4>This {type} does not have any community resources!</h4>
			{:else}
				{#each data.resources as resource}
					<a href={resource.resource_link}>{resource.resource_title}</a>
					<p>{resource.resource_description}</p>
				{/each}
			{/if}
		</section>
        <section id="reviews-tab" class="tabs-v2">
			<h2>Lets review!</h2>
		   <label for="rating">On a scale of 1 to 10, how much did you like this {type}?</label><br/>
		   <input class='slider range-slider' type="range" id="star-rating" min="0.1" max="10" style="width: 100%" value='5' step='0.1' data-output="rating-desc"/>
		   <p id='rating-desc' style="color: white;"></p>
		   <label for="review-text">Enter your review here</label><br/>
		   <textarea 
		     class="fform" 
		     id="review-text" 
		     placeholder="Write your review here. This must be at least 7 characters!" 
		     minlength="9" 
		     style="width: 100%; border-radius: 4px 4px 4px 4px;" 
		     required 
		     ></textarea>
		     <Button href={"#"} on:click={() => addReview()} id="review-add">Add Review</Button>
			 		{#if reviews.reviews && reviews.reviews.length > 0}
					 	<br/>
						 <span style="font-size: 18px;" class="white">Showing reviews {reviews.from} to {reviews.from + reviews.reviews.length} of {reviews.stats.total} total reviews</span><br/>
						 <label for="rating-avg" style="font-size: 18px;" class="white">Average Rating: <i class="material-icons">star</i>{Number(parseFloat(reviews.stats.average_stars)).toFixed(1)}/10.0</label><br/>
						<span class="white">
						<input disabled id="rating-avg" class='slider' type="range" name="rating" min="0.1" max="10" value='{reviews.stats.average_stars}' style="width: 100%" step='0.1' tabindex="-1"/>
						<p id="rating-desc-avg"></p>
						</span>
						{#if reviews.user_review}
							<Reviews review={reviews.user_review} index={-1} reply={false} targetId={data.user.id} targetType={type}></Reviews>
							<hr/>	 
						{/if}
					 	{#each reviews.reviews as review, index}
							{#if !reviews.user_review || review.id != reviews.user_review.id}
					 			<article class="review-root review-section">
							 		<Reviews review={review} index={index} reply={false} targetId={data.user.id} targetType={type}></Reviews>
					 			</article>
							{:else}
								<article class="review-root review-section">
									<Reviews review={review} index={index} reply={false} targetId={data.user.id} targetType={type} edittable={false}></Reviews>
								</article>
							{/if}
				 		{/each}				 
					{/if}
					<div class="text-center">
						<nav aria-label="Bot Review Pagination">
							<ul>
								{#if reviewPage > 1}
									<li class="page-item"><a href={"#"} class="page-link white" on:click={() => getReviewPage(reviewPage - 1)}>Previous</a></li>
								{/if}
								{#if reviews.stats}
									{#each Array.from({length: Math.ceil(reviews.stats.total/reviews.per_page)}, (_, i) => i + 1) as page}
										<li class="page-item" id="page-{page}"><a href={"#"} class="page-link white" on:click={() => getReviewPage(page)}>{page}</a></li>
									{/each}
									{#if reviewPage !== Math.ceil(reviews.stats.total/reviews.per_page)}
										<li class="page-item"><a href={"#"} class="page-link white" on:click={() => getReviewPage(reviewPage + 1)}>Next</a></li>
									{/if}
								{/if}
							</ul>
						</nav>
					</div>					
                    <div id="reviews" use:onload></div>
                </section>
                <section id="about-tab" class='tabs-v2'>
                    <!--First main owner is guaranteed to be first in HTML-->
                    {#if type == "bot"}
                        <h2>Owners</h2>
                        <Icon icon="mdi-crown" inline={false} height="1.2em" style="margin-right: 1px"></Icon>
						{@html data.owners_html}
						<h2>Uptime</h2>
						<p>Uptime Checks (Total): {data.uptime_checks_total}</p>
						<p>Uptime Checks (Failed): {data.uptime_checks_failed}</p>
						<p>Uptime Checks (Success): {data.uptime_checks_total - data.uptime_checks_failed}</p>	
						<p>Uptime Checks (Score): 
							{#if data.uptime_checks_total} 
								{ (data.uptime_checks_total - data.uptime_checks_failed) / data.uptime_checks_total }
							{:else}
								Not Available
							{/if}
						</p>

						<h2>Bot Features</h2>
						{#each data.features as feature}
							<p>{feature.name}: <span class="opaque">{feature.description}. <em>According to our community, this feature is {feature.type}.</em></span></p>
						{/each}

                        <h2>Statistics</h2>
                        <p>Guild Count: {data.guild_count}</p>
                        <p>User Count (according to bot): {data.user_count}</p>
                        <p>Shard Count: {data.shard_count}</p>
                        <p>Shards: 
                            {#each data.shards as shard}
                                <span class="white">{shard}</span>, 
                            {/each}
                        </p>

                        <h2>Nerdville</h2>
                        <p>Last posted statistics on: {data.last_stats_post}</p>
                        <p>Added to the list on: {data.created_at}</p>
                        <p>Bot Flags: {data.flags}</p>
						<h4>User Audit Logs</h4>
						{#each data.action_logs as log}
							{JSON.stringify(log)}
						{/each}
                    {/if}
                </section>
            </Tab>
        </div>
    </article>
</div>

<span use:onload2></span>

<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
    import Icon from '@iconify/svelte';
    import Button from '@smui/button';
    import { enums } from '../enums/enums';
    import { browser } from "$app/env";
    import { voteHandler, loginUser, addReviewHandler } from '$lib/request';
    import { marked } from 'marked'; 
    import { session } from '$app/stores';
    import Tab from '$lib/base/TabV2.svelte';
import Reviews from '$lib/base/Reviews.svelte';
import loadstore from '$lib/loadstore';
import navigationState from '$lib/navigationState';
import { nextUrl } from '$lib/config';
    export let data: any;
    export let type: string;
	let reviewPage = 1
	let reviews: any = {}
	function fade(element) {
    	var op = 1;  // initial opacity
    	var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    	}, 10);
	}
	function unfade(element) {
    	var op = 0.1;  // initial opacity
    	element.style.display = 'table';
    	var timer = setInterval(function () {
        	if (op >= 1){
            	clearInterval(timer);
        	}
        	element.style.opacity = op;
        	element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        	op += op * 0.1;
    	}, 10);
	}
	function showHideCommandGroup(cmdGroup: string) {
		let id = `#${cmdGroup}-table`
		let group = document.querySelector(id)
		if(group.style.display != 'none') {
			fade(group)
		}
		else {
			unfade(group)
		}
	}
    // https://stackoverflow.com/a/46959528
    function title(str: string) {
        return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }
    async function voteBot() {
		if(type == "server") {
			alert("To vote for a server, type /vote in the server.")
			return
		}
        let token = $session.session.token
        let userID = ""
        if(token) {
            userID = $session.session.user.id
        }
		$loadstore = "Voting..."
    	$navigationState = 'loading';
        await voteHandler(userID, token, data.user.id, false)
		$navigationState = "loaded"
    }
	let userHasMovedReviewPage = false

    async function getReviewPage(page: number) {
		if(page != 1) {
			$loadstore = "Loading..."
        	$navigationState = 'loading';
			userHasMovedReviewPage = true
		}		
		let targetType = enums.ReviewType.bot
		if(type == "server") {
			targetType = enums.ReviewType.server
		}

		let url = `${nextUrl}/reviews/${data.user.id}?page=${page}&target_type=${targetType}`

		if($session.session.token) {
			url += `&user_id=${$session.session.user.id}`
		}

		let res = await fetch(url)
		if(res.ok) {
			reviews = await res.json()
			reviewPage = page
		} else if (userHasMovedReviewPage) {
			let data = await res.json()
			alert(data.reason)
		}
		$navigationState = "loaded"
    }
    if(browser) {
        getReviewPage(1)
    }
    const onload = (_: any) => {
        getReviewPage(1)
    }
    if(data.shards !== undefined && data.shards.length < 1) {
        data.shards = ["No shards set. Try checking it's website or support server (if it has one)!"]
    }
    let rating = 0;
    let setupInputs = () => {
    	let slider = document.querySelectorAll(".range-slider");
   		// Update the current slider value (each time you drag the slider handle)
    	for(let i = 0; i < slider.length; i++) {
		let outputId = slider[i].getAttribute("data-output")
		document.getElementById(outputId).innerHTML = "Drag the slider to change your rating"; // Display the default slider value
		slider[i].oninput = function() {
			let output = document.getElementById(this.getAttribute("data-output"))
			console.log(output)
			let state = parseState(this.value)
			output.innerHTML = state + ", " + this.value;
		}
	}
    }
function parseState(v) {
	let state = ""
	if(v < 1)
		state = "Atrocity"
	else if(v < 2)
		state = "Absymal"
	else if(v < 3)
		state = "Really Poor"
	else if(v < 4)
		state = "Poor"
	else if(v < 5)
		state = "Below Average"
	else if(v < 6)
		state = "Average"
	else if(v < 7)
		state = "Above Average"
	else if(v < 8)
		state = "Meets Expectations"
	else if(v < 9)
		state = "Great"
	else if(v < 10)
		state = "Exceeds Expectations"
	else if(v == 10)
		state = "Without a doubt, perfect"
	return state
}
	const onload2 = () => {
		if(!browser) {
			return
		}
		setupInputs()
	}
	if(browser) {
		// Needed for dnyamic review injection
	}
	async function addReview() {
		$loadstore = "Adding..."
    	$navigationState = "loading"
		let token = $session.session.token;
    	if(!token) {
        	loginUser(false)
        	return false
    	}
    	let userID = $session.session.user.id;

		let review = document.querySelector("#review-text")
    	let starRating = document.querySelector("#star-rating")

		let res = await addReviewHandler(userID, token, data.user.id, type, null, review.value, starRating.value);
		if(res) {
			window.location.reload()
		}
		$navigationState = "loading"
		$navigationState = "loaded"
	}
</script>