import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './FeedCreateComponent.module.scss'

import { postFeedAPI } from 'api/feed'
import { uploadImages } from 'api/image'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'

const FeedCreateComponent = () => {
  const [contents, setContents] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  const navigate = useNavigate()

  const handleSend = async () => {
    if (contents === '' && imageUrl === '') {
      window.alert('이미지나 피드 글을 작성해주세요!!')
      return
    } else {
      const res = await postFeedAPI({ content: contents, image: imageUrl })
      navigate(-1)
    }
  }

  const handleInputChange = event => {
    const inputText = event.target.value
    if (inputText.length <= 300) {
      setContents(inputText)
      setCharacterCount(inputText.length)
    }
  }

  const handleImageUpload = async event => {
    const files = event.target.files
    const fileArray = Array.from(files)

    if (fileArray.length > 3) {
      window.alert('사진은 최대 3장까지 업로드할 수 있습니다!')
      setSelectedImages([])
      setImagePreviews([])
      event.target.value = null
      return
    }

    setSelectedImages(fileArray)

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
    setSelectedImage(files)
  }

  return (
    <>
      <section className={s.section}>
        <form className={s.contentBox}>
          <h2 className={s.title}>피드 작성페이지</h2>
          <p className={s.subTitle}>-여러분의 이야기를 들려주세요!-</p>
          <section className={s.imageContainer}>
            <h2>사진 파일 올리기</h2>
            <label htmlFor='imageUpload' className={s.a11yHidden}>
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
                <img key={index} src={preview} alt={`Preview ${index + 1}`} className={s.imagePreview} />
              ))}
            </div>
          </section>

          <section className={s.contentContainer}>
            <h2>피드 내용 작성</h2>
            <label htmlFor='content' className={s.a11yHidden}>
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
            <div className={s.counter}>글자 수: {characterCount}/300</div>
          </section>

          <SmallButton type='button' onClickEvent={handleSend}>
            등록
          </SmallButton>
        </form>
      </section>
    </>
  )
}

export default FeedCreateComponent
