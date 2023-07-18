import { useCallback, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-hot-toast'

import s from './ProductDetailAuthorButton.module.scss'

import { myInfoAtom } from 'recoil/atom/user'
import { SmallButton, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import Modal from 'components/Common/Modal/Modal'
import { deleteProductAPI, editProductAPI } from 'api/product'
import getToastStyle from 'utils/getToastStyle'
import { useNavigate } from 'react-router-dom'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import { handleSetImage } from 'utils/handleSetImage'
import formatNumberWithComma from 'utils/formatNumberWithComma'
import noImg from 'assets/img/icon-image.svg'

const ProductDetailAuthorButton = ({ product, id }) => {
  const formRef = useRef()
  const myInfo = useRecoilValue(myInfoAtom)
  const [showEditModal, setShowEditModal] = useState(false)
  const [image, setImage] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const navigate = useNavigate()

  const handleChangeItemName = useCallback(e => {
    setItemName(e.target.value)
  }, [])
  const handleChangeItemPrice = e => {
    const inputValue = e.target.value.replaceAll(',', '')
    const numericRegex = /^[0-9\b]+$/

    if (inputValue === '') setItemPrice(inputValue)
    else if (!numericRegex.test(inputValue)) return

    setItemPrice(inputValue)
  }

  const handleDeleteProduct = async () => {
    const res = await deleteProductAPI(id)
    if (res.status === 200) {
      toast('상품을 삭제했습니다', { style: getToastStyle() })
      navigate(-1)
    }
  }

  const handleEditProduct = async () => {
    const { imageElement } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
    if (itemName === '') return toast('상품 이름을 입력해주세요', { style: getToastStyle() })
    else if (itemPrice === '') return toast('상품 가격을 입력해주세요', { style: getToastStyle() })
    await editProductAPI({ product_id: id, image: imageURL, itemName, price: itemPrice }).then(() => {
      setShowEditModal(false)
      window.location.reload()
    })
  }

  return (
    <>
      {product && myInfo.accountname === product.author.accountname && (
        <div className={s.button}>
          <SmallButton onClickEvent={() => setShowEditModal(true)}>수정</SmallButton>
          <SmallWhiteButton onClickEvent={handleDeleteProduct}>삭제</SmallWhiteButton>
        </div>
      )}
      {showEditModal && (
        <Modal closeModal={() => setShowEditModal(false)}>
          <form ref={formRef} className={s.modal}>
            <h3 className={s.title}>상품 수정하기</h3>
            {image && image.length ? (
              <div className={s.image}>
                <img src={image} alt='상품 이미지 미리보기' className={s.imagePreview} />
              </div>
            ) : (
              <div className={s.noimage}>
                <img src={noImg} alt='' />
                <p>등록된 사진이 없습니다</p>
              </div>
            )}
            <label className={s.inputFile}>
              사진 업로드
              <input
                name='imageElement'
                type='file'
                accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
                onChange={e => handleSetImage({ e, setImages: setImage })}
              />
            </label>
            <label className={s.inputLabel}>
              상품명
              <input
                className={s.itemInput}
                type='text'
                name='itemName'
                value={itemName}
                onChange={handleChangeItemName}
              />
            </label>
            <label className={s.inputLabel}>
              판매가
              <input
                className={s.itemInput}
                type='text'
                name='itemPrice'
                value={formatNumberWithComma(itemPrice)}
                onChange={handleChangeItemPrice}
              />
            </label>
            <div className={s.buttonContainer}>
              <SmallWhiteButton onClickEvent={() => setShowEditModal(false)}>취소</SmallWhiteButton>
              <SmallButton onClickEvent={handleEditProduct}>수정</SmallButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default ProductDetailAuthorButton
