<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	let element;
	export let editor;

	export let placeHolderContent: string;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: placeHolderContent
				})
			],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div class="components">
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class="component_button"
			active={editor.isActive('heading', { level: 1 })}
		>
			Heading 1
		</button>

		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class="component_button"
			active={editor.isActive('heading', { level: 2 })}
		>
			Heading 2
		</button>

		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			active={editor.isActive('paragraph')}
			class="component_button"
		>
			Paragraph
		</button>

		<button
			on:click={() => editor.chain().focus().setCodeBlock().run()}
			active={editor.isActive('codeBlock')}
			class="component_button"
		>
			Code Block
		</button>
	</div>

	<div class="nightmare" />
{/if}

<div bind:this={element} />

<style lang="scss">
	:global(.ProseMirror) {
		background-color: black;
		border: none;
		padding: 5px;
		border-radius: 5px;
		min-width: 80%;
		margin: 0px;
		max-height: 100px !important;
		overflow: scroll;
	}

	:global(.ProseMirror p) {
		font-family: 'Quicksand', sans-serif;
		color: white;
	}

	:global(code) {
		color: dodgerblue;
		font-family: 'Fira Code', monospace;
		font-weight: bold;
	}

	:global(.ProseMirror .is-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}

	:global(.nightmare) {
		padding: 5px;
	}

	.component_button {
		position: relative;
		text-align: center !important;
		margin-top: 45px;
		cursor: pointer;
		color: white;
		background-color: #000000;
		border: none;
		font-weight: bolder;
		padding: 10px;
		border-radius: 7px;
	}

	.component_button[active='true'] {
		position: relative;
		text-align: center !important;
		margin-top: 45px;
		cursor: pointer;
		color: white;
		background-color: red;
		border: none;
		font-weight: bolder;
		padding: 10px;
		border-radius: 7px;
	}
</style>
