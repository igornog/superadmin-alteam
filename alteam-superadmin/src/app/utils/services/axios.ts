import axios from 'axios'
import { environment } from '../../../environments/environment'
import { variables } from '../../../../../../environment'
import { authHeader } from './axios-header'

const currentApiDomain = () => {
  let apiDomain
  switch (window.location.origin) {
    case variables.DEV:
      apiDomain = variables.DEV_API
      break
    case variables.STAGING:
      apiDomain = variables.STAGING_API
      break
    case variables.PRODUCTION:
      apiDomain = variables.PRODUCTION_API
      break
    default:
      apiDomain = variables.LOCAL_API
  }

  return apiDomain
}

const atAxios = axios.create({
  baseURL: environment.production
    ? variables.PRODUCTION_API
    : currentApiDomain(),
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
