import axios from 'axios'
import { environment } from '../../../environments/environment'
import { authHeader } from './axios-header'

const atAxios = axios.create({
  baseURL: environment.production
    ? 'https://dev.api.alteam.io'
    : 'http://localhost:8080/',
  responseType: 'json',
})

atAxios.interceptors.request.use(
  async function (config: any) {
    config.headers = { ...config.headers, ...authHeader() }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

atAxios.interceptors.response.use(
  async function (response) {
    return Promise.resolve(response)
  },
  async function (error) {
    if (error?.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)

export default atAxios
