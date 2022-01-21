export const manifest = {
	appDir: "_app",
	assets: new Set(["botlisticon.webp","favicon.ico","robots.txt","sitemap.xml","smui-dark.css","smui.css"]),
	_: {
		mime: {".webp":"image/webp",".ico":"image/vnd.microsoft.icon",".txt":"text/plain",".xml":"application/xml",".css":"text/css"},
		entry: {"file":"start-5c7097f8.js","js":["start-5c7097f8.js","chunks/vendor-22677977.js"],"css":["assets/start-61d1577b.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js'),
			() => import('./nodes/16.js'),
			() => import('./nodes/17.js'),
			() => import('./nodes/18.js'),
			() => import('./nodes/19.js'),
			() => import('./nodes/20.js'),
			() => import('./nodes/21.js'),
			() => import('./nodes/22.js'),
			() => import('./nodes/23.js'),
			() => import('./nodes/24.js'),
			() => import('./nodes/25.js'),
			() => import('./nodes/26.js'),
			() => import('./nodes/27.js'),
			() => import('./nodes/28.js'),
			() => import('./nodes/29.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/?$/,
				params: null,
				path: "/frostpaw",
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/troubleshoot\/?$/,
				params: null,
				path: "/frostpaw/troubleshoot",
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/add-server\/?$/,
				params: null,
				path: "/frostpaw/add-server",
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/add-bot\/?$/,
				params: null,
				path: "/frostpaw/add-bot",
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/servers\/?$/,
				params: null,
				path: "/frostpaw/servers",
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/search\/?$/,
				params: null,
				path: "/frostpaw/search",
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/search\/tags\/?$/,
				params: null,
				path: "/frostpaw/search/tags",
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/about\/?$/,
				params: null,
				path: "/frostpaw/about",
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/login\/?$/,
				params: null,
				path: "/frostpaw/login",
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/stats\/?$/,
				params: null,
				path: "/frostpaw/stats",
				a: [0,12],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/herb\/?$/,
				params: null,
				path: "/frostpaw/herb",
				a: [0,13],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/frostpaw\/tos\/?$/,
				params: null,
				path: "/frostpaw/tos",
				a: [0,14],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/partners\/?$/,
				params: null,
				path: "/partners",
				a: [0,15],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/profile\/([^/]+?)\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,16],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/profile\/([^/]+?)\/settings\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,17],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/servers\/([^/]+?)(?:\/(.*))?\/?$/,
				params: (m) => ({ id: m[1], route: m[2] || ''}),
				path: null,
				a: [0,18],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/server\/([^/]+?)\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,19],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/server\/([^/]+?)\/invite\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,20],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/bots\/([^/]+?)(?:\/(.*))?\/?$/,
				params: (m) => ({ id: m[1], route: m[2] || ''}),
				path: null,
				a: [0,21],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/api(?:\/(.*))?$/,
				params: (m) => ({ request: m[1] || ''}),
				load: () => import('./entries/endpoints/api/_...request_.ts.js')
			},
			{
				type: 'page',
				pattern: /^\/bot\/admin\/add\/?$/,
				params: null,
				path: "/bot/admin/add",
				a: [0,22],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/bot\/([^/]+?)\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,23],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/bot\/([^/]+?)\/settings\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,24],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/bot\/([^/]+?)\/invite\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,25],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/bot\/([^/]+?)\/vote\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,26],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/([^/]+?)\/?$/,
				params: (m) => ({ vanity: m[1]}),
				path: null,
				a: [0,27],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/([^/]+?)\/invite\/?$/,
				params: (m) => ({ vanity: m[1]}),
				path: null,
				a: [0,28],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/([^/]+?)\/vote\/?$/,
				params: (m) => ({ vanity: m[1]}),
				path: null,
				a: [0,29],
				b: [1]
			}
		]
	}
};
