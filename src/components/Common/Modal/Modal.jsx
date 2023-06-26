import { Children, useEffect } from 'react'
import s from './Modal.module.scss'

const Modal = ({ children, closeModal }) => {
  const handleOutsideClick = e => {
    if (e.target.nodeName === 'DIALOG') closeModal()
  }

  const preventScroll = () => {
    const currentScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${currentScrollY}px`
    document.body.style.overflowY = 'scroll'
    return currentScrollY
  }

  const allowScroll = prevScroll => {
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    document.body.style.overflowY = ''
    window.scrollTo(0, prevScroll)
  }

  const handleEscapeKeyDown = e => {
    if (e.key === 'Escape') {
      closeModal()
      e.target.blur()
    }
  }

  useEffect(() => {
    const prevScroll = preventScroll()
    document.addEventListener('keydown', handleEscapeKeyDown)
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown)
      document.body.style.overflow = ''

      allowScroll(prevScroll)
    }
  })

  return (
    <dialog className={s.modal} onClick={handleOutsideClick}>
      {children}
    </dialog>
  )
}

export default Modal
