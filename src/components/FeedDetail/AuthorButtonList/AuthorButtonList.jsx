import { useSetRecoilState } from 'recoil'

import s from './AuthorButtonList.module.scss'

import { deletePostAPI } from 'api/feed'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'
import { showEditModalAtom } from 'recoil/atom/showFlag'
import { useNavigate } from 'react-router'

const AuthorButtonList = ({ feedDetail }) => {
  const setShowEditModal = useSetRecoilState(showEditModalAtom)
  const navigate = useNavigate()

  const handleDeletePost = async () => {
    const res = await deletePostAPI(feedDetail.id)
    navigate(-1)
  }

  return (
    <div className={s.commentChangeButton}>
      <SmallButton onClickEvent={() => setShowEditModal(true)}>수정</SmallButton>
      <SmallButton onClickEvent={handleDeletePost}>삭제</SmallButton>
    </div>
  )
}

export default AuthorButtonList
