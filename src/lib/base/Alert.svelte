<script lang="ts">
	import { enums } from '$lib/enums/enums';
	import * as logger from '$lib/logger';

	import TextEditor from '$lib/base/TextEditor-BETA.svelte';

	export let show: boolean;

	export let close;
	export let submit;
	export let inputs;
	export let validate;

	let editor; // We bind to this
	let error: string = '';
	let showError: boolean = false;

	const closeAlert = () => {
		if (close) {
			close();
		}
		show = false;
	};

	class SubmittedInput {
		inputs: any;

		constructor(editor: object, inputs: any) {
			this.inputs = inputs
		}

		toSingleLine() {
			// Does exactly what it says it does on the tin, returns a single no-newline line
			return this.toRaw().replaceAll('\n', ' ').replaceAll('\r', ' ');
		}

		toRaw(index: number = 0) {
			// This returns the raw output with \n's
			let content: any = document.querySelector(`#inp-${index}`);

			if (!content) {
				return '';
			}

			let obj = inputs[index];

			if(obj.type == enums.AlertInputType.Text) {
				content = content.__quill.getText();
			} else {
				content = content.value;
				if(obj.required && !content) {
					showError = true;
					error = `${obj.label} is required`;
					return null;
				}  
				return content
			}

			if (obj.required) {
				const checks = content
					.replaceAll(' ', '')
					.replaceAll('\n', '')
					.replaceAll('\r', '');

				if (checks === '') {
					showError = true;
					error = 'Error: This field is required';
					return null;
				} else {
					showError = false;
					error = '';
					return content;
				}
			} else {
				return content;
			}
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
		logger.info("AlertBox", "Clicked submit")
		if (inputs && inputs.length > 0 && submit) {
			logger.info("AlertBox", "Found input")
			const inp = new SubmittedInput(editor, inputs);
			const data = inp.toRaw();
			if(data == null) {
				return
			}
			if(validate) {
				let check = validate(inp);
				if(!check) {
					showError = true;
					error = check;
					return
				}
			}

			submit(inp);
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
			<h1 id={`${id}-type`} class="alert-type">{enums.AlertType[type] || 'Unknown'}</h1>

			<header id={`${id}-title`}>
				<strong>
					<h2 class="alert-title">{title}</h2>
				</strong>
			</header>

			<div id={`${id}-content`} class="alert-content">
				<slot />

				{#if inputs}
					<br />

					{#each inputs as inputData, id}
						{#if inputData}
							<br />

							<fieldset>
								<legend>{inputData.label} ({enums.AlertInputType[inputData.type]})</legend>

								{#if inputData.type == enums.AlertInputType.Number}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input id="inp-{id}" type="number" class="InputAlert" placeholder={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.Boolean}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input id="inp-{id}" type="checkbox" class="InputAlert" placeholder={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.DateTime}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input id="inp-{id}" type="datetime" class="InputAlert" placeholder={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.DateTimeLocal}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input
										type="datetime-local"
										id="inp-{id}"
										class="InputAlert"
										placeholder={inputData.placeholder}
									/>

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.Color}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input id="inp-{id}" type="color" class="InputAlert" placeholder={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.File}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<input id="inp-{id}" type="file" class="InputAlert" placeholder={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}

								{#if inputData.type == enums.AlertInputType.Text}
									<label for="alert-input" class="alert-label">{inputData.label}</label>

									<TextEditor id="inp-{id}" placeHolderContent={inputData.placeholder} />

									<div class="input-error" show={showError}>{error}</div>
								{/if}
							</fieldset>
						{/if}
					{/each}

					<button type="button" on:click={submitInput}>Submit</button>
				{/if}
			</div>

			<button on:click={closeAlert} id="alert-close" class="block mx-auto"> Close </button>
		</section>
	</dialog>
{/if}

<style>
	/* Basic Shit */
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
		overflow-y: scroll;
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

	/* Alert */
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

	/* Input */
	.InputAlert {
		width: 100%;
		height: 40px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0 10px;
		font-size: 14px;
		color: #333;
		margin-top: 10px;
		overflow: hidden;
	}

	.InputAlert[type='number'] {
		width: 95%;
	}

	.input-error[show='true'] {
		background-color: red;
		color: white;
		font-weight: bold;
		padding: 10px;
		margin-top: 10px;
		border-radius: 7px;
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

	/* Responsive (Mobile) */
	@media screen and (max-width: 560px) {
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
			width: 75%;
			min-height: 200px;
			max-height: 500px;
			padding: 10px;
			border-radius: 4px 4px 4px 4px;
			background: white;
		}
	}
</style>
