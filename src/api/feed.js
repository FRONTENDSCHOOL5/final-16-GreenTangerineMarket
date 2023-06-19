import { instance } from 'api'

export const getFeedInfoAPI = async id => {
  try {
    const res = await instance.get(`/post/${id}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
export const reportFeedAPI = async id => {
  try {
    const res = await instance.delete(`/post/${id}/report`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
