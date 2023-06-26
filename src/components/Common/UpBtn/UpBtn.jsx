import { useEffect, useState } from 'react'

import s from './UpBtn.module.scss'

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
    <button type='button' onClick={handleClick} className={showButton ? s.upDisplay : s.upNonDiplay}>
      <span className='a11y-hidden'>위로가기</span>
    </button>
  )
}

export default UpBtn
