import axios from 'axios'

export const postNoLike = async id => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `https://api.mandarin.weniv.co.kr/post/${id}/unheart`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    })
    const data = response.data
    return data.post.heartCount
  } catch (e) {
    console.error(e)
    return null
  }
}
