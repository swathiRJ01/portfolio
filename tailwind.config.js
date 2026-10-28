/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["Space Grotesk", "sans-serif"], body: ["Inter", "sans-serif"] },
      colors: { violet1: "#7C3AED", fuchsia1: "#D946EF", cyan1: "#06B6D4" },
      keyframes: {
        blob: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(40px,-60px) scale(1.15)" } },
        spin360: { to: { transform: "rotate(360deg)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        gradMove: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } }
      },
      animation: {
        blob: "blob 14s ease-in-out infinite", spin360: "spin360 6s linear infinite",
        gradMove: "gradMove 6s ease infinite"
      }
    }
  },
  plugins: []
};
