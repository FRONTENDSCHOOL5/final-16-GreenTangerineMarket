import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import s from './ProfileEditModal.module.scss'

import { editMyProfileInfoAPI } from 'api/profile'
import ProfileImageInputBox from 'components/Common/InputBox/ProfileImageInputBox/ProfileImageInputBox'
import TextInputBox from 'components/Common/InputBox/TextInputBox/TextInputBox'
import { ACCOUNTNAME_REGEX } from 'constants/REGEX'
import { myInfoAtom } from 'recoil/atom/user'
import getToastStyle from 'utils/getToastStyle'
import { SmallButton, SmallButtonDisable, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import Modal from 'components/Common/Modal/Modal'

const ProfileEditModal = ({ myInfo, closeModal, handleProfileUpdate }) => {
  const formRef = useRef()
  const [profileImage, setProfileImage] = useState(myInfo.image)
  const [accountNameError, setAccountNameError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [introError, setIntroError] = useState('')
  const [btnFlag, setBtnFlag] = useState(true)
  const [progressingProfileEdit, setProgressingProfileEdit] = useState(false)
  const setMyInfoAtom = useSetRecoilState(myInfoAtom)
  const navigate = useNavigate()

  const handleEdit = async image => {
    const { accountname, username, intro } = formRef.current.elements
    setProfileImage(image)
    setProgressingProfileEdit(true)
    const res = await editMyProfileInfoAPI({
      username: username.value,
      accountname: accountname.value,
      intro: intro.value,
      image: image,
    })
    if (res.status === 200) {
      setMyInfoAtom({ accountname: accountname.value })
      navigate(`/profile/${accountname.value}`)
      closeModal()
      handleProfileUpdate()
      toast('프로필이 수정되었습니다', { style: getToastStyle() })
      setProgressingProfileEdit(false)
    } else {
      toast('프로필 수정에 실패했습니다', { style: getToastStyle() })
      setProgressingProfileEdit(false)
    }
  }

  const handleProfileUploadClick = async () => {
    const { image } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: image.files, inputFileElement: image })
    await handleEdit(imageURL)
  }

  useEffect(() => {
    if (!accountNameError.isError && !userNameError.isError) setBtnFlag(true)
    else setBtnFlag(false)
  }, [accountNameError, userNameError])

  return (
    <Modal closeModal={closeModal}>
      <form ref={formRef} className={s.container}>
        <h3 className={s.title}>프로필 수정</h3>
        <ProfileImageInputBox initialImage={profileImage} />
        <TextInputBox
          initialValue={myInfo.accountname}
          name='accountname'
          type='text'
          text='계정 ID'
          error={accountNameError}
          setError={setAccountNameError}
          pattern={ACCOUNTNAME_REGEX}
          required={true}
        />
        <TextInputBox
          initialValue={myInfo.username}
          name='username'
          type='text'
          text='사용자 이름'
          error={userNameError}
          setError={setUserNameError}
          required={true}
        />
        <TextInputBox
          initialValue={myInfo.intro}
          name='intro'
          type='text'
          text='소개 [선택]'
          error={introError}
          setError={setIntroError}
        />
        <div className={s.buttonContainer}>
          <SmallWhiteButton onClickEvent={closeModal}>취소</SmallWhiteButton>
          {btnFlag && !progressingProfileEdit ? (
            <SmallButton onClickEvent={handleProfileUploadClick}>수정</SmallButton>
          ) : (
            <SmallButtonDisable>수정</SmallButtonDisable>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default ProfileEditModal
