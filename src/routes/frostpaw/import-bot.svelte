<script lang="ts" context="module">
	import { fetchFates } from "$lib/request";
		/** @type {import('@sveltejs/kit@next').Load} */
		export async function load({params, fetch, session, stuff}) {
			if(!session.session.token) {
				return {
					props: {
						sources: {},
					}
				}
			}
			let importSrcRes = await fetchFates('/import-sources', "", fetch, false, true)
			if(!importSrcRes.ok) {
				return {
					status: importSrcRes.status,
					error: new Error("Could not fetch import source list") 
				}
			}
			let data = await importSrcRes.json()
			return {
				props: {
					sources: data,
				}
			}
		}
</script>
<script lang="ts">
	import { browser } from "$app/env"
	import BotSettings from "$lib/pages/BotSettings.svelte";
	import { loginUser } from "$lib/request"
	import { session } from "$app/stores"
import { apiUrl } from "$lib/config";
import Tip from "$lib/base/Tip.svelte";
import FormInput from "$lib/base/FormInput.svelte";
import Button from "@smui/button/src/Button.svelte";
import navigationState from "$lib/navigationState";
import alertstore from "$lib/alertstore";
import loadstore from "$lib/loadstore";
	export let sources: any;
	if(!$session.session.token) {
		if(browser) {
			loginUser(false)
		}
	}

    let popUpMsg = "Errors will appear here (just in case you have popups disabled)"

    function alert(msg: string, title="Error") {
        popUpMsg = msg
        saveTxt = "Import";
        $alertstore = {
            title: title,
            message: msg,
            show: true,
            id: "error"
        }
        $navigationState = "loaded" // An alert = page loaded
    }

    let saveTxt = "Import"

    async function importBot() {
        saveTxt = `${saveTxt}ing`
		$loadstore = "Importing..."
		$navigationState = "loading"

        let botId = (document.querySelector("#bot_id") as HTMLInputElement).value
        let source = (document.querySelector("#source") as HTMLInputElement).value

        let extData = {}
    
        if(source == "Topgg") {
            // Top.gg has a shit API workaround
            let topggData = await fetch(`https://top.gg/api/bots/${botId}`, {
                "headers": {
                    "Authorization": (document.querySelector("#topgg-api-token") as HTMLInputElement).value
                }
            })

            if(topggData.status == 401) {
                alert("Invalid Top.gg API token")
                return
            } else if(!topggData.ok) {
                alert("Could not fetch bot data from top.gg")
                return
            }

            extData = await topggData.json()
        }

        let res = await fetch(`${apiUrl}/users/${$session.session.user.id}/bots/${botId}/import?src=${source}`, {
            method: "POST",
            headers: {
                "Authorization": $session.session.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"ext_data": extData})
        })

        if(res.ok) {
            $navigationState = "loaded"
            $loadstore = ""
            $alertstore = {
                title: "Success",
                message: "Bot imported successfully",
                show: true,
                id: "success"
            }
        } else {
            let json = await res.json()
            alert(json.reason)
        }
    }

    let source: string;
</script>
{#if $session.session.token}
    <h1 class="text-center">Import A Bot!</h1>
    <div id="source-view">
    <Tip>
        This feature is still in beta!<br/><br/>

        As this feature evolves, more bot lists to import from may be added!
    </Tip>
        <label for="source">Import Source</label>
        <select name="source" id="source" bind:value={source}>
            {#each sources.sources as source}
                <option value={source.id}>{source.name}</option>
            {/each}
        </select>
        <FormInput name="Bot ID (must be bot owner)" id="bot_id" type="number" placeholder="Bot ID here"/>
        {#if source == "Topgg"}
            <FormInput name="Top.gg bot token" id="topgg-api-token" type="text" placeholder="Top.gg API token"/>
            <Tip>
                This is only shared with top.gg and is not stored on Fates List
            </Tip>        
        {/if}
        <Button on:click={() => importBot()} variant="outlined" class="button btn-save">{saveTxt}</Button>
        <pre>{popUpMsg}</pre>
    </div>
{:else}
	<p>Logging you in, please wait...</p>
{/if}

<style>
    #source-view {
        margin-left: 30px;
        margin-right: 30px;
    }

    :global(.button) {
        opacity: 1 !important;
        border: solid thin !important;
        background: black !important;
        color: white !important;
    }
</style>