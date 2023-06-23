import s from './ListLayout.module.scss'

import Footer from 'components/Common/Footer/Footer'
import ListHeader from 'components/Common/Header/ListHeader'

const ListLayout = ({ children, link, name }) => {
  return (
    <>
      <ListHeader link={link} name={name} />
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  )
}

export default ListLayout
