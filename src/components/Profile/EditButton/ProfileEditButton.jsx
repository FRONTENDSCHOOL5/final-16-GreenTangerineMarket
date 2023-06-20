import { useEffect, useState } from 'react'

import { getMyProfileInfoAPI } from 'api/profile'
import { MsmallButton } from 'components/Common/Button/Msmall/MsmallButton'
import ProfileEditModal from '../EditModal/ProfileEditModal'

const ProfileEditButton = ({ handleProfileUpdate }) => {
  const [myInfo, setMyInfo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    const getMyProfileInfo = async () => {
      const res = await getMyProfileInfoAPI()
      if (res.status === 200) {
        setMyInfo(res.data.user)
      }
    }
    getMyProfileInfo()
  }, [myInfo])

  const handleProfileEditClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

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
