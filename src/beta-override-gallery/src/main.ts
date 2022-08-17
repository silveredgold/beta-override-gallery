import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
import './assets/main.css'
import { extensionInfoPlugin } from './ExtensionInfoPlugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(extensionInfoPlugin)

app.mount('#app')
