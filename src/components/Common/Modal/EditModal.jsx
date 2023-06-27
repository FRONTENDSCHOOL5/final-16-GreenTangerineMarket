import { useCallback, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-hot-toast'

import s from './EditModal.module.scss'

import ImageSlider from '../Slider/ImageSlider'
import ImageList from '../List/ImageList'
import { MsmallButton } from '../Button/Msmall/MsmallButton'
import { showEditModalAtom } from 'recoil/atom/showFlag'
import { handleSetImage } from 'utils/handleSetImage'
import formatNumberWithComma from 'utils/formatNumberWithComma'
import { editFeedAPI } from 'api/feed'
import { editProductAPI } from 'api/product'
import getToastStyle from 'utils/getToastStyle'
import { handleUploadImageAPI } from 'utils/handleUploadImage'

const EditModal = ({ type, ...props }) => {
  const formRef = useRef()
  const [images, setImages] = useState([])
  const setShowEditModal = useSetRecoilState(showEditModalAtom)
  // feed state
  const [content, setContent] = useState(undefined)
  const handleChangeContent = useCallback(e => {
    setContent(e.target.value)
  }, [])
  // product state
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const handleChangeItemName = useCallback(e => {
    setItemName(e.target.value)
  }, [])
  const handleChangeItemPrice = e => {
    const inputValue = e.target.value.replaceAll(',', '')
    const numericRegex = /^[0-9\b]+$/
    if (!numericRegex.test(inputValue)) return
    else setItemPrice(inputValue)
  }

  useEffect(() => {
    if (type === 'feed') {
      setImages(props.info.image)
      setContent(props.info.content)
    } //
    else if (type === 'product') {
      setImages(props.info.itemImage)
      setItemName(props.info.itemName)
      setItemPrice(props.info.price)
    }
  }, [])

  const handleClickOutSideModal = e => {
    if (e.target.nodeName === 'DIALOG') setShowEditModal(false)
  }

  const handleEditInfo = async () => {
    if (type === 'feed') {
      const { imageElement, feedContent } = formRef.current.elements
      const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
      await editFeedAPI({ post_id: props.info.id, image: imageURL, content: feedContent.value }).then(() => {
        setShowEditModal(false)
        window.location.reload()
      })
    } //
    else if (type === 'product') {
      const { imageElement } = formRef.current.elements
      const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
      if (itemName === '') return toast('상품 이름을 입력해주세요', { style: getToastStyle() })
      else if (itemPrice === '') return toast('상품 가격을 입력해주세요', { style: getToastStyle() })
      await editProductAPI({ product_id: props.info.id, image: imageURL, itemName, price: itemPrice }).then(() => {
        setShowEditModal(false)
        window.location.reload()
      })
    }
  }

  return (
    <>
      {type === 'feed' && (
        <dialog className={s.modal} open onClick={handleClickOutSideModal}>
          <form ref={formRef}>
            <h2 className={s.title}>게시글 수정하기</h2>
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
              <input
                name='imageElement'
                type='file'
                multiple
                onChange={e => handleSetImage({ e, setImages })}
                accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
              />
            </label>

            <textarea className={s.content} name='feedContent' value={content} onChange={handleChangeContent} />

            <div className={s.buttonContainer}>
              <MsmallButton onClickEvent={handleEditInfo}>수정하기</MsmallButton>
              <MsmallButton onClickEvent={() => setShowEditModal(false)}>수정취소</MsmallButton>
            </div>
          </form>
        </dialog>
      )}

      {type === 'product' && (
        <dialog className={s.modal} open onClick={handleClickOutSideModal}>
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
              <input
                name='imageElement'
                type='file'
                multiple
                onChange={e => handleSetImage({ e, setImages })}
                accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
              />
            </label>
            <label className={s.inputLabel}>
              상품 이름
              <input
                className={s.itemInput}
                type='text'
                name='itemName'
                value={itemName}
                onChange={handleChangeItemName}
              />
            </label>
            <label className={s.inputLabel}>
              상품 가격
              <input
                className={s.itemInput}
                type='text'
                name='itemPrice'
                value={formatNumberWithComma(itemPrice)}
                onChange={handleChangeItemPrice}
              />
            </label>

            <div className={s.buttonContainer}>
              <MsmallButton onClickEvent={handleEditInfo}>수정하기</MsmallButton>
              <MsmallButton onClickEvent={() => setShowEditModal(false)}>수정취소</MsmallButton>
            </div>
          </form>
        </dialog>
      )}
    </>
  )
}

export default EditModal
