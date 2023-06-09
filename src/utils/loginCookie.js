const { Cookies } = require('react-cookie')

const cookie = new Cookies()

export const setLoginCookie = (value, options) => {
  return cookie.set('LOGIN_COOKIE', value, { ...options })
}

export const getLoginCookie = () => {
  return cookie.get('LOGIN_COOKIE')
}

export const removeLoginCookie = () => {
  return cookie.remove('LOGIN_COOKIE')
}
