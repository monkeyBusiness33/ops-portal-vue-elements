import type { App } from 'vue'

export {}

declare global {
  interface Window {
    api_token: string
    Swal: any
    notyf: any
    is_admin: boolean
    redirect_uri: string
    vue_elements_mode: string
    app: App | undefined
  }
}
