import cfAdapter from '@sveltejs/adapter-cloudflare'
import nodeAdapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess';

if(!!process.env.CF_PAGES) {
	var adapter = cfAdapter
} else {
	var adapter = nodeAdapter
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		prerender: {
			enabled: false
		},

		headers: {
			host: 'X-Forwarded-Host',
			protocol: 'X-Forwarded-Proto'
		},
		
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		serviceWorker: {
			register: false
		},
		vite: {
			autoReload: false,
			ssr: {
			  noExternal: [/^@smui(?:-extra)?\//],
			},
		  },
	}
};

export default config;
