import { useEffect, useState } from 'react'

import Splash from 'components/Common/Splash/Splash'
import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignInForm from 'components/Sign/SignIn/SignInForm/SignInForm'
import SignLayout from 'components/Common/Layout/Sign/SignLayout'

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
      <SignLayout>
        <SignMainLogo />
        <SignInForm />
      </SignLayout>
    </>
  )
}

export default SignIn
