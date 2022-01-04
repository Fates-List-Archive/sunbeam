<script lang="ts">
	import { page, session } from '$app/stores';
	console.log($session, "Session From Header")
	import Menu, { MenuComponentDev } from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	//import Button, { Label } from '@smui/button';

	let menu: MenuComponentDev;
	let clicked = 'nothing yet';
	let username = null
	let userID = null
	let debug = false
	if($session.session.user) {
		username = $session.session.user.username
		userID = $session.session.user.id
	}
</script>
{#if debug}
<ul class="navbar">
	<pre class="status">Clicked: {clicked}</pre>
</ul>
{/if}
<header>
	<div class="corner">
		<a href="/">
			<img src="https://fateslist.xyz/static/botlisticon.webp" alt="Fates List Logo" />
		</a>
	</div>

	<nav class="nav1">
		<ul>
			<li class:active={$page.url.pathname === '/partners'}><a sveltekit:prefetch href="/partners">Partners</a></li>
			<li class:active={$page.url.pathname === '/servers'}><a sveltekit:prefetch href="/servers">Servers</a></li>
			<li class:active={$page.url.pathname === '/'}><a href="/">Bots</a></li>
			<li class:active={$page.url.pathname === 'https://api.fateslist.xyz/bot/admin/add'}><a href="/">Add Bot</a></li>
		</ul>
	</nav>
	<nav class="corner-two">
		<div>
			<a href={'#'} on:click={() => {menu.setOpen(true)} }>
				{username || "Not logged in"}
			</a>
		</div>
		<Menu bind:this={menu} class="corner-nav">
		<List>
			{#if username}
			<Item on:SMUI:action={() => {
				clicked = "Logout"
				fetch("https://fateslist.xyz/api/v2/logout/_sunbeam", {
					method: "POST",
					credentials: "include",
					headers: {
						'Content-Type': 'application/json', 
						"Frostpaw": "0.1.0", 
					}
				})
				.then(res => res.json())
				.then(json => {
					window.location.href = "/"
				})
			}}>
				<Text>Logout</Text>
			</Item>
			<Item on:SMUI:action={() => {
				clicked = "Profile"
				window.location.href = `/profile/${userID}`
			}}>
				<Text>Profile</Text>
			</Item>
			<Item on:SMUI:action={() => {
				clicked = "About"
				window.location.href = `/frostpaw/about`
			}}>
				<Text>About</Text>
			</Item>
			<Item on:SMUI:action={() => {
				clicked = "Add Bot"
				window.location.href = `https://api.fateslist.xyz/bot/admin/add`
			}}>
				<Text>About</Text>
			</Item>
			{:else}
			<Item on:SMUI:action={() => {
				clicked = "Login"
				document.cookie = `_sunbeam-login=${window.location.href}; max-age=1800; Secure`
				fetch("https://fateslist.xyz/api/v2/oauth", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json', 
						"Frostpaw": "0.1.0", 
						"Frostpaw-Server": window.location.origin
					},
					body: JSON.stringify({"scopes": ["identify"]})
				})
				.then((res) => res.json())
				.then((json) => {
					window.location.href = json.url
				})	
			}}>
				<Text>Login</Text>
			</Item>
			{/if}
			<Item on:SMUI:action={() => {
				clicked = 'API Docs'
				window.location.href = "https://docs.fateslist.xyz"
			}}>
				<Text>API Docs</Text>
			</Item>
			<Item on:SMUI:action={() => {
				clicked = 'Terms Of Service'
				window.location.href = "/frostpaw/tos"
			}}>
				<Text>Terms Of Service</Text>
			</Item>
		</List>
		</Menu>
	</nav>
</header>	

<style lang="scss">
	header {
		display: flex;
		position: fixed;
		width: 100%;
		margin: 0px;
		padding: 2px;
		z-index: 1;
		background-color: black;
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
		list-style: none;
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

	.nav1 a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		font-size: 0.8rem;
		transition: color 0.2s linear;
	}
</style>
