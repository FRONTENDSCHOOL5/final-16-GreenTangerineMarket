import { useParams } from 'react-router'

import MainLayout from 'components/Common/Layout/Main/MainLayout'
import ProfileInfo from 'components/Profile/Info/ProfileInfo'
import ProfileItemList from 'components/Profile/ItemList/ProfileItemList'

const Profile = () => {
  const { accountname } = useParams()
  return (
    <MainLayout>
      <ProfileInfo accountname={accountname} />
      <ProfileItemList accountname={accountname} />
    </MainLayout>
  )
}

export default Profile
