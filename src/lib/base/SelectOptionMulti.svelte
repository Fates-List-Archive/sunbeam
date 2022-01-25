<script lang="ts">
    export let value: string;
    export let valueList: string[];
    let inList = false
    try {
        valueList.forEach(k => {
            if(k == value) {
                inList = true
            }
        })
    }
    catch(err) {
        inList = false
    }
</script>
{#if inList}
    <option value={value} selected><slot /></option>
{:else}
    <option value={value}><slot /></option>
{/if}