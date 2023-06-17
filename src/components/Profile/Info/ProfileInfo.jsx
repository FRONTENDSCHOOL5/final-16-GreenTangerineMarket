import { useEffect, useState } from 'react'
import s from './ProfileInfo.module.scss'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import { useParams } from 'react-router'
import { followProfileAPI, getProfileInfoAPI, unfollowProfileAPI } from 'api/profile'
import ProfileImage from 'components/Common/Feed/ProfileImage/ProfileImage'
import { MsmallButton, MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import { toast } from 'react-hot-toast'
import getToastStyle from 'utils/getToastStyle'

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
  const handleUnfollowClick = async () => {
    const res = await unfollowProfileAPI(profileData.accountname)
    if (res.status === 200) {
      console.log(res)
      setProfileData(res.data.profile)
      setIsFollow(!isFollow)
      toast('팔로우취소했습니다', {
        style: getToastStyle(),
      })
    }
  }
  const handleFollowClick = async () => {
    const res = await followProfileAPI(profileData.accountname)
    if (res.status === 200) {
      console.log(res)
      setProfileData(res.data.profile)
      setIsFollow(!isFollow)
      toast('팔로우했습니다', {
        style: getToastStyle(),
      })
    }
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
            <MsmallWhiteButton onClickEvent={handleUnfollowClick}>팔로우 취소</MsmallWhiteButton>
          ) : (
            <MsmallButton onClickEvent={handleFollowClick}>팔로우</MsmallButton>
          )}
        </section>
      ) : null}
    </>
  )
}

export default ProfileInfo
