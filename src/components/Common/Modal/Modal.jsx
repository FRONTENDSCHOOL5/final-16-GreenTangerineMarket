import { useEffect } from 'react'

import s from './Modal.module.scss'

import { allowScroll, preventScroll } from 'utils/scroll'

const Modal = ({ children, closeModal }) => {
  const handleOutsideClick = e => {
    if (e.target.nodeName === 'DIALOG') closeModal()
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
