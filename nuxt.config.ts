export default defineNuxtConfig({
  app: {
    head: {
      title: "Live Padding Oracle",
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Live Padding Oracle' },

        { property: 'og:title', name: 'twitter:title', content: 'Live Padding Oracle' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mas-icon', color: '#1486cc', href: '/safari-pinned-tab.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Source+Code+Pro&display=swap'}
      ],
    },
  },

  css: [
    "~/assets/css/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],

  devtools: {
    enabled: true
  }
})
