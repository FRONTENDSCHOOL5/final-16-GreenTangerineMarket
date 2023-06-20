import SignLayout from 'components/Common/Layout/Sign/SignLayout'
import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignUpForm from 'components/Sign/SignUp/SignUpForm/SignUpForm'

const SignUp = () => {
  return (
    <SignLayout>
      <SignMainLogo />
      <SignUpForm link='signin' linkText='로그인' />
    </SignLayout>
  )
}

export default SignUp
