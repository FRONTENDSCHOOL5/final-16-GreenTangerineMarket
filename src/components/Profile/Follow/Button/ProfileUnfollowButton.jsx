import { toast } from 'react-hot-toast'
import { useState } from 'react'

import { unfollowProfileAPI } from 'api/profile'
import { MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import getToastStyle from 'utils/getToastStyle'

const ProfileUnfollowButton = ({ accountname, updateProfileData }) => {
  const [progressingUnfollow, setProgressingUnfollow] = useState(false)

  const handleUnfollowClick = async () => {
    setProgressingUnfollow(true)
    const res = await unfollowProfileAPI(accountname)
    if (res.status === 200) {
      updateProfileData(res.data.profile)

      toast('팔로우취소했습니다', {
        style: getToastStyle(),
      })
    }
    setProgressingUnfollow(false)
  }
  return !progressingUnfollow ? (
    <MsmallWhiteButton onClickEvent={handleUnfollowClick}>팔로우 취소</MsmallWhiteButton>
  ) : (
    <MsmallWhiteButton>팔로우 취소</MsmallWhiteButton>
  )
}

export default ProfileUnfollowButton
