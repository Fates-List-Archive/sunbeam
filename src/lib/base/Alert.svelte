<script lang="ts">
	import { enums } from '$lib/enums/enums';
	import * as logger from '$lib/logger';

	import Tiptap from '$lib/base/Tiptap.svelte';

	export let show: boolean;

	export let close;
	export let input;

	let editor; // We bind to this

	const closeAlert = () => {
		if (close) {
			close();
		}
		show = false;
	};

	class SubmittedInput {
		editor: any;
		multiline: boolean;

		constructor(editor: object) {
			this.editor = editor;
			this.multiline = input.multiline;
			logger.info('AlertBox', JSON.stringify(editor.getJSON()));
		}

		toSingleLine() {
			// Does exactly what it says it does on the tin, returns a single no-newline line
			return this.toRaw().replaceAll('\n', ' ').replaceAll('\r', ' ');
		}

		toRaw() {
			// This returns the raw output with \n's
			let parsed = [];

			let content: any[] = this.editor.getJSON().content;

			if (!content) {
				return '';
			}

			// Fucked up shitty parser
			for (let i = 0; i < content.length; i++) {
				let data = content[i];

				if (!data.content) {
					data.content = [{ type: 'hardBreak' }];
				}

				for (let j = 0; j < data.content.length; j++) {
					let v = data.content[j];
					if (!v) {
						v = [{ type: 'hardBreak' }];
					}

					if (v.type == 'hardBreak') {
						parsed.push('');
						continue;
					}

					parsed.push(v.text);
				}
			}

			return parsed.join('\n');
		}

		toHTML() {
			// Wrapper around this.editor
			return this.editor.getHTML();
		}

		toJSON() {
			// Wrapper around this.editor but with far less nightmare formatting
			let parsed: any[] = [];
			// lemme do this part lmao

			let content: any[] = this.editor.getJSON().content;

			if (!content) {
				return '';
			}

			content.forEach((data) => {
				data.content.forEach((d) => {
					if (!d) {
						return;
					}

					parsed.push(d); // Hey, its a *little* saner?
				});
			});

			return parsed; // You have to return from nightmares, yknow?
		}

		toString() {
			// Prototype Object.prototype.toString (i hope this works)
			return this.toRaw();
		}
	}

	const submitInput = () => {
		if (input && input.function) {
			const data = new SubmittedInput(editor);
			input.function(data); // We directly give input.function a SubmittedInput object
		}
		closeAlert();
	};

	export let title: string;
	export let id: string;
	export let type: enums.AlertType;
</script>

{#if show}
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<dialog open role="dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-content`}>
		<section>
			<h1 id={`${id}-type`} class="alert-type">{enums.AlertType[type] || 'Alert'}</h1>

			<header id={`${id}-title`}>
				<strong>
					<h2 class="alert-title">{title}</h2>
				</strong>
			</header>

			<div id={`${id}-content`} class="alert-content">
				<slot />

				{#if input}
					<br />

					<label for="alert-input" class="alert-label">{input.label}</label>

					<!--This should work?-->
					<Tiptap bind:editor placeHolderContent={input.placeholder} />

					<!--
						Example Alert

						alert({
							title: "Login",
							message: "Please enter your Username!",
							id: 1030404,
							type: 7,
							input: {
								"label": "Username",
								"placeholder": "Username",
        						"multiline": false, // Set to "true", for Multi-line input
        						"function": (value) => {
									console.log(value);
								}
							}
						});
					-->

					<button type="button" on:click={submitInput}>Submit</button>
				{/if}
			</div>

			<button on:click={closeAlert} id="alert-close" class="block mx-auto"> Close </button>
		</section>
	</dialog>
{/if}

<style>
	dialog {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 9999;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
		color: black !important;
	}

	dialog::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: black;
		opacity: 0.5;
		z-index: -1;
		pointer-events: none;
	}

	section {
		width: 500px;
		min-height: 200px;
		max-height: 100%;
		padding: 10px;
		border-radius: 4px 4px 4px 4px;
		background: white;
	}

	.alert-type {
		color: black !important;
		font-weight: bold;
		font-size: 15px;
	}

	.alert-title {
		margin-left: 15px;
		color: black !important;
	}

	.alert-content {
		color: black !important;
		margin-left: 15px;
	}

	#alert-close {
		position: relative;
		text-align: center !important;
		margin-top: 45px;
		cursor: pointer;
	}

	button {
		background-color: white !important;
		color: black !important;
		font-weight: bold !important;
		border: black solid 1px !important;
		padding: 12px;
		border-radius: 5px;
		margin-top: 10px;
		cursor: pointer;
	}

	.alert-label {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
