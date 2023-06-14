import s from './ProfileImageInputBox.module.scss'

import uploadImg from 'assets/img/upload.svg'

const ProfileImageInputBox = ({ image, setImage }) => {
  const handleProfileImageUpload = e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
    }

    file && reader.readAsDataURL(file)
  }

  return (
    <label className={s.profileImage} onChange={handleProfileImageUpload}>
      <img src={image} alt='프로필 이미지 선택' className={s.basicProfileImg} />
      <img src={uploadImg} alt='프로필 이미지 선택' className={s.uploadImg} />
      <input type='file' />
    </label>
  )
}

export default ProfileImageInputBox
