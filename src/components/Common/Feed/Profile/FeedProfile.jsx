import { Link } from 'react-router-dom'

import s from './FeedProfile.module.scss'

import ProfileImage from '../../ProfileImage/ProfileImage'

const FeedProfile = ({ author }) => {
  return (
    <Link to={`/profile/${author.accountname}`} className={s.profile}>
      <ProfileImage image={author.image} name={author.accountname} className={s.image} />
      <div className={s.author}>
        <p className={s.user}>{author.username}</p>
        <p className={s.account}>@{author.accountname}</p>
      </div>
    </Link>
  )
}

export default FeedProfile
