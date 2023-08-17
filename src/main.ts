
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import './styles/reset.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
