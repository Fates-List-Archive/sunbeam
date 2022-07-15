import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
        plugins: [sveltekit()],
        autoReload: false,
        optimizeDeps: {
                include: ['highlight.js', 'highlight.js/lib/core']
        }
};
export default config;