<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';
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
                redirect: `/quailfeather/admin/login?sess=${session.adminData}`
            }
        }

        let schema = await fetch(`${lynxUrl}/ap/schema?table_name=${params.route}`)

        if(!schema.ok) {
            let json = await schema.json()
            return {
                status: 401,
                error: new Error(JSON.stringify(json))
            }
        }

        let schemaResp = await schema.json()

        // Get order from schema
        let schemaOrder = [];

        let secrets = []

        for(let i = 0; i < schemaResp.length; i++) {
            if(schemaResp[i].secret) {
                secrets.push(schemaResp[i].column_name); // Do not show secret data
                continue;
            }
            schemaOrder.push(schemaResp[i].column_name)
        }

        logger.info("AdminPanel", schemaOrder)

        // Get cols
        let cols = await fetch(`${lynxUrl}/ap/tables/${params.route}?user_id=${session.session.user.id}`, {
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

        let count = await fetch(`${lynxUrl}/ap/tables/${params.route}/count`);

        if(!count.ok) {
            let json = await count.json()
            return {
                status: 401,
                error: new Error(JSON.stringify(json))
            }
        }

        let countResp = await count.json()

		return {
			props: {
				perms: perms,
                tableName: params.route,
                rows: colsResp,
                count: countResp,
                schemaOrder: schemaOrder,
                secrets: secrets
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

import QuailTree from '../../_helpers/QuailTree.svelte';
    export let perms: any;
    export let tableName: any;
    export let rows: any;
    export let schemaOrder: any[];
    export let secrets: any[];
    export let count: any;
    import * as logger from '$lib/logger';
import Section from '$lib/base/Section.svelte';
import Button from '@smui/button';
import { session } from '$app/stores';

let page = 1
let limit = 50

async function getPage(nextPage) {
    // Get cols
    let cols = await fetch(`${lynxUrl}/ap/tables/${tableName}?user_id=${$session.session.user.id}&limit=${limit}&offset=${(nextPage-1)*limit}`, {
        method: "GET",
        headers: {
            "Frostpaw-ID": $session.adminData,
            Authorization: $session.session.token
        }
    })

    if(!cols.ok) {
        let json = await cols.json()
        alert(json.reason)
        return
    }
    rows = await cols.json()
    page = nextPage
}
</script>

<QuailTree perms={perms.perm}>
    <div class="mx-2">
        <h1 id={tableName}>{title(tableName)}</h1>
        <h2>Columns</h2>
        <ul>
            {#each schemaOrder as column}
                <li>{column}</li>
            {/each}
            {#each secrets as secret}
                <li>{secret} (secret)</li>
            {/each}
        </ul>

        <!--Insert schema-->
        <p>Showing {(page-1) * (limit)} to [max] {page * limit} of {count} elements</p>
        <div class="scroll">
            <table rules="all">
                <thead>
                    <tr>
                        {#each schemaOrder as table}
                            <th>{title(table)}</th>
                        {/each}
                </thead>
                {#each rows as row}
                    <tr>
                        {#each schemaOrder as column}
                            {#if `${row[column]}`.length > 70}
                                <td>{(`${row[column]}`).slice(0, 70) + "..."}</td>
                            {:else}
                                <td>{`${row[column]}`}</td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            </table>
        </div>
        <Button class="next-page button" variant="outlined" on:click={() => {
            getPage(page+1)
        }}>Next Page</Button> 
    </div>
</QuailTree>

<style>
    ul, table, thead, td, tr {
        color: white !important;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        white-space: nowrap;
        padding: 3px;
    }

    .scroll {
        overflow-x: scroll !important;
    }
</style>