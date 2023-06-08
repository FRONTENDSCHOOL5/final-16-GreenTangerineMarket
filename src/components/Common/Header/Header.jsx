import s from './Header.module.scss'
import logoimg from 'assets/img/logo_char.png'
import user from 'assets/img/icon-user.svg'
import search from 'assets/img/icon-search.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className={s.headerWrapper}>
        <Link to='/'>
          <h1>
            <img className={s.logoimg} src={logoimg} alt='GreenColored main Logo img of GreenTangerin Market' />
          </h1>
        </Link>
        <nav>
          <ul className={s.container}>
            <li>
              <Link to='/'>
                <img className={s.search} src={search} alt='a black Magnifier Icon for search ID' />
                <p>계정검색</p>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <img src={user} alt='a human body simbol Icon for Link to Mypage' />
                <p>마이페이지</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
