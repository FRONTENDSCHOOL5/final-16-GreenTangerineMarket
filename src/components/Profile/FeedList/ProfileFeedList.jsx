import { useEffect, useState } from 'react'
import s from './ProfileFeedList.module.scss'
import { getUserFeedList } from 'api/feed'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import FeedCard from 'components/Common/Feed/Card/FeedCard'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import ProfileNoItem from '../NoItem/ProfileNoItem'

const ProfileFeedList = ({ accountname }) => {
  const myInfo = useRecoilValue(myInfoAtom)
  const [isMyProfile, setIsMyProfile] = useState(accountname === myInfo.accountname)
  const [userFeeds, setUserFeeds] = useState([])
  const [isMoreData, setIsMoreData] = useState(true)
  const loadUserFeeds = async page => {
    if (isMoreData) {
      const res = await getUserFeedList({ num: page * 10, accountname: accountname })
      if (res.status === 200) {
        !res.data.post.length
          ? setIsMoreData(false)
          : page === 0
          ? setUserFeeds([...res.data.post])
          : setUserFeeds([...userFeeds, ...res.data.post])
      }
    }
  }
  useEffect(() => {
    setUserFeeds([])
    setIsMoreData(true)
    setIsMyProfile(accountname === myInfo.accountname)
  }, [accountname])
  return (
    <InfiniteScroll loadData={loadUserFeeds} change={accountname}>
      {userFeeds.length ? (
        <div className={s.container}>
          {userFeeds.map((feed, index) => {
            return (
              <FeedCard
                key={feed.id + index}
                id={feed.id}
                author={feed.author}
                content={feed.content}
                image={feed.image}
                time={feed.createdAt}
              />
            )
          })}
        </div>
      ) : isMyProfile ? (
        <ProfileNoItem item='feed' action='add' />
      ) : (
        <ProfileNoItem item='feed' />
      )}
    </InfiniteScroll>
  )
}

export default ProfileFeedList
