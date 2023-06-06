// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: ['vuetify/lib/styles/main.sass'],
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
