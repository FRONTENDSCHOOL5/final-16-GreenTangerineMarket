import { useNavigate } from 'react-router-dom'

import s from './NotFoundPage.module.scss'

import { LargeButton, LargeWhiteButton } from 'components/Common/Button/Large/LargeButton'
import img from 'assets/img/icon-404.png'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const clickMainHome = () => {
    navigate('/')
  }
  const clickBackPage = () => {
    navigate(-1)
  }
  return (
    <main className={s.container}>
      <img className={s.img} src={img} alt='페이지를 찾을 수 없습니다' />
      <section className={s.text}>
        <h1 className={s.header}>페이지를 찾을 수 없습니다</h1>
        <p className={s.check}>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />
          웹주소가 올바른지 확인하세요
        </p>
        <div className={s.mainButton}>
          <LargeButton onClickEvent={clickMainHome}>메인으로</LargeButton>
          <LargeWhiteButton onClickEvent={clickBackPage}>이전페이지</LargeWhiteButton>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
