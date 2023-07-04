import { useMediaQuery } from 'react-responsive'

import s from './ListLayout.module.scss'

import Footer from 'components/Common/Footer/Footer'
import ListHeader from 'components/Common/Header/List/ListHeader'
import MobileHeader from 'components/Common/Header/Mobile/MobileHeader'

const ListLayout = ({ children, link, name }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return (
    <>
      {isMobile ? <MobileHeader link={link} name={name} /> : <ListHeader link={link} name={name} />}
      <main className={s.container}>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default ListLayout
