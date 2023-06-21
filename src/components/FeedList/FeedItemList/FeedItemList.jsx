import { useState } from 'react'
import _ from 'lodash'

import s from './FeedItemList.module.scss'

import FeedCard from 'components/Common/Feed/Card/FeedCard'
import { getNextFeedAPI } from 'api/feed'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'

const FeedItemList = () => {
  const [feeds, setFeeds] = useState([])
  const loadFeedList = async page => {
    const res = await getNextFeedAPI(page * 10)
    if (res.status === 200) setFeeds([...feeds, ...res.data.posts])
  }
  return (
    <InfiniteScroll loadData={loadFeedList}>
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
      </div>
    </InfiniteScroll>
  )
}

export default FeedItemList
