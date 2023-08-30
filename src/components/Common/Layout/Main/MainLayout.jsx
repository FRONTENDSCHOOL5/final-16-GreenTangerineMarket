import { useMediaQuery } from 'react-responsive'

import s from './MainLayout.module.scss'

import Footer from 'components/Common/Footer/Footer'
import DefaultHeader from 'components/Common/Header/Default/DefaultHeader'
import MobileHeader from 'components/Common/Header/Mobile/MobileHeader'

const MainLayout = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return (
    <>
      {isMobile ? <MobileHeader /> : <DefaultHeader />}
      <main className={s.container}>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
