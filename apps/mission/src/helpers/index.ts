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

/**
 * Returns mission id
 **/
export const getMissionId = (): number | null => {
  if (import.meta.env.DEV && !window.mission_id) {
    // 160
    return null
  }

  return window.mission_id
}

/**
 * Returns boolean value which says if user is admin or not
 **/
export const getIsAdmin = (): boolean => {
  if (import.meta.env.DEV) {
    // boolean
    return true
  }
  return window.is_admin
}

export const getIsLocalEnv = () => {
  return import.meta.env.DEV
}


export const getHost = () => {
  return import.meta.env.VITE_PRIVATE_KEY
    ? import.meta.env.VITE_BASE_URL
    : window.location.protocol + '//' + window.location.host
}

/**
 * Function to redirect to mission details page
 **/
export const redirectToURL = (missionDataId: number) => {
  let url = ''
  getIsLocalEnv() ? (url = '/ops/missions/0/') : (url = window.redirect_uri)
  if (missionDataId && url) {
    const redirectUrl = url.replace(/\d/, String(missionDataId))
    window.location.href = redirectUrl
  }
}
