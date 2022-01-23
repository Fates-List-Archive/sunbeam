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
:global(#review-add) {
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
    width: 93%;
    height: 53px;
    margin: 0 auto;
    //white-space: nowrap;
}

@media screen and (max-width: 768px) {
	.buttons {
		margin-left: 3px !important;
		width: 100% !important;
	}
}

@media screen and (max-width: 992px) {
	.buttons {
		overflow-x: scroll;
		overflow-y: hidden;
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
	max-width: 100%;
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
</style>

{@html data.css}

<div class="lozad bot-page-banner" data-background-image="{data.banner}">
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
			    <Button href="/{type}/{data.user.id}/invite" class="buttons-all" touch variant="outlined" rel="external">
				    <span>Invite</span>
			    </Button>
                {#if data.support}
			    <Button href="{data.support}" class="buttons-all" touch variant="outlined">
				    <span>Support</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled" touch variant="outlined" disabled>
				    <span>Support</span>
			    </Button>
                {/if}
                {#if data.website}
			    <Button href="{data.website}" class="buttons-all" touch variant="outlined">
				    <span>Website</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled" touch variant="outlined" disabled>
				    <span>Website</span>
			    </Button>
                {/if}
                {#if data.privacy_policy}
			    <Button href="{data.privacy_policy}" class="buttons-all" touch variant="outlined">
				    <span>Privacy Policy</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled" touch variant="outlined" disabled>
				    <span>Privacy Policy</span>
			    </Button>
                {/if}
                {#if data.github}
			    <Button href="{data.github}" class="buttons-all" touch variant="outlined">
				    <span>Github</span>
			    </Button>
                {:else}
			    <Button class="buttons-all disabled" touch variant="outlined" disabled>
				    <span>Github</span>
			    </Button>
                {/if}
		{#if type == "bot"}
				<Button href='/bot/{data.user.id}/settings' class="buttons-all" touch variant="outlined">
						<span>Settings</span>
				</Button>
		{:else}
			    <Button class="buttons-all" touch variant="outlined" disabled>
				    <span>Settings</span>
			    </Button>
		{/if}
            </div>
            <Tab tabs={tabs} defaultTabButton="long-description-tab-button">
                <section id="long-description-tab" class='tabcontent tabdesign'>
                    <div id="long-description">
			{#if data.long_description_type == enums.LongDescType.markdown_marked}
				{@html marked.parse(data.long_description)}
			{:else}
				{@html data.long_description}
			{/if}
                    </div>
                </section>
		<section id="resources-tab" class="tabcontent tabdesign">
			{#if !data.resources && data.resources.length < 0}
				<h2>This {type} does not have any resources set!</h2>
			{:else}
				{#each data.resources as resource}
					<a href={resource.resource_link}>{resource.resource_title}</a>
					<p>{resource.resource_description}</p>
				{/each}
			{/if}
		</section>
        <section id="reviews-tab" class="tabcontent tabdesign">
		   <label for="rating">On a scale of 1 to 10, how much did you like this {type}?</label><br/>
		   <input class='slider range-slider' type="range" id="star-rating" min="0.1" max="10" style="width: 100%" value='5' step='0.1' output="rating-desc"/>
		   <p id='rating-desc' style="color: white;"></p>
		   <label for="review-text">Enter your review here</label><br/>
		   <textarea 
		     class="form-control fform text-input" 
		     id="review-text" 
		     placeholder="Write your review here. This must be at least 7 characters!" 
		     minlength="9" 
		     style="width: 100%" 
		     required 
		     ></textarea>
		     <Button href={"#"} on:click={() => addReview()} id="review-add">Add Review</Button>
                    <div id="reviews" use:onload>Loading reviews... <a href={"#"} on:click={() => window.location.reload()}>Retry</a></div>
                </section>
                <section id="about-tab" class='tabcontent tabdesign'>
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
                        <p>Bot Features: {data.features}</p>
			<h4>User Audit Logs</h4>
			{#each data.action_logs as log}
				{JSON.stringify(log)}
			{/each}
		    {:else}
			<h2>Servers do not support this feature <em>yet</em> :(</h2>
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
    import { voteHandler, loginUser } from '$lib/request';
    import { marked } from 'marked'; 
    import { session } from '$app/stores';
    import Tab from '$lib/base/Tab.svelte';
    export let data: any;
    export let type: string;

    let tabs = [{
        "name": "Description",
        "id": "long-description"    
    }, 
    {
        "name": "About",
        "id": "about"
    }, {
		"name": "Resources",
		"id": "resources"
    }, {
        "name": "Reviews",
        "id": "reviews"
    }]

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
        return await voteHandler(userID, token, data.user.id, false)
    }

    async function getReviewPage(page: number) {
        document.querySelector("#reviews").innerHTML = "<h2>Loading Reviews</h2><a href='#' onclick='getReviewPage(content.rev_page)'>Retry</a>"
        if(!browser) {
            return
        }
	
	let userID = "0"
	if($session.session.token) {
		userID = $session.session.user.id
	}
        let res = await fetch(`https://api.fateslist.xyz/api/v2/_sunbeam/${type}/${data.user.id}/reviews_html?page=${page}&user_id=${userID}`)
        if(res.ok) {
            let json = await res.json()
	    try {
            	document.querySelector("#reviews").innerHTML = json.html
            	window.contextR.rev_page = page
            } catch(err) {
		console.log("Error in fetching reviews", err)
	    }
	}
    }

    if(browser) {
        window.getReviewPage = getReviewPage
        window.contextR = {
            "rev_page": 1
        }
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
		let outputId = slider[i].getAttribute("output")
		document.getElementById(outputId).innerHTML = "Drag the slider to change your rating"; // Display the default slider value
		slider[i].oninput = function() {
			let output = document.getElementById(this.getAttribute("output"))
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


	async function voteReview(reviewID: string, upvote: boolean) {
		let token = $session.session.token;
		if(!token) {
			loginUser()
			return
		}
		let userID = $session.session.user.id;
		let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${userID}/reviews/${reviewID}/votes`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Frostpaw": "0.1.0",
				"Authorization": token
			},
			body: JSON.stringify({upvote: upvote})
		})
		if(res.ok) {
			alert("Successfully voted for this review")
			window.location.reload()
		}
		let err = await res.json()
		alert(err.reason)
	}

	if(browser) {
		// Needed for dnyamic review injection
		window.voteReview = voteReview
		window.loginUser = loginUser
	}

	async function addReview() {
		let targetType = 0
		if(type == "server") {
			targetType = 1
		}
		let review = document.querySelector("#review-text")
		let starRating = document.querySelector("#star-rating")
		let json = {
			review: review.value,
			star_rating: starRating.value,
			target_type: targetType,
			target_id: data.user.id
		}
		let token = $session.session.token;
		let userID = $session.session.user.id;
		let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${userID}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Frostpaw": "0.1.0",
				"Authorization": token
			},
			body: JSON.stringify(json)
		})

		if(res.ok) {
			alert("Successfully posted your review")
		}
		let err = await res.json()
		alert(err.reason)	
	}
</script>
