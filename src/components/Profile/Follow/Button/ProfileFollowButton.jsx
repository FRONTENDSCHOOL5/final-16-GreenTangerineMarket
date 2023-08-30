import { toast } from 'react-hot-toast'
import { useState } from 'react'

import { followProfileAPI } from 'api/profile'
import { MsmallButton } from 'components/Common/Button/Msmall/MsmallButton'
import getToastStyle from 'utils/getToastStyle'

const ProfileFollowButton = ({ accountname, updateProfileData }) => {
  const [progressingFollow, setProgressingFollow] = useState(false)

  const handleFollowClick = async () => {
    setProgressingFollow(true)
    const res = await followProfileAPI(accountname)
    if (res.status === 200) {
      updateProfileData(res.data.profile)
      toast('팔로우했습니다', {
        style: getToastStyle(),
      })
    }
    setProgressingFollow(false)
  }
  return !progressingFollow ? (
    <MsmallButton onClickEvent={handleFollowClick}>팔로우</MsmallButton>
  ) : (
    <MsmallButton>팔로우</MsmallButton>
  )
}

export default ProfileFollowButton
