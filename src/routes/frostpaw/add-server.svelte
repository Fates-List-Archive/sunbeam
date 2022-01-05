<BristlefrostMeta
	title="Add your servers on Fates List!"
	description="Fates List server listing is a great way to get active members for your server"
	thumbnail="https://fateslist.xyz/static/botlisticon.webp"
	url="https://fateslist.xyz/frostpaw/add-server"
>
</BristlefrostMeta>
<h1>Add Server</h1>
<h2>To add your server, add <a href='{serverBotInvite}'>our bot</a> to your server.</h2>
<h3>Next steps</h3>
<ul>
	<li>Set a description (and a long description) otherwise it will be randomly generated!</li>
</ul>
<script lang="ts">
	import BristlefrostMeta from "$lib/base/BristlefrostMeta.svelte";
	let serverBotInvite = "https://discord.com/api/oauth2/authorize?client_id=811073947382579200&permissions=67649&scope=bot%20applications.commands"
</script>
<style lang="scss">
	ul {
		color: white;
	}
</style>
