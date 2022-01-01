<script lang="ts">
    export let type: string;
    export let query: string;
</script>
<form method="GET" action="/frostpaw/search">
	<input type="hidden" name="target_type" value="{type}" />
	<input type="text" class="form-control fform search" placeholder="Search for {type}s (ENTER to search)" name="q" value="{query}" aria-label="Search for something.." style="width: 90%">
</form>