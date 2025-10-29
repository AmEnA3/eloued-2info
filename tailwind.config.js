/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
			},
			colors: {
				// Teal primary palette
				primary: {
					50: "#ecfeff",
					100: "#cffafe",
					200: "#a5f3fc",
					300: "#67e8f9",
					400: "#22d3ee",
					500: "#14b8a6",
					600: "#0d9488",
					700: "#0f766e",
					800: "#115e59",
					900: "#134e4a"
				},
				// Buttercream background tone
				butter: {
					50: "#fffdf6",
					100: "#fff9e8",
					200: "#fff2cc",
					300: "#ffe8a3"
				}
			},
			boxShadow: {
				neon: '0 0 10px #a855f7',
				neonLg: '0 0 24px #a855f7',
				glow: '0 0 15px rgba(168,85,247,0.5)',
				glowLg: '0 0 30px rgba(168,85,247,0.5)'
			}
		}
	},
	plugins: []
};
