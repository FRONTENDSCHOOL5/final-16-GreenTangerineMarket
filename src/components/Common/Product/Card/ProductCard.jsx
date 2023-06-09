import { Link } from 'react-router-dom'
import { useState } from 'react'

import s from './ProductCard.module.scss'

import NoImage from 'assets/img/no-image.png'
import formatUpdateTime from 'utils/formatUpdateTime'
import formatNumberWithComma from 'utils/formatNumberWithComma'

const ProductCard = ({ id, image, name, price, time }) => {
  price = formatNumberWithComma(price)
  const updateTime = formatUpdateTime(time)
  const [imageError, setImageError] = useState(false)

  const handleError = e => {
    setImageError(true)
  }
  return (
    <article className={s.card}>
      <Link to={`/product/detail/${id}`} className={s.link}>
        {<img onError={handleError} src={!imageError ? image : NoImage} alt='상품이미지' className={s.image} />}
        <p className={s.name}>{name}</p>
        <div className={s.container}>
          <span className={s.price}>{price}</span>
          <span className={s.won}>원</span>
        </div>
      </Link>
      <p className={s.time}>{updateTime}</p>
    </article>
  )
}

export default ProductCard
