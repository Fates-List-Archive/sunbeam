<script lang="ts">
	import { enums } from '$lib/enums/enums';
	import { subNotifs } from '$lib/request';
	export let show: boolean;

	export let close;
	export let input;

	const closeAlert = () => {
		if (close) {
			close();
		}
		show = false;
	};

	const submitInput = () => {
		if (input && input.function) {
			let inputValue = document.getElementById('alert-input');
			input.function(inputValue.value);
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
			<span class="close" on:click={closeAlert}>&times;</span>

			<header id={`${id}-title`}>
				<strong>
					<h2 class="alert-title">{title}</h2>
				</strong>
			</header>

			<div id={`${id}-content`} class="alert-content">
				<slot />

				{#if input}
					<br />

					<form>
						<label for="alert-input" class="alert-label">{input.label}</label>
						
						{#if input.multiline}				
							<textarea class="alert-textarea" id="alert-input" placeholder={input.placeholder}></textarea>
						{:else}
							<input class="alert-input" id="alert-input" type="text" placeholder={input.placeholder} />
						{/if}

						<button type="button" on:click={submitInput}>Submit</button>
					</form>
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
		max-height: 500px;
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
		margin-top: 3px;
		padding: 12px;
		border-radius: 5px;
		margin-top: 45px;
		cursor: pointer;
	}

	.alert-input {
		background-color: #000000;
		border: none;
		border-radius: 5px;
		color: white;
	}

	.alert-textarea {
		background-color: #000000;
		border: none;
		border-radius: 5px;
		color: white;
	}

	#alert-input::placeholder {
		color: white;
		font-weight: bold;
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

	.close {
		color: black !important;
		font-weight: bold;
		font-size: 15px;
		cursor: pointer;
		float: right;
	}
</style>