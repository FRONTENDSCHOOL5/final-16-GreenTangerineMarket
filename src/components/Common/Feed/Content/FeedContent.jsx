import { useState } from 'react'
import { Link } from 'react-router-dom'

import s from './FeedContent.module.scss'

import noImage from 'assets/img/no-image.png'
import imageLayers from 'assets/img/icon-img-layers.svg'

const FeedContent = ({ id, image, content }) => {
  const mainImage = image ? image.split(',', 1) : noImage
  const isMultiImage = image ? image.indexOf(',') !== -1 : false
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => setImageError(true)

  return (
    <Link to={`/feed/detail/${id}`} className={s.link}>
      <div className={s.wrapper}>
        {
          <img
            src={image && !imageError ? mainImage : noImage}
            onError={handleImageError}
            alt='피드 이미지'
            className={s.image}
          />
        }
        {isMultiImage && <img src={imageLayers} alt='여러장' className={s.layers} />}
      </div>
      <p className={s.content}>{content}</p>
    </Link>
  )
}

export default FeedContent
