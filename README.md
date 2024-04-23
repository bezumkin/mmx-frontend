MMX Frontend
---

> This is a part of **MMX** initiative - the **M**odern **M**OD**X** approach.

The port of Vesp frontend designed for quick development of modern UI in MODX manager.

### Install

```bash
npm i @vesp/mmx-frontend
```

### How to use

First you need to import and use default config in your `vite.config.ts` with mandatory **namespace** parameter:
```js
import withMmx from '@vesp/mmx-frontend/config'

// Optional Vite parameters to merge with default config
const config = {}
export default withMmx('mmx-extra', config)
```

More advanced example with including your local directories to autoimport:
```js
import withMmx, {aiConfig} from '@vesp/mmx-frontend/config'

const config = {
  plugins: [
    ai({
      // Default autoimport config with mmx functions
      ...aiConfig,
      // Your local autoimport
      dirs: ['src/mgr/utils'],
    }),
  ]
}
export default withMmx('mmx-extra', config)
```

Then you can import and use `createMmx` function in you `mgr.js` file:
```js
import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import {createMmx} from '@vesp/mmx-frontend'
import App from './mgr/app.vue'
import routes from '~pages'
import './mgr/scss/index.scss'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

document.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(router)
    .use(createMmx({namespace: 'mmx-extra'}))
    .mount('#mmx-extra-root')
})
```