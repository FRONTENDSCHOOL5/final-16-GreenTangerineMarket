import { instance } from 'api'

/** 회원가입 API */
export const signUpAPI = async ({ username, email, password, accountname, intro, image }) => {
  try {
    const res = await instance.post('/user', { user: { username, email, password, accountname, intro, image } })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    return err
  }
}

/** 로그인 API */
export const loginAPI = async ({ email, password }) => {
  try {
    const res = await instance.post('/user/login', { user: { email, password } })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    return err
  }
}

/** 이메일 검증 API */
export const verifyEmailAPI = async ({ email }) => {
  try {
    const res = await instance.post('/user/emailvalid', { user: { email } })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    return err
  }
}

/** 계정 검증 API */
export const verifyAccountNameAPI = async ({ accountname }) => {
  try {
    const res = await instance.post('/user/accountnamevalid', { user: { accountname } })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    return err
  }
}
