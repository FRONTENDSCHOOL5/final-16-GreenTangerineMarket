import s from './SignMainLogo.module.scss'

import logo from 'assets/img/logo_char.png'

const SignMainLogo = () => {
  return (
    <h1 className={s.title}>
      <div className='a11y-hidden'>청귤마켓 로고</div>
      <img src={logo} alt='청귤마켓 로고' />
    </h1>
  )
}

export default SignMainLogo
