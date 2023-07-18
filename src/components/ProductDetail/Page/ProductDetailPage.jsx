import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import s from './ProductDetailPage.module.scss'

import { getProductDetailAPI } from 'api/product'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import formatCreateTime from 'utils/formatCreateTime'
import formatNumberWithComma from 'utils/formatNumberWithComma'
import defaultImage from 'assets/img/no-image.png'
import NotFoundPage from 'components/NotFound/NotFoundPage'
import ProductDetailAuthorButton from '../AuthorButton/ProductDetailAuthorButton'

const ProductDetailPage = () => {
  const params = useParams()
  const [imageError, setImageError] = useState(false)
  const [product, setProduct] = useState(null)
  const [isNoProduct, setIsNoProduct] = useState(false)

  const getProductDetail = async () => {
    const res = await getProductDetailAPI(params.id)
    if (res.status === 200) {
      setProduct(res.data.product)
    } else {
      setIsNoProduct(true)
    }
  }

  const handleImageError = () => setImageError(true)

  useEffect(() => {
    getProductDetail()
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <>
      {!isNoProduct ? (
        product && (
          <>
            <section className={s.container}>
              <img
                className={s.image}
                src={!imageError ? product.itemImage : defaultImage}
                alt='상품이미지'
                onError={handleImageError}
              />
              <div className={s.info}>
                <p className={s.name}>{product.itemName}</p>
                <p className={s.price}>{formatNumberWithComma(product.price)}원</p>
                <p className={s.seller}>판매자 정보</p>
                <Link to={`/profile/${product.author.accountname}`} className={s.author}>
                  <ProfileImage image={product.author.image} name={product.author.username} className={s.profile} />
                  <div className={s.authorName}>
                    <p className={s.user}>{product.author.username}</p>
                    <p className={s.account}>@{product.author.accountname}</p>
                  </div>
                </Link>
                <p className={s.time}>{formatCreateTime(product.createdAt)}</p>
              </div>
            </section>
            <ProductDetailAuthorButton product={product} id={params.id} />
          </>
        )
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}

export default ProductDetailPage
