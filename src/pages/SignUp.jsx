import PlainLayout from 'components/Common/Layout/Plain/PlainLayout'
import SignMainLogo from 'components/Sign/common/SignMainLogo/SignMainLogo'
import SignUpForm from 'components/Sign/SignUp/SignUpForm/SignUpForm'

const SignUp = () => {
  return (
    <PlainLayout>
      <SignMainLogo />
      <SignUpForm link='signin' linkText='로그인' />
    </PlainLayout>
  )
}

export default SignUp
