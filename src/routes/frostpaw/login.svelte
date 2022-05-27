<script context="module" lang="ts">
	export const prerender = false;
</script>

<script>
	import { browser } from '$app/env';
	import { apiUrl } from '$lib/config';
	import { loginUser } from '$lib/request';
	import { enums } from '$lib/enums/enums';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';
	import { encode } from '@cfworker/base64url';

	let frostpawServer = '';
	let frostpawMsg = 'Please wait...';

	let cliInfo = null;

	let code = null;
	let state = null;

	let clientId = null;
	let currentTime = null;
	let hmacTime = null;

	if (browser) {
		frostpawServer = localStorage.sunbeamLogin;

		if (!frostpawServer) {
			frostpawServer = '/';
		}

		function login() {
			frostpawMsg = `Logging you in and redirecting you back to ${frostpawServer}. Please wait...`;
			let retry = "<br/><br/><a href='https://fateslist.xyz'>Try Again?</a>";
			let searchParams = new URLSearchParams(window.location.search);
			let error = searchParams.get('error');
			if (error) {
				frostpawMsg = 'Login Cancelled';
				return;
			}

			code = searchParams.get('code');
			state = searchParams.get('state');
			if (!code || !state) {
				frostpawMsg = 'Invalid code/state' + retry;
				return;
			}

			if (state.startsWith('Bayshine.')) {
				frostpawMsg = 'Custom client auth... checking';
				// Bayshine custom client login
				let stateSplit = state.split('.');
				clientId = stateSplit[1];
				currentTime = parseInt(stateSplit[2]);
				hmacTime = stateSplit[3];
				if (!clientId || !currentTime || !hmacTime) {
					frostpawMsg = 'Invalid state' + retry;
					return;
				}
				if (
					new Date().getTime() / 1000 - currentTime > 60 ||
					currentTime > new Date().getTime() / 1000 ||
					currentTime <= 0
				) {
					frostpawMsg = `Current time nonce is too old! ${new Date().getTime() / 1000}`;
					return;
				}

				// Fetch baypaw client info
				fetch(`${apiUrl}/frostpaw/clients/${clientId}`)
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							frostpawMsg = 'Client not found';
							return async () => {
								{
								}
							};
						}
					})
					.then((json) => {
						cliInfo = json;
					});

				return;
			}

			if (state != localStorage.sunbeamLoginState) {
				frostpawMsg =
					'Invalid state. Are you blocking localStorage?<br/>Try reloading this page or using the application if logging in from a WebView/app embedded browser' +
					retry;
				return;
			}

			localStorage.removeItem('sunbeamLoginState');

			const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

			fetch(`${apiUrl}/oauth2`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Frostpaw: '0.1.0',
					'Frostpaw-Server': window.location.origin
				},
				body: JSON.stringify({
					code: code,
					state: state,
					// We are not a custom client
					frostpaw: false
				})
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.state == enums.UserState.global_ban) {
						frostpawMsg = `<h1>You are global banned</h1><br/><h2>This is a global ban and as such, you may not login/use our API.</h2><br/>You can try to appeal this ban at <a href="https://fateslist.xyz/banappeal">our ban appeal server</a>`;
					} else if (!json.token) {
						frostpawMsg = `Got error: ${JSON.stringify(json)}. Trying again...`;
						localStorage.loginError = '1';
						loginUser(false);
					} else {
						// Push to client
						fetch(`/frostpaw/set-cookie?json=${encode(JSON.stringify(json))}`, {
							credentials: 'same-origin'
						})
							.then(() => sleep(1000))
							.then(() => {
								// ive tried, doesnt want to work so fuck it
								document.cookie = `sunbeam-session=${encode(
									JSON.stringify(json)
								)};Path=/;secure;max-age=28800;samesite=lax;priority=High`;
								window.location.href = frostpawServer;
							});
					}
				});
		}
		login();
	}
</script>

<div style="margin: 20px;">
	<p style="font-size: bold;">{@html frostpawMsg}</p>

	{#if cliInfo}
		<h1>Custom Client Alert!</h1>
		<h2>
			Custom clients can add, edit and delete bots on your behalf and can also vote for bots and
			servers.
		</h2>
		<p>
			You are about to login to <span
				style="opacity: 0.8; text-decoration: underline; font-weight: bolder;">{cliInfo.name}</span
			>!
			<br /><br />
			Fates List cannot validate the authenticity of this client.
			<br /><br />
			You will be redirected to
			<span style="opacity: 0.8; text-decoration: underline; font-weight: bolder;"
				>{cliInfo.domain}</span
			>
			which has a privacy policy of
			<span style="opacity: 0.8; text-decoration: underline; font-weight: bolder;"
				>{cliInfo.privacy_policy}</span
			>
			and is owned by
			<span style="opacity: 0.8; text-decoration: underline; font-weight: bolder;"
				>{cliInfo.owner.username}</span
			>
			<br /><br />
			If you are not sure, <em>exit this page now</em>.
			<br /><br />
		</p>
		<small
			>Client ID: <span style="text-decoration: underline; font-weight: bolder;">{cliInfo.id}</span
			></small
		>
		<br /><br />
		<Button
			on:click={() => {
				goto('/');
			}}
			style="background-color: #90EE90; color: black;">Back To Safety</Button
		>
		<Button
			on:click={async () => {
				let res = await fetch(`${apiUrl}/oauth2`, {
					credentials: 'include',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Frostpaw: '0.1.0',
						'Frostpaw-Server': window.location.origin
					},
					body: JSON.stringify({
						code: code,
						state: state,
						// We are a custom client
						frostpaw: true,
						frostpaw_blood: clientId,
						frostpaw_claw: hmacTime,
						frostpaw_claw_unseathe_time: currentTime
					})
				});
				let json = await res.json();
				if (res.ok) {
					window.location.href = `${cliInfo.domain}/frostpaw?data=${encode(JSON.stringify(json))}`;
				} else {
					alert({
						title: 'Error',
						id: 'frostpaw-cli-error',
						message: `Error: ${json.error}`,
						type: enums.AlertType.Error
					});
				}
			}}
			style="background-color: red; color: white;">Authorize</Button
		>
		<style>
			small {
				color: white;
			}
		</style>
	{/if}
</div>
