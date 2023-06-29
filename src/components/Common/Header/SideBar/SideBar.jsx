import { Link } from 'react-router-dom'
import { myInfoAtom } from 'recoil/atom/user'

import s from './SideBar.module.scss'

import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { allowScroll, preventScroll } from 'utils/scroll'

const SideBar = ({ link, name, closeMenu }) => {
  const myInfo = useRecoilValue(myInfoAtom)

  const handleOutSideClick = e => {
    if (e.target.nodeName === 'SECTION') {
      closeMenu()
    }
  }

  useEffect(() => {
    const prevScroll = preventScroll()
    window.addEventListener('click', handleOutSideClick)
    return () => {
      window.removeEventListener('click', handleOutSideClick)
      allowScroll(prevScroll)
    }
  }, [])

  return (
    <section className={s.sidebar}>
      <nav className={s.menu}>
        <p className={s.title}>메뉴</p>
        <ul>
          <li>
            <Link to='/search'>
              <p>계정검색</p>
            </Link>
          </li>
          <li>
            <Link to={`/profile/${myInfo.accountname}`}>
              <p>마이페이지</p>
            </Link>
          </li>
          {link && (
            <li>
              <Link to={link}>
                <p>{name}</p>
              </Link>
            </li>
          )}
        </ul>
        <button type='button' onClick={closeMenu} className={s.close}></button>
      </nav>
    </section>
  )
}

export default SideBar
