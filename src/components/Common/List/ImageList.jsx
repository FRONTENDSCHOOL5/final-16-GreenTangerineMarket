import { useState } from 'react'

import s from './ImageList.module.scss'

import noImage from 'assets/img/no-image.png'

const ImageList = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <li className={s.list}>
      <img className={s.img} src={!imageError ? src : noImage} alt={alt} onError={() => setImageError(true)} />
    </li>
  )
}

export default ImageList
