import { useEffect, useState } from 'react'
import s from './ProfileFeedList.module.scss'
import { getUserFeedList } from 'api/feed'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import FeedCard from 'components/Common/Feed/Card/FeedCard'

const ProfileFeedList = ({ accountname }) => {
  const [userFeeds, setUserFeeds] = useState([])
  const [isMoreData, setIsMoreData] = useState(true)
  const loadUserFeeds = async page => {
    if (isMoreData) {
      const res = await getUserFeedList({ num: page * 10, accountname: accountname })
      if (res.status === 200) {
        !res.data.post.length ? setIsMoreData(false) : setUserFeeds([...userFeeds, ...res.data.post])
      }
    }
  }
  useEffect(() => {
    setUserFeeds([])
    setIsMoreData(true)
  }, [accountname])
  return (
    <InfiniteScroll loadData={loadUserFeeds}>
      {userFeeds.length ? (
        <div className={s.container}>
          {userFeeds.map(feed => {
            return (
              <FeedCard
                key={feed.id}
                id={feed.id}
                author={feed.author}
                content={feed.content}
                image={feed.image}
                time={feed.createdAt}
              />
            )
          })}
        </div>
      ) : (
        <div>게시글을 등록하세요</div>
      )}
    </InfiniteScroll>
  )
}

export default ProfileFeedList
