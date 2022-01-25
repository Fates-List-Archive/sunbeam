<script lang="ts">
    import Tab from "$lib/base/Tab.svelte";
import Tip from "$lib/base/Tip.svelte";
import SelectOptionMulti from "$lib/base/SelectOptionMulti.svelte";
import SelectOption from "$lib/base/SelectOption.svelte";
    import { enums } from "$lib/enums/enums";
    import Icon from '@iconify/svelte';
    import Button from '@smui/button';
    import { page, session } from '$app/stores';
    import { voteHandler } from '$lib/request';
import RedStar from "$lib/base/RedStar.svelte";
import FormInput from "$lib/base/FormInput.svelte";
import MultiSelect from "$lib/base/MultiSelect.svelte";
import { toggle_class } from "svelte/internal";

    function title(str: string) {
        return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }

    export let user: any;
    export let data: any;
    export let mode: string;
    export let context: any;

    let tabs = []
    let defaultTabButton = "basics-tab"
    let token = "Click 'Show' to see your bots token"
    let tokenShown = false
    let saveTxt = mode

    let tags;
    let features;

    if(mode == "edit") {
        tabs = [{
            "name": "About",
            "id": "about"
        }, {
            "name": "Actions",
            "id": "actions"
        }]
        defaultTabButton = "about-tab-button"
    }
    tabs.push({
        "name": "Basics",
        "id": "basics"
    }, {
        "name": "Webhooks",
        "id": "webhooks"
    }, {
        "name": "Links",
        "id": "links"
    }, {
        "name": "Extras",
        "id": "extras"
    })

    // Functions
    async function showBotToken() {
        if(tokenShown) {
            token = "Click 'Show' to see your bots token"
            tokenShown = false
        } else {
            token = context.bot_token
            tokenShown = true
        }
    }

    async function regenBotToken() {
        let url = `https://api.fateslist.xyz/api/v2/bots/${context.bot_id}/token`
        let headers = {"Authorization": context.bot_token}
        let res = await fetch(url, {
            method: "PATCH",
            headers: headers
        })
        if(res.ok) {
            alert("Successfully regenerated bot token")
            window.location.reload()
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function appealBot() {
        let url = `https://api.fateslist.xyz/api/v2/users/${$session.session.user.id}/bots/${context.bot_id}/appeal`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": $session.session.token
        }
        let res = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "appeal": document.querySelector("#appeal-text").value
            })
        })
        if(res.ok) {
            alert("Successfully sent appeal!")
            window.location.reload()
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function postStats() {
        let url = `https://api.fateslist.xyz/api/v2/bots/${context.bot_id}/stats`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": context.bot_token
        }
        let res = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "guild_count": parseInt(document.querySelector("#guild-count").value),
                "shard_count": parseInt(document.querySelector("#shard-count").value)
            })
        })
        if(res.ok) {
            alert("Successfully sent stats!")
            window.location.reload()
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function transferBot() {
        let newOwner = document.querySelector("#new-owner").value
        if(!newOwner) {
            alert("You must specify a owner to transfer ownership to")
            return
        }
        let confirm = prompt("This action is irreversible. Please confirm you really want to transfer ownership by entering your Bots ID below")
        if(confirm != context.bot_id) {
            alert("Could not transfer ownership as you did not confirm you wanted to do this/inputted invalid Bot ID")
            return
        }
        let url = `https://api.fateslist.xyz/api/v2/users/${$session.session.user.id}/bots/${context.bot_id}/ownership`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": $session.session.token
        }
        let res = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                "new_owner": newOwner
            })
        })
        if(res.ok) {
            alert("Successfully transferred ownership!")
            window.location.reload()
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function deleteBot() {
        let confirm = prompt("This action is irreversible. Please confirm you really want to delete this bot by entering your Bots ID below")
        if(confirm != context.bot_id) {
            alert("Could not delete this bot as you did not confirm you wanted to do this/inputted invalid Bot ID")
            return
        }
        let url = `https://api.fateslist.xyz/api/v2/users/${$session.session.user.id}/bots/${context.bot_id}`
        let headers = {
            "Authorization": $session.session.token
        }
        let res = await fetch(url, {
            method: "DELETE",
            headers: headers,
        })
        if(res.ok) {
            alert("Successfully deleted this bot!")
            window.location.href = "/"
            return
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    async function autofillBot() {
        function qs(q: string) {
		    return document.querySelector(q)
	    }
	    let botId = qs("#bot_id").value

	    let clientId = qs("#client_id").value

	    // If client id is set, use that
	    if(clientId) {
		    botId = clientId
	    }

	    if(!botId) {
		    return
	    }

        let res = await fetch(`https://discord.com/api/v9/applications/${botId}/rpc`)
        if(!res.ok) {
            let data = await res.json()
            alert(JSON.stringify(data))
            return
        } else {
            let data = await res.json()
            if(data.description) qs("#description").value = data.description
            if(data.summary) qs("#long_description").textContent = data.summary
            if(data.privacy_policy_url) qs("#privacy_policy").value = data.privacy_policy_url
            if(data.custom_install_url) qs("#invite").value = data.custom_install_url
            if(data.slug) qs("#vanity").value = data.slug.toLowerCase()
            else qs("#vanity").value = data.name.replaceAll(" ", "").toLowerCase()
        }
    }

    async function sendTestWebhook() {
        await voteHandler($session.session.user.id, $session.session.token, context.bot_id, true)
        return
    }

    async function updateBot() {
        saveTxt = `${mode}int`
        let bot = {}
        let errorFields = []

        window.inputFields.forEach(field => {
            let value = document.querySelector(`#${field.id}`).value
            if(!value && field.required) {
                errorFields.push(field.id.replaceAll("_", " "))
            }
            else if(!value) {
                value = null
            }
            bot[field.id] = value
        })

        // Fix known broken things
        if(mode == "add") {
            bot["bot_id"] = document.querySelector("#client_id").value
        }
        bot["client_id"] = document.querySelector("#client_id").value
        bot["webhook"] = document.querySelector("#webhook").value
        bot["css"] = document.querySelector("#css").value

        // Handle the selects here
        // webhook_type, long_description_type, nsfw, system_bot, keep_banner_decor
        bot["webhook_type"] = parseInt(document.querySelector("#webhook_type").value)
        bot["long_description_type"] = parseInt(document.querySelector("#long_description_type").value)
        bot["nsfw"] = document.querySelector("#nsfw").value == "true"
        bot["system_bot"] = document.querySelector("#system_bot").value == "true"
        bot["keep_banner_decor"] = document.querySelector("#keep_banner_decor").value == "true"


        if(mode == "edit") {
            bot["bot_id"] = context.bot_id
        }

        let botId = bot["bot_id"] 

        // Check if it exists
        if(mode == "add") {
            let res = await fetch(`https://api.fateslist.xyz/api/v2/bots/${botId}`)
            if(res.status == 200) {
                alert("This bot already exists on Fates List")
                saveTxt = mode
                return
            }
        }

        // Check if the bot is public
        let clientId = bot["client_id"]

        if(clientId) {
            botId = clientId
        }

        let res = await fetch(`https://discord.com/api/v9/applications/${botId}/rpc`)
        if(res.status != 200) {
            alert("Error: This bot doesn't exist on discord or you need to provide a client id")
            saveTxt = mode
            return
        }
        let jsonP = await res.json()
        if(!jsonP.bot_public) {
            alert("Error: This bot is not public")
            saveTxt = mode
            return
        }

        if(errorFields.length != 0) {
            alert(`You must fill out the following required fields: ${errorFields.join(', ')}`)
            return
        }

        // Tags+Features
        if(tags.length == 0) {
            alert("You need to specify tags for your bot")
            return
        } else {
            bot["tags"] = tags
        }
        bot["features"] = features

        // Extra owners
        if(data["extra_owners"]) {
            bot["extra_owners"] = bot["extra_owners"].replace(" ", "").split(",")
        } else {
            bot["extra_owners"] = []
        }

        // Method stuff
        let method = "PATCH"
        let mod = "editted successfully"

        if(mode != "edit") {
			method = "PUT"
			mod = "added to our queue"
		}

        console.log(bot)

        let url = `https://api.fateslist.xyz/api/v2/users/${$session.session.user.id}/bots/${bot['bot_id']}`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": $session.session.token
        }
        let updateRes = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(bot)
        })
        if(updateRes.ok) {
            alert(`This bot has been ${mod}`)
            return
        } else {
            let json = await updateRes.json()
            alert(JSON.stringify(json))
            return
        }
    }
