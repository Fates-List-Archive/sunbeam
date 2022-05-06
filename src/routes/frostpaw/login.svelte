<script context="module" lang="ts">
	export const prerender = false;
</script>
<script>
    import { browser } from '$app/env';
import { apiUrl, nextUrl } from '$lib/config';
    import { getCookie, loginUser } from "$lib/request"
import { enums } from '$lib/enums/enums'
import { time_ranges_to_array } from 'svelte/internal';
import Button from '@smui/button';
import { goto } from '$app/navigation';
import { encode } from '@cfworker/base64url';
import alertstore from '$lib/alertstore';

    let frostpawServer = ""
    let frostpawMsg = "Please wait..."

    let cliInfo = null;

    let code = null;
    let state = null;

    let clientId = null;
    let currentTime = null;
    let hmacTime = null;

    if(browser) {
	frostpawServer = localStorage.sunbeamLogin

        if(!frostpawServer) {
            frostpawServer = "/"
        }

        function login() {
            frostpawMsg = `Logging you in and redirecting you back to ${frostpawServer}. Please wait...`          
            let retry = "<br/><br/><a href='https://fateslist.xyz'>Try Again?</a>"
            let searchParams = new URLSearchParams(window.location.search)
            let error = searchParams.get("error")
            if(error) {
                frostpawMsg = "Login Cancelled"
                return
            }

            code = searchParams.get("code")
            state = searchParams.get("state")
            if(!code || !state) {
                frostpawMsg = ("Invalid code/state" + retry)
                return
            }

            if(state.startsWith("Bayshine.")) {
                // Bayshine custom client login
                let stateSplit = state.split(".");
                clientId = stateSplit[1];
                currentTime = parseInt(stateSplit[2]);
                hmacTime = stateSplit[3];
                if(!clientId || !currentTime || !hmacTime) {
                    frostpawMsg = ("Invalid state" + retry)
                    return
                }
                if((new Date()).getTime()/1000 - currentTime > 60 || currentTime > (new Date()).getTime()/1000 || currentTime <= 0) {
                    frostpawMsg = (`Current time nonce is too old! ${(new Date()).getTime()/1000}`)
                    return
                }
                
                // Fetch baypaw client info
                fetch(`${apiUrl}/frostpaw/clients/${clientId}`)
                .then(res => res.json())
                .then(json => {
                    cliInfo = json
                })

                return
            }

            if(state != localStorage.sunbeamLoginState) {
                frostpawMsg = ("Invalid state. Are you blocking localStorage?<br/>Try reloading this page or using the application if logging in from a WebView/app embedded browser" + retry)
                return
            }

            localStorage.removeItem("sunbeamLoginState")

            fetch(`${apiUrl}/oauth2`, {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
		    "Frostpaw": "0.1.0",
		    "Frostpaw-Server": window.location.origin
                },
                body: JSON.stringify({
			code: code,
			state: state,
			// We are not a custom client
			frostpaw: false
                })
            })
            .then((res) => res.json())
            .then((json) => {
		if(json.state == enums.UserState.global_ban) {
			frostpawMsg = `<h1>You are global banned</h1><br/><h2>This is a global ban and as such, you may not login/use our API.</h2><br/>You can try to appeal this ban at <a href="https://fateslist.xyz/banappeal">our ban appeal server</a>` 	
		} else if(!json.token) {
			frostpawMsg = `Got error: ${JSON.stringify(json)}. Trying again...`
			localStorage.loginError = "1"
			loginUser(false)
		} else {
                    window.location.href = frostpawServer
                }
            })
        }
        login()
    }
</script>
<p style="font-size: bold;">{@html frostpawMsg}</p>

{#if cliInfo}
    <h1>Custom Client Alert!</h1>
    <h2>Custom clients can add, edit and delete bots on your behalf and can also vote for bots and servers.</h2>
    <p>
        You are about to login to <span style="opacity: 0.8">{cliInfo.name}</span>!
        <br/><br/>
        Fates List cannot validate the authenticity of this client.
        <br/><br/>
        If you are not sure, <em>exit this page now</em>.
        <br/><br/>
    </p>
    <Button on:click={() => {
        goto("/")
    }} style="background-color: #90EE90; color: black;">Back To Safety</Button>
    <small>Client ID: {cliInfo.id}</small><br/>
    <Button on:click={async () => {
        let res = await fetch(`${apiUrl}/oauth2`, {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
                "Frostpaw": "0.1.0",
                "Frostpaw-Server": window.location.origin
            },
            body: JSON.stringify({
                code: code,
                state: state,
                // We are a custom client
                frostpaw: true,
                frostpaw_blood: clientId,
                frostpaw_claw: hmacTime,
                frostpaw_claw_unseathe_time: currentTime,
            })
        })
        let json = await res.json()
        if(res.ok) {
            window.location.href = `${cliInfo.domain}/frostpaw?data=${encode(JSON.stringify(json))}`
        } else {
            $alertstore = {
                title: "Error",
                id: "frostpaw-cli-error",
                show: true,
                message: `Error: ${json.error}`
            }
        }
    }} style="background-color: red; color: black;">Authorize</Button>
    <style>
        small {
            color: white;
        }
    </style>
{/if}