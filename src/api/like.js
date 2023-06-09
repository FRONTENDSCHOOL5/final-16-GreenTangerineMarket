import { instance } from 'api'

export const likeAPI = async id => {
  try {
    const res = await instance.post(`/post/${id}/heart`)
    return res.data.post.heartCount
  } catch (e) {
    console.error(e)
    return null
  }
}

export const dislikeAPI = async id => {
  try {
    const res = await instance.post(`/post/${id}/unheart`)
    return res.data.post.heartCount
  } catch (e) {
    console.error(e)
    return null
  }
}
