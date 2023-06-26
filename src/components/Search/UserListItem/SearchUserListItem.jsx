import { useState } from 'react'
import { toast } from 'react-hot-toast'

import s from './SearchUserListItem.module.scss'

import { Link } from 'react-router-dom'
import { SmallButton, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import getToastStyle from 'utils/getToastStyle'
import { followProfileAPI, unfollowProfileAPI } from 'api/profile'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import SearchHighLightText from '../HighLightText/SearchHighLightText'

const SearchUserListItem = ({ image, accountname, username, follow, keyword }) => {
  const [isFollow, setIsFollow] = useState(follow)

  const handleFollowClick = async e => {
    e.preventDefault()
    const res = await followProfileAPI(accountname)
    if (res.status === 200) {
      toast('팔로우했습니다', {
        style: getToastStyle(),
      })
      setIsFollow(true)
    }
  }

  const handleUnfollowClick = async e => {
    e.preventDefault()
    const res = await unfollowProfileAPI(accountname)
    if (res.status === 200) {
      toast('팔로우취소했습니다', {
        style: getToastStyle(),
      })
      setIsFollow(false)
    }
  }

  return (
    <li>
      <Link to={`/profile/${accountname}`} className={s.item}>
        <ProfileImage image={image} className={s.image} />
        <div className={s.name}>
          <SearchHighLightText className={s.user} text={username} keyword={keyword} />
          <SearchHighLightText className={s.account} text={'@' + accountname} keyword={keyword} />
        </div>
        {isFollow ? (
          <SmallWhiteButton onClickEvent={handleUnfollowClick}>언팔로우</SmallWhiteButton>
        ) : (
          <SmallButton onClickEvent={handleFollowClick}>팔로우</SmallButton>
        )}
      </Link>
    </li>
  )
}

export default SearchUserListItem
