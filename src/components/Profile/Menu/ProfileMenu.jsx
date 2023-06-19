import { useCallback, useEffect, useRef, useState } from 'react'
import s from './ProfileMenu.module.scss'
import { useNavigate } from 'react-router'
import { removeLoginCookie } from 'utils/loginCookie'

const ProfileMenu = () => {
  const listRef = useRef()
  const menuRef = useRef()
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleCreateFeed = () => {
    navigate('/feed/create')
  }

  const handleRegisterProduct = () => {
    navigate('/product/register')
  }
  const handleLogout = () => {
    localStorage.removeItem('recoil-persist')
    removeLoginCookie({ path: '/' })
    navigate('/signin')
  }
  useEffect(() => {
    const handleClick = e => {
      if (!listRef.current && menuRef.current.contains(e.target)) setShowMenu(true)
      else if (showMenu && listRef.current && !listRef.current.contains(e.target)) setShowMenu(false)
    }
    const handleEscapeKeyDown = e => {
      if (e.keyCode === 27) {
        setShowMenu(false)
        menuRef.current.blur()
      }
    }
    document.addEventListener('keydown', handleEscapeKeyDown)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEscapeKeyDown)
    }
  })
  return (
    <>
      <button type='button' className={s.menu} ref={menuRef}>
        <span className='a11y-hidden'>프로필 메뉴</span>
      </button>
      {showMenu && (
        <ul className={s.list} ref={listRef}>
          <li>
            <button onClick={handleCreateFeed}>피드작성</button>
          </li>
          <li>
            <button onClick={handleRegisterProduct}>상품등록</button>
          </li>
          <li>
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default ProfileMenu
