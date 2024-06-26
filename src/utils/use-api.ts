import {type FetchContext, type FetchOptions, ofetch} from 'ofetch'
import {MmxFile, MmxFileOptions} from '../types.ts'
import {getNamespace} from './use-namespace.ts'
import {useToastError} from './use-toast'
import {useLexicon} from './use-lexicon'

export function getImageLink(file: MmxFile | Record<string, any>, options?: MmxFileOptions, prefix?: string): string {
  const params = [getNamespace(), prefix || 'image', file.uuid || file.id]
  if (file.updated_at) {
    if (!options) {
      options = {}
    }
    if (!options.fm) {
      options.fm = 'webp'
    }
    options.t = file.updated_at.split('.').shift()?.replaceAll(/\D/g, '')
  }
  return '/' + params.join('/') + '?' + new URLSearchParams(options as Record<string, string>).toString()
}

export function useApi(endpoint: string, options: FetchOptions<any> = {}) {
  return ofetch(endpoint, {
    baseURL: '/' + getNamespace() + '/',
    onResponseError({response}: FetchContext): void {
      if (response?._data) {
        useToastError(useLexicon(response._data))
      }
    },
    ...options,
  })
}

export function useGet(endpoint: string, params = {}, options: FetchOptions<any> = {}) {
  const query: Record<string, any> = {}
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      query[`${key}[]`] = value
    } else {
      query[key] = value
    }
  })
  return useApi(endpoint, {...options, query, method: 'GET'})
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
