import { useState } from 'react'

import s from './ProfileImageInputBox.module.scss'

import basicProfileImg from 'assets/img/basic-profile-img.svg'
import uploadImg from 'assets/img/upload.svg'
import { handleSetImage } from 'utils/handleSetImage'

const ProfileImageInputBox = ({ initialImage = basicProfileImg }) => {
  const [profileImage, setProfileImage] = useState(initialImage)

  return (
    <label
      className={s.profileImage}
      onChange={e => handleSetImage({ e, setImages: setProfileImage, type: 'profile' })}
    >
      <img src={profileImage} alt='프로필 이미지 선택' className={s.basicProfileImg} />
      <img src={uploadImg} alt='프로필 이미지 선택' className={s.uploadImg} />
      <input type='file' name='image' accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic' />
    </label>
  )
}

export default ProfileImageInputBox
