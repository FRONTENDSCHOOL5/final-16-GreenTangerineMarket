import { instance } from 'api'

export const getFeedInfoAPI = async id => {
  try {
    const res = await instance.get(`/post/${id}`)
    return res
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getFeedListAPI = async () => {
  try {
    const res = await instance.get('/post')
    return res
  } catch (e) {
    console.error(e)
    return null
  }
}
