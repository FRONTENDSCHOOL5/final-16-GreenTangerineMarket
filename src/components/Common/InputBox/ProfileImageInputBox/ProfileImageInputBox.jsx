import { useState } from 'react'

import s from './ProfileImageInputBox.module.scss'

import { uploadImage } from 'api/image'
import { PROFILE_IMAGE_ONLY_UPLOAD_IMAGE } from 'constants/SIGN_ERROR'
import basicProfileImg from 'assets/img/basic-profile-img.svg'
import uploadImg from 'assets/img/upload.svg'

const ProfileImageInputBox = ({ setImage }) => {
  const [profileImage, setProfileImage] = useState(basicProfileImg)

  const handleProfileImageUpload = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    const reader = new FileReader()
    formData.append('image', file)
    const res = await uploadImage(formData)

    if (res.data.message === PROFILE_IMAGE_ONLY_UPLOAD_IMAGE) {
      alert(PROFILE_IMAGE_ONLY_UPLOAD_IMAGE)
    } else {
      reader.onloadend = () => setProfileImage(reader.result)
      file && reader.readAsDataURL(file)
      setImage(res.data.filename)
    }
  }

  return (
    <label className={s.profileImage} onChange={handleProfileImageUpload}>
      <img src={profileImage} alt='프로필 이미지 선택' className={s.basicProfileImg} />
      <img src={uploadImg} alt='프로필 이미지 선택' className={s.uploadImg} />
      <input type='file' />
    </label>
  )
}

export default ProfileImageInputBox
