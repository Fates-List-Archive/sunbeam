<script lang="ts">
    import Icon from '@iconify/svelte';
    import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	export let data: any;
    export let type: string;
</script>

<BristlefrostMeta 
	url="https://fateslist.xyz/{type}/{data.user.id}"
    pageTitle="{data.user.username}"
	title="Discover {data.user.username} on Fates List!"
	description="{data.description}"
	thumbnail="{data.user.avatar}"
></BristlefrostMeta>

{#if data.banner && data.keep_banner_decor}
<style lang="scss">
.banner-decor {
  opacity: 0.7;
  background-color: black; 
  border-radius: 15px 15px 15px 15px;
}
</style>
{/if}
<style lang="scss">
:global(.buttons-all) {
    background-color: black !important;
}
:global(.codehilite) {
    background-color: white;
}

.prefix {
    opacity: 0.65;
}

.bot-page-banner {
    background-size: cover;
    width: 100%;
    height: 100%;
    min-height: 1000px;
    background-repeat: no-repeat;
}

.bot-page {
    display: flex;
}
.bot-username, .bot-avatar {
    display: flex;
    opacity: 1 !important;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.bot-avatar {
    border-radius: 50%; 
    width: 120px;
}
</style>
<div class="lozad bot-page-banner" data-background-image="{data.banner}">
    <img class="bot-avatar" loading="lazy" src="{data.user.avatar.replace(".png", ".webp").replace("width=", "width=120px")}" id="{type}-avatar" alt="{data.user.username}'s avatar">
    <article class="bot-page">
        <a href="/{type}/{data.user.id}/invite" class="banner-decor bot-username">
            <h3 class="text-center white" id="bot-name">{data.user.username} {#if type == "bot"}<span class="prefix">({data.prefix || "/"})</span>{/if}</h3>
        </a>
    </article>
</div>