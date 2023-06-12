import { useEffect, useState } from 'react'

import s from './SignIn.module.scss'

import Splash from 'components/Common/Splash/Splash'
import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignInForm from 'components/Sign/SignIn/SignInForm/SignInForm'

const SignIn = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 3000)
  }, [])

  return (
    <>
      {showSplash && <Splash />}
      <main className={s.container}>
        <SignMainLogo />
        <SignInForm />
      </main>
    </>
  )
}

export default SignIn
