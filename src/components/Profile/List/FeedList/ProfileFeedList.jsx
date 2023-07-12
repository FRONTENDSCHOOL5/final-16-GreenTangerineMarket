import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getUserFeedList } from 'api/feed'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import FeedCard from 'components/Common/Feed/Card/FeedCard'
import GridLayout from 'components/Common/Layout/Grid/GridLayout'
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
        if (res.data.post.length === 0) setIsMoreData(false)
        else {
          if (page === 0) {
            setUserFeeds(() => [...res.data.post])
          } else {
            setUserFeeds(prevUserFeeds => [...prevUserFeeds, ...res.data.post])
          }
        }
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
        <GridLayout item='feed'>
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
        </GridLayout>
      ) : !isMoreData ? (
        isMyProfile ? (
          <ProfileNoItem item='feed' action='add' />
        ) : (
          <ProfileNoItem item='feed' />
        )
      ) : null}
    </InfiniteScroll>
  )
}

export default ProfileFeedList
