import { useRecoilValue } from 'recoil'
import s from './FeedMoreButton.module.scss'
import { myInfoAtom } from 'recoil/atom/user'
import { useEffect, useRef, useState } from 'react'

const FeedMoreButton = ({ id, author }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const moreButtonRef = useRef(null)
  const userInfo = useRecoilValue(myInfoAtom)
  const isMyFeed = author._id === userInfo._id
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!menuRef.current && moreButtonRef.current.contains(e.target)) {
        setShowMenu(true)
      } else if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    const handleEscapeKeyDown = e => {
      if (e.keyCode === 27) {
        setShowMenu(false)
        moreButtonRef.current.blur()
      }
    }
    document.addEventListener('keydown', handleEscapeKeyDown)
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKeyDown)
    }
  })
  return (
    <>
      <button type='button' className={s.more} ref={moreButtonRef}>
        <span className='a11y-hidden'>더보기 버튼</span>
      </button>
      {showMenu &&
        (isMyFeed ? (
          <ul className={s.menu} ref={menuRef}>
            <li>
              <button type='button'>수정</button>
            </li>
            <li>
              <button type='button'>삭제</button>
            </li>
          </ul>
        ) : (
          <ul className={s.menu} ref={menuRef}>
            <li>
              <button type='button'>신고</button>
            </li>
          </ul>
        ))}
    </>
  )
}

export default FeedMoreButton
