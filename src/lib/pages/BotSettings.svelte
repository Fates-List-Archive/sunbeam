<script lang="ts">
	import Tab from '$lib/base/Tab.svelte';
	import Tip from '$lib/base/Tip.svelte';
	import SelectOptionMulti from '$lib/base/SelectOptionMulti.svelte';
	import SelectOption from '$lib/base/SelectOption.svelte';
	import { enums } from '$lib/enums/enums';
	import Icon from '@iconify/svelte';
	import Button from '@smui/button';
	import { page, session } from '$app/stores';
	import { voteHandler } from '$lib/request';
	import loadstore from '$lib/loadstore';
	import navigationState from '$lib/navigationState';
	import inputstore from '$lib/inputstore';
	import RedStar from '$lib/base/RedStar.svelte';
	import FormInput from '$lib/base/FormInput.svelte';
	import MultiSelect from '$lib/base/MultiSelect.svelte';
	import { apiUrl, nextUrl } from '$lib/config';
	import Checkbox from '$lib/base/Checkbox.svelte';
	import Owner from '$lib/base/Owner.svelte';
	import { browser } from '$app/env';
	import alertstore from '$lib/alertstore';
	import AuditLogs from '$lib/base/AuditLogs.svelte';
	import { genError } from '$lib/strings';
	import * as logger from '$lib/logger';

	function title(str: string) {
		return str.replaceAll('_', ' ').replace(/(^|\s)\S/g, function (t) {
			return t.toUpperCase();
		});
	}

	let popUpMsg = 'Errors will appear here (just in case you have popups disabled)';

	export let data: any;
	export let mode: string;
	export let context: any;

	let user = data.user;

	if (mode == 'edit') {
		// Make some basic attributes
		data.bot_id = data.user.id;
	} else {
		data.css = '';
	}

	let tabs = [];
	let defaultTabButton = 'basics-tab-button';
	let token = 'Click "Show" to see your bot\'s token';
	let tokenShown = false;
	let saveTxt = mode;

	let tags;
	let features;

	if (mode == 'edit') {
		tabs = [
			{
				name: 'About',
				id: 'about'
			},
			{
				name: 'Actions',
				id: 'actions'
			}
		];
		defaultTabButton = 'about-tab-button';
	}
	tabs.push(
		{
			name: 'Basics',
			id: 'basics'
		},
		{
			name: 'Webhooks',
			id: 'webhooks'
		},
		{
			name: 'Links',
			id: 'links'
		},
		{
			name: 'Extras',
			id: 'extras'
		}
	);

	let showBtn = 'show';

	// Functions
	async function showBotToken() {
		if (tokenShown) {
			token = 'Click "Show" to see your bot\'s token';
			tokenShown = false;
			showBtn = 'show';
		} else {
			token = data.api_token;
			tokenShown = true;
			showBtn = 'hide';
		}
	}

	async function regenBotToken() {
		let url = `${nextUrl}/bots/${data.bot_id}/token`;
		let headers = { Authorization: data.api_token };
		let res = await fetch(url, {
			method: 'DELETE',
			headers: headers
		});
		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success-regen',
				message: 'Successfully regenerated bot token',
				type: enums.AlertType.Success,
				close: () => {
					window.location.reload();
				}
			});
			return;
		} else {
			let json = await res.json();
			alert({
				title: 'Error',
				id: 'error-regen',
				message: genError(json),
				type: enums.AlertType.Error
			});
		}
	}

	async function appealBot() {
		let url = `${nextUrl}/users/${$session.session.user.id}/bots/${data.bot_id}/appeal`;
		let headers = {
			'Content-Type': 'application/json',
			Authorization: $session.session.token
		};
		let res = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				request_type: 0,
				appeal: document.querySelector('#appeal-text').value
			})
		});
		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success-appeal',
				message: 'Successfully sent appeal',
				type: enums.AlertType.Success,
				close: () => {
					window.location.reload();
				}
			});
		} else {
			let json = await res.json();
			alert({
				title: 'Error',
				id: 'error-appeal',
				message: genError(json),
				type: enums.AlertType.Error
			});
		}
	}

	async function requestCertification() {
		let url = `${nextUrl}/users/${$session.session.user.id}/bots/${data.bot_id}/appeal`;
		let headers = {
			'Content-Type': 'application/json',
			Authorization: $session.session.token
		};
		let res = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				request_type: 1,
				appeal: document.querySelector('#certify-text').value
			})
		});
		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success',
				message: 'Successfully sent request!',
				type: enums.AlertType.Success,
				close: () => {
					window.location.reload();
				}
			});
			return;
		} else {
			let json = await res.json();

			alert({
				title: 'Error',
				id: 'error',
				message: genError(json),
				type: enums.AlertType.Error
			});
		}
	}

	async function postStats() {
		let url = `${apiUrl}/api/v2/bots/${data.bot_id}/stats`;
		let headers = {
			'Content-Type': 'application/json',
			Authorization: data.api_token
		};
		let res = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				guild_count: parseInt(document.querySelector('#guild-count').value),
				shard_count: parseInt(document.querySelector('#shard-count').value)
			})
		});
		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success',
				message: 'Successfully sent stats!',
				type: enums.AlertType.Success,
				close: () => {
					window.location.reload();
				}
			});
			return;
		} else {
			let json = await res.json();
			alert({
				title: 'Error',
				id: 'error',
				message: genError(json),
				type: enums.AlertType.Error
			});
		}
	}

	async function transferBot(newOwner: string) {
		alert({
			id: 'transfer-bot',
			title: 'WARNING',
			type: enums.AlertType.Warning,
			message:
				'This action is irreversible. Please confirm you really want to transfer ownership by entering your Bots ID below',
			input: {
				label: 'BOT ID',
				placeholder: `Enter your BOT ID here to confirm`,
				multiline: false,
				function: async (value) => {
					// Make this a alert input
					if (value.toString() != data.bot_id) {
						alert({
							title: 'Error',
							type: enums.AlertType.Error,
							id: 'confirm-fail',
							message:
								'Could not transfer ownership as you did not confirm you wanted to do this/inputted invalid Bot ID'
						});
						return;
					}

					let url = `${nextUrl}/users/${$session.session.user.id}/bots/${data.bot_id}/main-owner`;
					let headers = {
						'Content-Type': 'application/json',
						Authorization: $session.session.token
					};
					let res = await fetch(url, {
						method: 'PATCH',
						headers: headers,
						body: JSON.stringify({
							user: {
								id: newOwner,
								username: '',
								disc: '',
								avatar: '',
								status: 'Unknown',
								bot: false
							},
							main: true
						})
					});

					if (res.ok) {
						alert({
							title: 'Success',
							id: 'success',
							type: enums.AlertType.Success,
							message: 'Successfully transferred ownership!',
							close: () => {
								window.location.reload();
							}
						});
					} else {
						let json = await res.json();
						alert({
							title: 'Error',
							id: 'error',
							type: enums.AlertType.Error,
							message: genError(json)
						});
					}
				}
			}
		});
	}

	async function deleteBot() {
		alert({
			id: 'delete-bot',
			title: 'WARNING',
			type: enums.AlertType.Warning,
			message:
				'This action is irreversible. Please confirm you really want to delete your bot by entering your Bots ID below',
			input: {
				label: 'BOT ID',
				placeholder: `Enter your BOT ID here to confirm`,
				multiline: false,
				function: async (value) => {
					if (value.toString() != data.bot_id) {
						alert({
							title: 'Error',
							type: enums.AlertType.Error,
							id: 'confirm-fail',
							message:
								'Could not delete bot as you did not confirm you wanted to do this/inputted invalid Bot ID'
						});
						return;
					}

					let url = `${nextUrl}/users/${$session.session.user.id}/bots/${data.bot_id}`;
					let headers = {
						Authorization: $session.session.token
					};
					let res = await fetch(url, {
						method: 'DELETE',
						headers: headers
					});
					if (res.ok) {
						alert({
							title: 'Success',
							id: 'success',
							type: enums.AlertType.Success,
							message: 'Successfully deleted bot!',
							close: () => {
								window.location.reload();
							}
						});
						return;
					} else {
						let json = await res.json();
						alert({
							title: 'Error',
							id: 'error',
							type: enums.AlertType.Error,
							message: genError(json)
						});
					}
				}
			}
		});
	}

	let previewHtml = '<h3>Start typing to generate a preview!</h3>';

	let charsTyped = 0;

	let wsUp = false;
	let previewWs: WebSocket = null;

	function setupWs() {
		if (!browser) {
			return;
		}
		previewWs = new WebSocket('wss://api.fateslist.xyz/ws/_preview');
		previewWs.onmessage = (e) => {
			let json = JSON.parse(e.data);
			if (json.preview === undefined || !json.preview) return;
			let css = document.querySelector('#css').value;
			previewHtml =
				'<' +
				'style' +
				'>' +
				css.replaceAll('long-description', 'preview-tab') +
				'</' +
				'style' +
				'>' +
				json.preview.replaceAll('long-description', 'preview-tab');
		};

		previewWs.onopen = () => {
			setInterval(() => {
				previewWs.send('PING');
			}, 20 * 1000);
		};

		previewWs.onclose = () => {
			logger.info('Settings', 'PreviewWs closed');
			wsUp = false;
		};

		wsUp = true;
	}

	async function preview() {
		/* if(charsTyped % 4 == 0) {
            await previewInput()
        }
        charsTyped++ */
		previewInput();
	}

	async function previewInput() {
		if (!browser) {
			return;
		}

		if (!wsUp) {
			setupWs();
		}
		if (previewWs.readyState != WebSocket.OPEN) {
			setTimeout(previewInput, 500);
			return;
		}
		let css = document.querySelector('#css').value;
		previewWs.send(
			JSON.stringify({
				long_description_type: parseInt(document.querySelector('#long_description_type').value),
				text: document.querySelector('#long_description').value
			})
		);
	}

	if (mode == 'edit') {
		setTimeout(previewInput, 1000);
	}

	async function createCommand() {
		/*
            pub cmd_type: CommandType, DONE
            pub groups: Vec<String>, DONE
            pub name: String, DONE
            pub vote_locked: bool, DONE
            pub description: String, DONE
            pub args: Vec<String>, DONE
            pub examples: Vec<String>, DONE
            pub premium_only: bool, DONE
            pub notes: Vec<String>, DONE
            pub doc_link: String, DONE
            pub id: Option<String>, SKIP  
            pub nsfw: bool, DONE
        */
		let json = {
			name: document.querySelector('#command-name').value,
			cmd_type: parseInt(document.querySelector('#command-type').value),
			groups: document
				.querySelector('#command-groups')
				.value.replaceAll(',', '|')
				.split(',')
				.map((el) => el.trim()),
			description: document.querySelector('#command-description').value,
			args: document
				.querySelector('#command-args')
				.value.replaceAll(',', '|')
				.split('|')
				.map((el) => el.trim()),
			examples: document
				.querySelector('#command-examples')
				.value.replaceAll(',', '|')
				.split('|')
				.map((el) => el.trim()),
			notes: document
				.querySelector('#command-notes')
				.value.replaceAll(',', '|')
				.split('|')
				.map((el) => el.trim()),
			doc_link: document.querySelector('#command-doc-link').value,
			vote_locked: document.querySelector('#command-vote-locked').checked,
			premium_only: document.querySelector('#command-premium-only').checked,
			nsfw: document.querySelector('#command-nsfw').checked
		};
		let res = await fetch(`${nextUrl}/bots/${data.user.id}/commands`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: data.api_token
			},
			body: JSON.stringify({ commands: [json] })
		});
		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success',
				type: enums.AlertType.Success,
				message: 'Successfully created command!',
				close: () => {
					window.location.reload();
				}
			});
			return;
		} else {
			let json = await res.json();
			alert({
				title: 'Error',
				id: 'error',
				type: enums.AlertType.Error,
				message: genError(json)
			});
		}
	}

	async function deleteCommand(id: string) {
		let res = await fetch(`${nextUrl}/bots/${data.user.id}/commands?ids=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: data.api_token
			}
		});

		if (res.ok) {
			alert({
				title: 'Success',
				id: 'success',
				type: enums.AlertType.Success,
				message: 'Successfully deleted command!',
				close: () => {
					window.location.reload();
				}
			});
			return;
		} else {
			let json = await res.json();
			alert({
				title: 'Error',
				id: 'error',
				type: enums.AlertType.Error,
				message: genError(json)
			});
		}
	}

	async function autofillBot() {
		function qs(q: string) {
			return document.querySelector(q);
		}
		let botId = qs('#bot_id').value;

		let clientId = qs('#client_id').value;

		// If client id is set, use that
		if (clientId) {
			botId = clientId;
		}

		if (!botId) {
			return;
		}

		let res = await fetch(`https://discord.com/api/v9/applications/${botId}/rpc`);
		if (!res.ok) {
			let data = await res.json();
			alert({
				title: 'Error',
				id: 'error',
				type: enums.AlertType.Error,
				message: genError(data)
			});
			return;
		} else {
			let data = await res.json();
			if (data.description) qs('#description').value = data.description;
			if (data.summary) qs('#long_description').textContent = data.summary;
			if (data.privacy_policy_url) qs('#privacy_policy').value = data.privacy_policy_url;
			if (data.custom_install_url) qs('#invite').value = data.custom_install_url;
			if (data.slug) qs('#vanity').value = data.slug.toLowerCase();
			else qs('#vanity').value = data.name.replaceAll(' ', '').toLowerCase();
		}
	}

	async function sendTestWebhook() {
		$loadstore = 'Voting...';
		$navigationState = 'loading';
		await voteHandler($session.session.user.id, $session.session.token, data.bot_id, true, 'bot');
		$navigationState = 'loaded';
		return;
	}

	async function updateBot() {
		saveTxt = `${mode}ing`;
		$loadstore = 'Adding...';
		$navigationState = 'loading';
		let bot = {};
		let errorFields = [];

		try {
			$inputstore.forEach((field) => {
				let value = null;
				let fieldEl = document.querySelector(`#${field.id}`) as HTMLInputElement;
				if (fieldEl) {
					value = fieldEl.value;
				} else {
					alert({
						title: 'Error',
						id: 'error',
						type: enums.AlertType.Error,
						message: `Internal error: ${field.id} does not exist!`
					});
					return;
				}
				if (!value && field.required) {
					errorFields.push(field.id.replaceAll('_', ' '));
				} else if (!value) {
					value = null;
				}
				bot[field.id] = value;
			});

			// Fix known broken things
			if (mode == 'add') {
				let botIdEl = document.querySelector('#bot_id');
				if (!botIdEl) {
					alert({
						title: 'Error',
						id: 'error',
						type: enums.AlertType.Error,
						message: 'Internal error: Bot ID not found!'
					});
					return;
				}
				bot['bot_id'] = botIdEl.value;
			} else {
				bot['bot_id'] = data.bot_id;
			}
			bot['client_id'] = document.querySelector('#client_id').value;

			// Handle the selects here
			// webhook_type, webhook_hmac_only, long_description_type, nsfw, system_bot, keep_banner_decor
			bot['webhook_type'] = parseInt(document.querySelector('#webhook_type').value);
			bot['webhook_hmac_only'] = document.querySelector('#webhook_hmac_only').checked;
			bot['long_description_type'] = parseInt(
				document.querySelector('#long_description_type').value
			);
			bot['page_style'] = parseInt(document.querySelector('#page_style').value);

			let flags = [];

			if (document.querySelector('#keep_banner_decor').value == 'true') {
				flags.push(enums.Flags.keep_banner_decor);
			}

			if (document.querySelector('#nsfw').checked) {
				flags.push(enums.Flags.nsfw);
			}

			// Handle ext links
			let extLinksObj = {};
			extLinks.reverse();
			extLinks.forEach((link) => {
				if (link.value.length > 0) {
					extLinksObj[link.id] = link.value;
				}
			});

			bot['extra_links'] = extLinksObj;

			// Other things
			bot['user'] = {
				id: bot['bot_id'],
				username: '',
				disc: '',
				avatar: '',
				status: 'Unknown',
				bot: true
			};
			bot['css_raw'] = '';

			// Check if the bot is public
			let clientId = bot['client_id'];
			let botId = bot['bot_id'];

			if (clientId) {
				botId = clientId;
			} else if (!botId) {
				bot['bot_id'] = clientId;
			}

			let res = await fetch(`https://discord.com/api/v9/applications/${botId}/rpc`);
			if (res.status != 200) {
				alert({
					title: 'Error',
					id: 'error',
					type: enums.AlertType.Error,
					message: "This bot doesn't exist on discord or you need to provide a client id"
				});

				saveTxt = mode;
				return;
			}

			let jsonP = await res.json();
			if (!jsonP.bot_public) {
				alert({
					title: 'Error',
					id: 'error',
					type: enums.AlertType.Error,
					message: 'This bot is not public'
				});
				saveTxt = mode;
				return;
			}

			if (errorFields.length != 0) {
				alert({
					title: 'Error',
					id: 'error',
					type: enums.AlertType.Error,
					message: `The following fields are required: ${errorFields.join(', ')}`
				});
				return;
			}

			// Tags+Features
			if (tags.length == 0) {
				alert({
					title: 'Error',
					id: 'error',
					type: enums.AlertType.Error,
					message: 'You need to add at least one tag!'
				});
				return;
			} else {
				bot['tags'] = tags.map((el) => {
					return {
						id: el,
						name: '',
						iconify_data: ''
					};
				});
			}
			bot['features'] = features.map((el) => {
				return {
					id: el,
					name: '',
					viewed_as: '',
					description: ''
				};
			});

			// Add owners
			bot['owners'] = extraOwners;

			// Add extra fields
			bot['created_at'] = '1970-01-01T00:00:00Z';
			bot['last_updated_at'] = '1970-01-01T00:00:00Z';
			bot['last_stats_post'] = '1970-01-01T00:00:00Z';
			bot['long_description_raw'] = '';
			bot['invite_link'] = '';
			bot['invite_amount'] = 0;
			bot['total_votes'] = 0;
			bot['flags'] = flags;
			bot['action_logs'] = [];
			bot['commands'] = []; // TODO (maybe?)
			bot['resources'] = []; // TODO (maybe?)
			bot['shard_count'] = 0; // Never used
			bot['guild_count'] = 0; // Never used
			bot['user_count'] = 0; // Never used
			bot['shards'] = [];
			bot['state'] = 0;
			bot['css'] = bot['css'] || '';
			bot['votes'] = 0;

			// Method stuff
			let method = 'PATCH';
			let mod = 'editted successfully';

			if (mode != 'edit') {
				method = 'POST';
				mod = 'added to our queue';
			}

			logger.info('Settings', 'Got bot object', bot);

			let url = `${nextUrl}/users/${$session.session.user.id}/bots`;
			let headers = {
				'Content-Type': 'application/json',
				Authorization: $session.session.token
			};
			let updateRes = await fetch(url, {
				method: method,
				headers: headers,
				body: JSON.stringify(bot)
			});
			if (updateRes.ok) {
				alert({
					title: 'Success',
					id: 'success',
					type: enums.AlertType.Success,
					message: `This bot has been ${mod}. Changes may take up to one minute to propogate!`
				});
				return;
			} else {
				let json = await updateRes.json();
				if (updateRes.status == 400) {
					alert({
						title: 'Error',
						id: 'error',
						type: enums.AlertType.Error,
						message: genError(json)
					});
				}
				return;
			}
		} catch (err) {
			alert(err);
		}
	}

	let extLinks: any[] = [];

	let extraOwners = data.owners.filter((el) => !el.main);

	// Give some default links
	for (const [key, value] of Object.entries(
		data.extra_links || {
			Website: '',
			Github: '',
			Support: '',
			Donate: ''
		}
	)) {
		extLinks.push({ id: key, value: value });
	}

	function addLink() {
		alert({
			title: 'Add Link',
			id: 'addLink',
			type: enums.AlertType.Prompt,
			message: 'Add a link to your bot',
			input: {
				label: 'link',
				placeholder: `https://example.com/`,
				multiline: false,
				function: (value) => {
					let link = value.toString();
					if (!link.startsWith('_')) {
						link = title(link);
					}
					extLinks.push({
						id: link,
						value: ''
					});

					// Update the links
					extLinks = extLinks; // Rerender
					logger.info('Settings', 'New extLinks is', extLinks);
				}
			}
		});
	}

	function removeLink(id: string) {
		let index = extLinks.findIndex((el) => el.id == id);
		if (index != -1) {
			extLinks.splice(index, 1);
		}
		extLinks = extLinks; // Rerender
		logger.info('Settings', 'New extLinks is', extLinks);
	}

	function renameLink(id: string) {
		let index = extLinks.findIndex((el) => el.id == id);
		if (index != -1) {
			alert({
				title: 'Rename Link',
				id: 'renameLink',
				type: enums.AlertType.Prompt,
				message: 'Rename this link',
				input: {
					label: 'link',
					placeholder: `https://example.com/`,
					multiline: false,
					function: (value) => {
						extLinks[index].id = value.toString();
					}
				}
			});
		}
		extLinks = extLinks; // Rerender
		logger.info('Settings', 'New extLinks is', extLinks);
	}

	async function addOwner() {
		alert({
			title: 'Add Owner',
			id: 'addOwner',
			type: enums.AlertType.Prompt,
			message: 'Add an owner to your bot',
			input: {
				label: 'owner',
				placeholder: `Enter User ID`,
				multiline: false,
				function: async (value) => {
					let userReq = await fetch(`${nextUrl}/blazefire/${value.toString()}`);
					if (!userReq.ok) {
						alert({
							title: 'Error',
							id: 'error',
							type: enums.AlertType.Error,
							message: "Hmmm... we couldn't find this user <em>anywhere</em>"
						});
						return;
					}
					let user = await userReq.json();
					if (!user.id) {
						alert({
							title: 'Error',
							id: 'error',
							type: enums.AlertType.Error,
							message: "Hmmm... we couldn't find this user <em>anywhere</em>"
						});
						return;
					}
					if (user.bot) {
						alert({
							title: 'Error',
							id: 'error',
							type: enums.AlertType.Error,
							message: 'This user is a <em>bot</em>'
						});
						return;
					}
					extraOwners.push({ user: user, main: false });
					extraOwners = extraOwners; // Rerender
				}
			}
		});
	}

	function deleteOwner(id: string) {
		let index = extraOwners.findIndex((el) => el.user.id == id);
		if (index != -1) {
			extraOwners.splice(index, 1);
		}
		extraOwners = extraOwners; // Rerender
	}
</script>

<img
	class="user-avatar"
	loading="lazy"
	src={user.avatar.replace('.png', '.webp').replace('width=', 'width=120px')}
	id="user-avatar"
	alt="{user.username}'s avatar"
/>
<h2 class="white user-username" id="user-name">{user.username}</h2>
<h2 id="bot-settings">
	{#if mode == 'add'}Welcome!{:else}Bot Settings{/if}
</h2>
<Tab {tabs} {defaultTabButton}>
	{#if mode == 'edit'}
		<section id="about-tab" class="tabcontent tabdesign">
			<h2>Bot Information</h2>
			<section class="grid grid-cols-3 gap-4">
				<div>
					<h3 class="section-title">Bot State</h3>
					<p>{title(enums.BotState[data.state])} ({data.state})</p>
				</div>
				<div>
					<h3 class="section-title">Bot Flags</h3>
					<ul class="flag-ul">
						{#each data.flags as flag}
							<li>{enums.Flags[flag]} ({flag})</li>
						{/each}
						{#if data.flags.length == 0}
							<li><span class="value">No flags on your bot! You're all clear!</span></li>
						{/if}
					</ul>
				</div>
				<div>
					<h3 class="section-title">Bot Owners</h3>
					<Icon icon="mdi-crown" inline={false} height="1.2em" style="margin-right: 1px" />
					{#each data.owners as owner}
						<Owner user={owner.user} />
					{/each}
				</div>
			</section>
			<h2>Commands</h2>
			{#if data.commands.length > 0}
				{#each data.commands as command}
					<h3>{command.name}</h3>
					<ul class="command">
						<li>ID: <span class="value">{command.id}</span></li>
						<li>Name: <span class="value">{command.name}</span></li>
						<li>Command Type: <span class="value">{enums.CommandType[command.cmd_type]}</span></li>
					</ul>
					<Button
						href={'#'}
						on:click={() => deleteCommand(command.id)}
						class="button"
						touch
						variant="outlined">Delete {command.name}</Button
					>
				{/each}
			{:else}
				<p>No commands created for this bot</p>
			{/if}

			<h2>API Token</h2>
			<pre>{token}</pre>
			<Button
				href={'#'}
				on:click={showBotToken}
				class="button"
				id="bot-token-show-btn"
				touch
				variant="outlined"><span class="regen-btn">{showBtn}</span></Button
			>
			<Button
				href={'#'}
				on:click={regenBotToken}
				class="button danger"
				id="bot-token-regen-btn"
				touch
				variant="text"><span class="regen-btn">Regenerate</span></Button
			>

			<h2>Action Logs</h2>
			<AuditLogs logs={data.action_logs} />
		</section>
		<section id="actions-tab" class="tabcontent tabdesign">
			<h2>Critical Actions Needed</h2>
			<Tip>These are actions you <em>must</em> take to continue using all features!</Tip>
			{#if data.state == enums.BotState.denied || data.state == enums.BotState.banned}
				<h5 class="white section">Bot Appeal</h5>
				<div class="info-content">
					Your bot was {enums.BotState[data.state]} and needs to be appealed/resubmitted in order to
					continue using Fates List. These are subject to approval and potential retesting of your bot.
					Some criteria that you could include:<br />
					<ul class="white">
						<li>Did you fix the issues you were asked to fix?</li>
						<li>Do you feel like your bot was {enums.BotState[data.state]} for a wrong reason?</li>
						<li>
							If so (or even if not), mention your reasoning (<em>convincing</em> argument) here!
						</li>
					</ul>
					<label for="appeal-text">Enter your appeal here</label>
					<textarea
						name="appeal-text"
						id="appeal-text"
						class="form-control fform text-input"
						style="width: 100%"
						placeholder="I feel like my bot was {enums.BotState[data.state]}.../I fixed all the..."
					/>
					<Button
						href={'#'}
						on:click={appealBot}
						class="button"
						id="appeal"
						touch
						variant="outlined">Send Appeal</Button
					>
				</div>
			{:else}
				<p class="white">All good! You have no critical actions pending (or pending approval)</p>
			{/if}
			<h2 class="white">Other Actions</h2>
			<p class="white">
				Here are some other actions you can take with your bot on Fates List. Most of these can be
				automated using the API.
			</p>
			<Tip
				>You should still aim to use the API however for best growth and discoverability. Using the
				API is <em>mandatory</em> for certification other than some very <em>rare</em> exceptions of
				high quality and exceeding other requirements for certification</Tip
			>
			<h3 class="white section">Post Stats</h3>
			<label for="guild-count">Server Count<RedStar /></label><br />
			<input
				name="guild-count"
				id="guild-count"
				class="fform"
				placeholder="100 etc."
				type="number"
			/><br />
			<label for="server-count">Shard Count</label><br />
			<input
				name="shard-count"
				id="shard-count"
				class="fform"
				placeholder="Optional"
				type="number"
			/><br />
			<Button
				href={'#'}
				on:click={postStats}
				class="button"
				id="post-stats"
				touch
				variant="outlined">Post Stats</Button
			>

			<h3 class="white section">Add a command</h3>
			<Tip>
				Commands are a <em>great</em> way to make it easier to figure out how to use your bot!<br />

				You can also use the API to post all commands at once!
			</Tip>
			<label for="command-name">Name<RedStar /></label><br />
			<input
				name="command-name"
				id="command-name"
				class="fform"
				placeholder="ban, kick"
				type="text"
			/><br />
			<label for="command-description">Description<RedStar /></label><br />
			<input
				name="command-description"
				id="command-description"
				class="fform"
				placeholder="Bans a member from the server"
				type="text"
			/><br />
			<label for="command-args">Arguments (| seperated)</label><br />
			<input
				name="command-args"
				id="command-args"
				class="fform"
				placeholder="<user> | <role> | <member>"
				type="text"
			/><br />
			<label for="command-examples">Examples (| seperated)</label><br />
			<input
				name="command-examples"
				id="command-examples"
				class="fform"
				placeholder="+ban @user | +ban @user ?hack | +ban @user ?d 10hr"
				type="text"
			/><br />
			<label for="command-notes">Notes (| seperated)<RedStar /></label><br />
			<input
				name="command-notes"
				id="command-notes"
				class="fform"
				placeholder="This commands needs you to have the Ban Members permission"
				type="text"
			/><br />
			<label for="command-doc-link">Link To Documentation</label><br />
			<input
				name="command-doc-link"
				id="command-doc-link"
				class="fform"
				placeholder="https://mybot.com/ban.html"
				type="text"
			/><br />
			<label for="command-type">Command Type</label>
			<select name="command-type" id="command-type">
				<!--
                    PrefixCommand = 0,
                    SlashCommandGlobal = 1,
                    SlashCommandGuild = 2,
                -->
				<option value="0">Prefix/Message Command</option>
				<option value="1">Global Command</option>
				<option value="2">Guild Command</option>
			</select>
			<label for="command-groups">Groups (| seperated)<RedStar /></label><br />
			<input
				name="command-groups"
				id="command-groups"
				class="fform"
				placeholder="moderation, utility"
				type="text"
			/><br />
			<Checkbox id="command-vote-locked" data={false}>Vote Locked</Checkbox>
			<Checkbox id="command-premium-only" data={false}>Premium Only</Checkbox>
			<Checkbox id="command-nsfw" data={false}>NSFW</Checkbox>

			<Button
				href={'#'}
				on:click={createCommand}
				class="button"
				id="create-resource"
				touch
				variant="outlined">Add Command</Button
			>

			<h3 class="white section">Request Certification</h3>
			<Tip>
				You can request certification for your bot on Fates List. This will only be granted if you
				are a <em>high quality</em>
				bot. Please read our requirements
				<a href="https://fateslist.xyz/frostpaw/tos" target="_blank">here</a>
				to see our minimum published requirements. Other factors and hidden requirements may apply depending
				on your bot and its purpose.
			</Tip>
			<label for="certify-text">Message<RedStar /></label><br />
			<textarea
				name="certify-text"
				id="certify-text"
				class="form-control fform text-input"
				style="width: 100%"
				placeholder="I wish to certify my bot and here's why. Use at least 7 characters"
			/>
			<Button
				href={'#'}
				on:click={requestCertification}
				class="button"
				id="request-certification"
				touch
				variant="outlined">Request Certification</Button
			>
			<h3 class="white section">Delete Bot</h3>
			<Tip icon="jam:triangle-danger-f" alertClass="tip-red alert-info">
				This cannot be undone and you will lose any perks your bot may have such as certification
				and any votes your bot may have. Think twice before proceeding as not even staff can revert
				bot deletions, even if accidental...
			</Tip>
			<Button
				href={'#'}
				on:click={deleteBot}
				class="button danger"
				id="delete-bot"
				touch
				variant="text">Delete Bot</Button
			>
		</section>
	{/if}
	<section id="basics-tab" class="tabcontent tabdesign">
		{#if mode != 'edit'}
			<FormInput
				name="Bot ID (https://discord.dev)"
				id="bot_id"
				placeholder="563808552288780322 etc."
				type="number"
			/>
		{/if}
		<FormInput
			name="Client ID (required, usually same as Bot ID)"
			id="client_id"
			placeholder="563808552288780322 etc."
			type="number"
			data={data.client_id}
		/>
		<Button
			href={'#'}
			on:click={autofillBot}
			class="button"
			id="autofill-bot"
			touch
			variant="outlined">Autofill</Button
		><br /><br />
		<h2>Extra Owners</h2>
		<section class="grid grid-cols-4 gap-6 ext-owners">
			{#each extraOwners as owner, i}
				<div>
					<div class="flex">
						<img
							src={owner.user.avatar}
							width="30px"
							class="owner-avatar float-left align-middle"
							style="height: 100%"
							loading="lazy"
							alt="{owner.user.username}'s avatar"
						/>
						<span class="owner-un float-right align-middle" style="height: 100%"
							>{owner.user.username}#{owner.user.disc.padStart(4, '0')}</span
						>
					</div>
					<small class="value">{owner.user.id}</small><br />
					<span>
						<a class="links-act" href={'#'} on:click={() => deleteOwner(owner.user.id)}>Delete</a>
						{#if mode == 'edit'}
							<a class="links-act" href={'#'} on:click={() => transferBot(owner.user.id)}
								>Transfer</a
							>
						{/if}
					</span>
				</div>
				<br class="br-on-mobile" />
			{/each}
			<div>
				<a href={'#'} on:click={() => addOwner()} id="add-owner">
					<div class="flex">
						<img
							src="https://api.iconify.design/ant-design/plus-outlined.svg"
							width="30px"
							loading="lazy"
							class="filter-white float-left"
							alt="Add Bot Icon"
						/><br />
						<span style="font-size: 18px;" class="float-right">Add new owner</span>
					</div>
					<small class="value">Be sure to only add owners you trust</small><br />
				</a>
			</div>
		</section>
		<FormInput
			name="Prefix (leave blank for slash command only bot) "
			id="prefix"
			placeholder="$, ! etc."
			data={data.prefix}
		/>
		<FormInput
			name="Library"
			id="library"
			placeholder="discord.py, discord.js etc"
			data={data.library}
			required={true}
		/>
		<FormInput
			name="Vanity"
			id="vanity"
			placeholder="mybot, fateslist etc. Prefix with _ to disable"
			data={data.vanity}
			required={true}
		/>
		<Tip>
			You can use P:PERM_NUMBER (or just leave this blank) if the Bot ID and Client ID are the same
			(almost always true except for old bots)
		</Tip>
		<FormInput
			name="Invite URL (Leave blank for automatic)"
			id="invite"
			placeholder="https://discord.com/api/oauth2/..."
			data={data.invite}
		/>
		<FormInput
			name="Short Description"
			id="description"
			placeholder="Ex: Fates List is a great bot that does everything you need it to do!"
			data={data.description}
			required={true}
		/>
		<label for="tags">Tags <RedStar /></label>
		<MultiSelect initialValues={data.tags.map((el) => el.id)} id="tags" bind:value={tags}>
			{#each context.tags as tag}
				<SelectOptionMulti value={tag.id} valueList={data.tags}>{tag.name}</SelectOptionMulti>
			{/each}
		</MultiSelect>
		<label for="features">Features</label>
		<MultiSelect
			initialValues={data.features.map((el) => el.id)}
			id="features"
			bind:value={features}
		>
			{#each context.features as feature}
				<SelectOptionMulti value={feature.id} valueList={data.features}
					>{feature.name}</SelectOptionMulti
				>
			{/each}
		</MultiSelect>
		<label for="site-lang">Long Description Type</label>
		<select name="long_description_type" id="long_description_type">
			<SelectOption value="1" masterValue={data.long_description_type}
				>Markdown (pulldown-cmark)</SelectOption
			>
			<SelectOption value="0" masterValue={data.long_description_type}>HTML</SelectOption>
		</select>
		<br />
		<FormInput
			name="Long Description"
			id="long_description"
			placeholder="Write over 300 characters for your long description. Trying to put a placeholder to bypass this limit will get your bot denied or banned if found out!"
			data={data.long_description_raw}
			required={true}
			textarea={true}
			oninput={() => preview()}
		/>
		<div id="preview-tab" class="prose prose-zinc dark:prose-invert">
			{@html previewHtml}
		</div>

		<label for="page_style">Page Style</label>
		<select name="page_style" id="page_style">
			<SelectOption value="1" masterValue={data.page_style}>Single-scroll (new)</SelectOption>
			<SelectOption value="0" masterValue={data.page_style}>Tabs (classic, deprecated)</SelectOption
			>
		</select>
		<Checkbox id="nsfw" data={data.flags.includes(enums.Flags.nsfw)}>NSFW</Checkbox>
		<br /><br />
	</section>
	<section id="webhooks-tab" class="tabcontent tabdesign">
		<Tip>Everything in this section is completely optional</Tip>
		<Tip>
			Webhooks provide a fast and secure way for your bot to recieve events from Fates List such as
			voting and much more. More information about this is available on our
			<a href="https://apidocs.fateslist.xyz">API Documentation</a>. This option does require you to
			have a server that can recieve the webhooks and you may need to port forward or open your
			firewall if your server has one. Note that the IP address for Fates List may change but this
			is rare and the IP is safe to whitelist.<br /><br />

			Do not rely on 'Discord Integration' for votes. If you do not have a public IP, then use
			webhooks<br /><br />

			Discord Integration is also right now very buggy, use 'Vote Webhook' or 'Websockets' instead
		</Tip>
		<label for="webhook_type">Webhook Type</label>
		<select name="webhook_type" id="webhook_type">
			<SelectOption value="0" masterValue={data.webhook_type}>Vote Webhook</SelectOption>
			<SelectOption value="1" masterValue={data.webhook_type}
				>Discord Integration (not recommended, may not always work)</SelectOption
			>
		</select>
		<br />
		<FormInput
			name="Webhook URL"
			id="webhook"
			placeholder="https://vote.mysite.com/fates"
			data={data.webhook}
		/>
		<Tip>
			API Token is used as the webhook secret if you do not set a webhook secret below. It is
			recommended to use a webhook secret if you are a large bot. Using a service like <a
				href="https://randomkeygen.com/">https://randomkeygen.com/</a
			>
			is recommended if you will be using this.
		</Tip>
		<FormInput
			name="Webhook Secret"
			id="webhook_secret"
			placeholder="Make sure that this is random and secure!"
			data={data.webhook_secret}
		/>
		<Tip>
			HMAC request signing can be more secure than just a 'Authorization' header. This is
			recommended for large bots. Once you have enabled HMAC, it is a good idea to tick this option
			to remove the 'Authorization' header to avoid leaks.
		</Tip>
		<Checkbox id="webhook_hmac_only" data={data.webhook_hmac_only}
			>HMAC Only (no 'Authorization' header)</Checkbox
		>
		<Button
			href={'#'}
			on:click={sendTestWebhook}
			class="button"
			id="submit"
			touch
			variant="outlined">Test Webhook</Button
		>
		<Tip>
			Didn't get anything? Make sure you have <em>saved</em> your bot first before clicking Test Webhook.
			Also check your firewall and network settings as well!
		</Tip>
	</section>
	<section id="links-tab" class="tabcontent tabdesign">
		<Tip>Everything in this section is completely optional</Tip>
		<p>
			Extra Links allow you to set links to websites, github profies and other resources used by
			your bot!<br />Note that Fates List only has a few special cases for extra links. Website,
			Privacy, Donate, Github, Support. These may be required for certification in the future.
		</p>
		<a href={'#'} on:click={() => addLink()} id="add-link">Add</a>
		{#each extLinks as extLink}
			<div class="link-pane">
				<FormInput
					name={extLink.id}
					id={extLink.id}
					placeholder="https://..."
					data={extLink.value}
					shouldUpdateInputStore={false}
					oninput={(e) => {
						logger.debug('Settings', 'New extLink input', e.target.value);
						let index = extLinks.findIndex((el) => el.id == extLink.id);
						if (index != -1) {
							extLinks[index].value = e.target.value;
						}
						logger.info('Settings', 'New extLinks is', extLinks);
					}}
				/>
				<a class="links-act" href={'#'} on:click={() => removeLink(extLink.id)} id="remove-link"
					>Remove</a
				>
				<a class="links-act" href={'#'} on:click={() => renameLink(extLink.id)} id="rename-link"
					>Rename</a
				>
				{#if extLink.id.startsWith('_')}
					<Tip>
						This is a hidden link. It will not be shown in the bot's page.
						<br /><br />
						This is typically used by custom clients.
					</Tip>
				{/if}
			</div>
		{/each}
	</section>
	<section id="extras-tab" class="tabcontent tabdesign">
		<Tip>Everything in this section is completely optional</Tip>
		<Tip>
			Banners allow you to make your bot page look better and more higher quality. There are two
			banners you can set: one for your bots card and one for your bots page. The banner URL you
			post here must give a content type of image/**** when a HEAD or a GET request is sent to them
			(most image services do this). Banner pages also has a 'Keep Banner Decorations/ Artifacts'
			option for some banners that don't work well without it however this does look a bit ugly and
			so should be disabled if possible
		</Tip>
		<label for="keep_banner_decor">Keep Banner Decorations/Artifacts </label>
		<select name="keep_banner_decor" id="keep_banner_decor">
			<SelectOption value="true" masterValue={data.flags.includes(enums.Flags.keep_banner_decor)}
				>Yes</SelectOption
			>
			<SelectOption value="false" masterValue={data.flags.includes(enums.Flags.keep_banner_decor)}
				>No</SelectOption
			>
		</select>
		<br />
		<FormInput
			name="Banner URL for bot card"
			id="banner_card"
			placeholder="Banner URL here"
			data={data.banner_card}
		/>
		<FormInput
			name="Banner URL for bot page"
			id="banner_page"
			placeholder="Banner URL here"
			data={data.banner_page}
		/>
		<Tip>
			Custom CSS is a great way to help improve your bots growth along with banners and vote rewards
			using Webhooks!
		</Tip>
		<FormInput
			name="Custom CSS"
			id="css"
			placeholder="See w3schools if you need a tutorial on CSS. See our API Documentation for more informatiom about what CSS Fates List has and allows! Have fun :)"
			data={data.css_raw}
			textarea={true}
		/>
	</section>
</Tab>
<div class="center">
	<Button
		href={'#'}
		on:click={updateBot}
		class="button btn-save"
		id="submit"
		touch
		variant="outlined">{saveTxt}</Button
	>
</div>
<pre>{popUpMsg}</pre>

<style lang="scss">
	.tabdesign {
		overflow: visible !important;
	}

	:global(.danger) {
		background-color: red !important;
	}

	.section-title {
		text-decoration: underline;
	}

	#bot-settings {
		opacity: 0.8 !important;
	}

	.user-username,
	.user-avatar,
	#bot-settings {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.user-username {
		margin-bottom: 0px;
		padding-bottom: 0px;
	}

	.user-avatar {
		border-radius: 50%;
		width: 120px;
	}

	@media only screen and (min-width: 600px) {
		.br-on-mobile {
			display: none;
		}
	}

	.owner-un {
		word-wrap: break-word !important;
		font-size: 16px;
	}

	@media only screen and (max-width: 600px) {
		.owner-un {
			font-size: 14px !important;
		}
	}

	.owner-avatar {
		border-radius: 50%;
		margin-right: 2px;
	}

	.flag-ul {
		padding: 0;
		list-style-type: none;
	}

	:global(.button) {
		opacity: 1 !important;
		border: solid thin !important;
	}

	.center {
		text-align: center;
	}

	.value {
		opacity: 0.8 !important;
	}

	.regen-btn {
		font-size: 12px !important;
	}

	.link-pane {
		margin-bottom: 10px;
	}

	#add-owner {
		opacity: 1 !important;
		display: inline !important;
		font-size: initial !important;
	}

	.ext-owners {
		margin-bottom: 10px;
	}

	.links-act {
		margin-right: 3px;
	}

	.filter-white {
		filter: invert(100%) sepia(6%) saturate(7493%) hue-rotate(13deg) brightness(115%) contrast(135%);
	}
</style>
