import s from './Profile.module.scss'

import Footer from 'components/Common/Footer/Footer'
import Header from 'components/Common/Header/Header'
import ProfileInfo from 'components/Profile/Info/ProfileInfo'
import ProfileItemList from 'components/Profile/ItemList/ProfileItemList'

const Profile = () => {
  return (
    <>
      <Header />
      <main class={s.main}>
        <ProfileInfo />
        <ProfileItemList />
      </main>
      <Footer />
    </>
  )
}

export default Profile
