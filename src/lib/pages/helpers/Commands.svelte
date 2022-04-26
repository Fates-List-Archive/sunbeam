<script lang="ts">
    import { enums } from '../../enums/enums';
    import Section from '$lib/base/Section.svelte';

    export let data: any;

    // https://stackoverflow.com/a/46959528
    function title(str: string) {
        return str.replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }

	function fade(element) {
    	var op = 1;  // initial opacity
    	var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    	}, 10);
	}
	function unfade(element) {
    	var op = 0.1;  // initial opacity
    	element.style.display = 'table';
    	var timer = setInterval(function () {
        	if (op >= 1){
            	clearInterval(timer);
        	}
        	element.style.opacity = op;
        	element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        	op += op * 0.1;
    	}, 10);
    }

	function showHideCommandGroup(cmdGroup: string) {
		let id = `#${cmdGroup}-table`
		let group = document.querySelector(id)
		if(group.style.display != 'none') {
			fade(group)
		}
		else {
			unfade(group)
		}
	}

    let groupedCmds = {}
    let groups = {}

    data.commands.forEach(el => {
        // Insert each command into the correct group
        el.groups.forEach(group => {
            if(!group || group == "default") {
                group = "Uncategorized"
            }

            let groupId = group.replaceAll(",", "").replaceAll(" ", "").toLowerCase()
            groups[groupId] = title(group)
            if(groupedCmds.hasOwnProperty(groupId)) {
                groupedCmds[groupId].push(el)
            }
            else {
                groupedCmds[groupId] = [el]
            }
        })
    })

    console.log(groupedCmds)
</script>

{#if Object.keys(data.commands).length == 0}
<h3>This bot does not have any commands</h3>
{#if !data.prefix}
    <h4>This bot uses slash commands, try typing / to see a list of commands</h4>
{/if}
{/if}
{#each Object.entries(groupedCmds) as cmd_group}
    <Section icon={""} id={cmd_group[0]} title={title(groups[cmd_group[0]])}>
        <table id="{cmd_group[0]}-table" class="commands-table" rules="all">
            <tr>
                <th class="commands-header">Command</th>
                <th class="commands-header">Type</th>
                <th class="commands-header">Description</th>
                <th class="commands-header">Notes</th>
                <th class="commands-header">Groups</th>
            </tr>
            {#each cmd_group[1] as cmd}
                <tr>
                    <td class="commands-item">{data.prefix || "/"}{cmd["name"]} <span class="opaque">{cmd["args"].join(" | ")}</span></td>
                    <td class="commands-item">{enums.CommandType[cmd["cmd_type"]]}</td>
                    <td class="commands-item">{cmd["description"]}</td>
                    <td class="commands-item">
                        <ul class="command-group-list">
                            {#if cmd["vote_locked"]}
                                <li>Requires Voting (vote-locked)</li>
                            {/if}
                            {#if cmd["premium_only"]}
                                <li>Premium Only</li>
                            {/if}
                            {#each cmd["notes"] as note}
                                <li>{note}</li>
                            {/each}
                        </ul>
                    </td>
                    <td class="commands-item">
                        <ul class="command-group-list">
                            {#each cmd["groups"] as group}
                                {#if group == "default"}
                                    <li>Uncategorized</li>
                                {:else}
                                    <li>{title(group)}</li>
                                {/if}
                            {/each}
                        </ul>
                    </td>
                </tr>
            {/each}	
        </table>
    </Section>
{/each}
<style>
.commands-table, .commands-item, .commands-header {
	padding: 1rem;
}
.command-group-list {
	padding: 0;
	margin: 0;
	list-style-type: none !important;
}
</style>