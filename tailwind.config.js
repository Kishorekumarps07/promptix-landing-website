/** @type {import('tailwindcss').Config} */
// Force reload: Updated for Gold/Charcoal Theme
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    50: '#f4f6f8',
                    100: '#eef2f6',
                    200: '#8E9AAF', // Cool Gray (Subtext)
                    300: '#6c829d',
                    400: '#4e6582',
                    500: '#3D546F',
                    600: '#2C3E50', // Slate Blue (Secondary BG/Cards)
                    700: '#233040',
                    800: '#1a2332',
                    900: '#151b26',
                    950: '#121821', // Deep Charcoal (Main BG)
                },
                orange: {
                    50: '#fffbf0',
                    100: '#fffae0',
                    200: '#ffe899',
                    300: '#ffdf33', // Lighter Gold
                    400: '#ffe14d',
                    500: '#FFD700', // Shining Gold (Primary)
                    600: '#D4B200',
                    700: '#a68b00',
                    800: '#806a00',
                    900: '#5c4d00',
                },
                teal: {
                    DEFAULT: '#00ADB5', // Electric Teal
                    400: '#33BDC3',
                    500: '#00ADB5',
                    600: '#008A91',
                },
            },
            fontFamily: {
                sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
                display: ['"Zalando Sans Expanded"', 'sans-serif'],
            },
            backgroundImage: {
                'metallic-gold': 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                'metallic-gold-hover': 'linear-gradient(45deg, #CC9F45, #FFFACD, #C6952D, #FCF7C3, #B8811F)',
                'charcoal-shine': 'linear-gradient(135deg, #121821 0%, #1a2332 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shine: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                },
            },
            boxShadow: {
                'glass-gold': '0 0 15px rgba(255, 215, 0, 0.3)',
                'glass-gold-hover': '0 0 25px rgba(255, 215, 0, 0.6)',
                'glass-teal': '0 0 15px rgba(0, 173, 181, 0.3)',
                'glass-white': '0 0 15px rgba(255, 255, 255, 0.1)',
            },
        },
    },
    plugins: [],
}
