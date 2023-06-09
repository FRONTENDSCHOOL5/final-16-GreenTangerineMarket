import { instance } from 'api'

export const setInstanceHeaders = token => {
  instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    return config
  })
}
