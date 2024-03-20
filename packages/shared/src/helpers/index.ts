export const getAxiosBaseUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BASE_URL
  }
  return `${window.location.protocol}//${window.location.host}`
}

/**
 * Returns token based on build mode
 **/
export const getApiToken = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_TOKEN
  }
  return window.api_token
}

/**
 * Returns image URL
 **/
export const getImageUrl = (path: string): string => {
  // Create a new URL object using the path and the base URL of the current module
  const imageUrl = new URL(`/src/${path}`, import.meta.url)

  // Return the absolute URL as a string
  return imageUrl.href
}

export const getIsLocalEnv = () => {
  return import.meta.env.DEV
}
