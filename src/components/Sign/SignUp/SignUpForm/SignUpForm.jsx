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
import { MediumButton, MediumButtonDisabled } from 'components/Common/Button/Medium/MediumButton'
import SignInput from 'components/Sign/common/SignInput/SignInput'
import ProfileImageInputBox from 'components/Common/InputBox/ProfileImageInputBox/ProfileImageInputBox'
import { PASSWORD_REGEX, ACCOUNTNAME_REGEX } from 'constants/REGEX'
import basicProfileImg from 'assets/img/basic-profile-img.svg'
import { signUpAPI } from 'api/user'

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

  const handleSignUpRequest = async () => {
    const { email, password, username, accountname, intro } = formRef.current.elements
    const res = await signUpAPI({
      username: username.value,
      email: email.value,
      password: password.value,
      accountname: accountname.value,
      intro: intro.value,
      image: profileImage,
    })

    if (res.status === 200) navigate('/signin')
  }

  useEffect(() => {
    if (!emailError.isError && !passwordError.isError && !accountNameError.isError && !userNameError.isError)
      setBtnFlag(true)
    else setBtnFlag(false)
  }, [emailError, passwordError, accountNameError, userNameError])

  return (
    <form className={s.form} ref={formRef}>
      <ProfileImageInputBox image={profileImage} setImage={setProfileImage} />
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
        error={passwordError}
        setError={setPasswordError}
        pattern={PASSWORD_REGEX}
        required={true}
      />
      <SignInput
        name='accountname'
        text='계정 ID'
        type='text'
        initialValue=''
        error={accountNameError}
        setError={setAccountNameError}
        pattern={ACCOUNTNAME_REGEX}
        required={true}
      />
      <SignInput
        name='username'
        text='사용자 이름'
        type='text'
        initialValue=''
        error={userNameError}
        setError={setUserNameError}
        required={true}
      />
      <SignInput
        name='intro'
        text='소개 [선택]'
        type='text'
        initialValue=''
        error={introError}
        setError={setIntroError}
      />
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
