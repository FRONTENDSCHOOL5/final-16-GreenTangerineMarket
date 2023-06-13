import Header from 'components/Common/Header/Header'
import s from './SignUp.module.scss'

import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignUpForm from 'components/Sign/SignUp/SignUpForm/SignUpForm'

const SignUp = () => {
  return (
    <main className={s.container}>
      <SignMainLogo />
      <SignUpForm link='signin' linkText='로그인' />
    </main>
  )
}

export default SignUp
