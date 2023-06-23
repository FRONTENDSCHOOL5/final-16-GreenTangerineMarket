import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import s from './FeedAction.module.scss'

import heartImg from 'assets/img/icon-heart.svg'
import fillHeartImg from 'assets/img/icon-heart-fill.svg'
import commentImg from 'assets/img/icon-message-circle.svg'
import { getFeedInfoAPI } from 'api/feed'
import { dislikeAPI, likeAPI } from 'api/like'

const FeedAction = ({ id }) => {
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const handleClick = async e => {
    const res = isLike ? await dislikeAPI(id) : await likeAPI(id)
    setLikeCount(res)
    setIsLike(!isLike)
  }
  useEffect(() => {
    const getFeedInfo = async () => {
      const res = await getFeedInfoAPI(id)
      if (res.status === 200) {
        setIsLike(res.data.post.hearted)
        setLikeCount(res.data.post.heartCount)
        setCommentCount(res.data.post.comments.length)
      }
    }
    getFeedInfo()
  }, [])

  return (
    <div className={s.container}>
      <button type='button' onClick={handleClick} className={s.button}>
        <img src={isLike ? fillHeartImg : heartImg} alt='좋아요 수' className={s.image}></img>
        <span className={s.text}>{likeCount}</span>
        <span className='a11y-hidden'>개</span>
      </button>
      <Link to={`/feedDetail/${id}`} className={s.button}>
        <img src={commentImg} alt='댓글 수' className={s.image}></img>
        <span className={s.text}>{commentCount}</span>
        <span className='a11y-hidden'>개</span>
      </Link>
    </div>
  )
}

export default FeedAction
