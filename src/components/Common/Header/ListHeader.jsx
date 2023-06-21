import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import s from './ListHeader.module.scss'

import logoImg from 'assets/img/logo_char.svg'
import user from 'assets/img/icon-user.svg'
import search from 'assets/img/icon-search.svg'
import { SmallButton } from '../Button/Small/SmallButton'
import { myInfoAtom } from 'recoil/atom/user'

const ListHeader = ({ link, name }) => {
  const myInfo = useRecoilValue(myInfoAtom)
  const navigate = useNavigate()

  const goCreater = () => {
    navigate(link)
  }

  return (
    <header className={s.header}>
      <div className={s.hContainer}>
        <Link to='/'>
          <h1>
            <img className={s.logoImg} src={logoImg} alt='초록색의 청귤마켓 로고 이미지입니다.' />
          </h1>
        </Link>
        <nav>
          <ul className={s.container}>
            <li>
              <Link to='/'>
                <img className={s.search} src={search} alt='계정탐색 페이지로 이동하는 검은색 돋보기 아이콘입니다.' />
                <p>계정검색</p>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${myInfo.accountname}`}>
                <img src={user} alt='마이페이지로 이동하는 검은색 사람 상체 아이콘 입니다.' />
                <p>마이페이지</p>
              </Link>
            </li>
            {name && (
              <li>
                <SmallButton onClickEvent={goCreater}>{name}</SmallButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default ListHeader
