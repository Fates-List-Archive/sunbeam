import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

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
