<script lang="ts">
    export let badge;

	import alertstore from "$lib/alertstore";
	import navigationState from "$lib/navigationState";

    function alert(msg: string, title=badge.name) {
        $alertstore = {
            title: title,
            message: msg,
            show: true,
            id: "error"
        }
        $navigationState = "loaded" // An alert = page loaded
    } 

    let isHovering = false
</script>

<div id={badge.id} class="badge-item">
    <div class="badge-hover" class:selected={isHovering} id={badge.id} aria-live="polite">
        <span class="badge-hover-text">{badge.name}</span>
    </div>

    <div class="badge-link" on:click={() => alert(badge.description)} on:mouseenter={() => isHovering = true} on:mouseleave={() => isHovering = false}>
        <img class="badge-img" src={badge.icon} width="55px" height="55px" alt={badge.description}>
    </div>
</div>

<style>
    .badge-item {
        max-width: 55px !important;
    }

    .selected {
        visibility: visible !important;
        text-align: center !important;
    }

    .badge-hover-text {
        display: inline;
        overflow: visible !important;
        white-space: pre !important;
        text-align: center !important;
    }

    .badge-hover {
        text-align: center !important;
        overflow: visible;
        align-items: center;
        justify-content: center;
        background-color: black;
        color: white;
        margin-bottom: 10px;
        visibility: hidden;
    }

    .badge-link {
        cursor: pointer;
    }


    .badge-img {
        border-radius: 50%;
        margin-right: 5px;
    }

    .badge-item {
        align-items: center;
		justify-content: center;
    }
</style>