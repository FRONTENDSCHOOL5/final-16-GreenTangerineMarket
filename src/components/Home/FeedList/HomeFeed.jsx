import { useEffect, useState } from 'react'

import s from './HomeFeed.module.scss'

import FeedCard from 'components/Common/Feed/Card/FeedCard'
import { getFeedListAPI } from 'api/feed'
import { Link } from 'react-router-dom'

const HomeFeed = () => {
  const [feeds, setFeeds] = useState([])
  useEffect(() => {
    const getFeedList = async () => {
      const res = await getFeedListAPI()
      setFeeds(res.data.posts)
    }
    getFeedList()
  }, [])
  return (
    <>
      <div className={s.card}>
        <h2 className={s.title}>최신 피드</h2>
        <Link className={s.link} to='/feed'>
          더보기
        </Link>
      </div>
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
    </>
  )
}

export default HomeFeed
