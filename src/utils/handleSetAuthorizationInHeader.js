import { instance } from 'api'
import { getLoginCookie } from './loginCookie'

export const handleSetAuthorizationInHeader = () => {
  instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getLoginCookie()}`
    return config
  })
}
