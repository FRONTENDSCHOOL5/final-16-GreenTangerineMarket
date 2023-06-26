import axios from 'axios'
import { BASE_URL } from 'constants/BASE_URL'
import { getLoginCookie } from 'utils/loginCookie'

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    'Content-Type': 'application/json',
  },
})

export const imageInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    'Content-Type': 'multipart/form-data',
  },
})
