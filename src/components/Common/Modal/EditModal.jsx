import { useRef, useState } from 'react'

import s from './EditModal.module.scss'

import ImageSlider from '../Slider/ImageSlider'
import ImageList from '../List/ImageList'
import { MsmallButton } from '../Button/Msmall/MsmallButton'
import { handleSetImage } from 'utils/handleSetImage'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import { editFeedAPI } from 'api/feed'
import { useNavigate, useParams } from 'react-router-dom'

const EditModal = ({ type, ...props }) => {
  const params = useParams()
  const navigate = useNavigate()
  const formRef = useRef()
  const [images, setImages] = useState([])
  // type -> feed / product
  // feed -> content / image
  // product -> itemName / price / link / itemImage

  const handleEditInfo = async () => {
    const { imageFile, content } = formRef.current.elements
    const imageURL = handleUploadImageAPI({ files: imageFile.files, inputFileElement: imageFile })
    const res = await editFeedAPI({ post_id: params.id, image: imageURL, content: content.value })
    console.log(res)
    // navigate(-1)
  }

  return (
    <>
      {type === 'feed' && (
        <dialog className={s.modal} open>
          <h2 className={s.title}>게시글 수정하기</h2>
          <form ref={formRef}>
            <ImageSlider>
              {typeof images === 'string'
                ? images.split(',').map(image => {
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

            <textarea className={s.content} name='content'></textarea>

            <div className={s.buttonContainer}>
              <MsmallButton onClickEvent={handleEditInfo}>수정하기</MsmallButton>
              <MsmallButton>수정취소</MsmallButton>
            </div>
          </form>
        </dialog>
      )}

      {type === 'product' && (
        <dialog className={s.modal} open>
          <h2 className={s.title}>상품 수정하기</h2>
          <form ref={formRef}>
            <ImageSlider>
              {typeof images === 'string'
                ? images.split(',').map(image => {
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
      )}
    </>
  )
}

export default EditModal
