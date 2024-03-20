export function useDebounceFunction() {
  let timeout: ReturnType<typeof setTimeout>
  return function (cb: (...args: any) => void, delayMs?: number) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb()
    }, delayMs || 500)
  }
}
