// @ts-nocheck
import {App} from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import MmxModal from './components/modal.vue'
import MmxTable from './components/table.vue'
import MmxConfirm from './components/confirm.vue'
import MmxInputComboBox from './components/input/combo-box.vue'
import MmxInputAlias from './components/input/alias.vue'
import {createMmxToast} from './toast.ts'
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
        app.use(
          createBootstrap({
            plugins: {
              modalManager: true,
              modalController: true,
              components: {
                global: {
                  activeClass: 'active',
                },
              },
            },
            ...(options.bootstrap || {}),
          }),
        )
        app.component('MmxTable', MmxTable)
        app.component('MmxModal', MmxModal)
        app.component('MmxConfirm', MmxConfirm)
        app.component('MmxInputComboBox', MmxInputComboBox)
        app.component('MmxInputAlias', MmxInputAlias)
      }

      if (options.toast !== false) {
        app.use(createMmxToast(options.toast))
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
