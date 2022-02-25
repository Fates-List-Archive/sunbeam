<script lang="ts">
    import { browser } from "$app/env";
    import { loginUser, addReviewHandler } from '$lib/request';
    import { session } from '$app/stores';
    import loadstore from '$lib/loadstore';
import navigationState from '$lib/navigationState';
import Button from "@smui/button/src/Button.svelte";
import { apiUrl, nextUrl } from "$lib/config";

    export let review: any;
    export let index: number;
    export let reply: boolean;
    export let targetId: string;
    export let targetType: string;
    export let edittable: boolean = true;

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
		let res = await fetch(`${nextUrl}/reviews/${reviewID}/votes`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Frostpaw": "0.1.0",
				"Authorization": token
			},
			body: JSON.stringify({upvote: upvote, user_id: userID})
		})
		if(res.ok) {
			alert("Successfully voted for this review")
			window.location.reload()
			return
		}
		let err = await res.json()
		alert(err.reason)
	}

    async function replyReview(id) {
		$loadstore = "Replying..."
    	$navigationState = "loading"
		let token = $session.session.token;
    	if(!token) {
        	loginUser(false)
        	return false
    	}
    	let userID = $session.session.user.id;

        let reviewText = document.querySelector(`#review-${review.id}-reply`)
        let starRating = document.querySelector(`#rating-${review.id}-reply`)

		let res = await addReviewHandler(userID, token, targetId, targetType, id, reviewText.value, starRating.value);
		if(res) {
			window.location.reload()
		}
		$navigationState = "loaded"
    }

    async function editReview() {
        // User is logged in
        let userID = $session.session.user.id;
        let token = $session.session.token;

        $loadstore = "Editing..."
    	$navigationState = "loading"

        let reviewText = document.querySelector(`#review-${review.id}-edit-text`)
        let starRating = document.querySelector(`#review-${review.id}-edit-slider`)

		let res = await addReviewHandler(
            userID, 
            token, 
            targetId, 
            targetType,
            null, 
            reviewText.value, 
            starRating.value,
            "PATCH",
            review.id
        );
		if(res) {
			window.location.reload()
		}
		$navigationState = "loaded"
    }

    async function deleteReview() {
        // User is already logged in
        let userID = $session.session.user.id;

        let type = 0
        if(targetType == "server") {
            type = 1
        }

        let res = await fetch(`${nextUrl}/reviews/${review.id}?user_id=${userID}&target_type=${type}`, {
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

    .pointer {
        cursor: pointer;
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
	    <i class="material-icons pointer" on:click={() => voteReview(review.id, true)}>keyboard_arrow_up</i>
            <span class="white">{review.votes.upvotes.length - review.votes.downvotes.length}</span>
	    <i class="material-icons pointer" on:click={() => voteReview(review.id, false)}>keyboard_arrow_down</i>
            <span class="white" style="font-weight: bold">
		<i class="material-icons">star</i>
                <span>{Number(parseFloat(review.star_rating)).toFixed(1)}/10.0</span>
            </span>
            {#if $session.session.token && edittable}
            <a class="long-desc-link" style="color: white !important" href={"#"} on:click={() => replyReviewPane()}>
                  <span class="white" style="margin-left: 3px;">Reply</span>
            </a>
            {/if}
            {#if $session.session.token && $session.session.user.id == review.user.id && edittable}
                <a href={"#"} style='font-weight: bold; margin-left: 3px;' class="long-desc-link" on:click={() => editReviewPane()}>Edit</a>
            {/if}
            </div>
            <span class="review-text" style="margin-left: 30px !important; color: white" id="review_text-{review.id}">{review.review_text}</span>
            {#if $session.session.token && edittable}
            <section id="reviewreply-{review.id}" class="white review-reply-section">
                <label for="rating">On a scale of 1 to 10, how much do you like this bot?</label><br/>
                <input class='slider range-slider' id="rating-{review.id}-reply" type="range" min="0.1" max="10" step='0.1' style="width:100%;"/>
                <p id='rating-reply-desc-{review.id}-{index}' style="color: white;"></p>
                <label for="review">Please write a few words about the bot (in your opinion)</label>
                <textarea id='review-{review.id}-reply' type="text" class="form-control fform" style="min-height: 100px; height: 100px;" required minlength="9" placeholder="This bot is a really good bot because of X, Y and Z however..."></textarea>
                <Button on:click={() => replyReview(review.id)} href={"#"} class="bot-card-actions-link" touch variant="outlined">Reply</Button>
            </section>
            {/if}
            {#if $session.session.token && $session.session.user.id == review.user.id && edittable}
                <div id="reviewopt-{review.id}" style="display: none;">
                    <section id="reviewedit-{review.id}" style="width: 100%;" class="white">
                        <label for="rating">On a scale of 1 to 10, how much do you like this bot?</label><br/>
                        <input id="review-{review.id}-edit-slider" class='slider range-slider' type="range" name="rating" min="0.1" max="10" value='{review.star_rating}' step='0.1' style="width:100%;"/>
                        <strong><p id='rating-desc-{review.id}-{index}' style="color: white;"></p></strong>
                        <label for="review">Please write a few words about the bot (in your opinion)</label>
                        <textarea id='review-{review.id}-edit-text' name="review" class="form-control fform" style="height: 100px; resize: none;" required placeholder="This bot is a really good bot because of X, Y and Z however...">{review.review_text}</textarea>
                        <Button on:click={() => editReview()} href={"#"} class="bot-card-actions-link" touch variant="outlined">Edit</Button>
                        <Button on:click={() => deleteReview()} href={"#"} class="bot-card-actions-link" touch variant="outlined">Delete</Button>
                    </section>
                </div>
            {/if}
        </div>
    <div style="margin-left: 17px">
        {#each review.replies as review, index}
            <svelte:self review={review} index={index} reply={true} targetId={targetId} targetType={targetType} edittable={edittable}></svelte:self>
        {/each}
    </div>
  </div>
</div>