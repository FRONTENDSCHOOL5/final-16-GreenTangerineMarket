import s from './Footer.module.scss'

import logoImg from 'assets/img/logo_char.svg'
import gitHub from 'assets/img/icon-github.svg'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div>
        <img src={logoImg} alt='' />
      </div>

      <div className={s.text}>
        본 페이지는 상업적인 목적이 없는 포트폴리오용 사이트입니다
        <br />
        장예지, 임준혁, 이슬아, 정승규 copyright
        <button className={s.contact}>contect us</button>
      </div>

      <button className={s.gitHub}>
        <img src={gitHub} alt='' />
      </button>
    </footer>
  )
}

export default Footer
