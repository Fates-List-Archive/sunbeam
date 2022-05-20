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
		if (input) {
			let inputValue = document.getElementById('dialog-input');
			input(inputValue.value);
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
			<h1 id={`${id}-type`}>{enums.AlertType[type] || 'Alert'}</h1>

			<header id={`${id}-title`}>
				<strong>
					<h2>{title}</h2>
				</strong>
			</header>

			<div id={`${id}-content`} class="dialog-content">
				<slot />

				{#if input}
					<input id="dialog-input" type="text" />
					<button on:click={submitInput}>Submit</button>
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

	h1 {
		color: black !important;
		font-weight: bold;
		font-size: 15px;
	}

	h2 {
		margin-left: 15px;
		color: black !important;
	}

	.dialog-content {
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
		padding: 15px;
		border-radius: 5px;
		margin-top: 45px;
	}
</style>
