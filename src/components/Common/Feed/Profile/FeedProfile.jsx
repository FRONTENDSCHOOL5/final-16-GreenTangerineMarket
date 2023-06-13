import { Link } from 'react-router-dom'
import s from './FeedProfile.module.scss'
import defaultProfile from 'assets/img/default-profile.svg'
import { useState } from 'react'

const FeedProfile = ({ author }) => {
  const [profileImageError, setProfileImageError] = useState(false)

  const handleProfileImageError = e => {
    setProfileImageError(true)
  }
  return (
    <Link to={`/profile/${author.accountname}`} className={s.profile}>
      {
        <img
          src={!profileImageError ? author.image : defaultProfile}
          onError={handleProfileImageError}
          alt={`${author.accountname} 프로필 이미지`}
          className={s.profileImg}
        />
      }
      <div className={s.author}>
        <p className={s.user}>{author.username}</p>
        <p className={s.account}>@{author.accountname}</p>
      </div>
    </Link>
  )
}

export default FeedProfile
