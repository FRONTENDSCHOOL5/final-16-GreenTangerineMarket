import { deletePostAPI, postCommentsAPI } from 'api/feed'
import s from './AuthorButtonList.module.scss'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'
import { useParams } from 'react-router-dom'

const AuthorButtonList = ({ feedDetail, setInputValue, inputValue }) => {
  // const handlePostComments = async () => {
  //   const res = await postCommentsAPI({ id: feedDetail.id, content: inputValue })
  //   setInputValue('')
  // }
  const handleDeletePost = async () => {
    const res = await deletePostAPI({ post_id: feedDetail.id })
    console.log(res)
  }

  return (
    <div className={s.commentButton}>
      {/* <SmallButton onClickEvent={handlePostComments}>작성</SmallButton> */}
      <SmallButton>수정</SmallButton>
      <SmallButton onClickEvent={handleDeletePost}>삭제</SmallButton>
    </div>
  )
}

export default AuthorButtonList
