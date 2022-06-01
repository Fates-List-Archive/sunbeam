<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	import { apiUrl, lynxUrl } from '$lib/config';
	import { checkAdminSession } from '$lib/request';
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

		if (!session.adminData) {
			return {
				status: 307,
				redirect: `/quailfeather/admin/login`
			};
		}

		let sessionCheck = await checkAdminSession(
			session.session.user.id,
			session.session.token,
			session.adminData
		);

		if (!sessionCheck) {
			return {
				status: 307,
				redirect: `/quailfeather/admin/login`
			};
		}

		// Get cols
		let cols = await fetch(
			`${lynxUrl}/ap/tables/${params.route}?user_id=${session.session.user.id}&lynx_tag=${params.tag}`,
			{
				method: 'GET',
				headers: {
					'Frostpaw-ID': session.adminData,
					Authorization: session.session.token
				}
			}
		);

		if (!cols.ok) {
			let json = await cols.json();
			return {
				status: 401,
				error: new Error(JSON.stringify(json))
			};
		}

		let colsResp = await cols.json();

		let schema = await fetch(`${lynxUrl}/ap/schema`);

		if (!schema.ok) {
			let json = await schema.json();
			return {
				status: 401,
				error: new Error(JSON.stringify(json))
			};
		}

		let schemaResp = await schema.json();

		let typeMap = {}

		schemaResp.forEach(t => {
			typeMap[t.column_name] = {
				array: t.array,
				secret: t.secret,
			}
		})

		let rows = []

		Object.entries(colsResp[0]).forEach(el => {
			if(typeMap[el[0]].secret) {
				return;
			}
			rows.push({
				name: el[0],
				array: typeMap[el[0]].array,
				value: el[1]
			})
		})

		logger.info("AdminPanel", rows)

		return {
			props: {
				perms: perms,
				tableName: params.route,
				lynxTag: params.tag,
				rows: rows,
				typeMap: typeMap
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
	export let lynxTag: any;
	export let rows: any;
	export let typeMap: any;
	import * as logger from '$lib/logger';
	import { enums } from '$lib/enums/enums';
	import { session } from '$app/stores';
	import Button from '@smui/button';

	/*
import FormInput from '$lib/base/FormInput.svelte';
import Tip from '$lib/base/Tip.svelte';
*/

function editAlert(key, content) {
	alert({
		title: `Editting ${key}`,
		message: `Editting ${key}`,
		type: enums.AlertType.Prompt,
		submit: async (value) => {
			let mfa = value.toSingleLine('mfa-key');

			logger.info("AdminPanel", "Setting new content to:", { content })

			let res = await fetch(`${lynxUrl}/ap/tables/${tableName}/tag/${lynxTag}?user_id=${$session.session.user.id}`, {
				method: "PATCH",
				headers: {
					'Frostpaw-ID': $session.adminData,
					Authorization: $session.session.token,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					patch: {
						col: key,
						value: content,
					},
					otp: mfa
				})
			})
		},
		inputs: [
			{
				id: "mfa-key",
				type: enums.AlertInputType.Number,
				label: '2FA code',
				placeholder: '2FA code from your authenticator app'
			}
		]
	});

}
</script>

<QuailTree perms={perms.perm}>
	<div class="mx-2">
		<h1 id={tableName}>{title(tableName)} - Editing entity</h1>
		<h2>Columns</h2>
		{#each rows as row}
			<h3>
				{title(row.name)}
				{#if typeMap[row.name].array}
					<span class="text-gray-500"> (array)</span>
				{:else}
					<a
						class="inline"
						href={'javascript:void(0)'}
						on:click={() => {
							editAlert(row.name, document.querySelector(`#inp-${row.name}`).value)
						}}>Edit</a
					>
				{/if}
			</h3>
			{#if row.array}
				{#each row.value as val, i}
					<textarea id="inp-{row.name}-{i}" class="fform inp" on:keyup={function() {
						this.scrollTop = this.scrollHeight;
					}}>{val}</textarea>		
				{/each}
				<Button class="button" on:click={() => {
					row[row.name].value.push("")
					row = row
				}}>Add</Button>
			{:else}
				<textarea id="inp-{row.name}" class="fform inp" on:keyup={() => {
					console.log("keyup")
					document.querySelector(`#inp-${row.name}`).scrollTop = document.querySelector(`#inp-${row.name}`).scrollHeight;
				}}>{row.value}</textarea>	
			{/if}
		{/each}
	</div>
</QuailTree>
<style>
	.inp {
		height: 30px !important;
	}
</style>