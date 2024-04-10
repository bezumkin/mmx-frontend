import {mergeConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import ai from 'unplugin-auto-import/vite'
import eslint from 'vite-plugin-eslint'
import components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'
import pages from 'vite-plugin-pages'

export function mmxFrontendResolver() {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.startsWith('Mmx')) {
        return {name, from: '@vesp/mmx-frontend'}
      }
    },
  }
}

export default function withMmx(namespace, config = {}) {
  if (!namespace || typeof namespace !== 'string') {
    throw new Error('You should specify a MODX namespace, something like "mmx-extra"')
  }

  return mergeConfig(
    {
      plugins: [
        vue(),
        eslint(),
        ai({
          dts: true,
          include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
          imports: [
            'vue',
            'vue-router',
            {
              '@vesp/mmx-frontend/api': [
                'setNamespace',
                'getNamespace',
                'useLexicon',
                ['useLexicon', '$t'],
                'useApi',
                'useGet',
                'usePost',
                'usePut',
                'usePatch',
                'useDelete',
                'getImageLink',
                'useToastSuccess',
                'useToastInfo',
                'useToastError',
                'useToastsClear',
              ],
            },
            {'@vesp/mmx-frontend': ['createMmx', 'useConfig', 'useError']},
          ],
        }),
        components({
          directoryAsNamespace: true,
          resolvers: [BootstrapVueNextResolver(), mmxFrontendResolver()],
          dirs: ['src/mgr/components', 'src/web/components'],
        }),
        pages({dirs: 'src/mgr/pages'}),
      ],
      server: {
        host: '0.0.0.0',
        port: 9090,
      },
      base: '/assets/components/' + namespace + '/',
      build: {
        manifest: 'manifest.json',
        emptyOutDir: true,
        outDir: './dist',
        rollupOptions: {
          input: {mgr: './src/mgr.ts', web: './src/web.ts'},
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                const match = id.match(/node_modules\/(.*?)\//)
                if (match && match[1]) {
                  return match[1].replace('@', '')
                }
                return 'vendor'
              }
            },
          },
        },
      },
    },
    config,
  )
}
