/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                accent: "#1A3329",
                highlight: "#336654",
                background: "#12211C",
                button_heighlight: "#0FD18C",
            },
        },
    },
    plugins: [],
};
