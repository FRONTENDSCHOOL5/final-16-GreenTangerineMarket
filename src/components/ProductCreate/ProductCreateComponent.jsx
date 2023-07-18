import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './ProductCreateComponent.module.scss'

import { postProductAPI } from 'api/product'
import { SmallButton, SmallButtonDisable } from 'components/Common/Button/Small/SmallButton'
import GuideLine from 'components/Common/GuideLine/GuideLine'
import { handleSetImage } from 'utils/handleSetImage'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import cameraImg from 'assets/img/icon-camera.svg'
import noImg from 'assets/img/icon-image.svg'

const ProductCreateComponent = () => {
  const formRef = useRef()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imagePreviews, setImagePreviews] = useState('')
  const [onBtn, setOnBtn] = useState(false)
  const [progressingCreate, setProgressingCreate] = useState(false)
  const navigate = useNavigate()

  const handleSend = async () => {
    setProgressingCreate(true)
    const { imageElement } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
    const res = await postProductAPI({
      link: '',
      itemName: name,
      price: parseInt(price),
      itemImage: imageURL,
    })

    if (res.status === 200) {
      setProgressingCreate(false)
      navigate(-1)
    }
  }

  const handleInputChange = event => {
    const inputText = event.target.value
    if (inputText.length <= 30) {
      setName(inputText)
    }
  }

  const handlePriceChange = event => {
    const regex = /^[0-9]+$/
    const inputPrice = event.target.value

    if (inputPrice[0] === '0') {
      return
    }
    if ((regex.test(inputPrice) && inputPrice.length <= 20) || inputPrice === '') {
      setPrice(inputPrice)
    }
  }

  useEffect(() => {
    if (name && price) setOnBtn(true)
    else setOnBtn(false)
  }, [name, price])
  return (
    <>
      <h2 className='a11y-hidden'>상품 등록 페이지</h2>
      <GuideLine
        name={'상품'}
        about={'물건을 소개해주세요!'}
        limit={'사진, 상품명, 가격 모두'}
        only={'가격은 1원 이상부터 입력이 가능합니다.'}
        photo={'오직 1장'}
        text={'30'}
      />
      <form className={s.form} ref={formRef}>
        <section className={s.imageContainer}>
          <div className={s.imageTitle}>
            <h3>이미지 파일</h3>
            <label htmlFor='productImg' className={s.imageInput}>
              <img src={cameraImg} alt='' />
              업로드
              <input
                id='productImg'
                name='imageElement'
                type='file'
                accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
                onChange={e => handleSetImage({ e, setImages: setImagePreviews })}
              />
            </label>
          </div>
          {imagePreviews && imagePreviews.length ? (
            <div className={s.image}>
              <img src={imagePreviews} alt='상품 이미지 미리보기' className={s.imagePreview} />
            </div>
          ) : (
            <div className={s.noimage}>
              <img src={noImg} alt='' />
              <p>등록된 사진이 없습니다</p>
            </div>
          )}
        </section>
        <section className={s.nameContainer}>
          <div className={s.title}>
            <h3>상품명</h3>
            {name && (
              <button type='button' onClick={() => setName('')}>
                <span className='a11y-hidden'>내용 초기화</span>
              </button>
            )}
          </div>
          <div className={s.nameInput}>
            <label className='a11y-hidden'>상품명 입력</label>
            <input
              id='productName'
              type='text'
              className={s.name}
              placeholder='상품명을 적어주세요.'
              value={name}
              onChange={handleInputChange}
              maxLength={30}
            />
            <p className={s.counter}>{name.length}/30</p>
          </div>
        </section>

        <section className={s.priceContainer}>
          <div className={s.title}>
            <h3>판매가</h3>
            {price && (
              <button type='button' onClick={() => setPrice('')}>
                <span className='a11y-hidden'>내용 초기화</span>
              </button>
            )}
          </div>
          <label htmlFor='productPrice' className='a11y-hidden'>
            가격
          </label>
          <input
            id='productPrice'
            type='text'
            className={s.price}
            onChange={handlePriceChange}
            value={price}
            placeholder='0'
          />
          <span className={s.won}>원</span>
        </section>

        {onBtn && !progressingCreate ? (
          <SmallButton onClickEvent={handleSend}>등록</SmallButton>
        ) : (
          <SmallButtonDisable>{progressingCreate ? `진행중` : `등록`}</SmallButtonDisable>
        )}
      </form>
    </>
  )
}

export default ProductCreateComponent
