import { useAxios } from 'hooks/useAxios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './FeedAction.module.scss'
import heartImg from 'assets/img/icon-heart.svg'
import fillHeartImg from 'assets/img/icon-heart-fill.svg'
import commentImg from 'assets/img/icon-message-circle.svg'
import { postLike } from 'api/postLike'
import { postNoLike } from 'api/postNoLike'

const FeedAction = ({ id }) => {
  const { response } = useAxios({
    method: 'GET',
    url: `/post/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  })
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentCount, setCommentCount] = useState('')
  const handleClick = async e => {
    const cnt = isLike ? await postNoLike(id) : await postLike(id)
    setLikeCount(cnt)
    setIsLike(!isLike)
  }
  useEffect(() => {
    if (response) {
      setIsLike(response.post.hearted)
      setLikeCount(response.post.heartCount)
      setCommentCount(response.post.comments.length)
    }
  }, [response])

  return (
    <div className={s.wrap}>
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
