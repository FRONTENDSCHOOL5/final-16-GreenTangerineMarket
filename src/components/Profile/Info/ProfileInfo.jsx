import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import { useParams } from 'react-router'

import s from './ProfileInfo.module.scss'

import { getProfileInfoAPI } from 'api/profile'
import ProfileImage from 'components/Common/Feed/ProfileImage/ProfileImage'
import { MsmallButton } from 'components/Common/Button/Msmall/MsmallButton'
import FollowButton from '../Follow/FollowButton'
import UnfollowButton from '../Follow/UnfollowButton'

const ProfileInfo = () => {
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [isFollow, setIsFollow] = useState(false)
  const myInfo = useRecoilValue(myInfoAtom)
  const { accountname } = useParams()
  useEffect(() => {
    setIsMyProfile(myInfo.accountname === accountname)
    const getProfileData = async () => {
      const res = await getProfileInfoAPI(accountname)
      setProfileData(res)
      setIsFollow(res.isfollow)
      console.log(res)
    }
    getProfileData()
  }, [])
  const handleProfileEditClick = () => {}
  const updateProfileData = data => {
    setProfileData(data)
    setIsFollow(!isFollow)
  }

  return (
    <>
      {profileData ? (
        <section>
          <ProfileImage image={profileData.image} name={profileData.accountname} />
          <p>{profileData.accountname}</p>
          <p>{profileData.username}</p>
          <p>{profileData.intro}</p>
          <p>팔로워 : {profileData.followerCount}</p>
          <p>팔로우 : {profileData.followingCount}</p>
          {isMyProfile ? (
            <MsmallButton onClickEvent={handleProfileEditClick}>프로필 수정</MsmallButton>
          ) : isFollow ? (
            <UnfollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          ) : (
            <FollowButton accountname={profileData.accountname} updateProfileData={updateProfileData} />
          )}
        </section>
      ) : null}
    </>
  )
}

export default ProfileInfo
