import s from './Footer.module.scss'
import insta from 'assets/img/icon-insta.svg'
import fb from 'assets/img/icon-fb.svg'
import yt from 'assets/img/icon-yt.svg'

const Footer = () => {
  return (
    <footer>
      <div className={s.footerCase}>
        <ul className={s.footerLink}>
          <li>청귤마켓 소개</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>전자금융거래약관</li>
          <li>청소년보호정책</li>
          <li className={s.lastText}>제휴문의</li>
        </ul>
        <ul className={s.footerSns}>
          <li>
            <a target='_blank'>
              <img src={insta} alt='a gray colored camera logo link to Instagram' />
            </a>
          </li>
          <li>
            <a target='_blank'>
              <img src={fb} alt='a gray colored F logo link to FaceBook' />
            </a>
          </li>
          <li>
            <a target='_blank'>
              <img src={yt} alt='a gray colored play button logo link to Youtube' />
            </a>
          </li>
        </ul>
      </div>

      <div className={s.footerText}>
        (주)HODU SHOP <br />
        <address>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프 </address>
        사업자 번호 : 000-0000-0000 | 통신판매업 <br />
        대표 : 김호두
      </div>
    </footer>
  )
}

export default Footer
