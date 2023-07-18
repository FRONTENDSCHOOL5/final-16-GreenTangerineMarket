import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './FeedCreateComponent.module.scss'

import { postFeedAPI } from 'api/feed'
import { SmallButton, SmallButtonDisable } from 'components/Common/Button/Small/SmallButton'
import GuideLine from 'components/Common/GuideLine/GuideLine'
import ImageSlider from 'components/Common/Slider/ImageSlider'
import ImageList from 'components/Common/List/ImageList'
import { handleUploadImageAPI } from 'utils/handleUploadImage'
import { handleSetImage } from 'utils/handleSetImage'
import cameraImg from 'assets/img/icon-camera.svg'
import noImg from 'assets/img/icon-image.svg'

const FeedCreateComponent = () => {
  const formRef = useRef()
  const [contents, setContents] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])
  const [onBtn, setOnBtn] = useState(false)
  const [progressingCreate, setProgressingCreate] = useState(false)
  const navigate = useNavigate()

  const handleSend = async () => {
    setProgressingCreate(true)
    const { imageElement } = formRef.current.elements
    const imageURL = await handleUploadImageAPI({ files: imageElement.files, inputFileElement: imageElement })
    const res = await postFeedAPI({ content: contents, image: imageURL })

    if (res.status === 200) {
      setProgressingCreate(false)
      navigate(-1)
    }
  }

  const handleInputChange = event => {
    const inputText = event.target.value
    if (inputText.length <= 300) {
      setContents(inputText)
    }
  }

  useEffect(() => {
    if (!contents) setOnBtn(false)
    else setOnBtn(true)
  }, [contents])

  return (
    <>
      <h2 className='a11y-hidden'>피드 작성 페이지</h2>
      <GuideLine
        name={'피드'}
        about={'소중한 일상을 들려주세요!'}
        limit={'사진 또는 텍스트 둘 중 한 개는'}
        only={'사진이나 텍스트가 비어 있으면 비어있는 상태로 등록이 됩니다.'}
        photo={'최대 3장'}
        text={'300'}
      />
      <form className={s.form} ref={formRef}>
        <div className={s.imageTitle}>
          <h3>이미지 파일</h3>
          <label className={s.imageInput}>
            <img src={cameraImg} alt='' />
            업로드
            <input
              type='file'
              name='imageElement'
              accept='image/jpg, image/gif, image/png, image/bmp, image/tif, image/heic'
              onChange={e => handleSetImage({ e, setImages: setImagePreviews })}
              multiple
            />
          </label>
        </div>
        {imagePreviews.length ? (
          <div className={s.image}>
            <ImageSlider>
              {typeof imagePreviews === 'string'
                ? imagePreviews.split(',').map((image, i) => {
                    return <ImageList key={image + 'key'} src={image} alt={`${i}번째 이미지`} />
                  })
                : imagePreviews.map((image, i) => {
                    return <ImageList key={image + 'key'} src={image} alt={`${i}번째 이미지`} />
                  })}
            </ImageSlider>
          </div>
        ) : (
          <div className={s.noimage}>
            <img src={noImg} alt='' />
            <p>등록된 사진이 없습니다</p>
          </div>
        )}
        <section className={s.contentContainer}>
          <div className={s.contentTitle}>
            <h3>내용 작성</h3>
            {contents && (
              <button type='button' onClick={() => setContents('')}>
                <span className='a11y-hidden'>내용 초기화</span>
              </button>
            )}
          </div>
          <label htmlFor='content' className='a11y-hidden'>
            텍스트 작성
          </label>
          <div className={s.contentWrapper}>
            <textarea
              id='content'
              type='text'
              className={s.content}
              placeholder='내용을 입력해주세요.'
              value={contents}
              onChange={handleInputChange}
              maxLength={300}
            />
          </div>
          <p className={s.counter}>글자 수: {contents.length}/300</p>
        </section>

        {onBtn && !progressingCreate ? (
          <SmallButton onClickEvent={handleSend}>등록</SmallButton>
        ) : (
          <SmallButtonDisable>{progressingCreate ? '등록중' : '등록'}</SmallButtonDisable>
        )}
      </form>
    </>
  )
}

export default FeedCreateComponent
