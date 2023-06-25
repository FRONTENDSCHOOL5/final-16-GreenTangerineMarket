import ProfileImage from 'components/Common/Feed/ProfileImage/ProfileImage'
import s from './CommentList.module.scss'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import { deletePostCommentsAPI, reportPostCommentsAPI } from 'api/comment'
import { toast } from 'react-hot-toast'
import getToastStyle from 'utils/getToastStyle'

const CommentList = ({ comment, feedId, getComment }) => {
  const myInfo = useRecoilValue(myInfoAtom)

  const handleDeletePostComments = async e => {
    const res = await deletePostCommentsAPI(feedId, comment.id)
    await getComment()
    console.log(res)
  }
  const handleReportPostComments = async () => {
    const res = await reportPostCommentsAPI(feedId, comment.id)
    toast('해당 댓글을 신고했습니다', {
      style: getToastStyle(),
    })
  }

  return (
    <li className={s.liList}>
      <ProfileImage image={comment.author.image} username={comment.author.username} className={s.commentImage} />
      <div className={s.commentListBox}>
        <p>{comment.author.accountname}</p>

        {comment.author.accountname === myInfo.accountname ? (
          <button onClick={handleDeletePostComments}>삭제</button>
        ) : (
          <button onClick={handleReportPostComments}>신고</button>
        )}
        <div className={s.commentContent}>
          <br />
          {comment.content}
        </div>
      </div>
    </li>
  )
}

export default CommentList
