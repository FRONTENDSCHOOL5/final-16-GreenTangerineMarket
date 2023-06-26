import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'

import s from './ProfileInfo.module.scss'

import { getProfileInfoAPI } from 'api/profile'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import ProfileEditButton from '../Edit/Button/ProfileEditButton'
import ProfileMenu from '../Menu/ProfileMenu'
import ProfileFollowListModal from '../Follow/ListModal/ProfileFollowListModal'
import ProfileUnfollowButton from '../Follow/Button/ProfileUnfollowButton'
import ProfileFollowButton from '../Follow/Button/ProfileFollowButton'

const ProfileInfo = ({ accountname }) => {
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [isFollow, setIsFollow] = useState(false)
  const [updateFlag, setUpdateFlag] = useState(false)
  const [modalOpen, setModalOpen] = useState(null)
  const myInfo = useRecoilValue(myInfoAtom)

  const getProfileData = async () => {
    const res = await getProfileInfoAPI(accountname)
    setProfileData(res)
    setIsFollow(res.isfollow)
  }

  const updateProfileData = data => {
    setProfileData(data)
    setIsFollow(!isFollow)
  }
  const updateMyProfile = () => setUpdateFlag(!updateFlag)

  const handleFollowerClick = () => setModalOpen('follower')

  const handleFollowingClick = () => setModalOpen('following')

  const closeModal = () => setModalOpen(null)

  useEffect(() => {
    setIsMyProfile(myInfo.accountname === accountname)
    getProfileData()
    closeModal()
  }, [accountname, updateFlag])

  return (
    <>
      {profileData && (
        <section className={s.container}>
          {isMyProfile && <ProfileMenu />}
          <div className={s.followInfo}>
            <button type='button' onClick={handleFollowerClick} className={s.follow}>
              <p className={s.text}>팔로워</p>
              <p className={s.count}>{profileData.followerCount}</p>
              <span className='a11y-hidden'>명</span>
            </button>
            <ProfileImage image={profileData.image} name={profileData.accountname} className={s.image} />
            <button type='button' onClick={handleFollowingClick} className={s.follow}>
              <p className={s.text}>팔로우</p>
              <p className={s.count}>{profileData.followingCount}</p>
              <span className='a11y-hidden'>명</span>
            </button>
          </div>
          <p className={s.username}>{profileData.username}</p>
          <p className={s.accountname}>@{profileData.accountname}</p>
          <p className={s.intro}>{profileData.intro}</p>
          {isMyProfile ? (
            <ProfileEditButton handleProfileUpdate={updateMyProfile} />
          ) : isFollow ? (
            <ProfileUnfollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          ) : (
            <ProfileFollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          )}
        </section>
      )}
      {modalOpen && <ProfileFollowListModal item={modalOpen} closeModal={closeModal} accountname={accountname} />}
    </>
  )
}

export default ProfileInfo
