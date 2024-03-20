import axios from 'axios'
import { getApiToken, getAxiosBaseUrl, getIsLocalEnv } from '../helpers'
import { getCSRFToken } from '../helpers/cookie'

export const axiosBaseConfig = axios.create({
  baseURL: getAxiosBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: getIsLocalEnv() ? `Bearer ${getApiToken()}` : undefined
  }
})

axiosBaseConfig.interceptors.request.use((config) => {
  config.headers['X-CSRFToken'] = getCSRFToken()
  return config
})
