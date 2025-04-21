import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // make sure router/index.js exists

createApp(App).use(router).mount('#app')