import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import s from './FeedAction.module.scss'

import heartImg from 'assets/img/icon-heart.svg'
import fillHeartImg from 'assets/img/icon-heart-fill.svg'
import commentImg from 'assets/img/icon-message-circle.svg'
import { getFeedInfoAPI } from 'api/feed'
import { dislikeAPI, likeAPI } from 'api/like'

const FeedAction = ({ id }) => {
  const res = getFeedInfoAPI(id)
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState('')
  const [commentCount, setCommentCount] = useState('')
  const handleClick = async e => {
    const cnt = isLike ? await dislikeAPI(id) : await likeAPI(id)
    setLikeCount(cnt)
    setIsLike(!isLike)
  }
  useEffect(() => {
    if (res) {
      setIsLike(res.post.hearted)
      setLikeCount(res.post.heartCount)
      setCommentCount(res.post.comments.length)
    }
  }, [res])

  return (
    <div className={s.container}>
      <button type='button' onClick={handleClick} className={s.button}>
        {<img src={isLike ? fillHeartImg : heartImg} alt='' className={s.image}></img>}
        <span className={s.text}>{likeCount}</span>
      </button>
      <Link to={`/feedDetail/${id}`} className={s.button}>
        <img src={commentImg} alt='' className={s.image}></img>
        <span className={s.text}>{commentCount}</span>
      </Link>
    </div>
  )
}

export default FeedAction
