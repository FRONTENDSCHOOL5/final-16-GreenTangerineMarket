import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import s from './FeedDetailPage.module.scss'

import { getFeedInfoAPI } from 'api/feed'
import ImageSlider from 'components/Common/Slider/ImageSlider'
import ImageList from 'components/Common/List/ImageList'
import NotFoundPage from 'components/NotFound/NotFoundPage'
import FeedDetailAuthor from '../Author/FeedDetailAuthor'
import formatCreateTime from 'utils/formatCreateTime'
import heartImg from 'assets/img/icon-heart.svg'
import fillHeartImg from 'assets/img/icon-heart-fill.svg'
import { dislikeAPI, likeAPI } from 'api/like'
import CommentList from '../Comment/List/CommentList'

const FeedDetailPage = () => {
  const params = useParams()
  const [feedDetail, setFeedDetail] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isNoFeed, setIsNoFeed] = useState(false)

  const getFeedInfo = async () => {
    const res = await getFeedInfoAPI(params.id)
    if (res.status === 200) {
      setFeedDetail(res.data.post)
      setLikeCount(res.data.post.heartCount)
      setIsLike(res.data.post.hearted)
    } else {
      setIsNoFeed(true)
    }
  }

  const handleLikeClick = async () => {
    const res = isLike ? await dislikeAPI(params.id) : await likeAPI(params.id)
    setLikeCount(res)
    setIsLike(!isLike)
  }

  useEffect(() => {
    getFeedInfo()
  }, [])

  return (
    <>
      {!isNoFeed ? (
        feedDetail && (
          <section className={s.container}>
            <h2 className='a11y-hidden'>{feedDetail.author.username}님의 피드 상세페이지</h2>
            {feedDetail.image && (
              <ImageSlider>
                {feedDetail.image.split(',').map((image, i) => {
                  return <ImageList src={image} alt={`${i}번째`} key={image + 'key' + i} />
                })}
              </ImageSlider>
            )}
            <FeedDetailAuthor feedDetail={feedDetail} />
            <hr className={s.line} />
            <p className={s.content}>{feedDetail.content}</p>
            <div className={s.info}>
              <button type='button' onClick={handleLikeClick} className={s.like}>
                <img src={isLike ? fillHeartImg : heartImg} alt='좋아요 수' className={s.image}></img>
                <span className={s.text}>{likeCount}</span>
                <span className='a11y-hidden'>개</span>
              </button>
              <p className={s.time}>{formatCreateTime(feedDetail.createdAt)}</p>
            </div>
            <hr className={s.line} />
            <CommentList id={params.id} />
          </section>
        )
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}

export default FeedDetailPage
