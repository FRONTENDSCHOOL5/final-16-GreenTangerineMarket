import { instance } from 'api'

export const getCommentsInFeedAPI = async postId => {
  try {
    const res = await instance.get(`/post/${postId}/comments`)
    return res
  } catch (e) {
    return e
  }
}
export const postCommentsAPI = async ({ id, content }) => {
  try {
    const res = await instance.post(`/post/${id}/comments`, {
      comment: {
        content,
      },
    })
    return res
  } catch (e) {
    return e
  }
}

export const deletePostCommentsAPI = async (postId, commentId) => {
  try {
    const res = await instance.delete(`/post/${postId}/comments/${commentId}`)
    return res
  } catch (e) {
    return e
  }
}

export const reportPostCommentsAPI = async (postId, commentId) => {
  try {
    const res = await instance.post(`/post/${postId}/comments/${commentId}/report`)
    return res
  } catch (e) {
    return e
  }
}
