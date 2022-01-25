<script lang="ts">
import { browser } from "$app/env";

    import RedStar from "$lib/base/RedStar.svelte";
    export let required: boolean = false
    export let id: string
    export let name: string
    export let type: string = "text"
    export let placeholder: string;
    export let data: any = "";
    export let textarea: boolean = false;
    if(!data) {
        data = ""
    }

    if(browser) {
        if(!window.inputFields) {
            window.inputFields = []
        } else {
            window.inputFields.push({id: id, required: required})
        }
    }
</script>
<label for="{id}">{name}{#if required}<RedStar></RedStar>{/if}</label><br/>
{#if !textarea}
    <input 
        name={id}
        id={id}
        value={data || ""}
        class="fform" 
        placeholder={placeholder}
        type={type}
        aria-required={required}
        required={required}
    /><br>
{:else}
    <textarea
        name={id}
        id={id}
        class="fform"
        placeholder={placeholder}
        type={type}
        aria-required={required}
        required={required}
    >{data || ""}</textarea><br/>
{/if}