import { Notyf } from 'notyf'
import 'notyf/notyf.min.css' // for React, Vue and Svelte
export const toast = (text: string, type: 'success' | 'error') => {
  return window.Swal.fire({
    toast: true,
    title: text,
    timer: 1500,
    showConfirmButton: false,
    position: 'top-end',
    icon: type
  })
}

export const notify = (text: string, type: 'success' | 'error') => {
  return window.notyf[type](text)
}
