<script lang="ts">
    import { browser } from "$app/env";
    import { loginUser } from '$lib/request';
    import { session } from '$app/stores';
import Button from "@smui/button/src/Button.svelte";

    export let review: any;
    export let index: number;
    export let reply: boolean;
    export let targetId: string;
    export let targetType: string

    let reviewUserClasses = "review-user"

    if(reply) {
        reviewUserClasses = "review-user review-user-reply"
    }

    let editPaneOpen: boolean = false
    let replyPaneOpen: boolean = false

    console.log(review)

    if(review.user.avatar) {
        review.user.avatar = review.user.avatar.replace('.gif', '.webp').replace('.png', '.webp')
    } else {
        review.user.avatar = "https://fateslist.xyz/static/botlisticon.webp"
    }
    if(!review.user.username) {
        review.user.username = "Unknown User"
    }

	async function voteReview(reviewID: string, upvote: boolean) {
		let token = $session.session.token;
		if(!token) {
			loginUser(false)
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
			return
		}
		let err = await res.json()
		alert(err.reason)
	}

    async function replyReview() {
        let token = $session.session.token;
        if(!token) {
            loginUser(false)
            return
        }

		let targetTypeI = 0
		if(targetType == "server") {
			targetTypeI = 1
		}

        let userID = $session.session.user.id;

        let json = {
            id: review.id,
			review: document.querySelector(`#review-${review.id}-reply`).value,
			star_rating: document.querySelector(`#rating-${review.id}-reply`).value,
			target_type: targetTypeI,
			target_id: targetId,
            reply: true
		}

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
            alert("Successfully replied to this review")
            window.location.reload()
            return
        }
        let err = await res.json()
        alert(err.reason)
    }

    async function editReview() {
        // User is logged in
        let userID = $session.session.user.id;

        let json = {
			review: document.querySelector(`#review-${review.id}-edit-text`).value,
			star_rating: document.querySelector(`#review-${review.id}-edit-slider`).value,
		}

        let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${userID}/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Frostpaw": "0.1.0",
                "Authorization": $session.session.token
            },
            body: JSON.stringify(json)
        })
        if(res.ok) {
            alert("Successfully edited this review")
            window.location.reload()
            return
        }
        let err = await res.json()
        alert(err.reason)
    }

    async function deleteReview() {
        // User is already logged in
        let userID = $session.session.user.id;

        let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${userID}/reviews/${review.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Frostpaw": "0.1.0",
                "Authorization": $session.session.token
            },
        })

        if(res.ok) {
            alert("Successfully deleted this review")
            window.location.reload()
            return
        }
        let err = await res.json()
        alert(err.reason)
    }

    function replyReviewPane() {
        if(editPaneOpen) {
            return
        }
        if(replyPaneOpen) {
            document.querySelector(`#reviewreply-${review.id}`).style.display = "none"
            replyPaneOpen = false
        } else {
            document.querySelector(`#reviewreply-${review.id}`).style.display = "block"
            replyPaneOpen = true
        }
    }
    function editReviewPane() {
        if(replyPaneOpen) {
            return
        }
        if(editPaneOpen) {
            document.querySelector(`#reviewopt-${review.id}`).style.display = "none"
            editPaneOpen = false
        } else {
            document.querySelector(`#reviewopt-${review.id}`).style.display = "block"
            editPaneOpen = true
        }
    }

</script>

<style lang="scss">
    .review-user {
        border: none;
    }

    .review-avatar {
        border-radius: 50%; 
        width: 24px;
    }

    .review-reply-section {
        display: none; 
        width: 100%;
    }

    .review-text {
        margin-left: 30px !important; 
        color: white;
    }

    .review-user-reply {
        margin-left: 3%;
    }
</style>

