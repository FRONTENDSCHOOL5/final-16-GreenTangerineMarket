import axios from 'axios'

const postLike = async id => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.mandarin.weniv.co.kr/post/${id}/heart`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    })
    const data = response.data
    console.log(data)
    return data.post.heartCount
  } catch (e) {
    console.error(e)
    return null
  }
}
export default postLike
