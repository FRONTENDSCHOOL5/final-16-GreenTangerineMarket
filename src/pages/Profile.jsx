import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import ProfileInfo from 'components/Profile/Info/ProfileInfo'
import ProfileItemList from 'components/Profile/List/ItemList/ProfileItemList'
import ListLayout from 'components/Common/Layout/List/ListLayout'

const Profile = () => {
  const { accountname } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [accountname])
  return (
    <ListLayout name=''>
      <ProfileInfo accountname={accountname} />
      <ProfileItemList accountname={accountname} />
    </ListLayout>
  )
}

export default Profile
