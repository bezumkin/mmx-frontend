import {ofetch, type FetchContext, type FetchOptions} from 'ofetch'
import {getCurrentInstance} from 'vue'
import {useToastError} from './use-toast'
import {useLexicon} from './use-lexicon'

let namespace: string

export function useApi(endpoint: string, options: FetchOptions<any> = {}) {
  if (!namespace) {
    namespace = getCurrentInstance()?.appContext?.config.globalProperties.namespace || 'mmx'
  }

  return ofetch(endpoint, {
    baseURL: `/${namespace}/`,
    onResponseError({response}: FetchContext): void {
      if (response?._data) {
        useToastError(useLexicon(response._data))
      }
    },
    ...options,
  })
}

export function useGet(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  return useApi(endpoint, {...options, query: params, method: 'GET'})
}

export function usePost(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  return useApi(endpoint, {...options, body: params, method: 'POST'})
}

export function usePut(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  return useApi(endpoint, {...options, body: params, method: 'PUT'})
}

export function usePatch(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  return useApi(endpoint, {...options, body: params, method: 'PATCH'})
}

export function useDelete(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  return useApi(endpoint, {...options, query: params, method: 'DELETE'})
}
