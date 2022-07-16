<script lang="ts">
	let className: string = '';
	export { className as class };
	export let onclick: () => void;

	export let href: string = '';
	export let useLink: boolean = true;
	export let id: string = '';

	if (!className.includes(' button') && className != 'button') {
		className += ' button';
	}

	className += ' _ibut';

	if (href && !useLink) {
		let oldOnclick = onclick;
		onclick = () => {
			oldOnclick();
			window.location.href = href;
		};
	}

	export let butClickColor = '#332a2a';

	export let ariaLabel: string = null;
	export let ariaDisabled: boolean = false;
	export let disabled: boolean = false;
	export let style: string = '';

	if (ariaDisabled || disabled) {
		className += ' disabled';
		ariaDisabled = true;
		disabled = true;
	}

	export let target: string = null;

	// For backwards compatibility
	export const touch: boolean = true;
	export const variant: string = '';

	style += `--clickcolor: ${butClickColor}`;
</script>

{#if href && useLink}
	<a class={'_ia'} {href} {target}>
		<button
			{style}
			aria-label={ariaLabel}
			aria-disabled={ariaDisabled}
			class={className}
			on:click={onclick}
			{id}
		>
			<span class="button-text">
				<slot />
			</span>
		</button>
	</a>
{:else}
	<button
		{style}
		aria-label={ariaLabel}
		aria-disabled={ariaDisabled}
		class={className}
		on:click={onclick}
	>
		<span class="button-text">
			<slot />
		</span>
	</button>
{/if}

<style>
	._ia {
		opacity: 1 !important;
	}

	._ibut:active {
		background: var(--clickcolor) !important;
	}

	._ibut {
		font-size: 22px;
		font-weight: normal !important;
		font-family: 'Lexend Deca';
		min-width: 100px;
		min-height: 30px;
		cursor: pointer;
		text-align: center;
		text-transform: uppercase;
		display: inline-block;
	}

	.button-text {
		text-align: center;
		position: relative;
		margin: 0 auto;
	}
</style>
