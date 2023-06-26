import { instance } from 'api'

export const getSearchUserAPI = async keyword => {
  try {
    const res = await instance.get(`/user/searchuser/?keyword=${keyword}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
