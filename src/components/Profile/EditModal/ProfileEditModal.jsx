import { MsmallButton, MsmallButtonDisable, MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import s from './ProfileEditModal.module.scss'

import ProfileImageInputBox from 'components/Common/InputBox/ProfileImageInputBox/ProfileImageInputBox'
import TextInputBox from 'components/Common/InputBox/TextInputBox/TextInputBox'
import { useEffect, useRef, useState } from 'react'
import { ACCOUNTNAME_REGEX } from 'constants/REGEX'
import { verifyAccountNameAPI } from 'api/user'
import { ALREADY_EXSIST_ACCOUNTNAME, UNSPECIFIED_CHAR_ACCOUNTNAME } from 'constants/SIGN_ERROR'
import { editMyProfileInfoAPI } from 'api/profile'
import { useSetRecoilState } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import getToastStyle from 'utils/getToastStyle'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { SmallButton, SmallButtonDisable, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'

const ProfileEditModal = ({ myInfo, closeModal, handleProfileUpdate }) => {
  const formRef = useRef()

  const [profileImage, setProfileImage] = useState(myInfo.image)
  const [accountNameError, setAccountNameError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [introError, setIntroError] = useState('')
  const [btnFlag, setBtnFlag] = useState(true)
  const setMyInfoAtom = useSetRecoilState(myInfoAtom)
  const navigate = useNavigate()

  const handleOutsideClick = e => {}
  const handleProfileUploadClick = async () => {
    const { accountname, username, intro } = formRef.current.elements
    const res = await editMyProfileInfoAPI({
      username: username.value,
      accountname: accountname.value,
      intro: intro.value,
      image: profileImage,
    })
    if (res.status === 200) {
      setMyInfoAtom({ accountname: accountname.value })
      navigate(`/profile/${accountname.value}`)
      closeModal()
      handleProfileUpdate()
      toast('프로필이 수정되었습니다', { style: getToastStyle() })
    }
  }
  useEffect(() => {
    if (!accountNameError.isError && !userNameError.isError) setBtnFlag(true)
    else setBtnFlag(false)
  }, [accountNameError, userNameError])
  return (
    <div className={s.modal} onClick={handleOutsideClick}>
      <form ref={formRef} className={s.container}>
        <p className={s.title}>프로필 수정</p>
        <ProfileImageInputBox initialImage={profileImage} setImage={setProfileImage} />
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
          {btnFlag ? (
            <SmallButton onClickEvent={handleProfileUploadClick}>수정</SmallButton>
          ) : (
            <SmallButtonDisable>수정</SmallButtonDisable>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProfileEditModal
