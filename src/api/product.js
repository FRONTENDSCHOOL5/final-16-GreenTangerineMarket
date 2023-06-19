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

export const getNextProductAPI = async num => {
  try {
    const res = await instance.get(`/product/?limit=10&skip=${num}`)
    return res
  } catch (e) {
    console.error(e)
    throw e
  }
}
