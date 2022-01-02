<script context="module" lang="ts">
	export const prerender = false;
</script>
<script>
    import { browser } from '$app/env';
    import { getCookie } from "$lib/request"

    let frostpawServer = ""
    let frostpawMsg = ""

    if(browser) {
        frostpawServer = getCookie("_sunbeam-login", document.cookie)

        function login() {
            let retry = "<br/><br/><a href='https://fateslist.xyz/fates/login'>Try Again?</a>"
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

            fetch("https://fateslist.xyz/api/v2/users", {
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
                    frostpawServer = JSON.stringify(json)
                } else {
                    window.location.href = "/"
                }
            })
        }
        login()
    }
</script>
<p style="font-size: bold;">Logging you in and redirecting you back to {frostpawServer}. Please wait...</p>
{@html frostpawMsg}