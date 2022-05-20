<script lang="ts">
	import { lynxUrl } from '$lib/config';
	import { doctreeCache } from './quailcache';
	import * as logger from '$lib/logger';

	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte'; // For later

	let ignore = ['index.md']; // Index may be counter-intuitive, but we add this later

	let treeDepthOne = [];
	let treeDepthTwo = {};

	// https://stackoverflow.com/a/46959528
	function title(str) {
		return str
			.replaceAll('-', ' ')
			.replaceAll('_', ' ')
			.replace(/(^|\s)\S/g, function (t) {
				return t.toUpperCase();
			});
	}

	let treeLoading = true;

	onMount(async () => {
		if ($doctreeCache && $doctreeCache.treeDepthOne && $doctreeCache.treeDepthOne.length > 0) {
			treeDepthOne = $doctreeCache.treeDepthOne;
			treeDepthTwo = $doctreeCache.treeDepthTwo;
			treeLoading = false;
			return;
		}

		logger.info('QuailTree', 'Fetching doctree');
		let doctreeRes = await fetch(`${lynxUrl}/doctree`);
		let doctree = await doctreeRes.json();

		doctree.forEach((treeEl) => {
			if (ignore.includes(treeEl[0])) {
				logger.info('Shadowsight', 'Ignoring unwanted tree element', treeEl[0]);
				return;
			}

			if (treeEl.length == 1) {
				treeDepthOne.push(treeEl[0].replace('.md', ''));
			} else if (treeEl.length == 2) {
				if (treeDepthTwo[treeEl[0]] === undefined) {
					treeDepthTwo[treeEl[0]] = [];
				}
				treeDepthTwo[treeEl[0]].push(treeEl[1].replace('.md', ''));
			} else {
				logger.error('Shadowsight', `Max nesting of 2 reached`);
			}
		});

		// Sort depth two alphabetically
		treeDepthTwo = Object.keys(treeDepthTwo)
			.sort()
			.reduce((obj, key) => {
				obj[key] = treeDepthTwo[key];
				return obj;
			}, {});

		// Sort values within depth one and two alphabetically
		for (let key in treeDepthTwo) {
			treeDepthTwo[key] = treeDepthTwo[key].sort();
		}

		treeDepthOne.sort(function (a, b) {
			if (a > b) return 1;
			else return -1;
		});

		// Readd index.md
		treeDepthOne.unshift('index');

		logger.info('Shadowsight', `Parsed doctree:`, { treeDepthOne, treeDepthTwo });

		// Force some re-renders
		treeDepthOne = treeDepthOne;
		treeDepthTwo = treeDepthTwo;

		$doctreeCache = {
			treeDepthOne: treeDepthOne,
			treeDepthTwo: treeDepthTwo
		};

		treeLoading = false;
	});

	let treeShow = false;
</script>

<a
	class="ham"
	href={'#'}
	on:click={() => {
		if (treeShow) treeShow = false;
		else treeShow = true;

		// Be sure to reset treeDepths
		treeDepthOne = $doctreeCache.treeDepthOne;
		treeDepthTwo = $doctreeCache.treeDepthTwo;
	}}
	aria-label="Open Menu"
>
	<Icon icon="charm:menu-hamburger" width="30px" />
	<!--Counter-intuitive but eh-->
	<span style="vertical-align: top">Show Menu</span>
</a>

<div class="grid gap-1 grid-cols-4">
	{#if treeShow}
		<div class="doctree col-span-1">
			<li class="td-1 search-flex">
				<input
					id="searchbar"
					placeholder="Search"
					on:input={(e) => {
						// Check if string is empty, if so, use $doctreeCache
						let val = e.target.value.toLowerCase().replaceAll(' ', '-');
						logger.info('SearchDocTree', val);

						if (!val) {
							treeDepthOne = $doctreeCache.treeDepthOne;
							treeDepthTwo = $doctreeCache.treeDepthTwo;
						} else {
							let newTree = [];
							$doctreeCache.treeDepthOne.forEach((el) => {
								if (el.toLowerCase().replaceAll('_', '-').replaceAll(' ', '-').includes(val)) {
									newTree.push(el);
								}
							});
							treeDepthOne = newTree;

							// Check depth 2
							let newTreeTwo = {};
							for (let key in $doctreeCache.treeDepthTwo) {
								if (key.toLowerCase().replaceAll('_', '-').replaceAll(' ', '-').includes(val)) {
									newTreeTwo[key] = $doctreeCache.treeDepthTwo[key];
								}
								let newArr = [];
								$doctreeCache.treeDepthTwo[key].forEach((el) => {
									if (el.toLowerCase().replaceAll('_', '-').replaceAll(' ', '-').includes(val)) {
										newArr.push(el);
									}
								});
								if (newArr.length > 0) {
									newTreeTwo[key] = newArr;
								}
							}

							treeDepthTwo = newTreeTwo;
						}
					}}
				/>
			</li>
			{#if treeLoading}
				<span class="span">Loading doctree</span>
			{/if}
			<!--Tree depth one -->
			<li class="td-1">
				<a class="tree-link" id="docs-_root-nav" href="/quailfeather">
					<span class="span">Back to root</span>
				</a>
			</li>

			{#each treeDepthOne as el}
				<li class="td-1">
					<a class="tree-link" id="docs-{el}-nav" href="/quailfeather/docs/{el}">
						<span class="span">{title(el.replace('-', ' '))}</span>
					</a>
				</li>
			{/each}

			<!--Depth two-->
			{#each Object.entries(treeDepthTwo) as [tree, childs]}
				<li id="docs-{tree}-nav" class="td-1">
					<details>
						<summary class="span">{title(tree.replace('-', ' '))}</summary>
						<ul>
							{#each childs as child}
								<li>
									<a
										class="tree-link"
										id="docs-{tree}-{child}-nav"
										href="/quailfeather/docs/{tree}/{child}"
									>
										<span class="span">{title(child.replace('-', ' '))}</span>
									</a>
								</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</div>
	{:else}
		<style>
			.content {
				width: 100%;
				display: block;
			}

			.col-span-3 {
				grid-column: span 4 / span 3;
			}
		</style>
	{/if}
	<!--Never ever rerender this, it can be very very expensive-->
	<div class="content col-span-3">
		<slot />
	</div>
</div>

<style lang="scss">
	.doctree {
		min-height: 1vh;
	}

	.doctree {
		z-index: 2;
		position: sticky !important;
		top: 0;
		left: 0;
		background: lightgrey;
		color: black !important;
	}

	.span {
		color: black !important;
		opacity: 1 !important;
		font-size: 18px;
	}

	.td-1 {
		list-style: none !important;
		padding: 5px !important;
		border-bottom: 1px solid black !important;
	}

	@media only screen and (max-width: 600px) {
		.span {
			font-size: 12px !important;
		}
	}

	.tree-link {
		opacity: 1 !important;
	}

	.search-flex {
		display: flex;
		flex-wrap: wrap;
	}

	#searchbar {
		background: #444;
		padding: 0 20px;
		border: none;
		border-radius: 4px;
		color: #ffffff;
		height: 30px;
		margin: 0 !important;
		width: 100% !important;
		overflow-x: hidden !important;
	}

	.ham {
		font-size: 18px;
		padding: 3px;
	}
</style>
