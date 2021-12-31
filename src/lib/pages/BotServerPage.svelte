<script lang="ts">
	import Icon from '@iconify/svelte';
	export let data: any;
    export let type: string;
</script>
<svelte:head>
    <title>{data.user.username}</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://fateslist.xyz/{type}/{data.user.id}">
    <meta property="og:title" content="Discover {data.user.username} on FatesList!">
    <meta property="og:description" content="{data.description}">
    <meta property="og:image" content="{data.user.avatar}">
    <meta property="twitter:card" content="summary">
    <meta property="twitter:url" content="https://fateslist.xyz/">
    <meta property="twitter:title" content="Discover {data.user.username} on FatesList!">
    <meta property="twitter:description" content="{data.description}">
    <meta property="twitter:image" content="{data.user.avatar}">        
</svelte:head>
<pre>
{JSON.stringify(data)}
</pre>
{@html data.description}