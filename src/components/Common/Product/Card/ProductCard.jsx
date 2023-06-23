import { Link } from 'react-router-dom'
import { useState } from 'react'

import s from './ProductCard.module.scss'

import NoImage from 'assets/img/no-image.png'
import formatCreateTime from 'utils/formatCreateTime'
import formatNumberWithComma from 'utils/formatNumberWithComma'

const ProductCard = ({ id, image, name, price, time }) => {
  price = formatNumberWithComma(price)
  const createTime = formatCreateTime(time)
  const [imageError, setImageError] = useState(false)

  const handleError = () => setImageError(true)

  return (
    <article className={s.card}>
      <Link to={`/product/detail/${id}`} className={s.link}>
        <div className={s.wrapper}>
          <img onError={handleError} src={!imageError ? image : NoImage} alt='상품이미지' className={s.image} />
        </div>
        <p className={s.name}>{name}</p>
        <div className={s.container}>
          <span className={s.price}>{price}</span>
          <span className={s.won}>원</span>
        </div>
        <p className={s.time}>{createTime}</p>
      </Link>
    </article>
  )
}

export default ProductCard
