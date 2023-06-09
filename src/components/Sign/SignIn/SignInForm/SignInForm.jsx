import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import s from './SignInForm.module.scss'

import TextInputBox from 'components/Common/InputBox/TextInputBox/TextInputBox'
import { loginAPI } from 'api/user'
import { EMAIL_REGEX } from 'constants/REGEX'
import { userInfoAtom } from 'recoil/atom/user'
import { setLoginCookie } from 'utils/loginCookie'
import { setInstanceHeaders } from 'utils/setInstanceHeaders'
import { MediumButton } from 'components/Common/Button/Medium/MediumButton'

const SignInForm = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const setUserInfo = useSetRecoilState(userInfoAtom)

  const [emailError, setEmailError] = useState({
    isError: undefined,
    errorMessage: '',
  })
  const [passwordError, setPasswordError] = useState({
    isError: undefined,
    errorMessage: '',
  })

  const handleLoginRequest = async () => {
    const email = formRef.current.elements.email.value
    const password = formRef.current.elements.password.value

    const handleSetEmailError = (isError, errorMessage) => setEmailError({ isError, errorMessage })
    const handleSetPasswordError = (isError, errorMessage) => setPasswordError({ isError, errorMessage })

    // email value null
    if (email === '') {
      handleSetEmailError(true, '이메일을 입력해주세요')
      password === '' ? handleSetPasswordError(true, '비밀번호를 입력해주세요') : handleSetPasswordError(false)
    } // password value null
    else if (password === '') {
      handleSetPasswordError(true, '비밀번호를 입력해주세요')
      EMAIL_REGEX.test(email) ? handleSetEmailError(false) : handleSetEmailError(true, '이메일을 형식이 맞지 않습니다')
    } // email vaildtaion fail
    else if (email !== '' && !EMAIL_REGEX.test(email)) {
      handleSetEmailError(true, '이메일을 형식이 맞지 않습니다')
      password === '' ? handleSetPasswordError(true, '비밀번호를 입력해주세요') : handleSetPasswordError(false)
    } // email validation success
    else if (EMAIL_REGEX.test(email)) {
      const res = await loginAPI(email, password)
      // email or password is not correct
      if (res.data.status === 422) {
        handleSetEmailError(false)
        handleSetPasswordError(true, res.data.message)
      } // login success
      else {
        console.log('login success')
        const { _id, email, username, accountname, intro, token, refreshToken, image } = res.data.user
        setUserInfo({ _id, email, username, accountname, intro, image })
        setLoginCookie(token, { path: '/' })
        setInstanceHeaders(token)
        navigate('/')
      }
    }
  }

  return (
    <form className={s.form} ref={formRef}>
      <TextInputBox name='email' text='이메일' type='email' error={emailError} />
      <TextInputBox name='password' text='비밀번호' type='password' error={passwordError} />
      <MediumButton onClickEvent={handleLoginRequest}>로그인</MediumButton>
      <Link to='/signup' className={s.link}>
        회원가입 하러가기
      </Link>
    </form>
  )
}

export default SignInForm
