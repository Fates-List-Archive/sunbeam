<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';
import Button from '@smui/button';
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
        
        // Get all tables
        let tables = new Map()

        schemaResp.forEach(el => {
            if(!tables.has(el.table_name)) {
                tables.set(el.table_name, [])
            }
            tables.get(el.table_name).push(el)
        })

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

		return {
			props: {
				perms: perms,
                tables: tables,
                tableName: params.route,
                rows: colsResp
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
    export let tables: any;
    export let tableName: any;
    export let rows: any;
    import * as logger from '$lib/logger';
import Section from '$lib/base/Section.svelte';
</script>

<QuailTree perms={perms.perm}>
    <div class="mx-2">
        {#each [...tables] as [tableName, table]}
            <h1 id={tableName}>{title(tableName)}</h1>
            <h2>Columns</h2>
            <ul>
                {#each table as column}
                    <li>{column.column_name}</li>
                {/each}
            </ul>
        {/each}

        <!--Insert schema-->

        <!--Order of keys is not guaranteed, select, please fix-->
        <table>
            <thead>
                <tr>
                    {#each tables.get(tableName) as table}
                        <th>{table.column_name}</th>
                    {/each}
            </thead>
            {#each rows as row}
                <tr>
                    {#each Object.entries(row) as [key, value]}
                        <td>{key} {value}</td>
                    {/each}
                </tr>
            {/each}
        </table>
    </div>
</QuailTree>

<style>
    ul {
        color: white !important;
    }
</style>