import { instance } from 'api'

export const setInstanceHeaders = token => {
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}
