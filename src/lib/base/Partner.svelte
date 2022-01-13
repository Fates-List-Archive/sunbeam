<script lang="ts">
    import Icon from '@iconify/svelte';
    export let partner: any;
    export let icons: any;

    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(str, newStr){

            // If a regex pattern
            if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
                return this.replace(str, newStr);
            }

            // If a string
            return this.replace(new RegExp(str, 'g'), newStr);

        };
    }

    // https://stackoverflow.com/a/46959528
    function title(str: string) {
        return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }
</script>
<div id="{partner.id}">
    <a href={partner.links.website}>
        <div class="partner">
            <img class="partner-img" src={partner.image} alt="{partner.name} image" width="100px" height="100px">
            <div class="partner-content">
                <h2>{partner.name}</h2>
                <p>{partner.description}</p>
                {#each Object.entries(partner.links) as link}
                    <a href={link[1]}>
                        <Icon icon={icons[link[0]]}></Icon> {title(link[0])}
                    </a>
                {/each}
            </div>
        </div>
    </a>
</div>

<style lang="scss">
    $card-scale: 1.025;

    .partner {
        border: solid thin white;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        padding: 3px;
    }

    .partner:hover {
	    transform: scale($card-scale, $card-scale) perspective(1px) translateZ(0);
    }

    .partner-img {
        border-radius: 50%;
        background-color: black;
        max-width: 100px;
        max-height: 100px;
        display: inline-block;
        vertical-align: top;
    }

    .partner-content {
        display: inline-block;
    }
</style>
