import { toast } from 'react-hot-toast'
import { useState } from 'react'

import { followProfileAPI } from 'api/profile'
import { MsmallButton, MsmallButtonDisabled } from 'components/Common/Button/Msmall/MsmallButton'
import getToastStyle from 'utils/getToastStyle'

const ProfileFollowButton = ({ accountname, updateProfileData }) => {
  const [progressingFollow, sestProgressingFollow] = useState(false)

  const handleFollowClick = async () => {
    sestProgressingFollow(true)
    const res = await followProfileAPI(accountname)
    if (res.status === 200) {
      updateProfileData(res.data.profile)
      toast('팔로우했습니다', {
        style: getToastStyle(),
      })
    }
    sestProgressingFollow(false)
  }
  return !progressingFollow ? (
    <MsmallButton onClickEvent={handleFollowClick}>팔로우</MsmallButton>
  ) : (
    <MsmallButton>팔로우</MsmallButton>
  )
}

export default ProfileFollowButton
