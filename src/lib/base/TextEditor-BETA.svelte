<script lang="ts">
	import { onMount } from 'svelte';

	export let placeHolderContent: string;

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

		// Quill (Editor) Markdown Extension
		const markdownOptions = {};
		const quillMarkdown = new markdown(quill, markdownOptions);
	});
</script>

<div bind:this={editor} />

<style>
	@import '../../css/texteditor.css';
</style>
