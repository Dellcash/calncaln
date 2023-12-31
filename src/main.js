import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import TheWelcome from './components/TheWelcome.vue'

const app = createApp(App)
// app.component('TheWelcome', TheWelcome);

app.use(createPinia())
app.use(router)

app.mount('#app')
