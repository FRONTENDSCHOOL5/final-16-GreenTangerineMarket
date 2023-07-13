import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import s from './FeedDetailAuthor.module.scss'

import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import AuthorButtonList from '../AuthorButtonList/AuthorButtonList'
import { myInfoAtom } from 'recoil/atom/user'
import { followProfileAPI, unfollowProfileAPI } from 'api/profile'
import getToastStyle from 'utils/getToastStyle'

const FeedDetailAuthor = ({ feedDetail }) => {
  const [isFollow, setIsFollow] = useState(feedDetail.author.isfollow)
  const myInfo = useRecoilValue(myInfoAtom)

  const handleUnfollow = async () => {
    if (isFollow) {
      setIsFollow(false)
      const res = await unfollowProfileAPI(feedDetail.author.accountname)
      if (res.status === 200) {
        toast('팔로우취소했습니다', {
          style: getToastStyle(),
        })
      }
    }
  }
  const handleFollow = async () => {
    if (!isFollow) {
      setIsFollow(true)
      const res = await followProfileAPI(feedDetail.author.accountname)
      if (res.status === 200) {
        toast('팔로우했습니다', {
          style: getToastStyle(),
        })
      }
    }
  }

  return (
    <>
      {feedDetail && (
        <div className={s.container}>
          <Link to={`/profile/${feedDetail.author.accountname}`} className={s.profile}>
            <ProfileImage image={feedDetail.author.image} username={feedDetail.author.username} className={s.image} />
            <div className={s.name}>
              <p className={s.user}>{feedDetail.author.username}</p>
              <p className={s.account}>@{feedDetail.author.accountname}</p>
            </div>
          </Link>
          {feedDetail.author.accountname === myInfo.accountname ? (
            <AuthorButtonList feedDetail={feedDetail} />
          ) : isFollow ? (
            <button type='button' onClick={handleUnfollow} className={s.unfollow}>
              언팔로우
            </button>
          ) : (
            <button type='button' onClick={handleFollow} className={s.follow}>
              팔로우
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default FeedDetailAuthor
