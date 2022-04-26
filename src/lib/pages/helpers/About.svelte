<script lang="ts">
import AuditLogs from "$lib/base/AuditLogs.svelte";

import Tag from "$lib/base/Tag.svelte";

import Icon from "@iconify/svelte";


    export let data: any;
    export let type: any;
</script>

<h2>Owners</h2>
<Icon icon="mdi-crown" inline={false} height="1.2em" style="margin-right: 1px"></Icon>
{@html data.owners_html}

<h2>Admin Actions</h2>
<a href="/bot/{data.user.id}/settings">Settings</a>

<h2>Tags</h2>
<Tag targetType={type} tags={data.tags} modWidth={false}></Tag>

<h2>Uptime</h2>
<p>Uptime Checks (Total): {data.uptime_checks_total}</p>
<p>Uptime Checks (Failed): {data.uptime_checks_failed}</p>
<p>Uptime Checks (Success): {data.uptime_checks_total - data.uptime_checks_failed}</p>	
<p>Uptime Checks (Score): 
    {#if data.uptime_checks_total} 
        { (data.uptime_checks_total - data.uptime_checks_failed) / data.uptime_checks_total }
    {:else}
        Not Available
    {/if}
</p>

<h2>Bot Features</h2>
{#each data.features as feature}
    <p>{feature.name}: <span class="opaque">{feature.description}. <em>According to our community, this feature is {feature.type}.</em></span></p>
{/each}

<h2>Statistics</h2>
<p>Guild Count: {data.guild_count}</p>
<p>User Count (according to bot): {data.user_count}</p>
<p>Shard Count: {data.shard_count}</p>
<p>Shards: 
    {#each data.shards as shard}
        <span class="white">{shard}</span>, 
    {/each}
</p>

<h2>Nerdville</h2>
<p>Last posted statistics on: {data.last_stats_post}</p>
<p>Added to the list on: {data.created_at}</p>
<p>Bot Flags: {data.flags}</p>

<AuditLogs logs={data.action_logs}></AuditLogs>
