import { useEffect, useRef, useState } from 'react'

import s from './FeedEdit.module.scss'

import MainLayout from 'components/Common/Layout/Main/MainLayout'
import { getFeedInfoAPI } from 'api/feed'
import ImageSlider from 'components/Common/Slider/ImageSlider'
import ImageList from 'components/Common/List/ImageList'

const FeedEdit = () => {
  const inputFileRef = useRef()
  const [images, setImages] = useState([1, 2])
  const [feedInfo, setFeedInfo] = useState({})

  useEffect(() => {
    const hi = async () => {
      const res = await getFeedInfoAPI('64939f47b2cb2056635f6607')
      setFeedInfo(res.data.post)
      setImages(res.data.post.image)
      console.log(res.data)
      // author, commentCount, comments[], content, createdAt, heartCount, hearted, id, image, updatedAt
      // author : accountname, username, image, _id
    }

    hi()
  }, [])

  const handleSetImages = e => {
    const files = e.target.files
    const imageArray = []
    Array(...files).forEach(file => {
      const img = URL.createObjectURL(file)
      imageArray.push(img)
    })
    setImages(imageArray)
  }

  const check = () => {
    console.log(inputFileRef.current.elements.text.value)
  }

  return (
    <MainLayout>
      <form className={s.form} ref={inputFileRef}>
        <h2 className='a11y-hidden'>피드 수정 폼</h2>
        <label>
          제목
          <input type='text' />
        </label>
        <label>
          사진 업로드
          <input type='file' multiple onChange={e => handleSetImages(e)} />
        </label>
        <textarea name='text'></textarea>

        <ImageSlider>
          {typeof images === 'string'
            ? images.split(',').map(image => {
                return <ImageList src={image} alt='' />
              })
            : images.map(image => {
                return <ImageList src={image} alt='' />
              })}
        </ImageSlider>
        <button type='button' onClick={check}>
          체크
        </button>
      </form>
    </MainLayout>
  )
}

export default FeedEdit
