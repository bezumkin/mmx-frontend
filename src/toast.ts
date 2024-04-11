import {type App} from 'vue'
import Toast from 'vue-toastification'

export {useToastSuccess, useToastInfo, useToastError, useToastsClear} from './utils/use-toast.ts'

export function createMmxToast(options: Record<string, any> = {}) {
  return {
    install: (app: App) => {
      app.use(Toast, {
        position: 'top-right',
        maxToasts: 5,
        timeout: 5000,
        closeButton: false,
        closeOnClick: false,
        transition: 'Vue-Toastification__slideBlurred',
        ...options,
      })
    },
  }
}
