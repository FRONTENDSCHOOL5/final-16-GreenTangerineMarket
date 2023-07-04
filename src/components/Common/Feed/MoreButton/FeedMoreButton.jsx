import { useRecoilValue } from 'recoil'
import { useEffect, useRef, useState } from 'react'

import s from './FeedMoreButton.module.scss'

import { myInfoAtom } from 'recoil/atom/user'
import FeedReportButton from '../ReportButton/FeedReportButton'
import FeedEditButton from '../EditButton/FeedEditButton'

const FeedMoreButton = ({ id, author }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const moreButtonRef = useRef(null)
  const myInfo = useRecoilValue(myInfoAtom)
  const isMyFeed = author.accountname === myInfo.accountname

  const handleOutsideClick = e => {
    if (!menuRef.current && moreButtonRef.current.contains(e.target)) setShowMenu(true)
    else if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false)
  }

  const handleEscapeKeyDown = e => {
    if (e.key === 'Escape') {
      setShowMenu(false)
      moreButtonRef.current.blur()
    }
  }

  useEffect(() => {
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
              <FeedEditButton id={id} />
            </li>
          </ul>
        ) : (
          <ul className={s.menu} ref={menuRef}>
            <li>
              <FeedReportButton id={id} closeMenu={() => setShowMenu(false)} />
            </li>
          </ul>
        ))}
    </>
  )
}

export default FeedMoreButton
