import {RouteLocationRaw, useRouter} from 'vue-router'

export function useError(route?: RouteLocationRaw) {
  const router = useRouter()
  if (router) {
    router.push(route || '/')
  }
}
