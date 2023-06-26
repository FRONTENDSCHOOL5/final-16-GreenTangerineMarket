import { useEffect, useState } from 'react'

import { getMyProfileInfoAPI } from 'api/profile'
import { MsmallButton } from 'components/Common/Button/Msmall/MsmallButton'
import ProfileEditModal from '../Modal/ProfileEditModal'

const ProfileEditButton = ({ handleProfileUpdate }) => {
  const [myInfo, setMyInfo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getMyProfileInfo = async () => {
    const res = await getMyProfileInfoAPI()
    if (res.status === 200) {
      setMyInfo(res.data.user)
    }
  }

  const handleProfileEditClick = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    getMyProfileInfo()
  }, [myInfo])

  return (
    <>
      <MsmallButton onClickEvent={handleProfileEditClick}>프로필 수정</MsmallButton>
      {isModalOpen && myInfo && (
        <ProfileEditModal handleProfileUpdate={handleProfileUpdate} myInfo={myInfo} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProfileEditButton
