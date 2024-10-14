import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 0px 10px 3px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        gradientPrimary: "#7B3EFF",
        gradientSecondary: "#BD5ED4",
        primary: "#9E4FE9",
        secondary: "#202020",
        textPrimary: "#827987",
        ton: "#4F8BBF",
        tooltip: "#837888",
      },
    },
  },
  plugins: [],
};
export default config;
