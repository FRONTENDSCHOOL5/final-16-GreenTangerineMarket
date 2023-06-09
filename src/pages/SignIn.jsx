import s from './SignIn.module.scss'

import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignInForm from 'components/Sign/SignIn/SignInForm/SignInForm'

const SignIn = () => {
  return (
    <main className={s.container}>
      <SignMainLogo />
      <SignInForm />
    </main>
  )
}

export default SignIn
