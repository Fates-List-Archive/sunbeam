<script lang="ts">
    export let title: string;
    export let description: string;
    export let thumbnail: string;
    export let url: string;
    export let pageTitle: string = title;
</script>
<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content="{title}">
	<meta name="description" content="{description}">
	<meta name="language" content="English">
	<meta property="og:type" content="website">
	<meta property="og:url" content="{url}">
	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta property="og:image" content="{thumbnail}">
	<meta property="twitter:card" content="summary">
	<meta property="twitter:url" content="{url}">
	<meta property="twitter:title" content="{title}">
	<meta property="twitter:description" content="{description}">
	<meta property="twitter:image" content="{thumbnail}">
</svelte:head>