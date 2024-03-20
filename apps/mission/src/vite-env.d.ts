/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_MISSION_ID: string
  readonly VITE_API_TOKEN: string
  readonly VITE_PRIVATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
