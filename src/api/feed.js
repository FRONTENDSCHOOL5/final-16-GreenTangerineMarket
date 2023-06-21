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
    const res = await instance.delete(`/post/${id}/report`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const postFeedAPI = async ({ content, image }) => {
  try {
    const res = await instance.post('/post', {
      post: {
        content,
        image,
      },
    })
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
