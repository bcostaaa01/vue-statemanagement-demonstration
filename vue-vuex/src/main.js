import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './stores/recipes'

createApp(App).use(store).mount('#app')