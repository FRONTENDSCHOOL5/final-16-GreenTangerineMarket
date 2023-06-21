import { useParams } from 'react-router'

import ProfileInfo from 'components/Profile/Info/ProfileInfo'
import ProfileItemList from 'components/Profile/ItemList/ProfileItemList'
import ListLayout from 'components/Common/Layout/List/ListLayout'

const Profile = () => {
  const { accountname } = useParams()
  return (
    <ListLayout name=''>
      <ProfileInfo accountname={accountname} />
      <ProfileItemList accountname={accountname} />
    </ListLayout>
  )
}

export default Profile
