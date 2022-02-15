<script lang="ts">
	import { page, session } from '$app/stores';
	console.log($session, "Session From Header")
	import Menu, { MenuComponentDev } from '@smui/menu';
	import List, { Item, Text } from '@smui/list';
	import { loginUser } from '$lib/request';
import { goto } from '$app/navigation';
import { apiUrl } from '$lib/config';

	let username = null
	let userID = null
	let menu: MenuComponentDev;
	let addMenu: MenuComponentDev;
	if($session.session.user) {
		username = $session.session.user.username
		userID = $session.session.user.id
	}
</script>
<header>
	<div class="corner">
		<a href="/">
			<img src="{apiUrl}/static/botlisticon.webp" alt="Fates List Logo" />
		</a>
	</div>

	<nav class="nav1">
		<ul>
			<li><a href={"#"} on:click={() => addMenu.setOpen(true)}>Add</a></li>
			<li class:active={$page.url.pathname === '/partners'}><a sveltekit:prefetch href="/partners">Partners</a></li>
			<li class:active={$page.url.pathname === '/servers'}><a sveltekit:prefetch href="/servers">Servers</a></li>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Bots</a></li>
		</ul>
		<Menu bind:this={addMenu} class="nav add-nav">
			<List>
				<Item on:SMUI:action={() => {
					goto(`/frostpaw/add-bot`)
				}}>
					<Text>Add Bot</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto(`/frostpaw/add-server`)
				}}>
					<Text>Add Server</Text>
				</Item>
			</List>
		</Menu>	
	</nav>
	<nav class="corner-two">
		<div>
			<a href={'#'} on:click={() => {menu.setOpen(true)} }>
				{username || "Not logged in"}
			</a>
		</div>
		<Menu bind:this={menu} class="corner-nav" style="margin-top: 3em !important;">
			<List>
				{#if username}
				<Item on:SMUI:action={() => {
					fetch(`${apiUrl}/api/v2/logout/_sunbeam`, {
						method: "POST",
						credentials: "include",
						headers: {
							'Content-Type': 'application/json', 
							"Frostpaw": "0.1.0", 
						}
					})
					.then(res => res.json())
					.then(json => {
						window.location.reload() // Only place its really needed
					})
				}}>
					<Text>Logout</Text>
				</Item>

				<Item on:SMUI:action={() => {
					goto(`/profile/${userID}`)
				}}>
					<Text>Profile</Text>
				</Item>
				{:else}
				<Item on:SMUI:action={() => {
					loginUser(false)
				}}>
					<Text>Login</Text>
				</Item>
				{/if}

				<Item on:SMUI:action={() => {
					goto(`/bot/admin/add`)
				}}>
					<Text>Add Bot</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto('/frostpaw/add-server')
				}}>
					<Text>Add Server</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("/servers")
				}}>
					<Text>Servers</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("/frostpaw/about")
				}}>
					<Text>About</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("https://docs.fateslist.xyz")
				}}>
					<Text>API Docs</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("/frostpaw/tos")
				}}>
					<Text>TOS</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("/frostpaw/stats")
				}}>
					<Text>Stats</Text>
				</Item>
				<Item on:SMUI:action={() => {
					goto("/server/789934742128558080/invite")
				}}>
					<Text>Support</Text>
				</Item>
			</List>
		</Menu>
	</nav>
</header>	

<style lang="scss">
	header {
		display: flex;
		position: sticky;
		align-self: flex-start;
		top: 0;
		height: auto;
		width: 100%;
		margin: 0px;
		padding: 3px;
		z-index: 2;
		background-color: black;
		box-shadow: 1px 1px 1px black;	
	}

	:global(.add-nav) {
		margin-top: 50px !important;
	}

	::-webkit-scrollbar {
		z-index: 30 !important;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner-two {
		display: flex;
		flex-direction: row-reverse !important;
		width: auto;
		margin-left: auto;
		margin-right: 5px;
		justify-content: flex-end !important;
	}

	.corner-two a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		font-size: 0.8rem;
		transition: color 0.2s linear;
	}

	:global(.corner-nav) {
		margin-top: 3em;
		width: 100%;
	}

	.corner a {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		list-style: none !important;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	@media screen and (max-width: 767px) {
		.nav1 {
			display: none !important;
		}
	}

	.nav1 a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		font-size: 0.75rem;
		transition: color 0.2s linear;
	}
</style>
