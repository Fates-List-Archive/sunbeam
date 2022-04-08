<script lang="ts">
import FormInput from "./FormInput.svelte";

    export let type: string;
    export let query: string;
	export let gc_from: number = 1;
	export let gc_to: number = -1;

	function keyHandle(event) {
	    event.preventDefault();
    	if (event.keyCode === 13) {
			let form = (document.querySelector("#search") as HTMLFormElement)
			form.submit()
    	}
	}
</script>
<form id="search" method="GET" action="/frostpaw/search">
	<input type="hidden" name="target_type" value="{type}" />
	<input type="text" on:keyup={keyHandle} class="form-control fform search" placeholder="Search for {type}s (ENTER to search)" name="q" value="{query}" aria-label="Search for something.." style="width: 90%">
	<div id="filters">
		<details>
			<summary>Search Filters</summary>
			<h4>Filter by server count</h4>
			<FormInput onkeyup={keyHandle} id="gc_from" name="From:" placeholder="From..." type="number" data={gc_from} />
			<FormInput onkeyup={keyHandle} id="gc_to" name="To:" placeholder="To..." type="number" data={gc_to} />
		</details>
	</div>
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

	#filters {
		color: white;
		width: 90% !important;
		margin-left: 10px;
		padding: 3px !important;
	}
</style>
