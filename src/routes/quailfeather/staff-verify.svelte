<script lang="ts" context="module">
	import { fetchFates } from '$lib/request';
	export const prerender = false;
	export async function load({ params, url, fetch, session, stuff }) {
		let id = '0';
        if (session.session.token) {
            id = session.session.user.id;
        }
        let perms = await fetchFates(`/baypaw/perms/${id}`, '', fetch, false, true);
        if(perms.perms < 2) {
            return {
                status: 401,
                error: new Error('You are not a staff member.')
            };
        }
        return {
            props: {
                data: await perms.json(),
            }
        };
	}
</script>
<script lang="ts">
import { lynxUrl } from '$lib/config';
import { session } from '$app/stores';
import QuailTree from './_helpers/QuailTree.svelte';

    async function verifyStaff() {
        if(!$session.session.token) {
            alert("Not logged in...")
        }
        let res = await fetch(`${lynxUrl}/staff-verify?user_id=${$session.session.user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: $session.session.token
            },
        })

        if(res.ok) {
            let data = await res.json();
            alert(`Staff verified! Your lynx password is ${data.pass}`);
        }
    }
</script>
<QuailTree perms={perms.perms}>
<h3>In order to continue, you will need to make sure you are up to date with our rules</h3>
<pre>
<strong>You can find our staff guide <a href="/quailfeather/docs/staff-guide">here</a></strong>

- The code is somewhere in the staff guide so please read the full guide
- Look up terms you do not understand on Google!
<strong>Once you complete this, you will automatically recieve your roles in the staff server</strong>
</pre>

<div style="margin-left: auto; margin-right: auto; text-align: center;">
<textarea class="fform" id="staff-verify-code" placeholder="Enter staff verification code here"
></textarea>
</div>
By continuing, you agree to:
<ol>
    <li>Abide by Discord ToS</li>
    <li>Abide by Fates List ToS</li>
    <li>Agree to try and be at least partially active on the list</li>
    <li>Be able to join group chats (group DMs) if required by Fates List Admin+</li>
</ol>
<p>
If you disagree with any of the above, you should stop now and consider taking a 
Leave Of Absence or leaving the staff team though we hope it won't come to this...
<br/><br/>

Please <em>read</em> the staff guide carefully. Do NOT just Ctrl-F. If you ask questions
already in the staff guide, you will just be told to reread the staff guide!
</p>
<br/>
<div id="verify-parent">
    <button id="verify-btn" on:click={() => verifyStaff()}>Verify</button>
</div>
</QuailTree>