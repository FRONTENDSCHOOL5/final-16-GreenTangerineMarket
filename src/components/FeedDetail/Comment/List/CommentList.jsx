import { useEffect, useState } from 'react'

import s from './CommentList.module.scss'

import { getCommentsInFeedAPI, postCommentsAPI } from 'api/comment'
import CommentListItem from '../ListItem/CommentListItem'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'

const CommentList = ({ id }) => {
  const [comments, setComments] = useState([])
  const [inputValue, setInputValue] = useState('')

  const getCommentsInFeed = async () => {
    const res = await getCommentsInFeedAPI(id)
    if (res.status === 200) setComments(res.data.comments)
  }

  const handleInput = e => {
    setInputValue(e.target.value)
  }

  const handlePostComments = async e => {
    e.preventDefault()
    await postCommentsAPI({ id: id, content: inputValue })
    await getCommentsInFeed()
    setInputValue('')
  }

  useEffect(() => {
    getCommentsInFeed()
  }, [])
  return (
    <section className={s.container}>
      <p className={s.commentTitle}>
        <span>댓글 </span>
        <span className={s.count}>{comments.length}</span>
      </p>
      <form className={s.inputContainer} onSubmit={handlePostComments}>
        <input
          className={s.input}
          type='text'
          onChange={handleInput}
          value={inputValue}
          placeholder='댓글을 작성해주세요.'
        ></input>
        <SmallButton onClickEvent={handlePostComments}>작성</SmallButton>
      </form>
      <ul className={s.scrollBox}>
        {comments?.map(comment => {
          return <CommentListItem key={comment.id} comment={comment} feedId={id} getComment={getCommentsInFeed} />
        })}
      </ul>
    </section>
  )
}

export default CommentList
