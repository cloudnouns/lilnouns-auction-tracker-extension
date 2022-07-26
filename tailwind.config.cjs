const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Syne', ...defaultTheme.fontFamily.sans],
				reg: [...defaultTheme.fontFamily.sans]
			},
			colors: {
				'cloudnoun-green': '#dcff70',
				'cloudnoun-peach': '#ffbd59'
			}
		}
	},

	plugins: [require('tailwind-scrollbar-hide')]
};

module.exports = config;
