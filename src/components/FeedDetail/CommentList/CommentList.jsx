import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'

import s from './CommentList.module.scss'

import { myInfoAtom } from 'recoil/atom/user'
import { deletePostCommentsAPI, reportPostCommentsAPI } from 'api/comment'
import getToastStyle from 'utils/getToastStyle'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import formatCreateTime from 'utils/formatCreateTime'

const CommentList = ({ comment, feedId, getComment }) => {
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
      <div className={s.profile}>
        <ProfileImage image={comment.author.image} username={comment.author.username} className={s.commentImage} />
        <p>{comment.author.username}</p>
      </div>
      <p className={s.commentContent}>{comment.content}</p>
      <div className={s.container}>
        <p className={s.font}>{formatCreateTime(comment.createdAt)}</p>
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

export default CommentList
