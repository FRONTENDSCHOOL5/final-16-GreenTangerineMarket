import { useState } from 'react'

import defaultProfile from 'assets/img/default-profile.svg'

const ProfileImage = ({ image, name, className }) => {
  const [profileImageError, setProfileImageError] = useState(false)

  const handleProfileImageError = e => {
    setProfileImageError(true)
  }
  return (
    <img
      src={image && !profileImageError ? image : defaultProfile}
      onError={handleProfileImageError}
      className={className}
      alt={`${name} 프로필 이미지`}
    />
  )
}

export default ProfileImage
