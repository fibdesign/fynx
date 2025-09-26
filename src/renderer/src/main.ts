import 'fib-maxup/css/index.css'
import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './layouts/App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
