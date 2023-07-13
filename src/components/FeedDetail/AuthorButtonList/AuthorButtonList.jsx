import { useState } from 'react'
import { useNavigate } from 'react-router'

import s from './AuthorButtonList.module.scss'

import { deletePostAPI } from 'api/feed'
import Modal from 'components/Common/Modal/Modal'

const AuthorButtonList = ({ feedDetail }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeletePost = async () => {
    const res = await deletePostAPI(feedDetail.id)
    navigate(-1)
  }

  const handleEditPost = () => setIsModalOpen(true)

  return (
    <>
      <div className={s.container}>
        <button type='button' onClick={handleEditPost}>
          수정
        </button>
        <button type='button' onClick={handleDeletePost}>
          삭제
        </button>
      </div>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div>hi</div>
        </Modal>
      )}
    </>
  )
}

export default AuthorButtonList
