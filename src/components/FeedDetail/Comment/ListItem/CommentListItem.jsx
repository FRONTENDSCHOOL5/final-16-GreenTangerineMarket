import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'

import { Link } from 'react-router-dom'
import s from './CommentListItem.module.scss'

import { myInfoAtom } from 'recoil/atom/user'
import { deletePostCommentsAPI, reportPostCommentsAPI } from 'api/comment'
import getToastStyle from 'utils/getToastStyle'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import formatCreateTime from 'utils/formatCreateTime'

const CommentListItem = ({ comment, feedId, getComment }) => {
  const myInfo = useRecoilValue(myInfoAtom)

  const handleDeletePostComments = async e => {
    const res = await deletePostCommentsAPI(feedId, comment.id)
    await getComment()
  }

  const handleReportPostComments = async () => {
    const res = await reportPostCommentsAPI(feedId, comment.id)
    toast('해당 댓글을 신고했습니다', {
      style: getToastStyle(),
    })
  }

  return (
    <li className={s.list}>
      <Link to={`/profile/${comment.author.accountname}`} className={s.profile}>
        <ProfileImage image={comment.author.image} username={comment.author.username} className={s.commentImage} />
        <p>{comment.author.username}</p>
      </Link>
      <p className={s.commentContent}>{comment.content}</p>
      <div className={s.container}>
        <p className={s.time}>{formatCreateTime(comment.createdAt)} ∙ </p>
        {comment.author.accountname === myInfo.accountname ? (
          <button className={s.button} type='button' onClick={handleDeletePostComments}>
            삭제
          </button>
        ) : (
          <button className={s.button} type='button' onClick={handleReportPostComments}>
            신고
          </button>
        )}
      </div>
    </li>
  )
}

export default CommentListItem
