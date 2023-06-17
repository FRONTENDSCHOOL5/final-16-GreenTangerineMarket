import { toast } from 'react-hot-toast'

import { unfollowProfileAPI } from 'api/profile'
import { MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import getToastStyle from 'utils/getToastStyle'

const UnfollowButton = ({ accountname, updateProfileData }) => {
  const handleUnfollowClick = async () => {
    const res = await unfollowProfileAPI(accountname)
    if (res.status === 200) {
      updateProfileData(res.data.profile)

      toast('팔로우취소했습니다', {
        style: getToastStyle(),
      })
    }
  }
  return <MsmallWhiteButton onClickEvent={handleUnfollowClick}>팔로우 취소</MsmallWhiteButton>
}

export default UnfollowButton
