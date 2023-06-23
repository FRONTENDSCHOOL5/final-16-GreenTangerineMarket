import { toast } from 'react-hot-toast'

import { followProfileAPI } from 'api/profile'
import { MsmallButton } from 'components/Common/Button/Msmall/MsmallButton'
import getToastStyle from 'utils/getToastStyle'

const FollowButton = ({ accountname, updateProfileData }) => {
  const handleFollowClick = async () => {
    const res = await followProfileAPI(accountname)
    if (res.status === 200) {
      updateProfileData(res.data.profile)
      toast('팔로우했습니다', {
        style: getToastStyle(),
      })
    }
  }
  return <MsmallButton onClickEvent={handleFollowClick}>팔로우</MsmallButton>
}

export default FollowButton
