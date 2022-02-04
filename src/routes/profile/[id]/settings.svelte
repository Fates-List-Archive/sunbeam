<script lang="ts" context="module">
	import { fetchFates } from "$lib/request"
	import { enums } from "$lib/enums/enums";
	export const prerender = false;
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
        // Check perms
        if(!session.session.token || session.session.user.id != params.id) {
            return {
                status: 403,
                error: new Error("Forbidden")
            }
        }

        // Get profile
		let url = `/api/v2/users/${params.id}?bot_logs=true`;
        const res = await fetchFates(url, "", fetch);
		if (res.ok) {
            let data = await res.json()

			return {
				props: {
					data: data,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Profile Not Found`)
		};
    }
</script>
<script lang="ts">
    import Tab from '$lib/base/Tab.svelte';
    import { page, session } from '$app/stores';
    export let data: any;
    import SelectOption from '$lib/base/SelectOption.svelte'
    import Button from '@smui/button';
import Tip from '$lib/base/Tip.svelte';
import BotPack from '$lib/base/BotPack.svelte';
    let tabs = [{
        "name": "About",
        "id": "about"    
    }, {
        "name": "Actions",
        "id": "actions"
    }, {
        "name": "Basics",
        "id": "basics"
    }, {
        "name": "CSS",
        "id": "css"
    }]

    let firstTimeShowedWarning = false // Whether or not we have sent the warning alert once or not

    let userToken = "Hidden, click 'Show' to show it and make sure to NEVER share it with anyone else"

    function showUserToken() {
        let b = document.querySelector("#user-token-show-btn")
        if(b.textContent == "Show") {
            if(!firstTimeShowedWarning) {
                alert("Warning: Do not share this with anyone")
                firstTimeShowedWarning = true
            }
            userToken = $session.session.token
            b.textContent = "Hide"
        } else {
            userToken = "Hidden"
            b.textContent = "Show"
        }
    }

    async function regenUserToken() {
        let url = `https://api.fateslist.xyz/api/v2/users/${data.user.id}/token`
        let headers = {"Authorization": `User ${$session.session.token}`}
        let res = await fetch(url, {
            method: "PATCH",
            headers: headers
        })
        if(res.ok) {
            alert("Regenerated token, you will need to login again")
            fetch("https://api.fateslist.xyz/api/v2/logout/_sunbeam", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json', 
                    "Frostpaw": "0.1.0", 
                }
			})
			.then(res => res.json())
			.then(json => {
				window.location.href = "/"
			})
        } else {
            alert(`Error during token regeneration: ${res.status}`)
        }
    }

    async function updateProfile() {
        let payload = {
            "description": document.querySelector("#description").value,
            "profile_css": document.querySelector("#profile-css").value,
            "user_css": document.querySelector("#user-css").value,
            "site_lang": document.querySelector("#site-lang").value,
            "vote_reminder_channel": document.querySelector("#vote-reminder-channel").value,
        }
        console.log(JSON.stringify(payload))
        let url = `https://api.fateslist.xyz/api/v2/users/${data.user.id}/preferences`
        let headers = {"Authorization": $session.session.token, "Content-Type": "application/json"}
        let res = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload)
        })
        if(res.ok) {
            alert("Updated your profile successfully")
            window.location.href = `/profile/${data.user.id}`
        } else {
            let json = await res.json()
            alert(JSON.stringify(json))
        }
    }

    async function addBotPack() {
        let payload = {
            name: document.querySelector("#pack-name").value,
            description: document.querySelector("#pack-desc").value,
            icon: document.querySelector("#pack-icon").value,
            banner: document.querySelector("#pack-banner").value,
        }
        let bots = document.querySelector("#pack-bots").value
        payload["bots"] = bots.split(",")
        let headers = {"Authorization": $session.session.token, "Content-Type": "application/json"}
        let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${data.user.id}/packs`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
        if(res.ok) {
            alert("Added pack successfully")
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function delBotPack(packId: string) {
        if(!packId) {
            alert("No Pack ID given")
            return
        }
        let headers = {"Authorization": $session.session.token}
        let res = await fetch(`https://api.fateslist.xyz/api/v2/users/${data.user.id}/packs/${packId}`, {
            method: "DELETE",
            headers: headers
        })
        if(res.ok) {
            alert("Delete pack successfully")
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    // Sigh svelte
    let placeholderUserCss = "Warning: Fates List is not responsible for any issues due to your custom user CSS. To use javascript in custom css, put your JS in a LT/styleGTLTscriptGTYOUR JS HERELT/scriptGTLTstyleGT tag"
</script>
<img class="user-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="user-avatar" alt="{data.user.username}'s avatar">
<h1 class="white user-username" id="user-name">{data.user.username}</h1>
<h2 id="user-description">Profile Settings</h2>
<Tab tabs={tabs} defaultTabButton="about-tab-button">
    <section id="about-tab" class='tabcontent tabdesign'>
        <h2>User Token</h2>
            <p class="white"><em>Accidentally</em> leaked your API token? Just be sure to change the token everywhere you use it and make sure it doesn't happen again!</p>
	    <pre id="user-token-field">{userToken}</pre>
            <Button href={"#"} on:click={showUserToken} class="button" id="user-token-show-btn" touch variant="outlined">Show</Button>
            <Button href={"#"} on:click={regenUserToken} class="button" id="user-token-regen-btn" touch variant="outlined">Regenerate</Button>
        <h2>Your Packs</h2>
            {#each data.packs as pack}
                <p>Pack ID: <span class="opaque">{pack.id}</span></p>
                <BotPack pack={pack} centered={false}></BotPack>
                <Button href={"#"} on:click={() => {
                    delBotPack(pack.id)
                }} class="button" id="del-bot-pack-btn" touch variant="outlined">Delete {pack.name}</Button>        
            {/each}
        <h2>Profile Info</h2>
            <p>Profile State: {enums.UserState[data.profile.state]} ({data.profile.state})</p>
            <p>Bot Logs: {JSON.stringify(data.profile.bot_logs)}</p>
    </section>
    <section id="actions-tab" class='tabcontent tabdesign'>
        <h2>Create Bot Packs</h2>
        <Tip>Bot Packs are a way of grouping bots into one package!</Tip>
        <label for="pack-name">Pack Name</label>
        <input
            id="pack-name"
            name="pack-name"
            class="fform"
            placeholder="Name it something snazzy!"
        />
        <label for="pack-desc">Pack Description</label>
        <input
            id="pack-desc"
            name="pack-desc"
            class="fform"
            placeholder="What does this pack do?"
        />
        <label for="pack-icon">Pack Icon</label>
        <input
            id="pack-icon"
            name="pack-icon"
            class="fform"
            placeholder="https://api.fateslist.xyz/static/botlisticon.webp etc."
        />
        <label for="pack-banner">Pack Banner</label>
        <input
            id="pack-banner"
            name="pack-banner"
            class="fform"
            placeholder="https://api.fateslist.xyz/static/botlisticon.webp etc."
        />
        <label for="pack-bots">Bots (comma seperated)</label>
        <input
            id="pack-bots"
            name="pack-bots"
            class="fform"
            placeholder="10293,29392,39492 etc."
        />
        <Button href={"#"} on:click={addBotPack} class="button" id="add-bot-pack-btn" touch variant="outlined">Add Pack</Button>
        
        <h2>Delete Bot Packs</h2>
        <Tip>You can get a bot pack's ID from the Bot Pack List under About or by using our API</Tip>
        <label for="del-pack-id">Pack ID</label>
        <input
            id="del-pack-id"
            name="del-pack-id"
            class="fform"
            placeholder="df3b4053-eaed-45d6-9e26-470be52cd80c etc."
        />
        <Button href={"#"} on:click={() => {
            let packId = document.querySelector("#del-pack-id").value
            delBotPack(packId)
        }} class="button" id="del-bot-pack-btn" touch variant="outlined">Delete Pack</Button>
    </section>
    <section id="basics-tab" class='tabcontent tabdesign'>
        <label for="site-lang">Site Language</label>
        <select name="site-lang" id="site-lang">
            <SelectOption value="en" masterValue={data.profile.site_lang}>English</SelectOption>
            <SelectOption value="es" masterValue={data.profile.site_lang}>Spanish</SelectOption>
            <SelectOption value="fr" masterValue={data.profile.site_lang}>French</SelectOption>
            <SelectOption value="hi" masterValue={data.profile.site_lang}>Hindi</SelectOption>
            <SelectOption value="ru" masterValue={data.profile.site_lang}>Russian</SelectOption>
        </select>
        <label for="description">Description</label>
        <textarea 
            name="description" 
            id="description"
            class="form-control fform text-input" 
            style="width: 100%"
            placeholder="Enter a description for your profile here"
        >{data.profile.description}</textarea>
    </section>
    <section id="actions-tab" class='tabcontent tabdesign'>
    </section>
    <section id="css-tab" class='tabcontent tabdesign'>
        <label for="user-css">User CSS</label>
        <textarea
            name="user-css"
            id="user-css"
            class="form-control fform text-input"
            style="width: 100%"
            placeholder="{placeholderUserCss.replaceAll("LT", "<").replaceAll("GT", ">")}"
        >{data.profile.user_css}</textarea>
        <label for="profile-css">Profile CSS</label>
        <textarea
            name="profile-css"
            id="profile-css"
            class="form-control fform text-input"
            style="width: 100%"
            placeholder="Enter any profile CSS you want here. For security purposes, this does not allow Javascript whatsoever!"
        >{data.profile.profile_css}</textarea>
        <label for="vote-reminder-channel">Vote Reminders Channel</label>
        <input 
            name="vote-reminder-channel"
            id="vote-reminder-channel"
            class="fform"
            placeholder="Enter the channel ID here"
            value={data.profile.vote_reminder_channel}
            style="width: 100%"
        />
    </section>
</Tab>
<Button href={"#"} on:click={updateProfile} class="button" id="update-profile-btn" touch variant="outlined">Update Profile</Button>
<style>
    .user-username, .user-avatar {
        display: flex;
        opacity: 1 !important;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .opaque {
        opacity: 0.8 !important;
    }
    
    .user-username {
        margin-bottom: 0px;
        padding-bottom: 0px;
    }
    
    .user-avatar {
        border-radius: 50%; 
        width: 120px;
    }
    
    #user-description {
        text-align: center;
        margin: 0px;
        padding: 0px;
    }
    
    :global(#profiles-center) {
        margin-left: auto;
        margin-right: auto;
        display: flex !important;
        align-items: center;
        width: 150px;
        padding: 3px;
    }

    :global(.button) {
        opacity: 1 !important;
        border: solid thin !important;
    }
</style>    