<div style="text-align: left;">
    <div class={reviewUserClasses}>
       <div class="review-left" style="margin-bottom: 23px">
        <div class="review-header" style="margin-bottom: 7px; font-weight: bold;">
            <a href='/profile/{review.user.id}' class="white">
                <img loading="lazy" src={review.user.avatar} class="review-avatar" alt="{review.user.username}'s avatar">
                <span class="white">{review.user.username}</span>
            </a>
            <span style="margin-right: 6px"></span>
	    <i class="material-icons" on:click={() => voteReview(review.id, true)}>keyboard_arrow_up</i>
            <span class="white">{review.review_upvotes.length - review.review_downvotes.length}</span>
	    <i class="material-icons" on:click={() => voteReview(review.id, false)}>keyboard_arrow_down</i>
            <span class="white" style="font-weight: bold">
		<i class="material-icons">star</i>
                <span>{review.star_rating}/10.0</span>
            </span>
            {#if $session.session.token}
            <a class="long-desc-link" style="color: white !important" href={"#"} on:click={() => replyReviewPane()}>
                  <span class="white" style="margin-left: 3px;">Reply</span>
            </a>
            {/if}
            {#if $session.session.token && $session.session.user.id == review.user.id}
                <a href={"#"} style='font-weight: bold; margin-left: 3px;' class="long-desc-link" on:click={() => editReviewPane()}>Edit</a>
            {/if}
            </div>
            <span class="review-text" style="margin-left: 30px !important; color: white" id="review_text-{review.id}">{review.review}</span>
            {#if $session.session.token}
            <section id="reviewreply-{review.id}" class="white review-reply-section">
                <label for="rating">On a scale of 1 to 10, how much do you like this bot?</label><br/>
                <input class='slider range-slider' id="rating-{review.id}-reply" type="range" min="0.1" max="10" step='0.1' style="width:100%;"/>
                <p id='rating-reply-desc-{review.id}-{index}' style="color: white;"></p>
                <label for="review">Please write a few words about the bot (in your opinion)</label>
                <textarea id='review-{review.id}-reply' type="text" class="form-control fform" style="min-height: 100px; height: 100px;" required minlength="9" placeholder="This bot is a really good bot because of X, Y and Z however..."></textarea>
                <Button on:click={() => replyReview()} href={"#"} class="bot-card-actions-link" touch variant="outlined">Reply</Button>
            </section>
            {/if}
            {#if $session.session.token && $session.session.user.id == review.user.id}
                <div id="reviewopt-{review.id}" style="display: none;">
                    <section id="reviewedit-{review.id}" style="width: 100%;" class="white">
                        <label for="rating">On a scale of 1 to 10, how much do you like this bot?</label><br/>
                        <input id="review-{review.id}-edit-slider" class='slider range-slider' type="range" name="rating" min="0.1" max="10" value='{review.star_rating}' step='0.1' style="width:100%;"/>
                        <strong><p id='rating-desc-{review.id}-{index}' style="color: white;"></p></strong>
                        <label for="review">Please write a few words about the bot (in your opinion)</label>
                        <textarea id='review-{review.id}-edit-text' name="review" class="form-control fform" style="height: 100px; resize: none;" required placeholder="This bot is a really good bot because of X, Y and Z however...">{review.review}</textarea>
                        <Button on:click={() => editReview()} href={"#"} class="bot-card-actions-link" touch variant="outlined">Edit</Button>
                        <Button on:click={() => deleteReview()} href={"#"} class="bot-card-actions-link" touch variant="outlined">Delete</Button>
                    </section>
                </div>
            {/if}
        </div>
    <div style="margin-left: 17px">
        {#each review.replies as review, index}
            <svelte:self review={review} index={index} reply={true} targetId={targetId} targetType={targetType}></svelte:self>
        {/each}
    </div>
  </div>
</div>
{#if index < 3}
   <script type="application/ld+json">
        {
          "@context" : "http://schema.org",
         "@type" : "Product",
          "name" : "{data.user.username}",
          "image" : "{data.user.avatar}",
          "description": "{data.description}",
          "sku": "{review.id}",
          "offers": "",
          "aggregateRating" : {
              "@type" : "AggregateRating",
            "bestRating" : "10",
            "ratingValue" : {review.star_rating},
            "reviewCount": 1
         },
          "review" : [ {
            "@type" : "Review",
               "author" : {
                    "@type" : "Person",
                    "name" : "{review.user.username}"
               },
               "reviewRating" : {
                   "bestRating" : "10",
                   "@type" : "Rating",
                 "ratingValue" : {review.star_rating}
                },
             "reviewBody" : "{review.review}"
          } ]
    }
</script>
{/if}