<script context="module">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    import { apiUrl, lynxUrl } from '$lib/config';

    export async function load({ session }) {
        let id = '0';
        if (session.session.token) {
            id = session.session.user.id;
        }
        let perms = await fetch(`${apiUrl}/baypaw/perms/${id}`);
        if(perms.perms < 2) {
            return {
                status: 401,
                error: new Error('You are not a staff member.')
            };
        }

        return {
            props: {
                perms: await perms.json()
            }
        };
}
</script>
<script lang="ts">
import { session } from '$app/stores';

import Button from "@smui/button/src/Button.svelte";
import QuailTree from "./_helpers/QuailTree.svelte";

    export let perms;

    async function sendReset() {
        if(!$session.session.token) {
            alert("Not logged in...")
        }

        let res = await fetch(`${lynxUrl}/reset?user_id=${$session.session.user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: $session.session.token
            },
        })

        if(res.ok) {
            alert(`Successfully sent reset`);
        }
    }
</script>

<QuailTree perms={perms.perm}>
    <h3>Are you sure?</h3>
    <Button on:click={() => sendReset()}>Reset</Button>
</QuailTree>