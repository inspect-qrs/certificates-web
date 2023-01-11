import { useAuthStore } from '@/config/store/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

interface ApiConfig {
  url: string
}

export abstract class AppServices {
  _fullUrl: string

  constructor (config: ApiConfig) {
    this._fullUrl = `${API_BASE_URL}/${config.url}`
    this.setHeader()
  }

  setHeader (): void {
    const token = useAuthStore.getState().token
    if (token) { axios.defaults.headers.common.Authorization = `Bearer ${token}` }
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  }

  removeHeader (): void {
    axios.defaults.headers.common = {}
  }

  async get <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.get(this._fullUrl + url, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  async post <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.post(this._fullUrl + url, data, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  async patch <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.patch(this._fullUrl + url, data, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  async delete <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.delete(this._fullUrl + url, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }
}
