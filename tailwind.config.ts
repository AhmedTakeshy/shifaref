import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				"grey": {
					99: "#FCFCFC",
					97: "#F7F7F7",
					95: "#F2F2F2",
					90: "#E6E6E6",
					60: "#98989A",
					40: "#656567",
					35: "#59595A",
					30: "#4C4C4D",
					20: "#333333",
					15: "#262626",
					10: "#191919",
				},
				"dark-green": {
					90: "#DDEDE8",
					80: "#BCDCD1",
					60: "#79B9A4",
					40: "#468671",
					30: "#346454",
					25: "#2C5446",
					20: "#234338",
					15: "#1A3129",
				},
				"light-green": {
					99: "#FDFEFB",
					97: "#FAFDF2",
					95: "#F6FBE9",
					90: "#EEF8D3",
					85: "#E5F5BD",
					80: "#DCF1A7",
					75: "#D3EE91",
					70: "#CBEA7B",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					"sm": '1rem',
					"md": '2rem',
					"lg": '3rem',
					"xl": '4rem',
					"2xl": '5rem',
				},
			},
		},
		keyframes: {
			text: {
				"0%, 100%": {
					"background-size": "200% 200%",
					"background-position": "left center",
				},
				"50%": {
					"background-size": "200% 200%",
					"background-position": "right center",
				},
			},
			spin: {
				from: {
					transform: "rotate(0deg)"
				},
				to: {
					transform: "rotate(360deg)"
				}
			}
		},
		animation: {
			text: "text 5s infinite ease",
			spin: "spin 1s linear infinite",
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
