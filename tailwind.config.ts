import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        mono: ['var(--font-kode-mono)']
      },
      fontSize: {
        'header': ['2rem', {
          lineHeight: '1',
        }],
        'header-lg': ['3rem', {
          lineHeight: '1',
        }],
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
};
export default config;
