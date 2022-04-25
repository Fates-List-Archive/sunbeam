<script lang="ts">
	import { page, session } from '$app/stores';
	console.log($session, "Session From Header")
	import Menu, { MenuComponentDev } from '@smui/menu';
	import List, { Item, Text } from '@smui/list';
	import { loginUser } from '$lib/request';
import { goto } from '$app/navigation';
import { apiUrl, nextUrl } from '$lib/config';
import { browser } from '$app/env';
import alertstore from '$lib/alertstore';

	let username = null
	let userID = null
	let avatar = null
	let menu: MenuComponentDev;
	let addMenu: MenuComponentDev;
	if($session.session.user) {
		username = $session.session.user.username
		userID = $session.session.user.id
		if($session.session.user.avatar) {
			avatar = `https://cdn.discordapp.com/avatars/${userID}/${$session.session.user.avatar}.webp`
		} else {
			avatar = "https://cdn.discordapp.com/embed/avatars/4.png"
		}
		console.log(avatar)
	}

	function docReady(fn) {
    	// see if DOM is already available
    	if (document.readyState === "complete" || document.readyState === "interactive") {
        	// call on next available tick
        	setTimeout(fn, 1);
    	} else {
        	document.addEventListener("DOMContentLoaded", fn);
    	}
	}    

	let scrolled = false;

	if(browser) {
		docReady(() => {
			document.addEventListener("scroll", (e) => {
				if(window.scrollY > 5) {
					console.log("Set scrolled to true")
					scrolled = true;
				} else {
					console.log("Set scrolled to false")
					scrolled = false;
				}
			})
			scrolled = window.scrollY > 5;
		});
	}
</script>
<header id="header">
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
				<Item on:SMUI:action={() => {
					goto(`/frostpaw/import-bot`)
				}}>
					<Text>Import Bot (BETA)</Text>
				</Item>
			</List>
		</Menu>	
	</nav>
	<nav class="corner-two">
		<div>
			<a href={'#'} on:click={() => {menu.setOpen(true)} }>
				{#if username}
					<img src={avatar} alt="Avatar" id="avatar"/>
					{username}
				{:else}
					Anonymous
				{/if}
			</a>
		</div>
		<Menu bind:this={menu} class="corner-nav" style="margin-top: 3em !important;">
			<List>
				{#if username}
				<Item on:SMUI:action={() => {
					fetch(`${nextUrl}/oauth2`, {
						method: "DELETE",
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
					goto("https://lynx.fateslist.xyz")
				}}>
					<Text>Lynx (API Docs/TOS)</Text>
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

{#if scrolled}
	<style lang="scss">
		#header {
			background-color: black !important;
			box-shadow: 1px 1px 1px 1px black;
		}
	</style>
{/if}

<style lang="scss">
	#header {
		display: flex;
		position: sticky;
		align-self: flex-start;
		top: 0;
		height: auto;
		width: 100%;
		margin: 0px;
		padding: 3px;
		z-index: 2;
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

	#avatar {
		border-radius: 50%;
		width: 30px;
		margin-right: 10px;
	}
</style>
