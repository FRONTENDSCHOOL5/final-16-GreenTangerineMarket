import s from './SignMainLogo.module.scss'

import logo from 'assets/img/logo_char.svg'

const SignMainLogo = () => {
  return (
    <h1 className={s.title}>
      <img src={logo} alt='청귤마켓 로고' />
    </h1>
  )
}

export default SignMainLogo
