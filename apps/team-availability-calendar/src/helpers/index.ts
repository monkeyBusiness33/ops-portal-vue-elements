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

/**
 * Returns mission id
 **/
// export const getCalendarId = (): number | null => {
//   if (import.meta.env.DEV && !window.calendar_id) {
//     // 160
//     return null
//   }
//
//   return window.calendar_id
// }

/**
 * Returns boolean value which says if user is admin or not
 **/
// export const getIsAdmin = (): boolean => {
//   if (import.meta.env.DEV) {
//     // boolean
//     return true
//   }
//   return window.is_admin
// }

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
