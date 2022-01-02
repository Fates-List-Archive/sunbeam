<script lang="ts">
	import { page, session } from '$app/stores';
	console.log($session)
	import Menu, { MenuComponentDev } from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	let menu: MenuComponentDev;
	let clicked = 'nothing yet';
	let username = $session.username
</script>

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
		</ul>
		<ul class="navbar">
			<pre class="status">Clicked: {clicked}</pre>
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
			<Item on:SMUI:action={() => (clicked = 'Login')}>
				<Text>Login</Text>
			</Item>
			<Item on:SMUI:action={() => (clicked = 'API Docs')}>
				<Text>API Docs</Text>
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
