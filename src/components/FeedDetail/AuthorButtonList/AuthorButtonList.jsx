import { deletePostAPI, postCommentsAPI } from 'api/feed'
import s from './AuthorButtonList.module.scss'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'

const AuthorButtonList = ({ feedDetail }) => {
  const handleDeletePost = async () => {
    const res = await deletePostAPI({ post_id: feedDetail.id })
    console.log(res)
  }

  return (
    <div className={s.commentChangeButton}>
      <SmallButton>수정</SmallButton>
      <SmallButton onClickEvent={handleDeletePost}>삭제</SmallButton>
    </div>
  )
}

export default AuthorButtonList
