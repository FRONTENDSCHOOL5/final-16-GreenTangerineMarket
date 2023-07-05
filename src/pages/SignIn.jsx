import { useEffect, useState } from 'react'

import Splash from 'components/Common/Splash/Splash'
import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignInForm from 'components/Sign/SignIn/SignInForm/SignInForm'
import PlainLayout from 'components/Common/Layout/Plain/PlainLayout'
const SignIn = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 3000)
  }, [])

  return (
    <>
      {showSplash ? (
        <Splash />
      ) : (
        <PlainLayout>
          <SignMainLogo />
          <SignInForm />
        </PlainLayout>
      )}
    </>
  )
}

export default SignIn
