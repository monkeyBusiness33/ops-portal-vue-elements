import type { Ref, UnwrapRef } from 'vue'
import { AxiosError } from 'axios'
import { ref } from 'vue'

interface FetchReturnType<T, F extends (...args: any[]) => void> {
  data: Ref<T> | Ref<UnwrapRef<T>>
  loading: Ref<boolean>
  error: Ref<AxiosError | null>
  callFetch: (...args: Parameters<F>) => Promise<ReturnType<F>>
}

type DefaultFunction = (...args: any[]) => any

export function useFetch<T, F extends DefaultFunction>(
  fetchCallback: F
): FetchReturnType<T | undefined, F>
export function useFetch<T, F extends DefaultFunction>(
  fetchCallback: F,
  initialValue: T
): FetchReturnType<T, F>
export function useFetch<T, F extends DefaultFunction>(
  fetchCallback: F,
  initialValue?: T
): FetchReturnType<T | undefined, F> {
  const data = ref<T | undefined>(initialValue)
  const error = ref<AxiosError | null>(null)
  const loading = ref<boolean>(false)

  const callFetch = async (...args: Parameters<F>) => {
    loading.value = true

    try {
      const res = await fetchCallback(...args)
      data.value = res
      return res
    } catch (e: unknown) {
      error.value = e as AxiosError
      throw e
    } finally {
      loading.value = false
    }
  }

  return { callFetch, loading, data, error }
}
