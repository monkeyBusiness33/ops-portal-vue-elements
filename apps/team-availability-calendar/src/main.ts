import './assets/main.scss'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import {
  // Directives
  VTooltip,
  // Components
  Tooltip,
  Dropdown,
  Menu
} from 'floating-vue'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()
app.use(vuetify)

app.use(pinia)

// Floating vue
app.directive('Ftooltip', VTooltip)
app.component('VDropdown', Dropdown)
app.component('FVTooltip', Tooltip)
app.component('VMenu', Menu)

app.mount('#staff-calendar-app')
