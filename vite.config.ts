// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  build: {
    lib: {
      entry: ['./src/index.ts', './src/api.ts', './src/toast.ts', './src/lexicon.ts', './src/namespace.ts'],
      name: 'MmxFrontend',
      fileName(type, file) {
        return file + '.' + type + '.js'
      },
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'bootstrap-vue-next',
        'ofetch',
        'vite-plugin-pages',
        'vue-toastification',
        '@vueuse/core',
      ],
    },
  },
})
