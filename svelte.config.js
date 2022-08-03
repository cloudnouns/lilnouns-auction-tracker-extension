import adapter from './adapter.mjs';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		appDir: 'app',
		prerender: { default: true },
		serviceWorker: {
			register: false
		}
	}
};

export default config;
