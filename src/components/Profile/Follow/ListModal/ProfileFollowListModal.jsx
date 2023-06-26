import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'

import s from './ProfileFollowListModal.module.scss'

import { getFollowListAPI } from 'api/profile'
import Modal from 'components/Common/Modal/Modal'
import { SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import ProfileUserListItem from '../UserListItem/ProfileUserListItem'

const ProfileFollowListModal = ({ item, closeModal, accountname }) => {
  const listRef = useRef()
  const [followList, setFollowList] = useState([])
  const [isMoreData, setIsMoreData] = useState(true)
  const [page, setPage] = useState(0)

  const loadFollowData = async () => {
    if (isMoreData) {
      const res = await getFollowListAPI({ item, accountname, page: page * 10 })
      if (res.status === 200) {
        if (res.data.length === 0) {
          setIsMoreData(false)
        } else {
          setFollowList([...followList, ...res.data])
        }
      }
    }
  }
  const handleScroll = _.throttle(() => {
    if (listRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listRef.current
      if (scrollHeight - clientHeight - scrollTop < 100) {
        setPage(prevPage => prevPage + 1)
      }
    }
  }, 1000)

  const handleScrollEvent = useCallback(handleScroll)

  useEffect(() => {
    listRef.current.addEventListener('scroll', handleScrollEvent)
  }, [])

  useEffect(() => {
    loadFollowData()
  }, [page])

  return (
    <Modal closeModal={closeModal}>
      <div className={s.container}>
        <p className={s.title}>{item === 'following' ? '팔로우' : '팔로워'} 리스트</p>
        <ul className={s.list} ref={listRef}>
          {followList.length ? (
            followList.map(follow => {
              return (
                <ProfileUserListItem
                  key={follow._id}
                  id={follow._id}
                  image={follow.image}
                  username={follow.username}
                  accountname={follow.accountname}
                />
              )
            })
          ) : (
            <p className={s.noUser}>{item === 'following' ? '팔로우하고 있는 유저가 없습니다' : '팔로워가 없습니다'}</p>
          )}
        </ul>
        <SmallWhiteButton onClickEvent={closeModal}>닫기</SmallWhiteButton>
      </div>
    </Modal>
  )
}

export default ProfileFollowListModal
