import { Link } from 'react-router-dom'
import { useState } from 'react'

import s from './MobileHeader.module.scss'

import logoImg from 'assets/img/logo.svg'
import SideBar from '../SideBar/SideBar'

const MobileHeader = ({ link = '', name = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  return (
    <>
      <header className={s.header}>
        <div className={s.container}>
          <Link to='/'>
            <h1>
              <img className={s.logoImg} src={logoImg} alt='청귤마켓 로고' />
            </h1>
          </Link>
          <button type='button' onClick={() => setIsMenuOpen(true)} className={s.button}>
            <span className='a11y-hidden'>메뉴 버튼</span>
          </button>
        </div>
      </header>
      {isMenuOpen && <SideBar link={link} name={name} closeMenu={closeMenu} />}
    </>
  )
}

export default MobileHeader
