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
	<div class="search">
		<input type="hidden" name="f" value="{type}" />
		<input type="text" on:keyup={keyHandle} class="form-control fform search" placeholder="Search for {type}s (ENTER to search)" name="q" value="{query}" aria-label="Search for something.." style="width: 90%">
		<details class="filters">
			<summary>Advanced Search Options</summary>
			<h3>Server Count Filter</h3>
			<FormInput formclass="filter-inp filter-inp-left" onkeyup={keyHandle} id="gc_from" name="From:" placeholder="From..." type="number" data={gc_from} />
			<FormInput formclass="filter-inp filter-inp-right" onkeyup={keyHandle} id="gc_to" name="To:" placeholder="To... (-1 means no limit)" type="number" data={gc_to} />
		</details>
	</div>
</form>
<style lang="scss">
    .search {
	    display: block;
	    padding: 12px !important;
		margin-top: 3px;
    }

	.filters {
		max-width: 94%;
		margin: 0 auto;
		color: white;
	}

	:global(.filter-inp) {
		min-width: 45% !important;
		max-width: 45% !important;
		display: inline-block !important;
		white-space: nowrap;
		overflow-x: nowrap;
	}

	@media only screen and (min-width: 763px) {
		:global(.filter-inp-left) {
			margin-right: 65px;
		}
	}
	@media only screen and (max-width: 763px) {
		:global(.filter-inp-left) {
			margin-right: 20px;
		}
	}
</style>
