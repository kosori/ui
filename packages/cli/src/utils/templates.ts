export const UTILS = `import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));`;

export const TAILWIND_CONFIG = `
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          base: "var(--primary-1)",
          "bg-subtle": "var(--primary-2)",
          bg: "var(--primary-3)",
          "bg-hover": "var(--primary-4)",
          "bg-active": "var(--primary-5)",
          line: "var(--primary-6)",
          border: "var(--primary-7)",
          "border-hover": "var(--primary-8)",
          "focus-ring": "var(--primary-8)",
          solid: "var(--primary-9)",
          "solid-hover": "var(--primary-10)",
          text: "var(--primary-11)",
          "text-contrast": "var(--primary-12)",
        },
        grey: {
          base: "var(--grey-1)",
          "bg-subtle": "var(--grey-2)",
          bg: "var(--grey-3)",
          "bg-hover": "var(--grey-4)",
          "bg-active": "var(--grey-5)",
          line: "var(--grey-6)",
          border: "var(--grey-7)",
          "border-hover": "var(--grey-8)",
          "focus-ring": "var(--grey-8)",
          solid: "var(--grey-9)",
          "solid-hover": "var(--grey-10)",
          text: "var(--grey-11)",
          "text-contrast": "var(--grey-12)",
        },
        info: {
          base: "var(--info-1)",
          "bg-subtle": "var(--info-2)",
          bg: "var(--info-3)",
          "bg-hover": "var(--info-4)",
          "bg-active": "var(--info-5)",
          line: "var(--info-6)",
          border: "var(--info-7)",
          "border-hover": "var(--info-8)",
          "focus-ring": "var(--info-8)",
          solid: "var(--info-9)",
          "solid-hover": "var(--info-10)",
          text: "var(--info-11)",
          "text-contrast": "var(--info-12)",
        },
        success: {
          base: "var(--success-1)",
          "bg-subtle": "var(--success-2)",
          bg: "var(--success-3)",
          "bg-hover": "var(--success-4)",
          "bg-active": "var(--success-5)",
          line: "var(--success-6)",
          border: "var(--success-7)",
          "border-hover": "var(--success-8)",
          "focus-ring": "var(--success-8)",
          solid: "var(--success-9)",
          "solid-hover": "var(--success-10)",
          text: "var(--success-11)",
          "text-contrast": "var(--success-12)",
        },
        warning: {
          base: "var(--warning-1)",
          "bg-subtle": "var(--warning-2)",
          bg: "var(--warning-3)",
          "bg-hover": "var(--warning-4)",
          "bg-active": "var(--warning-5)",
          line: "var(--warning-6)",
          border: "var(--warning-7)",
          "border-hover": "var(--warning-8)",
          "focus-ring": "var(--warning-8)",
          solid: "var(--warning-9)",
          "solid-hover": "var(--warning-10)",
          text: "var(--warning-11)",
          "text-contrast": "var(--warning-12)",
        },
        error: {
          base: "var(--error-1)",
          "bg-subtle": "var(--error-2)",
          bg: "var(--error-3)",
          "bg-hover": "var(--error-4)",
          "bg-active": "var(--error-5)",
          line: "var(--error-6)",
          border: "var(--error-7)",
          "border-hover": "var(--error-8)",
          "focus-ring": "var(--error-8)",
          solid: "var(--error-9)",
          "solid-hover": "var(--error-10)",
          text: "var(--error-11)",
          "text-contrast": "var(--error-12)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [animate],
};
export default config;`;

