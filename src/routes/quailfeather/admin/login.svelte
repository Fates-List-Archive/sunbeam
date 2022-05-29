<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';
import Button from '@smui/button';
	export const prerender = false;
	export async function load({ session }) {
		let id = '0';
		if (session.session.token) {
			id = session.session.user.id;
		}
		let perms = await fetch(`${apiUrl}/baypaw/perms/${id}`);

        perms = await perms.json();

		if (perms.perm < 2) {
			return {
				status: 401,
				error: new Error('You are not a staff member.')
			};
		}

		return {
			props: {
				perms: perms
			}
		};
	}
</script>
<script lang="ts">
    import { enums } from '$lib/enums/enums';
import QuailTree from '../_helpers/QuailTree.svelte';
import { session } from '$app/stores';
    export let perms: any;
    import * as logger from '$lib/logger';
</script>

<QuailTree perms={perms.perm}>
    <h2>Login</h2>
    <Button on:click={() => {
        alert({
            title: "Login",
            message: "Enter 2FA code here",
            type: enums.AlertType.Prompt,
            submit: async (v) => {
                // TODO: Supabase email verification

                // Dummy jwt auth
                let jwt = await fetch(`${lynxUrl}/dummy-jwt?user_id=${$session.session.user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": $session.session.token
                    }
                })

                if(!jwt.ok) {
                    let jwtResp = await jwt.json();
                    alert(jwtResp.reason)
                }

                let jwtStr = await jwt.json();

                let pwd = v.toSingleLine("passwd");
                let mfa = v.toSingleLine("mfa-key");
                logger.info("AdminPanel", { pwd, mfa })
                let loginSession = await fetch(`${lynxUrl}/ap/confirm-login?user_id=${$session.session.user.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "BristlefrostXRootspringXShadowsight": pwd,
                        "Frostpaw-MFA": mfa.padStart(6, 0),
                        "Frostpaw-ID": jwtStr,
                        "Authorization": $session.session.token
                    },
                })

                if(!loginSession.ok) {
                    let loginSessionResp = await loginSession.json();
                    alert(loginSessionResp.reason)
                }

                let loginSessionStr = await loginSession.json();

                document.cookie = `_adminsession=${loginSessionStr};Path=/quailfeather/admin;secure;max-age=28800;samesite=strict;priority=High`;

                window.location.href = "/quailfeather/admin";
            },
            inputs: [{
                id: "passwd",
                label: "Password",
                placeholder: "Password",
                required: true,
                type: enums.AlertInputType.Text,
            }, 
            {
                id: "mfa-key",
                label: "2FA Code",
                placeholder: "2FA Code",
                required: true,
                type: enums.AlertInputType.Number,
            }]
        })
    }} class="button" variant="outlined">Login</Button>
</QuailTree>