<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';
    import { checkAdminSession } from "$lib/request"
	export const prerender = false;
	export async function load({ params, session }) {
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

        logger.info(session.adminData)

        if(!session.adminData) {
            return {
                status: 307,
                redirect: `/quailfeather/admin/login`
            }
        }

        let sessionCheck = await checkAdminSession(session.session.user.id, session.session.token, session.adminData);

        if(!sessionCheck) {
            return {
                status: 307,
                redirect: `/quailfeather/admin/login`
            }
        }

        // Get cols
        let cols = await fetch(`${lynxUrl}/ap/tables/${params.route}?user_id=${session.session.user.id}&lynx_tag=${params.tag}`, {
            method: "GET",
            headers: {
                "Frostpaw-ID": session.adminData,
                Authorization: session.session.token
            }
        })

        if(!cols.ok) {
            let json = await cols.json()
            return {
                status: 401,
                error: new Error(JSON.stringify(json))
            }
        }

        let colsResp = await cols.json()

		return {
			props: {
				perms: perms,
                tableName: params.route,
                row: colsResp[0],
			}
		};
	}
</script>

<script lang="ts">
	// https://stackoverflow.com/a/46959528
	function title(str: string) {
		return str.replaceAll('_', ' ').replace(/(^|\s)\S/g, function (t) {
			return t.toUpperCase();
		});
	}

import QuailTree from '../../../../_helpers/QuailTree.svelte';
    export let perms: any;
    export let tableName: any;
    export let row: any;
    import * as logger from '$lib/logger';
import { enums } from '$lib/enums/enums';

/*
import Button from '@smui/button';
import { session } from '$app/stores';
import FormInput from '$lib/base/FormInput.svelte';
import Tip from '$lib/base/Tip.svelte';
*/
</script>

<QuailTree perms={perms.perm}>
    <div class="mx-2">
        <h1 id={tableName}>{title(tableName)} - Editing entity</h1>
        <h2>Columns</h2>
        {#each Object.entries(row) as [key, value]}
            <h3>{title(key)} <a class="inline" href={"javascript:void(0)"} on:click={() => {
                alert({
                    title: `Editting ${key}`,
                    message: `Editting ${key}`,
                    type: enums.AlertType.Prompt
                })
            }}>Edit</a></h3>
            <p>{value}</p>
        {/each}
    </div>
</QuailTree>