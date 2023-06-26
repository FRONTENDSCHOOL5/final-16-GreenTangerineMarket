import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import s from './ProfileUserListItem.module.scss'

import { Link } from 'react-router-dom'

const ProfileUserListItem = ({ image, accountname, username }) => {
  return (
    <li>
      <Link to={`/profile/${accountname}`} className={s.item}>
        <ProfileImage image={image} className={s.image} />
        <div className={s.name}>
          <p className={s.user}>{username}</p>
          <p className={s.account}>@{accountname}</p>
        </div>
      </Link>
    </li>
  )
}

export default ProfileUserListItem
