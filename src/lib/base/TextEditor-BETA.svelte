<script lang="ts">
	import { onMount } from 'svelte';
	import quillstore from '$lib/quillstore';

	export let placeHolderContent: string;
	export let id: string;

	let options = {
		placeholder: placeHolderContent,
		toolbar: [
			[{ header: 2 }, 'blockquote', 'link', 'image', 'video'],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'ordered' }],
			[{ align: [] }],
			['clean']
		]
	};

	let editor;

	onMount(async () => {
		// Packages
		const quillImport = await import('quill');
		const mdImport = await import('quilljs-markdown');
		const markdown = mdImport.default;
		const Quill = quillImport.default;
		Quill.imports = quillImport.imports;

		// Editor
		const quill = new Quill(editor, {
			modules: {
				theme: undefined,
				toolbar: false // options.toolbar
			},
			placeholder: options.placeholder
		});

		if(!$quillstore) {
			$quillstore = new Map();
		}

		$quillstore.set(id, quill);
		$quillstore = $quillstore;

		// Quill (Editor) Markdown Extension
		const markdownOptions = {};
		const _ = new markdown(quill, markdownOptions);
	});
</script>

<div bind:this={editor} id={id} />

<style>
	@import '../../css/texteditor.css';
</style>
