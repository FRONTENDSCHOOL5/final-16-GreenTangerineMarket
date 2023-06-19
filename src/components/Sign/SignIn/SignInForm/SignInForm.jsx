import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import s from './SignInForm.module.scss'

import { loginAPI } from 'api/user'
import { PASSWORD_REGEX } from 'constants/REGEX'
import { setLoginCookie } from 'utils/loginCookie'
import { MediumButton, MediumButtonDisabled } from 'components/Common/Button/Medium/MediumButton'
import SignInput from 'components/Sign/common/SignInput/SignInput'
import { signInEmailErroAtom, signInPassWordErroAtom } from 'recoil/atom/signin'
import { myInfoAtom } from 'recoil/atom/user'

const SignInForm = () => {
  const navigate = useNavigate()
  const formRef = useRef()

  const [emailError, setEmailError] = useRecoilState(signInEmailErroAtom)
  const [passwordError, setPasswordError] = useRecoilState(signInPassWordErroAtom)
  const [btnFlag, setBtnFlag] = useState(false)
  const setMyInfoAtom = useSetRecoilState(myInfoAtom)

  const handleSignInRequest = async () => {
    const { email, password } = formRef.current.elements

    const res = await loginAPI({ email: email.value, password: password.value })
    if (res.data.status === 422)
      setPasswordError({ isError: true, errorMessage: '이메일 또는 비밀번호가 일치하지 않습니다.' })
    else {
      const { _id, email, username, accountname, intro, token, refreshToken, image } = res.data.user
      setMyInfoAtom({ accountname })
      setLoginCookie(token, { path: '/' })
      navigate('/')
    }
  }

  useEffect(() => {
    if (!emailError.isError && !passwordError.isError) setBtnFlag(true)
    else setBtnFlag(false)
  }, [emailError, passwordError])

  return (
    <form className={s.form} ref={formRef}>
      <SignInput
        name='email'
        text='이메일'
        type='email'
        initialValue=''
        error={emailError}
        setError={setEmailError}
        required={true}
      />
      <SignInput
        name='password'
        text='비밀번호'
        type='password'
        initialValue=''
        pattern={PASSWORD_REGEX}
        error={passwordError}
        setError={setPasswordError}
        required={true}
      />
      {btnFlag ? (
        <MediumButton onClickEvent={handleSignInRequest}>로그인</MediumButton>
      ) : (
        <MediumButtonDisabled>로그인</MediumButtonDisabled>
      )}
      <Link to='/signup' className={s.link}>
        회원가입 하러가기
      </Link>
    </form>
  )
}

export default SignInForm
