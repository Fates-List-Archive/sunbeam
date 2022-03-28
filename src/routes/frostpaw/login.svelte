<script context="module" lang="ts">
	export const prerender = false;
</script>
<script>
    import { browser } from '$app/env';
import { apiUrl, nextUrl } from '$lib/config';
    import { getCookie, loginUser } from "$lib/request"
import { enums } from '$lib/enums/enums'

    let frostpawServer = ""
    let frostpawMsg = "Please wait..."

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

            let code = searchParams.get("code")
            let state = searchParams.get("state")
            if(!code || !state) {
                frostpawMsg = ("Invalid code/state" + retry)
                return
            }

            if(state != localStorage.sunbeamLoginState) {
                frostpawMsg = ("Invalid state. Are you blocking localStorage?" + retry)
                return
            }

            localStorage.removeItem("sunbeamLoginState")

            fetch(`${nextUrl}/oauth2`, {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
		            "Frostpaw": "0.1.0",
		            "Frostpaw-Server": window.location.origin
                },
                body: JSON.stringify({
			code: code,
			state: state
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
