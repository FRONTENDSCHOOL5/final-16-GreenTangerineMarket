import { useCallback, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import s from './EditModal.module.scss'

import ImageSlider from '../Slider/ImageSlider'
import ImageList from '../List/ImageList'
import { MsmallButton } from '../Button/Msmall/MsmallButton'
import { handleSetImage } from 'utils/handleSetImage'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import { showEditModalAtom } from 'recoil/atom/showFlag'
import { editFeedAPI } from 'api/feed'

const EditModal = ({ type, ...props }) => {
  const formRef = useRef()
  const [images, setImages] = useState([])
  const [content, setContent] = useState(undefined)
  const setShowEditModal = useSetRecoilState(showEditModalAtom)

  const handleChangeContent = useCallback(e => {
    setContent(e.target.value)
  }, [])

  useEffect(() => {
    setImages(props.info.image)
    setContent(props.info.content)
  }, [])

  // type -> feed / product
  // feed -> content / image
  // product -> itemName / price / link / itemImage

  const handleEditInfo = async () => {
    const { feedImage, feedContent } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: feedImage.files, inputFileElement: feedImage })
    const res = await editFeedAPI({ post_id: props.info.id, image: imageURL, content: feedContent.value })

    setShowEditModal(false)
    window.location.reload()
  }

  return (
    <>
      {type === 'feed' && (
        <dialog className={s.modal} open>
          <h2 className={s.title}>게시글 수정하기</h2>
          <form ref={formRef}>
            <ImageSlider>
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
              <input name='feedImage' type='file' multiple onChange={e => handleSetImage({ e, setImages })} />
            </label>

            <textarea className={s.content} name='feedContent' value={content} onChange={handleChangeContent} />

            <div className={s.buttonContainer}>
              <MsmallButton onClickEvent={handleEditInfo}>수정하기</MsmallButton>
              <MsmallButton onClickEvent={() => setShowEditModal(false)}>수정취소</MsmallButton>
            </div>
          </form>
        </dialog>
      )}

      {/* {type === 'product' && (
        <dialog className={s.modal} open>
          <h2 className={s.title}>상품 수정하기</h2>
          <form ref={formRef}>
            <ImageSlider>
              {typeof images === 'string'
                ? images.split(',').map(image => {
                    console.log(image)
                    return <ImageList key={image} src={image} alt='' />
                  })
                : images.map(image => {
                    return <ImageList src={image} alt='' />
                  })}
            </ImageSlider>
            <label className={s.inputFile}>
              사진 업로드
              <input name='imageFile' type='file' multiple onChange={e => handleSetImage({ e, setImages })} />
            </label>

            <input className={s.itemInput} type='text' name='itemName' placeholder='상품의 이름을 입력해주세요' />
            <input className={s.itemInput} type='text' name='itemPrice' placeholder='상품의 가격을 입력해주세요' />

            <div className={s.buttonContainer}>
              <MsmallButton onClickEvent={handleEditInfo}>수정하기</MsmallButton>
              <MsmallButton>수정취소</MsmallButton>
            </div>
          </form>
        </dialog>
      )} */}
    </>
  )
}

export default EditModal
