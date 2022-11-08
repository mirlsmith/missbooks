const { createApp } = Vue

import { router } from './router/router.js'

import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `
        <section>
            <app-header />
            <router-view />
            <user-msg />
            <!-- <app-footer /> -->
        </section>
    `,
    components: {
        appHeader,
        userMsg
        // appFooter,
    }
}

const app = createApp(options)

app.use(router)
app.mount('#app')
