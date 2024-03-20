import type { AxiosInstance } from 'axios'
import { axiosBaseConfig } from '../api'

export default abstract class Api {
  private instance: AxiosInstance = axiosBaseConfig

  protected getUrl(url?: string) {
    return `${this.instance.defaults?.baseURL}/${url || ''}`
  }

  protected async post<T>(url: string, data?: unknown, config?: any) {
    return this.instance.post<T>(this.getUrl(url), data, config)
  }

  protected async put<T>(url: string, data?: unknown, config?: any) {
    return this.instance.put<T>(this.getUrl(url), data, config)
  }

  protected async patch<T>(url: string, data?: unknown, config?: any) {
    return this.instance.patch<T>(this.getUrl(url), data, config)
  }

  protected async get<T>(url: string, config?: any) {
    return this.instance.get<T>(this.getUrl(url), config)
  }

  protected async delete<T>(url: string, config?: any) {
    return this.instance.delete<T>(this.getUrl(url), config)
  }
}
