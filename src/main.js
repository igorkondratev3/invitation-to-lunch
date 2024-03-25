import './assets/styles/index.css'
import { vMaska } from 'maska'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.directive('maska', vMaska)

app.mount('#app')
