import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import s from './SignUpForm.module.scss'

import {
  signUpAccountNameErroAtom,
  signUpEmailErroAtom,
  signUpIntroErroAtom,
  signUpPassWordErroAtom,
  signUpUserNameErroAtom,
} from 'recoil/atom/signup'
import basicProfileImg from 'assets/img/basic-profile-img.svg'
import SignInput from 'components/Sign/common/SignInput/SignInput'
import { MediumButton, MediumButtonDisabled } from 'components/Common/Button/Medium/MediumButton'
import { signUpAPI } from 'api/user'
import { PASSWORD_REGEX, USERNAME_REGEX } from 'constants/REGEX'
import ProfileImageInputBox from 'components/Common/InputBox/ProfileImageInputBox/ProfileImageInputBox'

const SignUpForm = () => {
  const formRef = useRef()

  const [profileImage, setProfileImage] = useState(basicProfileImg)
  const [emailError, setEmailError] = useRecoilState(signUpEmailErroAtom)
  const [passwordError, setPasswordError] = useRecoilState(signUpPassWordErroAtom)
  const [accountNameError, setAccountNameError] = useRecoilState(signUpAccountNameErroAtom)
  const [userNameError, setUserNameError] = useRecoilState(signUpUserNameErroAtom)
  const [introError, setIntroError] = useRecoilState(signUpIntroErroAtom)

  const [btnFlag, setBtnFlag] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!emailError.isError && !passwordError.isError && !accountNameError.isError && !userNameError.isError)
      setBtnFlag(true)
    else setBtnFlag(false)
  }, [emailError, passwordError, accountNameError, userNameError])

  const handleSignUpRequest = async () => {
    const { email, password, username, accountname, intro } = formRef.current.elements
    if (!emailError.isError && !passwordError.isError && !accountNameError.isError && !userNameError.isError) {
      const res = await signUpAPI({
        username: username.value,
        email: email.value,
        password: password.value,
        accountname: accountname.value,
        intro: intro.value,
        image: profileImage,
      })

      if (res.response.status === 200) navigate('/signin')
      else {
        email.focus()
        password.focus()
        accountname.focus()
        username.focus()
        username.blur()
      }
    }
  }

  return (
    <form className={s.form} ref={formRef}>
      <ProfileImageInputBox image={profileImage} setImage={setProfileImage} />
      <SignInput name='email' text='이메일' type='email' error={emailError} setError={setEmailError} required={true} />
      <SignInput
        name='password'
        text='비밀번호'
        type='password'
        error={passwordError}
        setError={setPasswordError}
        pattern={PASSWORD_REGEX}
        required={true}
      />
      <SignInput
        name='accountname'
        text='계정 ID'
        type='text'
        error={accountNameError}
        setError={setAccountNameError}
        required={true}
      />
      <SignInput
        name='username'
        text='사용자 이름'
        type='text'
        error={userNameError}
        setError={setUserNameError}
        pattern={USERNAME_REGEX}
      />
      <SignInput name='intro' text='소개 [선택]' type='text' error={introError} setError={setIntroError} />
      {btnFlag ? (
        <MediumButton onClickEvent={handleSignUpRequest}>회원가입</MediumButton>
      ) : (
        <MediumButtonDisabled>회원가입</MediumButtonDisabled>
      )}
      <Link to='/signin' className={s.link}>
        로그인 하러가기
      </Link>
    </form>
  )
}

export default SignUpForm
