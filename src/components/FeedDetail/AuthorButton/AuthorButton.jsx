import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import s from './AuthorButton.module.scss'

import { deletePostAPI, editFeedAPI } from 'api/feed'
import Modal from 'components/Common/Modal/Modal'
import ImageSlider from 'components/Common/Slider/ImageSlider'
import ImageList from 'components/Common/List/ImageList'
import { handleSetImage } from 'utils/handleSetImage'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import { SmallButton, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import { useSearchParams } from 'react-router-dom'

const AuthorButton = ({ feedDetail }) => {
  const [isEdit, setIsEdit] = useSearchParams()
  const formRef = useRef()
  const [images, setImages] = useState([])
  const [content, setContent] = useState(null)
  const handleChangeContent = useCallback(e => {
    setContent(e.target.value)
  }, [])
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDeletePost = async () => {
    const res = await deletePostAPI(feedDetail.id)
    navigate(-1)
  }

  const handleEditPost = () => setShowEditModal(true)

  const handleEditInfo = async () => {
    const { imageElement, feedContent } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
    await editFeedAPI({ post_id: feedDetail.id, image: imageURL, content: feedContent.value }).then(() => {
      setShowEditModal(false)
      window.location.reload()
    })
  }

  const closeModal = () => {
    setShowEditModal(false)
    setImages(feedDetail.image)
    setContent(feedDetail.content)
  }

  useEffect(() => {
    setImages(feedDetail.image)
    setContent(feedDetail.content)
    if (isEdit.get('edit')) {
      setShowEditModal(true)
    }
  }, [])

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
      {showEditModal && (
        <Modal closeModal={closeModal}>
          <form ref={formRef} className={s.modal}>
            <h3 className={s.title}>게시글 수정하기</h3>
            <ImageSlider imageType={'피드'}>
              {typeof images === 'string'
                ? images.split(',').map((image, i) => {
                    return <ImageList key={image + 'key'} src={image} alt={`${i}번째 이미지`} />
                  })
                : images.map((image, i) => {
                    return <ImageList key={image + 'key'} src={image} alt={`${i}번째 이미지`} />
                  })}
            </ImageSlider>
            <label className={s.inputFile}>
              사진 업로드
              <input
                name='imageElement'
                type='file'
                multiple
                onChange={e => handleSetImage({ e, setImages })}
                accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
              />
            </label>
            <p className={s.guide}>* 이미지는 최대 3개까지 등록가능합니다</p>
            <div className={s.contentWrapper}>
              <textarea className={s.content} name='feedContent' value={content} onChange={handleChangeContent} />
            </div>
            <div className={s.buttonContainer}>
              <SmallWhiteButton onClickEvent={closeModal}>취소</SmallWhiteButton>
              <SmallButton onClickEvent={handleEditInfo}>수정</SmallButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default AuthorButton
