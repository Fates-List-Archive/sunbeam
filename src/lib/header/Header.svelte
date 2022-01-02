<script lang="ts">
	import { page } from '$app/stores';
	import Menu, { MenuComponentDev } from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	let menu: MenuComponentDev;
	let clicked = 'nothing yet';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src="https://fateslist.xyz/static/botlisticon.webp" alt="Fates List Logo" />
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/partners'}><a sveltekit:prefetch href="/partners">Partners</a></li>
			<li class:active={$page.url.pathname === '/servers'}><a sveltekit:prefetch href="/servers">Servers</a></li>
			<li class:active={$page.url.pathname === '/'}><a href="/">Bots</a></li>
		</ul>
		<ul class="navbar">
			<Button on:click={() => {alert("Test"); menu.setOpen(true)} }>
				<Label>Open Menu</Label>
			</Button>			
			<Menu bind:this={menu}>
				<List>
				  <Item on:SMUI:action={() => (clicked = 'Cut')}>
					<Text>Cut</Text>
				  </Item>
				  <Item on:SMUI:action={() => (clicked = 'Copy')}>
					<Text>Copy</Text>
				  </Item>
				  <Item on:SMUI:action={() => (clicked = 'Paste')}>
					<Text>Paste</Text>
				  </Item>
				  <Separator />
				  <Item on:SMUI:action={() => (clicked = 'Delete')}>
					<Text>Delete</Text>
				  </Item>
				</List>
			  </Menu>
			   
			  <pre class="status">Clicked: {clicked}</pre>
			</ul>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		position: fixed;
		width: 100%;
		margin: 2px;
		padding: 0px;
		z-index: 1;
		background-color: black;
	}

	.corner {
		width: 3em;
		height: 3em;
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

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		font-size: 0.8rem;
		transition: color 0.2s linear;
		overflow: hidden;
	}
</style>
