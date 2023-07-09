import s from './Footer.module.scss'

import logoImg from 'assets/img/logo_char_gray.svg'
import gitHub from 'assets/img/icon-github.svg'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clickContact = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <footer className={s.footer}>
      <div>
        <img src={logoImg} alt='' />
      </div>

      <div className={s.text}>
        본 페이지는 상업적인 목적이 없는 포트폴리오용 사이트입니다
        <br />
        장예지, 임준혁, 이슬아, 정승규 copyright
        <button className={s.contact} onClick={clickContact}>
          contect us
        </button>
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <div className={s.container}>
              <p>contect us</p>
              <ul className={s.listBtn}>
                <li>
                  <Link to='https://github.com/ho-ji'>장예지의 깃헙 바로가기</Link>
                </li>
                <li>
                  <Link to='https://github.com/Limttugi'>임준혁의 깃헙 바로가기</Link>
                </li>
                <li>
                  <Link to='https://github.com/tmfdk0213'>이슬아의 깃헙 바로가기</Link>
                </li>
                <li>
                  <Link to='https://github.com/Seunggyu-Jung'>정승규의 깃헙 바로가기</Link>
                </li>
              </ul>
            </div>
          </Modal>
        )}
      </div>

      <button className={s.gitHub}>
        <Link to='https://github.com/FRONTENDSCHOOL5/final-16-GreenTangerineMarket'>
          <img src={gitHub} alt='' />
        </Link>
      </button>
    </footer>
  )
}

export default Footer
