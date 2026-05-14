import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#060606",
        ink: "#0b0a08",
        cream: "#f4ead6",
        champagne: "#d9b976",
        antique: "#a78242",
        steel: "#8da2b7",
        ember: "#8f2e22"
      },
      boxShadow: {
        gold: "0 0 34px rgba(217, 185, 118, 0.2)",
        halo: "0 0 80px rgba(217, 185, 118, 0.22)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, rgba(217,185,118,0), rgba(217,185,118,0.8), rgba(217,185,118,0))",
        "metal-gold": "linear-gradient(135deg, #fff3c8 0%, #9c7132 36%, #f9dda0 55%, #75511f 100%)"
      }
    }
  },
  plugins: []
};

export default config;
