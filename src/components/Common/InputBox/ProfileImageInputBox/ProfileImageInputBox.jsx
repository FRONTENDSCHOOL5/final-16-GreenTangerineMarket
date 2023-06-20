import { useState } from 'react'

import s from './ProfileImageInputBox.module.scss'

import basicProfileImg from 'assets/img/basic-profile-img.svg'
import uploadImg from 'assets/img/upload.svg'

const ProfileImageInputBox = ({ initialImage = basicProfileImg }) => {
  const [profileImage, setProfileImage] = useState(initialImage)

  const handleSetProfileImage = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = () => {
      setProfileImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <label className={s.profileImage} onChange={handleSetProfileImage}>
      <img src={profileImage} alt='프로필 이미지 선택' className={s.basicProfileImg} />
      <img src={uploadImg} alt='프로필 이미지 선택' className={s.uploadImg} />
      <input type='file' name='image' accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic' />
    </label>
  )
}

export default ProfileImageInputBox
