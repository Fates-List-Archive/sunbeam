<script lang="ts">
    export let data: string;
</script>

<svelte:head>
  <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/a11y-dark.min.css">  
</svelte:head>

{@html data}

<style lang="scss">
	@import "./_hl.css";
</style>
