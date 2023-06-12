import axios from 'axios'
import { getLoginCookie } from 'utils/loginCookie'

export const instance = axios.create({
  baseURL: 'https://api.mandarin.weniv.co.kr',
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    'Content-Type': 'application/json',
  },
})
