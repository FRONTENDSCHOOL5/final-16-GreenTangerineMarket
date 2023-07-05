import { instance } from 'api'

export const getProfileInfoAPI = async accountname => {
  try {
    const res = await instance.get(`/profile/${accountname}`)
    return res
  } catch (e) {
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

export const editMyProfileInfoAPI = async ({ username, accountname, intro, image }) => {
  try {
    const res = await instance.put('/user', { user: { username, accountname, intro, image } })
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

export const getFollowListAPI = async ({ accountname, item, page }) => {
  try {
    const res = await instance.get(`/profile/${accountname}/${item}?limit=10&skip=${page}`)
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
