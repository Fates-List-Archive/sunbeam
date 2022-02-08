<script lang="ts" context="module">
	import { fetchFates } from "$lib/request";
		/** @type {import('@sveltejs/kit@next').Load} */
		export async function load({params, fetch, session, stuff}) {
			if(!session.session.token) {
				return {
					props: {
						app: {}
					}
				}
			}
			let res = await fetch("https://api.fateslist.xyz/api/v2/staff-apps/questions")
			if(!res.ok) {
				return {
					status: res.status,
					error: new Error("Could not fetch staff application questions") 
				}
			}
			let data = await res.json()
			return {
				props: {
					app: data
				}
			}
		}
</script>
<script lang="ts">
	import { browser } from "$app/env"
	import { loginUser } from "$lib/request"
	import { session } from "$app/stores"
import FormInput from "$lib/base/FormInput.svelte";
import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
import Button from '@smui/button';
import inputstore from "$lib/inputstore";
import navigationState from "$lib/navigationState";
import loadstore from "$lib/loadstore";
	export let app: any;

	let saveTxt = "Submit"
	let mode = "submit"

	if(!$session.session.token) {
		if(browser) {
			loginUser(false)
		}
	}

	function alert(msg: string) {
		window.alert(msg)
        $navigationState = "loaded" // An alert = page loaded
    }

    async function postApplication() {
        saveTxt = `${mode}ing`
		$navigationState = "loading"
		$loadstore = `${mode}ing`
        let appData = {}
        let errorFields = []

        try {
            $inputstore.forEach(field => {
                let value = null
                let fieldEl = document.querySelector(`#${field.id}`)
                if(fieldEl) {
                    value = fieldEl.value
                } else {
                    alert(`Internal error: ${field.id} does not exist!`)
                    return
                }
                if(!value && field.required) {
                    errorFields.push(field.id.replaceAll("_", " "))
                }
                else if(!value) {
                    value = null
                }
                appData[field.id] = value
            })

            if(errorFields.length != 0) {
                alert(`Please fill out the following required fields: ${errorFields.join(', ')}`)
                saveTxt = mode
				return
            }
		} catch(err) {
			alert(err)
			saveTxt = mode
			return
		}

		let res = await fetch(`https://api.fateslist.xyz/api/v2/staff-apps/${$session.session.user.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `${$session.session.token}`
			},
			body: JSON.stringify({answers: appData})
		})

		if(!res.ok) {
			let json = await res.json()
			alert(`Error submitting application: ${json.reason}`)
			saveTxt = mode
		} else {
			alert("Application submitted!")
		}
    }
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz/frostpaw/staff-app"
	title="Fates List Staff Applications | Discord Bot List"
	description="Find, invite and discover the best bots &amp; servers now on Fates List"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
></BristlefrostMeta>

{#if $session.session.token}
	<img class="user-avatar" loading="lazy" src="https://api.fateslist.xyz/static/assets/prod/232f1c31-4f53-4c27-979e-5029cb81d762.webp" id="user-avatar" alt="Staff App Frostpaw Wink">
    <h1>Staff Applications</h1>
    <h2>Do you have what it takes to become staff?</h2>
    <div class="staff-app">
        {#each app.questions as question}
            <FormInput name={`${question.question} (${question.minlength} to ${question.maxlength} characters)`} id={question.id} placeholder={`${question.title}: Write your response here. Must be between ${question.minlength} and ${question.maxlength} characters`} type="text" textarea={question.maxlength >= 2000} required={true}/>
        {/each}
    </div>
    <div class="center">
        <Button href={"#"} on:click={postApplication} class="button" id="post-app-btn" touch variant="outlined">{saveTxt}</Button>
    </div>
{:else}
	<p>Logging you in, please wait...</p>
{/if}

<style lang="scss">
	.user-avatar {
		display: flex;
		opacity: 1 !important;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
    	border-radius: 50%; 
    	width: 120px;
	}

    h1, h2 {
        text-align: center;
    }
    .staff-app {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    :global(.button) {
        opacity: 1 !important;
        border: solid thin !important;
    }

    .center {
        text-align: center;
    }
</style>