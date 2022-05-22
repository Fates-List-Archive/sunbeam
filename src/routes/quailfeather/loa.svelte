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

    async function sendLoa() {
        if(!$session.session.token) {
            alert("Not logged in...")
        }

        let res = await fetch(`${lynxUrl}/loa?user_id=${$session.session.user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: $session.session.token
            },
            body: JSON.stringify({
                reason: (document.querySelector('#reason') as HTMLInputElement).value,
                duration: (document.querySelector('#duration') as HTMLInputElement).value
            })
        })

        if(res.ok) {
            alert(`Successfully sent LOA`);
        }
    }
</script>

<QuailTree perms={perms.perm}>
    <div class="warning">
    Please don't abuse this by spamming LOA's non-stop or you **will** be demoted!
    </div>

    <form class="needs-validation" novalidate>
        <div class="form-group">
            <label for="reason">Reason</label>
            <textarea class="form-control question" id="reason" name="reason" placeholder="Reason for LOA" required aria-required="true"></textarea>
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                Reason is either missing or too long!
            </div>
        </div>
        <div class="form-group">
            <label for="duration">Duration</label>
            <input type="datetime-local" class="form-control question" id="duration" name="duration" placeholder="Duration of LOA" required aria-required="true"/>
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                Duration is either missing or too long!
            </div>
        </div>
        <Button class="button" id="loa-btn" on:click={() => sendLoa()}>Submit</Button>
    </form>

    <em>Or...</em>

    <ol>
        <li>Login to Lynx Admin</li>
        <li>Click Leave Of Absense</li>
        <li>Click 'Add Row'</li>
        <li>Fill out the nessesary fields</li>
        <li>Click 'Save'</li>
    </ol>
</QuailTree>