// @ts-nocheck
import {App} from 'vue'
import Toast, {POSITION} from 'vue-toastification'
import MmxModal from './components/modal.vue'
import MmxTable from './components/table.vue'
import MmxConfirm from './components/confirm.vue'
import MmxInputComboBox from './components/input/combo-box.vue'
import {useLexicon} from './utils/use-lexicon.ts'
import {getImageLink} from './utils/use-api.ts'

function createMmx(options: Record<string, any> = {}) {
  const namespace = options.namespace || 'mmx'
  const ToastOptions = {
    position: POSITION.TOP_RIGHT,
    maxToasts: 5,
    timeout: 5000,
    closeButton: false,
    closeOnClick: false,
    transition: 'Vue-Toastification__slideBlurred',
    ...(options.toast || {}),
  }

  return {
    install: (app: App) => {
      app.config.globalProperties.namespace = namespace
      app.config.globalProperties.baseURL = `/${namespace}/`
      app.config.globalProperties.$t = useLexicon
      app.config.globalProperties.$image = getImageLink

      app.component('MmxTable', MmxTable)
      app.component('MmxModal', MmxModal)
      app.component('MmxConfirm', MmxConfirm)
      app.component('MmxInputComboBox', MmxInputComboBox)

      app.use(Toast, ToastOptions)
    },
  }
}

export {createMmx, MmxModal, MmxTable, MmxConfirm, MmxInputComboBox}

declare module 'vue' {
  export interface GlobalComponents {
    MmxModal: typeof MmxModal
    MmxTable: typeof MmxTable
    MmxConfirm: typeof MmxConfirm
    MmxInputComboBox: typeof MmxInputComboBox
  }
  export interface ComponentCustomProperties {
    $t: typeof useLexicon
    $image: typeof getImageLink
  }
}
