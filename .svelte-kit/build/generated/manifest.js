const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/frostpaw/index.svelte"),
	() => import("../../../src/routes/frostpaw/troubleshoot.svelte"),
	() => import("../../../src/routes/frostpaw/add-server.svelte"),
	() => import("../../../src/routes/frostpaw/add-bot.svelte"),
	() => import("../../../src/routes/frostpaw/servers/index.svelte"),
	() => import("../../../src/routes/frostpaw/search/index.svelte"),
	() => import("../../../src/routes/frostpaw/search/tags.svelte"),
	() => import("../../../src/routes/frostpaw/about.svelte"),
	() => import("../../../src/routes/frostpaw/login.svelte"),
	() => import("../../../src/routes/frostpaw/stats.svelte"),
	() => import("../../../src/routes/frostpaw/herb.svelte"),
	() => import("../../../src/routes/frostpaw/tos.svelte"),
	() => import("../../../src/routes/partners.svelte"),
	() => import("../../../src/routes/profile/[id]/index.svelte"),
	() => import("../../../src/routes/profile/[id]/settings.svelte"),
	() => import("../../../src/routes/servers/[id]/[...route].svelte"),
	() => import("../../../src/routes/server/[id]/index.svelte"),
	() => import("../../../src/routes/server/[id]/invite.svelte"),
	() => import("../../../src/routes/bots/[id]/[...route].svelte"),
	() => import("../../../src/routes/bot/admin/add.svelte"),
	() => import("../../../src/routes/bot/[id]/index.svelte"),
	() => import("../../../src/routes/bot/[id]/settings.svelte"),
	() => import("../../../src/routes/bot/[id]/invite.svelte"),
	() => import("../../../src/routes/bot/[id]/vote.svelte"),
	() => import("../../../src/routes/[vanity]/index.svelte"),
	() => import("../../../src/routes/[vanity]/invite.svelte"),
	() => import("../../../src/routes/[vanity]/vote.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/frostpaw/index.svelte
	[/^\/frostpaw\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/frostpaw/troubleshoot.svelte
	[/^\/frostpaw\/troubleshoot\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/frostpaw/add-server.svelte
	[/^\/frostpaw\/add-server\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/frostpaw/add-bot.svelte
	[/^\/frostpaw\/add-bot\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/frostpaw/servers/index.svelte
	[/^\/frostpaw\/servers\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/frostpaw/search/index.svelte
	[/^\/frostpaw\/search\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/frostpaw/search/tags.svelte
	[/^\/frostpaw\/search\/tags\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/frostpaw/about.svelte
	[/^\/frostpaw\/about\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/frostpaw/login.svelte
	[/^\/frostpaw\/login\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/frostpaw/stats.svelte
	[/^\/frostpaw\/stats\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/frostpaw/herb.svelte
	[/^\/frostpaw\/herb\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/frostpaw/tos.svelte
	[/^\/frostpaw\/tos\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/partners.svelte
	[/^\/partners\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/profile/[id]/index.svelte
	[/^\/profile\/([^/]+?)\/?$/, [c[0], c[16]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/profile/[id]/settings.svelte
	[/^\/profile\/([^/]+?)\/settings\/?$/, [c[0], c[17]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/servers/[id]/[...route].svelte
	[/^\/servers\/([^/]+?)(?:\/(.*))?\/?$/, [c[0], c[18]], [c[1]], (m) => ({ id: d(m[1]), route: d(m[2] || '')})],

	// src/routes/server/[id]/index.svelte
	[/^\/server\/([^/]+?)\/?$/, [c[0], c[19]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/server/[id]/invite.svelte
	[/^\/server\/([^/]+?)\/invite\/?$/, [c[0], c[20]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/bots/[id]/[...route].svelte
	[/^\/bots\/([^/]+?)(?:\/(.*))?\/?$/, [c[0], c[21]], [c[1]], (m) => ({ id: d(m[1]), route: d(m[2] || '')})],

	// src/routes/bot/admin/add.svelte
	[/^\/bot\/admin\/add\/?$/, [c[0], c[22]], [c[1]]],

	// src/routes/bot/[id]/index.svelte
	[/^\/bot\/([^/]+?)\/?$/, [c[0], c[23]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/bot/[id]/settings.svelte
	[/^\/bot\/([^/]+?)\/settings\/?$/, [c[0], c[24]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/bot/[id]/invite.svelte
	[/^\/bot\/([^/]+?)\/invite\/?$/, [c[0], c[25]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/bot/[id]/vote.svelte
	[/^\/bot\/([^/]+?)\/vote\/?$/, [c[0], c[26]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/[vanity]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[27]], [c[1]], (m) => ({ vanity: d(m[1])})],

	// src/routes/[vanity]/invite.svelte
	[/^\/([^/]+?)\/invite\/?$/, [c[0], c[28]], [c[1]], (m) => ({ vanity: d(m[1])})],

	// src/routes/[vanity]/vote.svelte
	[/^\/([^/]+?)\/vote\/?$/, [c[0], c[29]], [c[1]], (m) => ({ vanity: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];