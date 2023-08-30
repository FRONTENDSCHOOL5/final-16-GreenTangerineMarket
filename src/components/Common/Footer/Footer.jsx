import { useState } from 'react'

import s from './Footer.module.scss'

import gitHub from 'assets/img/icon-github.svg'
import Modal from '../Modal/Modal'

const Footer = ({ list = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <footer className={list ? s.list : s.footer}>
        <div className={s.text}>
          <p>본 페이지는 상업적인 목적이 없는 포트폴리오용 사이트입니다</p>
          <p>©2023 장예지, 임준혁, 이슬아, 정승규. All rights reserved.</p>
        </div>
        <button className={s.gitHub} onClick={() => setIsModalOpen(true)} type='button'>
          <img src={gitHub} alt='' />
        </button>
      </footer>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className={s.container}>
            <p className={s.title}>GitHub</p>
            <ul className={s.listBtn}>
              <li>
                <a href='https://github.com/FRONTENDSCHOOL5/final-16-GreenTangerineMarket'>청귤마켓 깃허브 바로가기</a>
              </li>
              <li>
                <a href='https://github.com/ho-ji'>장예지의 깃허브 바로가기</a>
              </li>
              <li>
                <a href='https://github.com/Limttugi'>임준혁의 깃허브 바로가기</a>
              </li>
              <li>
                <a href='https://github.com/tmfdk0213'>이슬아의 깃허브 바로가기</a>
              </li>
              <li>
                <a href='https://github.com/Seunggyu-Jung'>정승규의 깃허브 바로가기</a>
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Footer
