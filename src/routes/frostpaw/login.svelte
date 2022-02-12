<script context="module" lang="ts">
	export const prerender = false;
</script>
<script>
    import { browser } from '$app/env';
import { apiUrl } from '$lib/config';
    import { getCookie, loginUser } from "$lib/request"

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
            }

            fetch(`${apiUrl}/api/v2/users`, {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                    "Frostpaw": "0.1.0"
                },
                body: JSON.stringify({
                    scopes: ["identify"],
                    code: code
                })
            })
            .then((res) => res.json())
            .then((json) => {
		if(!json.done) {
		    if(json.banned) {
			frostpawMsg = `<h1>${json.reason}</h1><br/><h2>This is a ${json.ban.type} ban and ${json.ban.desc}.</h2><br/>You can try to appeal this ban at <a href="https://fateslist.xyz/banappeal">our ban appeal server</a>`
		    } else {
			frostpawMsg = `Got error: ${JSON.stringify(json)}. Trying again...`
			localStorage.loginError = "1"
			loginUser(false)
		    }	    
		} else {
                    window.location.href = frostpawServer
                }
            })
        }
        login()
    }
</script>
<p style="font-size: bold;">{@html frostpawMsg}</p>
