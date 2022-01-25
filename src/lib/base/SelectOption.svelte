<script lang="ts">
    export let value: string;
    export let masterValue: string;
</script>
{#if `${masterValue}` == `${value}`}
    <option value={value} selected><slot /></option>
{:else}
    <option value={value}><slot /></option>
{/if}