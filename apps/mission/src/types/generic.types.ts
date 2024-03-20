export type Nullable<T> = {
  [K in keyof T]: T[K] extends object ? Nullable<T[K]> | null : T[K] | null
}
