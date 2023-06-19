import React, { useEffect, useState } from 'react'

import s from './UpBtn.module.scss'

import { SmallButton } from '../Button/Small/SmallButton'
import Up from 'assets/img/icon-up.svg'

const UpBtn = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <section onClick={handleClick} className={showButton ? s.up : ''}>
      <SmallButton>
        <img className={s.icon} src={Up} alt='위를 가리키는 검은색 화살표입니다' />
      </SmallButton>
    </section>
  )
}

export default UpBtn
