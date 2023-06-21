import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'

import s from './ProfileInfo.module.scss'

import { getProfileInfoAPI } from 'api/profile'
import ProfileImage from 'components/Common/Feed/ProfileImage/ProfileImage'
import FollowButton from '../Follow/FollowButton'
import UnfollowButton from '../Follow/UnfollowButton'
import ProfileEditButton from '../EditButton/ProfileEditButton'
import ProfileMenu from '../Menu/ProfileMenu'

const ProfileInfo = ({ accountname }) => {
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [isFollow, setIsFollow] = useState(false)
  const [updateFlag, setUpdateFlag] = useState(false)
  const myInfo = useRecoilValue(myInfoAtom)
  useEffect(() => {
    setIsMyProfile(myInfo.accountname === accountname)
    const getProfileData = async () => {
      const res = await getProfileInfoAPI(accountname)
      setProfileData(res)
      setIsFollow(res.isfollow)
    }
    getProfileData()
  }, [accountname, updateFlag])
  const updateProfileData = data => {
    setProfileData(data)
    setIsFollow(!isFollow)
  }
  const updateMyProfile = () => {
    setUpdateFlag(!updateFlag)
  }

  return (
    <>
      {profileData && (
        <section className={s.container}>
          {isMyProfile && <ProfileMenu />}
          <div className={s.followInfo}>
            <div className={s.follow}>
              <p className={s.text}>팔로워</p>
              <p className={s.count}>{profileData.followerCount}</p>
              <span className='a11y-hidden'>명</span>
            </div>
            <ProfileImage image={profileData.image} name={profileData.accountname} className={s.image} />
            <div className={s.follow}>
              <p className={s.text}>팔로우</p>
              <p className={s.count}>{profileData.followingCount}</p>
              <span className='a11y-hidden'>명</span>
            </div>
          </div>
          <p className={s.username}>{profileData.username}</p>
          <p className={s.accountname}>@{profileData.accountname}</p>
          <p className={s.intro}>{profileData.intro}</p>
          {isMyProfile ? (
            <ProfileEditButton handleProfileUpdate={updateMyProfile} />
          ) : isFollow ? (
            <UnfollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          ) : (
            <FollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          )}
        </section>
      )}
    </>
  )
}

export default ProfileInfo
