// @ts-nocheck
import {App} from 'vue'
import Toast from 'vue-toastification'
import MmxModal from './components/modal.vue'
import MmxTable from './components/table.vue'
import MmxConfirm from './components/confirm.vue'
import MmxInputComboBox from './components/input/combo-box.vue'
import MmxInputAlias from './components/input/alias.vue'
import {useLexicon} from './utils/use-lexicon.ts'
import {getImageLink} from './utils/use-api.ts'
import {setNamespace} from './utils/use-namespace.ts'

function createMmx(options: Record<string, any> = {}) {
  setNamespace(options.namespace || 'mmx')

  return {
    install: (app: App) => {
      app.config.globalProperties.$t = useLexicon
      app.config.globalProperties.$image = getImageLink

      if (options.components !== false) {
        app.component('MmxTable', MmxTable)
        app.component('MmxModal', MmxModal)
        app.component('MmxConfirm', MmxConfirm)
        app.component('MmxInputComboBox', MmxInputComboBox)
        app.component('MmxInputAlias', MmxInputAlias)
      }

      if (options.toast !== false) {
        app.use(Toast, {
          position: 'top-right',
          maxToasts: 5,
          timeout: 5000,
          closeButton: false,
          closeOnClick: false,
          transition: 'Vue-Toastification__slideBlurred',
          ...(options.toast || {}),
        })
      }
    },
  }
}

export {createMmx, MmxModal, MmxTable, MmxConfirm, MmxInputComboBox, MmxInputAlias}

declare module 'vue' {
  export interface GlobalComponents {
    MmxModal: typeof MmxModal
    MmxTable: typeof MmxTable
    MmxConfirm: typeof MmxConfirm
    MmxInputComboBox: typeof MmxInputComboBox
    MmxInputAlias: typeof MmxInputAlias
  }
  export interface ComponentCustomProperties {
    $t: typeof useLexicon
    $image: typeof getImageLink
  }
}