export const GLOBALS_CSS = `@import "@radix-ui/colors/red.css";
@import "@radix-ui/colors/red-dark.css";
@import "@radix-ui/colors/mauve.css";
@import "@radix-ui/colors/mauve-dark.css";
@import "@radix-ui/colors/blue.css";
@import "@radix-ui/colors/blue-dark.css";
@import "@radix-ui/colors/grass.css";
@import "@radix-ui/colors/grass-dark.css";
@import "@radix-ui/colors/yellow.css";
@import "@radix-ui/colors/yellow-dark.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
 
:root {
  --radius: 0.25rem;
 
  --primary-1: 240 20% 99%;
  --primary-2: 240 20% 98%;
  --primary-3: 240 11.1% 94.7%;
  --primary-4: 240 9.52% 91.8%;
  --primary-5: 250 10.7% 89%;
  --primary-6: 257 9.86% 86.1%;
  --primary-7: 253 9.89% 82.2%;
  --primary-8: 245 8.66% 75.1%;
  --primary-9: 250 8.57% 13.7%;
  --primary-10: 249 6.19% 22.2%;
  --primary-11: 255 3.88% 40.4%;
  --primary-12: 250 8.57% 13.7%;
 
  --grey-1: var(--mauve-1);
  --grey-2: var(--mauve-2);
  --grey-3: var(--mauve-3);
  --grey-4: var(--mauve-4);
  --grey-5: var(--mauve-5);
  --grey-6: var(--mauve-6);
  --grey-7: var(--mauve-7);
  --grey-8: var(--mauve-8);
  --grey-9: var(--mauve-9);
  --grey-10: var(--mauve-10);
  --grey-11: var(--mauve-11);
  --grey-12: var(--mauve-12);
 
  --info-1: var(--blue-1);
  --info-2: var(--blue-2);
  --info-3: var(--blue-3);
  --info-4: var(--blue-4);
  --info-5: var(--blue-5);
  --info-6: var(--blue-6);
  --info-7: var(--blue-7);
  --info-8: var(--blue-8);
  --info-9: var(--blue-9);
  --info-10: var(--blue-10);
  --info-11: var(--blue-11);
  --info-12: var(--blue-12);
 
  --success-1: var(--grass-1);
  --success-2: var(--grass-2);
  --success-3: var(--grass-3);
  --success-4: var(--grass-4);
  --success-5: var(--grass-5);
  --success-6: var(--grass-6);
  --success-7: var(--grass-7);
  --success-8: var(--grass-8);
  --success-9: var(--grass-9);
  --success-10: var(--grass-10);
  --success-11: var(--grass-11);
  --success-12: var(--grass-12);
 
  --warning-1: var(--yellow-1);
  --warning-2: var(--yellow-2);
  --warning-3: var(--yellow-3);
  --warning-4: var(--yellow-4);
  --warning-5: var(--yellow-5);
  --warning-6: var(--yellow-6);
  --warning-7: var(--yellow-7);
  --warning-8: var(--yellow-8);
  --warning-9: var(--yellow-9);
  --warning-10: var(--yellow-10);
  --warning-11: var(--yellow-11);
  --warning-12: var(--yellow-12);
 
  --error-1: var(--red-1);
  --error-2: var(--red-2);
  --error-3: var(--red-3);
  --error-4: var(--red-4);
  --error-5: var(--red-5);
  --error-6: var(--red-6);
  --error-7: var(--red-7);
  --error-8: var(--red-8);
  --error-9: var(--red-9);
  --error-10: var(--red-10);
  --error-11: var(--red-11);
  --error-12: var(--red-12);
   .dark {
    --primary-1: 260 8.11% 7.25%;
    --primary-2: 260 5.66% 10.4%;
    --primary-3: 255 5.56% 14.1%;
    --primary-4: 260 3.45% 17.1%;
    --primary-5: 264 4.95% 19.8%;
    --primary-6: 270 5% 23.5%;
    --primary-7: 260 4.05% 29%;
    --primary-8: 260 3.03% 38.8%;
    --primary-9: 270 6.25% 93.7%;
    --primary-10: 260 4.11% 71.4%;
    --primary-11: 260 4.11% 71.4%;
    --primary-12: 270 6.25% 93.7%;
 
    --grey-1: var(--mauve-dark-1);
    --grey-2: var(--mauve-dark-2);
    --grey-3: var(--mauve-dark-3);
    --grey-4: var(--mauve-dark-4);
    --grey-5: var(--mauve-dark-5);
    --grey-6: var(--mauve-dark-6);
    --grey-7: var(--mauve-dark-7);
    --grey-8: var(--mauve-dark-8);
    --grey-9: var(--mauve-dark-9);
    --grey-10: var(--mauve-dark-10);
    --grey-11: var(--mauve-dark-11);
    --grey-12: var(--mauve-dark-12);
 
    --info-1: var(--blue-dark-1);
    --info-2: var(--blue-dark-2);
    --info-3: var(--blue-dark-3);
    --info-4: var(--blue-dark-4);
    --info-5: var(--blue-dark-5);
    --info-6: var(--blue-dark-6);
    --info-7: var(--blue-dark-7);
    --info-8: var(--blue-dark-8);
    --info-9: var(--blue-dark-9);
    --info-10: var(--blue-dark-10);
    --info-11: var(--blue-dark-11);
    --info-12: var(--blue-dark-12);
 
    --success-1: var(--grass-dark-1);
    --success-2: var(--grass-dark-2);
    --success-3: var(--grass-dark-3);
    --success-4: var(--grass-dark-4);
    --success-5: var(--grass-dark-5);
    --success-6: var(--grass-dark-6);
    --success-7: var(--grass-dark-7);
    --success-8: var(--grass-dark-8);
    --success-9: var(--grass-dark-9);
    --success-10: var(--grass-dark-10);
    --success-11: var(--grass-dark-11);
    --success-12: var(--grass-dark-12);
 
    --warning-1: var(--yellow-dark-1);
    --warning-2: var(--yellow-dark-2);
    --warning-3: var(--yellow-dark-3);
    --warning-4: var(--yellow-dark-4);
    --warning-5: var(--yellow-dark-5);
    --warning-6: var(--yellow-dark-6);
    --warning-7: var(--yellow-dark-7);
    --warning-8: var(--yellow-dark-8);
    --warning-9: var(--yellow-dark-9);
    --warning-10: var(--yellow-dark-10);
    --warning-11: var(--yellow-dark-11);
    --warning-12: var(--yellow-dark-12);
 
    --error-1: var(--red-dark-1);
    --error-2: var(--red-dark-2);
    --error-3: var(--red-dark-3);
    --error-4: var(--red-dark-4);
    --error-5: var(--red-dark-5);
    --error-6: var(--red-dark-6);
    --error-7: var(--red-dark-7);
    --error-8: var(--red-dark-8);
    --error-9: var(--red-dark-9);
    --error-10: var(--red-dark-10);
    --error-11: var(--red-dark-11);
    --error-12: var(--red-dark-12);
  }
}`;
