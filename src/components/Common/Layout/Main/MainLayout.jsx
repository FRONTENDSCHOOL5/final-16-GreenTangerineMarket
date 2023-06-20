import s from './MainLayout.module.scss'

import Footer from 'components/Common/Footer/Footer'
import Header from 'components/Common/Header/Header'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.container}>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
