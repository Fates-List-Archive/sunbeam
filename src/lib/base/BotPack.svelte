<script lang="ts">
    export let pack: any;
</script>
<div class="pack-container">
    <h3>{pack.name}</h3>
    <h4>{pack.description}</h4>
    {#each pack.resolved_bots as bot}
        <div class="pack-bot">
            <a href="/bot/{bot.id}">
                <img class="pack-user-avatar" alt="{bot.username}s avatar" src={bot.avatar} loading="lazy">
            </a>
            <span class="pack-data">
                <a href="/bot/{bot.id}">
                    {bot.username}<br/>
                </a>
                <span class="indent">{bot.description}</span>
            </span>
        </div>
    {/each}
</div>
<style lang="scss">
    $img-width: 30px;

    a {
        opacity: 1 !important;
    }

    .pack-container {
        background-color: black;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .pack-bot {
        margin-bottom: 20px;
    }

    .indent {
        margin-left: $img-width + 3px;
        opacity: 0.8;
    }

    .pack-data {
        color: white;
        clear: both;
    }

    .pack-user-avatar {
        border-radius: 50%; 
        width: $img-width;
        vertical-align: middle;
    }
</style>