import { heroui, lightLayout } from "@heroui/theme"
import { plugin } from "postcss"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      aspectRatio: {
        "1/1": "1",
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            // primary: "var(--color-primary)",
            // secondary: "var(--color-secondary)",
            // accent: "var(--color-accent)",
            // neutral: "var(--color-neutral)",
            // "neutral-focus": "var(--color-neutral-focus)",
            // "neutral-content": "var(--color-neutral-content)",
            // "base-100": "var(--color-base-100)",
            // "base-200": "var(--color-base-200)",
            // "base-300": "var(--color-base-300)",
            // "base-content": "var(--color-base-content)",
            // info: "var(--color-info)",
            // success: "var(--color-success)",
            // warning: "var(--color-warning)",
            // error: "var(--color-error)",
          },
        },
        dark: {
          colors: {
            primary: "#b52de6",
            secondary: "#c11344",
            // accent: "var(--color-accent)",
            // neutral: "var(--color-neutral)",
            // "neutral-focus": "var(--color-neutral-focus)",
            // "neutral-content": "var(--color-neutral-content)",
            // "base-100": "var(--color-base-100)",
            // "base-200": "var(--color-base-200)",
            // "base-300": "var(--color-base-300)",
            // "base-content": "var(--color-base-content)",
            // info: "var(--color-info)",
            // success: "var(--color-success)",
            // warning: "var(--color-warning)",
            // error: "var(--color-error)",
          },
        },
      }
    })],
}
