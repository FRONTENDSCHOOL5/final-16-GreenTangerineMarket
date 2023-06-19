import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import s from './FeedItemList.module.scss'

import FeedCard from 'components/Common/Feed/Card/FeedCard'
import { getNextFeedAPI } from 'api/feed'
import UpBtn from 'components/Common/UpBtn/UpBtn'

const FeedItemList = () => {
  const [feeds, setFeeds] = useState([])

  const [page, setPage] = useState(0)

  const handleScroll = _.throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - window.innerHeight - scrollTop < 200) {
      setPage(prevPage => prevPage + 1)
    }
  }, 1000)

  const _handleScroll = React.useCallback(handleScroll)
  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [])

  const handleGetNextFeed = async () => {
    const res = await getNextFeedAPI(page * 10)
    setFeeds([...feeds, ...res.data.posts])
  }

  useEffect(() => {
    handleGetNextFeed()
  }, [page])

  return (
    <>
      <div className={s.card}>
        <h2 className={s.title}>최신 피드</h2>
        <p>여러분들의 일상을 공유해보세요!!</p>
      </div>
      <div>
        <section className={s.section}>
          {feeds.map(feed => {
            return (
              <FeedCard
                key={feed._id}
                id={feed._id}
                author={feed.author}
                image={feed.image}
                content={feed.content}
                time={feed.createdAt}
              />
            )
          })}
        </section>
        <UpBtn />
      </div>
    </>
  )
}

export default FeedItemList
