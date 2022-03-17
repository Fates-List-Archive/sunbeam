module.exports = {
    mode: 'jit',
    corePlugins: {
      preflight: false,
    },
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              color: "white !important",
              p: {
                color: "white !important",
                "margin-top": 0,
              },
              pre: {
                color: "white !important"
              },
              code: {
                color: "white !important"
              },
              strong: {
                color: "white !important"
              },
              a: {
                "font-size": "initial !important"
              },
              'code::before': {
                content: "",
              },
              'code::after': {
                content: "",
              },
              // Force disable for p
              'p::before': {
                content: "'' !important",
              },
              'p::after': {
                content: "'' !important",
              },
            }
          }
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography')
    ],
}
