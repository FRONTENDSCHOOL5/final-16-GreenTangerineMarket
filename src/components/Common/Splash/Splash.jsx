import s from './Splash.module.scss'

import logo from 'assets/img/logo.svg'
import charLogo from 'assets/img/logo_char.png'

const Splash = () => {
  return (
    <dialog className={s.container} open>
      <div className={s.logoWrapper}>
        <h1 className='a11y-hidden'>청귤마켓 로고</h1>
        <img className={s.logo} src={logo} alt='청귤마켓 메인 로고' />
        <img className={s.charLogo} src={charLogo} alt='청귤마켓 글자 로고' />
      </div>
      <p className={s.explain}>청귤마켓은 회원만을 위한 비공개 쇼핑몰입니다</p>
    </dialog>
  )
}

export default Splash