</script>

<img class="user-avatar" loading="lazy" src="{user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="user-avatar" alt="{user.username}'s avatar">
<h2 class="white user-username" id="user-name">{user.username}</h2>
<h2 id="bot-settings">Bot Settings</h2>
<Tab tabs={tabs} defaultTabButton={defaultTabButton}>
    {#if mode == "edit"}
        <section id="about-tab" class='tabcontent tabdesign'>
            <h2>Bot Information</h2>
            <h3 class="section-title">Bot State</h3>
            <p>{title(enums.BotState[data.state])} ({data.state})</p>
            <h3 class="section-title">Bot Flags</h3>
            <ul class="flag-ul">
                {#each data.flags as flag}
                    <li>{enums.Flags[flag]} ({flag})</li>
                {/each}
            </ul>
            <h3 class="section-title">Bot Owners</h3>
            <Icon icon="mdi-crown" inline={false} height="1.2em" style="margin-right: 1px"></Icon>
            {@html context.owners_html}
            <h2>API Token</h2>
            <pre>{token}</pre>            
            <Button href={"#"} on:click={showBotToken} class="button" id="bot-token-show-btn" touch variant="outlined">Show</Button>
            <Button href={"#"} on:click={regenBotToken} class="button" id="bot-token-regen-btn" touch variant="outlined">Regenerate</Button>
        </section>
        <section id="actions-tab" class='tabcontent tabdesign'>
            <h2>Critical Actions Needed</h2>
            <Tip>These are actions you <em>must</em> take to continue using all features!</Tip>
            {#if data.state == enums.BotState.denied || data.state == enums.BotState.banned}
                <h5 class="white section">Bot Appeal</h5>
                <div class="info-content">
                    Your bot was {enums.BotState[data.state]} and needs to be appealed/resubmitted in order to continue using Fates List. These are subject to approval and potential retesting of your bot. Some criteria that you could include:<br/>
                    <ul class="white">
                        <li>Did you fix the issues you were asked to fix? </li>
                        <li>Do you feel like your bot was {enums.BotState[data.state]} for a wrong reason? </li>
                        <li>If so (or even if not), mention your reasoning (<em>convincing</em> argument) here! </li>
                    </ul>
                    <label for="appeal-text">Enter your appeal here</label>
                    <textarea
                        name="appeal-text"
                        id="appeal-text"
                        class="form-control fform text-input"
                        style="width: 100%"
                        placeholder="I feel like my bot was {enums.BotState[data.state]}.../I fixed all the..."
                    ></textarea>
                    <Button href={"#"} on:click={appealBot} class="button" id="appeal" touch variant="outlined">Send Appeal</Button>  
                </div>
            {:else}
                <p class="white">All good! You have no critical actions pending (or pending approval)</p>
            {/if}
            <h2 class="white">Other Actions</h2>
            <p class="white">Here are some other actions you can take with your bot on Fates List. Most of these can be automated using the API.</p>
            <Tip>You should still aim to use the API however for best 
            growth and discoverability. Using the API is <em>mandatory</em> for certification other 
            than some very <em>rare</em> exceptions of high quality and 
            exceeding other requirements for certification</Tip>
            <h3 class="white section">Post Stats</h3>
            <label for="guild-count">Server Count<RedStar></RedStar></label><br/>
            <input 
                name="guild-count" 
                id="guild-count" 
                class="fform" 
                placeholder="100 etc."
                type="number"
            /><br>
            <label for="server-count">Shard Count</label><br/>
            <input 
                name="shard-count" 
                id="shard-count" 
                class="fform" 
                placeholder="Optional" 
                type="number"   
            /><br/>
            <Button href={"#"} on:click={postStats} class="button" id="post-stats" touch variant="outlined">Post Stats</Button>  
            <h3 class="white section">Transfer Ownership</h3>
            <label for="new-owner">New Owner ID<RedStar></RedStar></label><br/>
            <input 
                name="new-owner" 
                id="new-owner" 
                class="fform" 
                placeholder="563808552288780322 etc."
                type="number"
            /><br>
            <Button href={"#"} on:click={transferBot} class="button" id="transfer-bot" touch variant="outlined">Transfer</Button>
            <h3 class="white section">Delete Bot</h3>
            <Tip icon="jam:triangle-danger-f" alertClass="tip-red alert-info">
                This cannot be undone and you will lose any perks your bot may have such as 
                certification and any votes your bot may have. 
                Think twice before proceeding as not even staff can revert bot deletions, 
                even if accidental...
            </Tip>
            <Button style="background-color: red" href={"#"} on:click={deleteBot} class="button" id="delete-bot" touch variant="text">Delete Bot</Button>
        </section>
    {/if}
    <section id="basics-tab" class='tabcontent tabdesign'>
        {#if mode != "edit"}
            <FormInput
                name="Bot ID (older bots only)"
                id="bot_id"
                placeholder="563808552288780322 etc."
                type="number"
            />
        {/if}
        <FormInput
            name="Client ID (older bots only)" 
            id="client_id" 
            placeholder="563808552288780322 etc."
            type="number" 
            data={data.client_id} 
        />
        <Button href={"#"} on:click={autofillBot} class="button" id="autofill-bot" touch variant="outlined">Autofill</Button><br/><br/>
        <FormInput
            name="Extra Owners (comma seperated)"
            id="extra_owners"
            placeholder="790722073248661525, 563808552288780322"
            data={data.extra_owners}
        />
        <FormInput
            name="Prefix (leave blank for slash command only bot) "
            id="prefix"
            placeholder="$, ! etc."
            data={data.prefix}
        />
        <FormInput
            name="Library"
            id="library"
            placeholder="discord.py, discord.js etc"
            data={data.library}
            required={true}
        />
        <FormInput
            name="Vanity"
            id="vanity"
            placeholder="mybot, fateslist etc. Prefix with _ to disable"
            data={data.vanity}
            required={true}
        />
        <Tip>
            You can use P:PERM_NUMBER (or just leave this blank) 
            if the Bot ID and Client ID are the same (almost always 
            true except for old bots)
        </Tip>
        <FormInput
            name="Invite URL (Leave blank for automatic)"
            id="invite"
            placeholder="https://discord.com/api/oauth2/..."
            data={data.invite}
        />
        <FormInput
            name="Short Description"
            id="description"
            placeholder="Ex: Fates List is a great bot that does everything you need it to do!"
            data={data.description}
            required={true}
        />
        <label for="tags">Tags <RedStar/></label>
        <MultiSelect initialValues={data.tags} id="tags" bind:value={tags}> <!-- value={data.tags}-->
            {#each context.tags as tag}
                <SelectOptionMulti value={tag.value} valueList={data.tags}>{tag.text}</SelectOptionMulti>
            {/each}
        </MultiSelect>
        <label for="features">Features</label>
        <MultiSelect initialValues={data.features} id="features" bind:value={features}>
            {#each context.features as feature}
                <SelectOptionMulti value={feature.value} valueList={data.features}>{feature.text}</SelectOptionMulti>
            {/each}
        </MultiSelect>
        <br/>
        <br/>
        <label for="site-lang">Long Description Type</label>
        <select name="long_description_type" id="long_description_type">
            <SelectOption value="0" masterValue={data.long_description_type}>HTML</SelectOption>
            <SelectOption value="1" masterValue={data.long_description_type}>Markdown (python-markdown)</SelectOption>
            <SelectOption value="2" masterValue={data.long_description_type}>Markdown (marked)</SelectOption>
        </select>
        <br/>
        <FormInput
            name="Long Description"
            id="long_description"
            placeholder="Write over 300 characters for your long description. Trying to put a placeholder to bypass this limit will get your bot denied or banned if found out!"
            data={data.long_description}
            required={true}
            textarea={true}
        />
        <label for="nsfw">NSFW</label>
        <select name="nsfw" id="nsfw">
            <SelectOption value="true" masterValue="{data.nsfw}">Yes</SelectOption>
            <SelectOption value="false" masterValue="{data.nsfw}">No</SelectOption>
        </select>
        <br/><br/>
        {#if context.staff.perm > 4 || data.system_bot}
            <label for="system_bot">System Bot (set this to no to claim your bot, only staff can set this to yes)</label>
            <select name="system_bot" id="system_bot">
                <SelectOption value="true" masterValue="{data.system_bot}">Yes</SelectOption>
                <SelectOption value="false" masterValue="{data.system_bot}">No</SelectOption>
            </select>
        {/if}
    </section>
    <section id="webhooks-tab" class='tabcontent tabdesign'>
        <Tip>Everything in this section is completely optional</Tip>
        <Tip>
            Webhooks provide a fast and secure way for your bot to recieve events 
            from Fates List such as voting and much more. More information about 
            this is available on our 
            <a href='https://apidocs.fateslist.xyz'>API Documentation</a>. 
            This option does require you to have a server that can recieve 
            the webhooks and you may need to port forward or open your 
            firewall if your server has one. Note that the IP address 
            for Fates List may change but this is rare and the IP 
            is safe to whitelist.
        </Tip>
        <label for="webhook_type">Webhook Type</label>
        <select name="webhook_type" id="webhook_type">
            <SelectOption value="0" masterValue="{data.webhook_type}">Vote Webhook</SelectOption>
            <SelectOption value="1" masterValue="{data.webhook_type}">Discord Integration</SelectOption>
        </select>
        <br/>
        <FormInput
            name="Webhook URL"
            id="webhook"
            placeholder="https://vote.mysite.com/fates"
            data={data.webhook}
        />
        <Tip>
            API Token is used as the webhook secret if you do not set a 
            webhook secret below. It is recommended to use that unless 
            you need a specific webhook secret to be used by Fates List 
            or you need extra security that cannot be provided using 
            your bots token.
        </Tip>
        <FormInput
            name="Webhook Secret"
            id="webhook_secret"
            placeholder="Make sure that this is random and secure!"
            data={data.webhook_secret}
        />
        <Button href={"#"} on:click={sendTestWebhook} class="button" id="submit" touch variant="outlined">Test Webhook</Button>  
        <Tip>
            Didn't get anything? Make sure you have <em>saved</em> your 
            bot first before clicking Test Webhook. Also check your 
            firewall and network settings as well!
        </Tip>
    </section>
    <section id="links-tab" class='tabcontent tabdesign'>
        <Tip>Everything in this section is completely optional</Tip>
        <FormInput
            name="Website"
            id="website"
            placeholder="https://mysite.com"
            data={data.website}
        />
        <FormInput
            name="Github"
            id="github"
            placeholder="https://github.com/..."
            data={data.github}
        />
        <FormInput
            name="Privacy Policy URL"
            id="privacy_policy"
            placeholder="https://myprivacypolicy.com"
            data={data.privacy_policy}
        />
        <FormInput
            name="Support Server"
            id="support"
            placeholder="https://discord.gg/supportserver"
            data={data.support}
        />
        <FormInput
            name="Donate URL (Patreon/Paypal.me/Buymeacoffee)"
            id="donate"
            placeholder="https://patreon.com/..."
            data={data.donate}
        />
    </section>
    <section id="extras-tab" class='tabcontent tabdesign'>
        <Tip>Everything in this section is completely optional</Tip>
        <Tip>
            Banners allow you to make your bot page look better and more 
            higher quality. There are two banners you can set: one for 
            your bots card and one for your bots page. The banner URL 
            you post here must give a content type of image/**** when 
            a HEAD or a GET request is sent to them (most image services 
            do this). Banner pages also has a 'Keep Banner Decorations/
            Artifacts' option for some banners that don't work well 
            without it however this does look a bit ugly and so should 
            be disabled if possible
        </Tip>
        <label for="keep_banner_decor">Keep Banner Decorations/Artifacts </label>
        <select name="keep_banner_decor" id="keep_banner_decor">
            <SelectOption value="true" masterValue="{data.keep_banner_decor}">Yes</SelectOption>
            <SelectOption value="false" masterValue="{data.keep_banner_decor}">No</SelectOption>
        </select>
        <br/>
        <FormInput
            name="Banner URL for bot card"
            id="banner_card"
            placeholder="Banner URL here"
            data={data.banner_card}
        />
        <FormInput
            name="Banner URL for bot page"
            id="banner_page"
            placeholder="Banner URL here"
            data={data.banner_page}
        />
        <Tip>
            Custom CSS is a great way to help improve your bots growth 
            along with banners and vote rewards using Webhooks!
        </Tip>
        <FormInput
            name="Custom CSS"
            id="css"
            placeholder="See w3schools if you need a tutorial on CSS. See our API Documentation for more informatiom about what CSS Fates List has and allows! Have fun :)"
            data={data.css}
            textarea={true}
        />
    </section>
</Tab>
<Button href={"#"} on:click={updateBot} class="button btn-save" id="submit" touch variant="outlined">{saveTxt}</Button>  
<style lang="scss">
    .section-title {
        text-decoration: underline;
    }

    #bot-settings {
        opacity: 0.8 !important;
    }
    
    .user-username, .user-avatar, #bot-settings {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    
    .user-username {
        margin-bottom: 0px;
        padding-bottom: 0px;
    }
    
    .user-avatar {
        border-radius: 50%; 
        width: 120px;
    }

    .flag-ul {
        padding: 0;
        list-style-type: none;
    }

    :global(.button) {
        opacity: 1 !important;
        border: solid thin !important;
    }
</style>
