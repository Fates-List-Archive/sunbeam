<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit@next').Load} */
	export async function load({ params, fetch, session, stuff }) {
        if (!session.session.token) {
            return {
                props: {
                    loginError: true,
                }
            };
        } else {
            return {
                props: {
                    loginError: false
                }
            };
        }
    }
</script>
<script lang="ts">
import { browser } from "$app/env";
    export let loginError: boolean;

    let searchParams;

    if(browser) {
        searchParams = new URLSearchParams(window.location.search);
        window.location.href = searchParams.get("redirect")
    }

</script>

{#if loginError}
<p>
Could not set cookies for login. This is a critical error that should be reported on our support server<br/><br/>

However for the time being, we can also fallback to a slightly more insecure (still safe but less so than HttpOnly cookies) authentication method.<br/><br/>
</p>

<button on:click={() => {
	const searchParams = new URLSearchParams(window.location.search);
    document.cookie = "sunbeam-session:warriorcats=" + searchParams.get("json") + ";max-age=3600";
    window.location.href = searchParams.get("redirect");
}}>Degrade And Login</button>
{:else}
    {#if searchParams}
        <p>Confirmed a successful login! Redirecting you to {searchParams.get("redirect")}</p>
    {:else}
        <p>Confirmed a successful login. Please wait...</p>
    {/if}
{/if}
