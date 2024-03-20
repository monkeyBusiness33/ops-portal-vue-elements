import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import './assets/main.scss'
import VueSweetalert2 from 'vue-sweetalert2'
import { Notyf } from 'notyf'
import {
  // Directives
  // Components
  Dropdown,
  Menu
} from 'floating-vue'

const APP_NODE_SELECTOR = '#plane-app'
const APP_NODE_SELECTOR_TIMING = '#mission-amend-timings-modal'
const APP_NODE_SELECTOR_SERVICING = '#mission-ground-servicing-modal'
const MODAL_NODE_SELECTOR_GROUND_SERVICING = '#modal-xxl'
const MODAL_NODE_SELECTOR_AMEND_TIMING = '#modal'

const registerApp = () => {
  const app = createApp(App)
  app.use(createPinia())

  // Floating vue
  app.component('VDropdown', Dropdown)
  app.component('VMenu', Menu)

  // add global instance for Swal
  app.use(VueSweetalert2)

  // Use plugin with optional defaults
  window.Swal = app.config.globalProperties.$swal
  window.notyf = new Notyf({
    position: {
      x: 'right',
      y: 'bottom'
    },
    dismissible: true
  })

  return app
}

const registerMutationGroundServicingObserver = () => {
  const parentNode = document.querySelector(MODAL_NODE_SELECTOR_GROUND_SERVICING)

  if (!parentNode) {
    return
  }

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.attributeName === 'class' &&
        (mutation.target as HTMLElement).classList.contains('show')
      ) {
        const mountNode = parentNode.querySelector(APP_NODE_SELECTOR_SERVICING)

        if (mountNode && !mountNode.innerHTML.length) {
          initializeServicingApp()
        }
      }
    })
  })

  if (parentNode) {
    mutationObserver.observe(parentNode, {
      attributes: true
    })
  }
}

const registerMutationAmendTimingObserver = () => {
  const parentNode = document.querySelector(MODAL_NODE_SELECTOR_AMEND_TIMING)

  if (!parentNode) {
    return
  }

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.attributeName === 'class' &&
        (mutation.target as HTMLElement).classList.contains('show')
      ) {
        const mountNode = parentNode.querySelector(APP_NODE_SELECTOR_TIMING)

        if (mountNode && !mountNode.innerHTML.length) {
          initializeTimingApp()
        }
      }
    })
  })

  if (parentNode) {
    mutationObserver.observe(parentNode, {
      attributes: true
    })
  }
}

const initializeTimingApp = () => {
  const app = registerApp()
  app.mount(APP_NODE_SELECTOR_TIMING)
}

const initializeServicingApp = () => {
  const app = registerApp()
  app.mount(APP_NODE_SELECTOR_SERVICING)
}

const initializeApp = () => {
  const app = registerApp()
  app.mount(APP_NODE_SELECTOR)
}

registerMutationAmendTimingObserver()
registerMutationGroundServicingObserver()

initializeApp()
initializeServicingApp()
initializeTimingApp()
