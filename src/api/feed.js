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

export const getFeedListAPI = async () => {
  try {
    const res = await instance.get('/post')
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getNextFeedAPI = async num => {
  try {
    const res = await instance.get(`/post/?limit=10&skip=${num}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const reportFeedAPI = async id => {
  try {
    const res = await instance.post(`/post/${id}/report`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const postFeedAPI = async () => {
  try {
    const res = await instance.post(`/post`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const deletePostAPI = async ({ post_id }) => {
  try {
    const res = await instance.delete(`/post/${post_id}`)
    return res
  } catch (e) {
    return e
  }
}

export const getUserFeedList = async ({ num, accountname }) => {
  try {
    const res = await instance.get(`/post/${accountname}/userpost/?limit=10&skip=${num}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
