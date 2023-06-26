import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './FeedCreateComponent.module.scss'

import { postFeedAPI } from 'api/feed'
import { uploadImages } from 'api/image'
import { SmallButton, SmallButtonDisable } from 'components/Common/Button/Small/SmallButton'
import GuideLine from 'components/Common/GuideLine/GuideLine'

const FeedCreateComponent = () => {
  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])
  const [onBtn, setOnBtn] = useState(false)

  const [progressingCreate, setProgressingCreate] = useState(false)
  const navigate = useNavigate()

  const handleSend = async () => {
    setProgressingCreate(true)
    const res = await postFeedAPI({ content: contents, image: imageUrl })

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

  const handleImageUpload = async event => {
    const files = event.target.files
    const fileArray = Array.from(files)

    if (fileArray.length > 3) {
      window.alert('사진은 최대 3장까지 업로드할 수 있습니다!')
      setImagePreviews([])
      event.target.value = null
      return
    }

    const imagePreviewsArray = await Promise.all(
      fileArray.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
          reader.readAsDataURL(file)
        })
      }),
    )

    setImagePreviews(imagePreviewsArray)

    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i])
    }
    const res = await uploadImages(formData)
    let answer = ''
    for (let i = 0; i < res.data.length; i++) {
      if (i !== res.data.length - 1) {
        answer += `https://api.mandarin.weniv.co.kr/${res.data[i].filename},`
      } else {
        answer += `https://api.mandarin.weniv.co.kr/${res.data[i].filename}`
      }
    }
    setImageUrl(answer)
  }

  useEffect(() => {
    if (imageUrl !== '' || contents !== '') {
      setOnBtn(true)
    } else {
      setOnBtn(false)
    }
  }, [imageUrl, contents])

  return (
    <>
      <section className={s.section}>
        <GuideLine
          name={'피드'}
          about={'소중한 일상을 들려주세요!'}
          limit={'사진 또는 텍스트 둘 중 한개는'}
          only={'사진이나 텍스트가 비어 있으면 비어있는 상태로 등록이 됩니다.'}
          photo={'최대 3장'}
          text={'300'}
        />
        <form className={s.contentBox}>
          <section className={s.imageContainer}>
            <h2>사진 파일 올리기</h2>
            <label htmlFor='imageUpload' className='a11y-hidden'>
              이미지 업로드
            </label>
            <input
              id='imageUpload'
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              multiple
              className={s.imageInput}
            />
            <div className={s.imagePreviewContainer}>
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`${index + 1}번째 이미지 미리보기`} className={s.imagePreview} />
              ))}
            </div>
          </section>

          <section className={s.contentContainer}>
            <h2>피드 내용 작성</h2>
            <label htmlFor='content' className='a11y-hidden'>
              텍스트 작성
            </label>
            <textarea
              id='content'
              type='text'
              className={s.content}
              placeholder='내용을 입력해주세요.'
              value={contents}
              onChange={handleInputChange}
              maxLength={300}
            />
            <div className={s.counter}>글자 수: {contents.length}/300</div>
          </section>

          {onBtn === true ? (
            !progressingCreate ? (
              <SmallButton onClickEvent={handleSend}>등록</SmallButton>
            ) : (
              <SmallButtonDisable>{!progressingCreate ? '등록' : '진행 중'}</SmallButtonDisable>
            )
          ) : (
            <SmallButtonDisable>등록</SmallButtonDisable>
          )}
        </form>
      </section>
    </>
  )
}

export default FeedCreateComponent
