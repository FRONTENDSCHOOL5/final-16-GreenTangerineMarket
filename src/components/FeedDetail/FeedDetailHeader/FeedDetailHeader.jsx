import s from './FeedDetailHeader.module.scss'
import img from 'assets/img/basic-profile-img.png'

const FeedDetailHeader = ({ username, commentCount }) => {
  return (
    <header className={s.header}>
      <img className={s.profileImg} src={img} alt='프로필사진'></img>
      <p className={s.profileId}>{username}</p>
      <p className={s.commentNumber}>댓글{commentCount}</p>
    </header>
  )
}

export default FeedDetailHeader
