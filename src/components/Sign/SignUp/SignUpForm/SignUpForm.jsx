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
import ProfileImageInputBox from 'components/Common/InputBox/ProfileImageInputBox/ProfileImageInputBox'
import TextInputBox from 'components/Common/InputBox/TextInputBox/TextInputBox'
import { PASSWORD_REGEX, ACCOUNTNAME_REGEX } from 'constants/REGEX'
import { signUpAPI } from 'api/user'
import { handlePressEnterKey } from 'utils/handlePressEnterKey'
import { handleUploadImageAPI } from 'utils/handleUploadImage'

const SignUpForm = () => {
  const navigate = useNavigate()

  const formRef = useRef()
  const [emailError, setEmailError] = useRecoilState(signUpEmailErroAtom)
  const [passwordError, setPasswordError] = useRecoilState(signUpPassWordErroAtom)
  const [accountNameError, setAccountNameError] = useRecoilState(signUpAccountNameErroAtom)
  const [userNameError, setUserNameError] = useRecoilState(signUpUserNameErroAtom)
  const [introError, setIntroError] = useRecoilState(signUpIntroErroAtom)

  const [btnFlag, setBtnFlag] = useState(true)
  const [progressingSignUp, setProgressingSignUp] = useState(false)

  const handleSignUpRequest = async () => {
    const { email, password, username, accountname, intro, image } = formRef.current.elements
    setProgressingSignUp(true)

    const imageURL = await handleUploadImageAPI({ files: image.files, inputFileElement: image })
    const resSignUpAPI = await signUpAPI({
      username: username.value,
      email: email.value,
      password: password.value,
      accountname: accountname.value,
      intro: intro.value,
      image: imageURL,
    })

    if (resSignUpAPI.status === 200) {
      setProgressingSignUp(false)
      setBtnFlag(false)
      navigate('/signin')
    }
  }

  useEffect(() => {
    if (!emailError.isError && !passwordError.isError && !accountNameError.isError && !userNameError.isError)
      setBtnFlag(true)
    else setBtnFlag(false)
  }, [emailError, passwordError, accountNameError, userNameError])

  return (
    <form className={s.form} ref={formRef} onKeyDown={e => btnFlag && handlePressEnterKey(e, handleSignUpRequest)}>
      <ProfileImageInputBox />
      <TextInputBox
        name='email'
        text='이메일'
        type='email'
        error={emailError}
        setError={setEmailError}
        required={true}
      />
      <TextInputBox
        name='password'
        text='비밀번호'
        type='password'
        error={passwordError}
        setError={setPasswordError}
        pattern={PASSWORD_REGEX}
        required={true}
      />
      <TextInputBox
        name='accountname'
        text='계정 ID'
        type='text'
        error={accountNameError}
        setError={setAccountNameError}
        pattern={ACCOUNTNAME_REGEX}
        required={true}
      />
      <TextInputBox
        name='username'
        text='사용자 이름'
        type='text'
        error={userNameError}
        setError={setUserNameError}
        required={true}
      />
      <TextInputBox name='intro' text='소개 [선택]' type='text' error={introError} setError={setIntroError} />
      {btnFlag && !progressingSignUp ? (
        <MediumButton onClickEvent={handleSignUpRequest}>회원가입</MediumButton>
      ) : (
        <MediumButtonDisabled>{!progressingSignUp ? '회원가입' : '회원가입 진행 중'}</MediumButtonDisabled>
      )}
      <Link to='/signin' className={s.link}>
        <strong className={s.login}>로그인</strong> 하러가기
      </Link>
    </form>
  )
}

export default SignUpForm
