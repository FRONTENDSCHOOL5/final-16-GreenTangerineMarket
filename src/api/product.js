import { instance } from 'api'

export const getProductListAPI = async () => {
  try {
    const res = await instance.get('/product')
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
