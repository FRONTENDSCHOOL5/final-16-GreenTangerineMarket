import s from './UserListItem.module.scss'

import ProfileImage from '../ProfileImage/ProfileImage'
import { Link } from 'react-router-dom'

const UserListItem = ({ image, accountname, username }) => {
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

export default UserListItem
