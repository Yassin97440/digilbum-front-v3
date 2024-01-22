// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
    ],
    vuetify: {
        moduleOptions: {
            styles: true,
            autoImport: true,
        }
    }
})
