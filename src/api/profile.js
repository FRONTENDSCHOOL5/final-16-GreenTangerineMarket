import { instance } from 'api'

export const getProfileInfoAPI = async accountname => {
  try {
    const res = await instance.get(`/profile/${accountname}`)
    return res.data.profile
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getMyProfileInfoAPI = async () => {
  try {
    const res = await instance.get('/user/myinfo')
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const followProfileAPI = async accountname => {
  try {
    const res = await instance.post(`/profile/${accountname}/follow`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}

export const unfollowProfileAPI = async accountname => {
  try {
    const res = await instance.delete(`/profile/${accountname}/unfollow`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
