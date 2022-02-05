<script lang="ts">
    export let type: string;
    export let query: string;
</script>
<form method="GET" action="/frostpaw/search">
	<input type="hidden" name="target_type" value="{type}" />
	<input type="text" class="form-control fform search" placeholder="Search for {type}s (ENTER to search)" name="q" value="{query}" aria-label="Search for something.." style="width: 90%">
</form>
<style lang="scss">
    .search {
	    display: block;
	    width: 37%;
	    font-size: 20px;
	    padding: 12px !important;
        margin-top: 50px !important;
	    margin-bottom: 20px !important;
    }
</style>
